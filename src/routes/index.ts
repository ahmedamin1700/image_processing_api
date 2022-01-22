import multer from "multer";
import { Router } from "express";
import { getAllAvailableImagesNames } from "../middleware/imageProcessing";
import storage from "../middleware/storage";

const router = Router();
const upload = multer({ storage });

router.get("/", (req, res) => res.render("index.pug"));
router.post("/", upload.single("image"), (req, res) => {
  res.redirect("/process");
});
router.get("/process", async (req, res) => {
  const names = await getAllAvailableImagesNames();
  res.render("process.pug", { names: names });
});

router.post("/process", (req, res) => {
  const { name, width, height } = req.body;
  res.redirect(`/api/images?filename=${name}&width=${width}&height=${height}`);
});

export default router;
