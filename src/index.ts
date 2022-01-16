import express from "express";
import imagesRoute from "./routes/api/images";

const app = express();
const port = 3000;

app.use("/api", imagesRoute);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

export default app;
