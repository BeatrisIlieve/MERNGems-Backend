const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");

describe("stoneController", () => {
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

  afterEach(async () => {
    await server.close();
  });

  test("Test search a jewelry by stone type; Expect two stone types to be found", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const expectedData = [
      {
        _id: 2,
        count: 3,
        entityTitle: "stoneType",
        stoneTypeId: 2,
        title: "Diamond",
      },
      {
        _id: 3,
        count: 3,
        entityTitle: "stoneType",
        stoneTypeId: 3,
        title: "Ruby",
      },
    ];

    const jewelryIds = [5, 24, 33];

    const serializedObject = encodeURIComponent(
      JSON.stringify({ JewelryIds: jewelryIds })
    );

    const res = await request
      .get(`/stone/by-stone-types`)
      .set("user-uuid", userUUID)
      .query({ data: serializedObject });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ stoneTypesData: expectedData });
  });

  test("Test search a jewelry by stone color; Expect two stone colors to be found", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const expectedData = [
      {
        _id: 5,
        count: 3,
        entityTitle: "stoneColor",
        stoneColorId: 5,
        title: "Red",
      },
      {
        _id: 6,
        count: 3,
        entityTitle: "stoneColor",
        stoneColorId: 6,
        title: "White",
      },
    ];

    const jewelryIds = [5, 24, 33];

    const serializedObject = encodeURIComponent(
      JSON.stringify({ JewelryIds: jewelryIds })
    );

    const res = await request
      .get(`/stone/by-stone-colors`)
      .set("user-uuid", userUUID)
      .query({ data: serializedObject });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ stoneColorsData: expectedData });
  });
});
