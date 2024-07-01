const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");

describe("jewelryController", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  beforeEach(async () => {
    jest.setTimeout(30000);
  });

  const userUUID = "user-id";
  const categoryId = 1;
  const jewelryId = 1;

  afterEach(async () => {
    await server.close();
  });

  test("Test find all jewelries by category; Expect success", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const res = await request
      .get(`/jewelry/by-category/${categoryId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("stoneTypesData");
    expect(res.body).toHaveProperty("stoneColorsData");
  });

  test("Test find one jewelry; Expect success", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const res = await request
      .get(`/jewelry/by-jewelry/${jewelryId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    const responseBody = res.body;
    expect(responseBody).toBeInstanceOf(Array);

    responseBody.forEach((item) => {
      expect(item).toHaveProperty("firstImageUrl");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("price");
      expect(item).toHaveProperty("sizes");
      expect(item).toHaveProperty("isLikedByUser");
      expect(item).toHaveProperty("isSoldOut");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("category");
      expect(item).toHaveProperty("_id");
    });
  });
});
