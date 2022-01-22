import path from "path";
import supertest from "supertest";
import app from "../index";
import { ASSETS_DIR_PATH } from "../middleware/imageProcessing";

const request = supertest(app);

describe("Test index endpoint '/' responses", () => {
  it("GET the '/' endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("POST the '/' endpoint", async () => {
    const response = await request
      .post("/")
      .attach("image", path.resolve(ASSETS_DIR_PATH, "test.jpg"));
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
