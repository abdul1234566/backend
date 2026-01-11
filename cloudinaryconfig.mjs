import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dlzgxtrso",
  api_key: process.env.CLOUDINARY_API_KEY || "428214689914334",
  api_secret: process.env.CLOUDINARY_API_SECRET || "f2OpyTozpr7GIyAV4lbUEeIBxTU",
});

// Use memory storage
export const upload = multer({ storage: multer.memoryStorage() });

// Function to upload to cloudinary
export const uploadToCloudinary = (fileBuffer, folder = "my_images") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export { cloudinary };
