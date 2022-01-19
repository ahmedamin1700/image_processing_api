import express from "express";
import path from "path";
import multer from "multer";
import bodyParser from "body-parser";
import imagesRoute from "./routes/api/images";
import Image from "./middleware/imageProcessing";

const app = express();
const port = 3000;
const image = new Image();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../assets/full"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(express.static("public"));

app.use("/api", imagesRoute);
app.get("/", (req, res) => res.render("index.pug"));
app.post("/", upload.single("image"), (req, res) => {
  res.redirect("/process");
});
app.get("/process", async (req, res) => {
  const names = await image.getAllAvailableImagesNames();
  res.render("process.pug", { names: names });
});

app.post("/process", (req, res) => {
  const { name, width, height } = req.body;
  res.redirect(`/api/images?filename=${name}&width=${width}&height=${height}`);
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

export default app;
