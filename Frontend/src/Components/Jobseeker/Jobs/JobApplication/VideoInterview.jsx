import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import UserController from "../../../../API/index";
import {WaveFile} from "wavefile"; // Import the default export
import { useSelector } from "react-redux"

const questions = [
  "So please tell me about yourself.",
  "Tell me about a time when you demonstrated leadership.",
  "Tell me about a time when you were working with a team and faced a challenge. How did you overcome the problem?",
  "What is one of your weaknesses and how do you plan to overcome it?",
  "Now, why do you think we should hire you?",
];

const VideoInterview = () => {
  const { goToNextStep, handleState } = useOutletContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [application_id, setApplication_id] = useState(localStorage.getItem("application_id"));
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const {_id} = useSelector( (state)=> state.user)
  

  // Video recording using react-media-recorder
  const {
    startRecording: startVideoRecording,
    stopRecording: stopVideoRecording,
    mediaBlobUrl: videoBlobUrl,
    clearBlobUrl: clearVideoBlobUrl,
  } = useReactMediaRecorder({ video: true, mimeType: "video/webm" });

  // Audio recording using react-media-recorder
  const {
    startRecording: startAudioRecording,
    stopRecording: stopAudioRecording,
    mediaBlobUrl: audioBlobUrl,
    clearBlobUrl: clearAudioBlobUrl,
  } = useReactMediaRecorder({ audio: true, mimeType: "audio/webm" });

  // Convert WebM to WAV
  const convertToWav = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const wav = new WaveFile();
    wav.fromScratch(1, 48000, "16", new Uint8Array(arrayBuffer));
    const wavBuffer = wav.toBuffer();
    return new Blob([wavBuffer], { type: "audio/wav"})
  };

  // Start recording both audio and video with timer
  const handleStartCaptureClick = () => {
    startVideoRecording();
    startAudioRecording();
    setTimer(0);
    timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
  };

  // Stop recording both audio and video and clear timer
  const handleStopCaptureClick = () => {
    stopVideoRecording();
    stopAudioRecording();
    clearInterval(timerRef.current);
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      alert(
        "You have answered all the questions. You can now submit your interview."
      );
      
      handleStopCaptureClick();
    }
  };

  // Download the recorded video and audio separately
  const handleDownload = async () => {
    if (videoBlobUrl) {
      const videoLink = document.createElement("a");
      videoLink.href = videoBlobUrl;
      videoLink.download = "interview_video.webm";
      videoLink.click();
      clearVideoBlobUrl(); // Clear the video blob URL after download
    }

    if (audioBlobUrl) {
      const audioResponse = await fetch(audioBlobUrl);
      const audioBlob = await audioResponse.blob();
      const wavBlob = await convertToWav(audioBlob); // Convert to WAV
      const audioLink = document.createElement("a");
      audioLink.href = URL.createObjectURL(wavBlob);
      audioLink.download = "interview_audio.wav";
      audioLink.click();
      clearAudioBlobUrl(); // Clear the audio blob URL after download
    }
  };

  // Submit the video and audio interview separately
  const handleSubmit = async () => {
    console.log("Submitting interview to backend...");
    setIsProcessing(true);

    console.log("Audio blob url ", audioBlobUrl , "VideoBlob url", videoBlobUrl)

    if (videoBlobUrl && audioBlobUrl) {
      try{
      const videoResponse = await fetch(videoBlobUrl);
      const videoBlob = await videoResponse.blob();

      const audioResponse = await fetch(audioBlobUrl);
      const audioBlob = await audioResponse.blob();
      const wavBlob = await convertToWav(audioBlob); // Convert to WAV
      
      console.log("heyyyy")
      const formDataVideo = new FormData();
      formDataVideo.append("video", videoBlob, `${_id}.webm`);

      formDataVideo.append("application_id", application_id);
        // Upload audio to FastAPI server
        

        // Call the backend to get the pre-signed URL for video
        let videoUploadResponse = await UserController.generatePresignedUrl(
          "interviews",
          "interview.mp4",
          "video/mp4"
        );
        const { url } = videoUploadResponse;

        console.log("Pre-signed URL received:", url);
        // Update application state with interview video URL
        handleState(
          "videoIntroduction",
          "https://skillsyncprobucket.s3.ap-southeast-2.amazonaws.com/interviews/interview.mp4"
        );

        // move to the next step of skill Assessment
        goToNextStep();
        setIsProcessing(false);

        let audioUploadResponse = await axios.post(
          "http://localhost:8000/predict_score/", // FastAPI endpoint for audio upload and scoring
          formDataVideo,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Audio upload successful:", audioUploadResponse.data);



        // Upload the video to S3 using the pre-signed URL
        await axios.put(url.data, videoBlob, {
          headers: {
            "Content-Type": "video/mp4",
          },
        });

          } catch (error) {
        console.error("Error uploading interview:", error);
        alert("Failed to upload interview.");
        setIsProcessing(false);
      }
    }
  };

  // Automatically stop recording after 3 minutes
  useEffect(() => {
    if (timer >= 180) {
      handleStopCaptureClick();
      alert("Recording stopped after reaching the 3-minute limit.");
    }
  }, [timer]);

  // Re-record the interview (Reset everything)
  const handleRedo = () => {
    clearVideoBlobUrl(); // Clear the recorded video blob URL
    clearAudioBlobUrl(); // Clear the recorded audio blob URL
    setCurrentQuestion(0); // Reset to the first question
    setTimer(0); // Reset the timer
    clearInterval(timerRef.current); // Stop any ongoing timers
  };

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

        {/* Timer display */}
        <div className="text-center text-gray-500 mb-4">
          Timer: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
        </div>

        <div className="flex flex-col items-center">
          {/* Webcam component */}
          <Webcam className="w-full h-64 rounded-md" />
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleStartCaptureClick}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-md"
            >
              Start Recording
            </button>
            <button
              onClick={handleStopCaptureClick}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold p-3 rounded-md"
            >
              Stop Recording
            </button>
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-md"
            >
              Next Question
            </button>
            <button
              onClick={handleDownload}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold p-3 rounded-md"
            >
              Download Video & Audio
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
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-md mt-6"
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