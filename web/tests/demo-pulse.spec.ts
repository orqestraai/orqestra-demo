import { expect, test } from "@playwright/test"

test("Demo Pulse page shows live service, status, sequence, and summary from the real API", async ({
  page,
}) => {
  const pulseResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/v1/demo/pulse") &&
      response.request().method() === "GET",
  )

  await page.goto("/demo")

  const pulseResponse = await pulseResponsePromise
  expect(pulseResponse.ok()).toBe(true)
  const pulse = await pulseResponse.json()

  expect(typeof pulse.service).toBe("string")
  expect(typeof pulse.status).toBe("string")
  expect(pulse.sequence).toBeGreaterThan(0)
  expect(pulse.summary).toBe(
    `${pulse.service} is ${pulse.status} (pulse ${pulse.sequence})`,
  )

  const pulseDetails = page.getByRole("definition")

  await expect(page.getByRole("heading", { name: "Demo Pulse" })).toBeVisible()
  await expect(
    pulseDetails.getByText(pulse.service, { exact: true }),
  ).toBeVisible()
  await expect(
    pulseDetails.getByText(pulse.status, { exact: true }),
  ).toBeVisible()
  await expect(
    pulseDetails.getByText(String(pulse.sequence), { exact: true }),
  ).toBeVisible()
  await expect(page.getByText(pulse.summary, { exact: true })).toBeVisible()
})
