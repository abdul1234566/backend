import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary'


    // Configuration
    cloudinary.config({
      cloud_name: "dlzgxtrso",
      api_key: "428214689914334",
      api_secret: "f2OpyTozpr7GIyAV4lbUEeIBxTU", // Click 'View API Keys' above to copy your API secret
    });
    
   console.log(cloudinary.config());

   const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'my_images',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp', 'jfif'],
    }
   });

   export const upload = multer({ storage });