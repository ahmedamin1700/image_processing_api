import supertest from "supertest";
import app from "../../index";
import { process } from "../../middleware/imageProcessing";

const request = supertest(app);

describe("Test images endpoint '/api/images' response", () => {
  const filename = "port";
  const width = "200";
  const height = "200";

  it("GET the '/api/images' endpoint", async () => {
    const response = await request.get(
      `/api/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(200);
  });

  it("Test image processing functionality", async () => {
    const value = await process({ filename, width, height });

    expect(value).toBeTrue();
  });
});
