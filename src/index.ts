import express from "express";
import path from "path";
import bodyParser from "body-parser";
import imagesRoute from "./routes/api/images";
import indexRoute from "./routes/index";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(express.static("public"));

app.use("/api", imagesRoute);
app.use("/", indexRoute);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

export default app;
