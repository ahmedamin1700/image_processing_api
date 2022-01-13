import express from "express";

const app = express();
const port = 3000;

app.get("/api/images", (req, res) => {
  res.send("working");
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
