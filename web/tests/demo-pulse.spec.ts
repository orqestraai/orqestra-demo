import { expect, test } from "@playwright/test"
import { createUser } from "./utils/privateApi"
import { randomEmail, randomPassword } from "./utils/random"
import { logInUser } from "./utils/user"

test.describe("Demo pulse", () => {
  test.use({ storageState: { cookies: [], origins: [] } })
  let email: string
  const password = randomPassword()

  test.beforeAll(async () => {
    email = randomEmail()
    await createUser({ email, password })
  })

  test.beforeEach(async ({ page }) => {
    await logInUser(page, email, password)
  })

  test("Authenticated user sees the live demo pulse on /demo", async ({
    page,
  }) => {
    const pulseResponse = page.waitForResponse(
      (response) =>
        response.url().includes("/api/v1/demo/pulse") && response.ok(),
    )

    await page.goto("/demo")

    const response = await pulseResponse
    const body = await response.json()

    // Confirms the E2E run hits the real backend rather than a mocked response.
    expect(body.service).toBeTruthy()
    expect(body.summary).toBeTruthy()
    expect(body.sequence).toBeGreaterThan(0)

    await expect(page.getByText(body.service, { exact: true })).toBeVisible()
    await expect(page.getByText(body.status, { exact: true })).toBeVisible()
    await expect(
      page.getByText(`Sequence #${body.sequence}`, { exact: true }),
    ).toBeVisible()
    await expect(page.getByText(body.summary, { exact: true })).toBeVisible()
  })
})
