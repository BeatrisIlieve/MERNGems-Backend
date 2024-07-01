const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");

describe("jewelryCollectionController", () => {
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
  const collectionId = 1;

  afterEach(async () => {
    await server.close();
  });

  test("Test find all jewelries by collection; Expect success", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const res = await request
      .get(`/collection/${collectionId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("stoneTypesData");
    expect(res.body).toHaveProperty("stoneColorsData");
    expect(res.body).toHaveProperty("totalCount");
    expect(res.body.totalCount).toBe(10);
  });
});
