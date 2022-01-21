import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets/full"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

export default storage;
