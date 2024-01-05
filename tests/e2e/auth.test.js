const request = require("supertest")
const app = require("../../app")

describe("E2E tests", () => {
  let userToken

  beforeAll(async () => {
    await request(app).post("/api/v1/auth/signup").send({
      username: "testuser",
      password: "testpassword",
    })
  })

  test("should authenticate a user", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      username: "testuser",
      password: "testpassword",
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty("token")

    userToken = response.body.token
  })

  test("should access a protected route", async () => {
    const response = await request(app)
      .get("/api/v1/entreprise")
      .set("Authorization", `Bearer ${userToken}`)

    expect(response.statusCode).toBe(201)
  })

  afterAll(async () => {
    await request(app)
      .delete("/api/v1/auth/user/:id")
      .set("Authorization", `Bearer ${userToken}`)
  })
})
