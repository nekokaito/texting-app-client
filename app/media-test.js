import { useState } from "react";
import { Alert, Button, Image, Text, View } from "react-native";

import { pickImageOrVideo } from "../utils/mediaPicker";

import { uploadToCloudinary } from "../services/media.service";

export default function MediaTest() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handlePickAndUpload = async () => {
    try {
      setUploading(true);

      const file = await pickImageOrVideo();

      if (!file) {
        return;
      }

      console.log("Selected file:", file);

      const result = await uploadToCloudinary(file);

      console.log("Cloudinary result:", result);

      setUploadedUrl(result.url);

      Alert.alert("Success", "File uploaded successfully");
    } catch (error) {
      console.error(error);

      Alert.alert("Upload Error", error.message || "Something went wrong");
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
        title={uploading ? "Uploading..." : "Pick & Upload"}
        onPress={handlePickAndUpload}
        disabled={uploading}
      />

      {uploadedUrl && (
        <>
          <Text style={{ marginTop: 20 }}>Upload successful</Text>

          <Image
            source={{ uri: uploadedUrl }}
            style={{
              width: 250,
              height: 250,
              marginTop: 20,
            }}
          />
        </>
      )}
    </View>
  );
}
