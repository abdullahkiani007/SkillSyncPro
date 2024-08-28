import React, { useState, useRef, useCallback, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";
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
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  // Start the recording
  const handleStartCaptureClick = useCallback(() => {
    setRecording(true);
    setTimer(0); // Reset the timer
    timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000); // Start the timer

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/mp4",
    });

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setRecording, setTimer]);

  // Collect the data available from media recorder
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  // Stop the recording
  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    clearInterval(timerRef.current); // Stop the timer
    setRecording(false);
  }, [mediaRecorderRef]);

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
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "interview.mp4";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  // Submit the video interview
  // Modify handleSubmit in VideoInterview Component
  const handleSubmit = async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/mp4" });

      const formData = new FormData();
      formData.append("video", blob, "interview.mp4");

      try {
        // Call the backend to get the pre-signed URL
        const response = await UserController.generatePresignedUrl(
          "interviews",
          "interview.mp4",
          "video/mp4"
        );
        const { url } = response;

        // Upload the video to S3 using the pre-signed URL
        await axios.put(url.data, blob, {
          headers: {
            "Content-Type": "video/mp4",
          },
        });

        // Update application state with interview video URL
        handleState(
          "videoIntroduction",
          `https://skillsyncprobucket.s3.ap-southeast-2.amazonaws.com/interviews/interview.mp4`
        );

        alert("Interview video uploaded successfully!");
        goToNextStep();
      } catch (error) {
        console.error("Error uploading video:", error);
        alert("Failed to upload interview video.");
      }
    }
  };

  // Re-record the video (reset everything)
  const handleRedo = () => {
    setRecordedChunks([]);
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
