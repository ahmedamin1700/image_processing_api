import path from "path";
import supertest from "supertest";
import app from "../index";
import Image from "../middleware/imageProcessing";

const request = supertest(app);
const image = new Image();

describe("Test index endpoint '/' responses", () => {
  it("GET the '/' endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("POST the '/' endpoint", async () => {
    const testImageDir = path.resolve(image.fullDirPath, "../");

    const response = await request
      .post("/")
      .attach("image", path.resolve(testImageDir, "test.jpg"));
    expect(response.status).toBe(302);
  });

  it("GET the '/process' endpoint", async () => {
    const response = await request.get("/process");
    expect(response.status).toBe(200);
  });

  it("POST the '/process' endpoint", async () => {
    const response = await request
      .post("/process")
      .field("name", "port")
      .field("width", "200")
      .field("height", "200");
    expect(response.status).toBe(302);
  });
});
