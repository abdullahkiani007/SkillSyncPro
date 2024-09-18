import React, { useState, useRef, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import UserController from "../../../../API/index";

const questions = [
  "So please tell me about yourself.",
  "Tell me about a time when you demonstrated leadership.",
  "Tell me about a time when you were working with a team and faced a challenge. How did you overcome the problem?",
  "What is one of your weaknesses and how do you plan to overcome it?",
  "Now, why do you think we should hire you?",
];

const VideoInterview = () => {
  const { step, goToNextStep, handleState } = useOutletContext();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recordedVideoChunks, setRecordedVideoChunks] = useState([]);
  const [recordedAudioChunks, setRecordedAudioChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state
  const webcamRef = useRef(null);
  const videoRecorderRef = useRef(null);
  const audioRecorderRef = useRef(null);
  const timerRef = useRef(null);

  // Start the recording
  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      setRecording(true);
      setTimer(0); // Reset the timer
      timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000); // Start the timer

      // Start video recording
      videoRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm;codecs=vp8,opus",
      });

      videoRecorderRef.current.addEventListener(
        "dataavailable",
        handleVideoDataAvailable
      );
      videoRecorderRef.current.start();

      // Start audio recording
      navigator.mediaDevices.getUserMedia({ audio: true }).then((audioStream) => {
        audioRecorderRef.current = new MediaRecorder(audioStream, {
          mimeType: "audio/webm",
        });

        audioRecorderRef.current.addEventListener(
          "dataavailable",
          handleAudioDataAvailable
        );
        audioRecorderRef.current.start();
      });
    } else {
      console.error("Webcam stream is not available.");
    }
  }, [webcamRef, setRecording, setTimer]);

  // Collect the video data available from media recorder
  const handleVideoDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedVideoChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedVideoChunks]
  );

  // Collect the audio data available from media recorder
  const handleAudioDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedAudioChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedAudioChunks]
  );

  // Stop the recording
  const handleStopCaptureClick = useCallback(() => {
    if (videoRecorderRef.current) {
      videoRecorderRef.current.stop();
    } else {
      console.error("Video MediaRecorder is not initialized.");
    }

    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
    } else {
      console.error("Audio MediaRecorder is not initialized.");
    }

    clearInterval(timerRef.current); // Stop the timer
    setRecording(false);
  }, [videoRecorderRef, audioRecorderRef]);

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      alert(
        "You have answered all the questions. You can now submit your interview."
      );
      handleStopCaptureClick(); // Automatically stop recording after the last question
    }
  };

  // Download the entire recording
  const handleDownload = useCallback(() => {
    if (recordedVideoChunks.length) {
      const videoBlob = new Blob(recordedVideoChunks, { type: "video/webm" });
      const videoUrl = URL.createObjectURL(videoBlob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = videoUrl;
      a.download = "interview_video.webm";
      a.click();
      window.URL.revokeObjectURL(videoUrl);
    }

    if (recordedAudioChunks.length) {
      const audioBlob = new Blob(recordedAudioChunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = audioUrl;
      a.download = "interview_audio.webm";
      a.click();
      window.URL.revokeObjectURL(audioUrl);
    }
  }, [recordedVideoChunks, recordedAudioChunks]);

    // Submit the video interview
  const handleSubmit = async () => {
    console.log("Submitting interview to backend...");
    setIsProcessing(true);
  
    if (recordedVideoChunks.length && recordedAudioChunks.length) {
      console.log("Uploading video and audio...");
      const videoBlob = new Blob(recordedVideoChunks, { type: "video/webm" });
      const audioBlob = new Blob(recordedAudioChunks, { type: "audio/webm" });
  
      const formDataAudio = new FormData();
      const formDataVideo = new FormData();

      formDataVideo.append("video", videoBlob, "interview_video.webm");
      formDataAudio.append("audio", audioBlob, "interview_audio.webm");
      // Update application state with interview video URL
      handleState(
        "videoIntroduction",
        `https://skillsyncprobucket.s3.ap-southeast-2.amazonaws.com/interviews/interview.mp4`
      );
      goToNextStep();
  
      try {
        // Upload audio to FastAPI server
        let audioResponse = await axios.post(
          "http://localhost:8000/transcribe_audio_test/", // Your FastAPI endpoint
          formDataAudio,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Audio upload successful:", audioResponse.data);
  
        // Call the backend to get the pre-signed URL for video
        let videoResponse = await UserController.generatePresignedUrl(
          "interviews",
          "interview.mp4",
          "video/mp4"
        );
        const { url } = videoResponse;
  
        console.log("Pre-signed URL received:", url);
  
        // Upload the video to S3 using the pre-signed URL
        await axios.put(url.data, videoBlob, {
          headers: {
            "Content-Type": "video/mp4",
          },
        });
  
  
        alert("Interview uploaded successfully!");
        setIsProcessing(false);
      } catch (error) {
        console.error("Error uploading interview:", error);
        alert("Failed to upload interview.");
        setIsProcessing(false);
      }
    }
  };

  // Re-record the video (reset everything)
  const handleRedo = () => {
    setRecordedVideoChunks([]);
    setRecordedAudioChunks([]);
    setCurrentQuestion(0);
    setRecording(false);
    setTimer(0);
    clearInterval(timerRef.current);
  };

  // Automatically stop recording after 3 minutes
  useEffect(() => {
    if (timer >= 180) {
      handleStopCaptureClick();
      alert("Recording stopped after reaching the 3-minute limit.");
    }
  }, [timer, handleStopCaptureClick]);

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      {isProcessing && <Loader />}
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="font-bold text-2xl mb-6 text-center text-secondary-dark">
          Step 2: Video Interview
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Please answer the following question by recording a video:
        </p>
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          {questions[currentQuestion]}
        </h2>

        {/* Display timer */}
        <div className="text-center text-gray-500 mb-4">
          Timer: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
        </div>

        <div className="flex flex-col items-center">
          <Webcam
            audio={true}
            ref={webcamRef}
            videoConstraints={{ facingMode: "user" }}
            className="w-full h-64 rounded-md"
          />
          <div className="mt-4 flex space-x-4">
            {recording ? (
              <button
                onClick={handleStopCaptureClick}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out"
              >
                Stop Recording
              </button>
            ) : (
              <button
                onClick={handleStartCaptureClick}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out"
              >
                Start Recording
              </button>
            )}
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out"
              disabled={!recording && currentQuestion < questions.length - 1} // Disable "Next Question" if not recording
            >
              Next Question
            </button>
            <button
              onClick={handleDownload}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out"
            >
              Download Video
            </button>
            <button
              onClick={handleRedo}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out"
            >
              Redo Interview
            </button>
          </div>

          {/* Submit button - only shown after all questions are answered */}
          {currentQuestion === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-md mt-6 transition duration-300 ease-in-out"
            >
              Submit Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoInterview;