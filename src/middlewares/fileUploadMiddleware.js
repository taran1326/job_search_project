import multer from "multer";
import path from "path";

/**
 * Middleware for handling file uploads.
 */
const storage = multer.diskStorage({
  // Define the destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, path.resolve("src", "public", "uploads"));
  },
  // Define the filename for uploaded files
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

/**
 * Middleware instance for file uploading using Multer.
 */
const uploadFile = multer({ storage: storage });

export default uploadFile;
