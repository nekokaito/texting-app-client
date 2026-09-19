import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

import { uploadToCloudinary } from "../services/media.service";
import { pickDocument } from "../utils/mediaPicker";

export default function MediaDocumentTest() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handlePickDocument = async () => {
    try {
      // Open the picker first
      const selectedFile = await pickDocument();

      // User cancelled the picker
      if (!selectedFile) {
        return;
      }

      console.log("Selected document:", selectedFile);

      setFile(selectedFile);
      setUploading(true);

      // Upload the selected document
      const result = await uploadToCloudinary(selectedFile);

      console.log("Cloudinary document result:", result);

      Alert.alert("Success", "Document uploaded successfully!");
    } catch (error) {
      console.error("Document upload error:", error);

      Alert.alert("Upload Error", error.message || "Document upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Button
        title={uploading ? "Uploading..." : "📄 Select Document"}
        onPress={handlePickDocument}
        disabled={uploading}
      />

      {file && (
        <View
          style={{
            marginTop: 25,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {file.fileName}
          </Text>

          <Text style={{ marginTop: 8 }}>Type: {file.mimeType}</Text>

          <Text style={{ marginTop: 5 }}>Size: {file.fileSize} bytes</Text>
        </View>
      )}
    </View>
  );
}
