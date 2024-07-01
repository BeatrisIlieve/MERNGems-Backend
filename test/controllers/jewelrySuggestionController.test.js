const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");

describe("jewelrySuggestionController", () => {
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
  const jewelryId = 22;

  afterEach(async () => {
    await server.close();
  });

  test("Test find three jewelries from categories different that the provided jewelry id being with \
   the same color of the provided jewelry id; Expect success", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const res = await request
      .get(`/suggestion/${jewelryId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    const responseBody = res.body;

    expect(responseBody).toBeInstanceOf(Array);

    expect(responseBody.length).toBe(3);

    const titles = responseBody.map((item) => item.title);

    expect(titles).toContain(
      "Forget-Me-Not Pink Sapphire and Diamond Bracelet"
    );
    expect(titles).toContain(
      "Forget-Me-Not Pink Sapphire and Diamond Lariat Necklace"
    );
    expect(titles).toContain("Forget-Me-Not Pink Sapphire and Diamond Ring");
  });
});
