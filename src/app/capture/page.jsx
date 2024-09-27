"use client";
import React, { useEffect, useRef, useState } from "react";
import { sedFileReq } from "../try/page";
import { useRouter } from "next/router";
// import sendfile from "@/app/"

export const CameraCapture = () => {
  // const router = useRouter();
  // const [isR, setisR] = useState();

  // useEffect(() => {
  //   setisR(true);
  // }, [router.isReady]);

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
  const captureImage = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the base64 image data
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);

      // Convert the base64 data to a Blob
      const blob = await fetch(imageData).then((res) => res.blob());

      // Create a File object if needed
      const file = new File([blob], "captured_image.png", {
        type: "image/png",
      });

      // Send the file to your API or use it
      await sedFileReq({ File: file });
      const captureImage = async () => {
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

          await sedFileReq({ File: imageData });
          // console.log(imageData);
        }
      };
      window.location.href = "/try";
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
