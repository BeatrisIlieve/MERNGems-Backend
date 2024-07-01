const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");

describe("searchController", () => {
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

  test("Test search a jewelry by stone color; Expect four jewelries to be found", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const search = "pink";

    const res = await request
      .get(`/search/find-all/${userUUID}`)
      .set("user-uuid", userUUID)
      .query({ query: search });

    expect(res.status).toBe(200);

    const responseBody = res.body;

    console.log(responseBody);

    expect(responseBody.length).toBe(4);
  });

  test("Test search a jewelry by stone color and category; Expect four jewelries to be found", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const search = "pink earring";

    const res = await request
      .get(`/search/find-all/${userUUID}`)
      .set("user-uuid", userUUID)
      .query({ query: search });

    expect(res.status).toBe(200);

    const responseBody = res.body;

    expect(responseBody.length).toBe(1);
  });
});
