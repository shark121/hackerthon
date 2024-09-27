"use client";
import React, { useRef, useState } from "react";

export const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Access camera and start video stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // Capture image from the video stream
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Save captured image
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      console.log(imageData);
    }
  };

  return (
    <div>
      <h2>Camera Capture</h2>

      {/* Video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "400px" }}
      ></video>

      <br />

      {/* Button to start camera */}
      <button onClick={startCamera}>Start Camera</button>

      {/* Button to capture image */}
      <button onClick={captureImage}>Capture Image</button>

      {/* Canvas for capturing image */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* Display captured image */}
      {capturedImage && (
        <div>
          <h3>Captured Image</h3>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
