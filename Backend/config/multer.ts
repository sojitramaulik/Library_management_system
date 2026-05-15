import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "student_profiles",
    allowed_formats: ["jpg", "png", "jpeg"],
  } as any,
});

export const upload = multer({ storage });

