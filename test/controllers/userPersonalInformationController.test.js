const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");

describe("userPersonalInformationController", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  beforeEach(() => {
    jest.setTimeout(30000);
  });

  const userUUID = "user-id";
  const email = "test@email.com";
  const password = "123456Bb";
  const firstName = "TestName";
  const lastName = "TestName";
  const updatedFirstName = "Test";
  const updatedLastName = "Test";
  const birthday = "10/10/1995";
  const invalidBirthday = "10101995";
  const specialDay = "10/10/1995";

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID);
    await UserPersonalInformation.findByIdAndDelete(userUUID);
    await UserAddressInformation.findByIdAndDelete(userUUID);
    await server.close();
  });

  test("Test update user personal details with valid data; Expect success", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-personal-information/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        firstName: updatedFirstName,
        lastName: updatedLastName,
        birthday,
        specialDay,
      });

    expect(res2.status).toBe(200);

    const updatedUserPersonalInformation =
      await UserPersonalInformation.findById(userUUID);

    expect(updatedUserPersonalInformation.firstName).not.toBe(firstName);
    expect(updatedUserPersonalInformation.firstName).toBe(updatedFirstName);

    expect(updatedUserPersonalInformation.lastName).not.toBe(lastName);
    expect(updatedUserPersonalInformation.lastName).toBe(updatedLastName);

    expect(updatedUserPersonalInformation.birthday).toBe(birthday);
    expect(updatedUserPersonalInformation.specialDay).toBe(specialDay);
  });

  test("Test update user personal details with invalid birthday; Expect error", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-personal-information/${userUUID}`)
      .set("user-uuid", userUUID)
      .send({
        firstName,
        lastName,
        birthday: invalidBirthday,
        specialDay,
      });

    expect(res2.status).toBe(401);

    const updatedUserPersonalInformation =
      await UserPersonalInformation.findById(userUUID);

    expect(updatedUserPersonalInformation.birthday).not.toBe(invalidBirthday);
  });
});
