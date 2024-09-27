import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import UserController from "../../../../API/index";
import {WaveFile} from "wavefile"; // Import the default export
import { useSelector } from "react-redux"
import { Alert } from '@mantine/core';
import { FaCircleInfo } from "react-icons/fa6";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";

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
  const [error,setError] = useState("")
  const [openDialog, setOpenDialog] = useState(true); // State to control dialog
  
  const icon = <FaCircleInfo />;
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
    console.log("timer", timer)
    if (timer < 120){
      setError("You Interview must be atleast of 2 minute")
    }
    // setIsProcessing(true);

    console.log("Audio blob url ", audioBlobUrl , "VideoBlob url", videoBlobUrl)

    try{
      const videoResponse = await fetch(videoBlobUrl);
      const videoBlob = await videoResponse.blob();

      const audioResponse = await fetch(audioBlobUrl);
      const audioBlob = await audioResponse.blob();
      
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
    
  };

  // Automatically stop recording after 3 minutes
  useEffect(() => {
    if (timer >= 180) {
      handleStopCaptureClick();
      setError("Recording stopped after reaching the 3-minute limit.");
      handleSubmit();

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

    // Handle dialog close
    const handleDialogClose = () => {
      setOpenDialog(false);
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    {/* Error Alert */}
    {error && (
      <div className="fixed bottom-0 w-4/5 md:w-1/3">
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      </div>
    )}

    {/* Instructions Dialog */}
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle>Video Interview Instructions</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Please ensure that you are in a quiet and well-lit environment.
          You will be asked a series of questions. Make sure to record your
          responses, and note that the total interview must be at least 2
          minutes long. You can move to the next question when you're ready.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary" variant="contained">
          Got it
        </Button>
      </DialogActions>
    </Dialog>

    {/* Main Interview Card */}
    <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg mt-1">
      <h1 className="font-bold text-3xl mb-6 text-center text-slate-700">
        Step 2: Video Interview
      </h1>
      <p className="text-gray-700 mb-4 text-center">
        Answer the following question by recording a video response.
      </p>

      {/* Question and Timer */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-4 md:mb-0">
          {questions[currentQuestion]}
        </h2>
        <div className="text-center text-gray-500">
          Timer: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
        </div>
      </div>

      {/* Webcam and Buttons */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-64 mb-4 bg-gray-200 rounded-md overflow-hidden shadow-inner">
          <Webcam className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mt-4">
          <Button
            onClick={handleStartCaptureClick}
            variant="contained"
            color="success"
          >
            Start Recording
          </Button>
          <Button
            onClick={handleNextQuestion}
            variant="contained"
            color="primary"
            disabled={currentQuestion === questions.length - 1}
          >
            Next Question
          </Button>
          <Button
            onClick={handleDownload}
            variant="contained"
            color="warning"
          >
            Download Video
          </Button>
          <Button
            onClick={handleRedo}
            variant="outlined"
            color="secondary"
          >
            Redo Interview
          </Button>
        </div>

        {/* Submit button - only shown after all questions are answered */}
        {currentQuestion === questions.length - 1 && (
          <Button
            onClick={handleSubmit}
            className="mt-6"
            variant="contained"
            color="secondary"
          >
            Submit Interview
          </Button>
        )}
      </div>
    </div>

    {isProcessing && <Loader />}
  </div>
);
};


export default VideoInterview;