import { File } from "expo-file-system";
import { fetch } from "expo/fetch";

import { API_URL } from "../constants/API";

export const getUploadSignature = async () => {
  const response = await fetch(`${API_URL}/api/media/signature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to get upload signature");
  }

  return data;
};

export const uploadToCloudinary = async (file) => {
  const signatureData = await getUploadSignature();

  console.log("Upload signature received");

  const localFile = new File(file.uri);

  console.log("Local file:", {
    exists: localFile.exists,
    size: localFile.size,
    type: localFile.type,
    name: localFile.name,
  });

  if (!localFile.exists) {
    throw new Error("Selected file does not exist");
  }

  const formData = new FormData();

  formData.append("file", localFile);
  formData.append("api_key", signatureData.apiKey);
  formData.append("timestamp", String(signatureData.timestamp));
  formData.append("folder", signatureData.folder);
  formData.append("signature", signatureData.signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  console.log("Cloudinary response:", data);

  if (!response.ok) {
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
    format: data.format,
    fileName: file.fileName,
    fileSize: file.fileSize,
    mimeType: file.mimeType,
  };
};
