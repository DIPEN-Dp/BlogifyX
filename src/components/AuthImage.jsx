import React, { useState, useEffect } from "react";
import config from "../Config/conig";

// Module-level cache — persists across re-renders and page navigation
const imageCache = new Map();

async function fetchAuthenticatedImage(fileId) {
  // Return from cache if already fetched
  if (imageCache.has(fileId)) {
    return imageCache.get(fileId);
  }

  const url = `${config.appwriteURL}/storage/buckets/${config.appwriteBucketID}/files/${fileId}/view?project=${config.appwriteProjectID}`;

  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "X-Appwrite-Project": config.appwriteProjectID,
    },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  // Store in cache
  imageCache.set(fileId, objectUrl);
  return objectUrl;
}

function AuthImage({ fileId, alt, className }) {
  const [src, setSrc] = useState(() => imageCache.get(fileId) || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!fileId || imageCache.has(fileId)) return;

    fetchAuthenticatedImage(fileId)
      .then((url) => setSrc(url))
      .catch((err) => {
        console.error("AuthImage fetch failed:", err);
        setError(true);
      });
  }, [fileId]);

  if (error) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ minHeight: "120px" }}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  if (!src) {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ minHeight: "120px" }}
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
}

export default AuthImage;
