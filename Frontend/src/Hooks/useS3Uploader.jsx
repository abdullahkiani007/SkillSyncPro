// hooks/useS3Uploader.js
import { useState } from "react";
import S3 from "react-s3";

// Ensure Buffer is available in the global scope
if (typeof window !== "undefined") {
  window.Buffer = window.Buffer || require("buffer").Buffer;
}

const useS3Uploader = (config) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const uploadFile = async (file, fileName) => {
    setUploading(true);
    setError(null);

    try {
      console.log("File to upload:", file);
      console.log("Uploading file to S3...");

      // Add a unique prefix or key if necessary
      const response = await S3.uploadFile(file, { ...config, key: fileName });

      console.log("Upload response:", response);
      setFileUrl(response.location);
      setUploading(false);
      return response.location;
    } catch (err) {
      console.error("Upload error:", err);
      setError(err);
      setUploading(false);
      return null;
    }
  };

  return { uploadFile, uploading, error, fileUrl };
};

export default useS3Uploader;
