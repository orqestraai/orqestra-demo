import { afterEach, describe, expect, it, vi } from "vitest"

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}))

vi.mock("axios", async () => {
  const actual = await vi.importActual<typeof import("axios")>("axios")
  return {
    ...actual,
    default: {
      ...actual.default,
      get: getMock,
    },
  }
})

import { ApiError } from "@/client"
import { fetchDemoPulse } from "./demoPulse"

afterEach(() => {
  getMock.mockReset()
  localStorage.clear()
})

describe("fetchDemoPulse", () => {
  it("resolves with the pulse payload on success", async () => {
    getMock.mockResolvedValue({
      data: { service: "orqestra-demo", status: "ok", sequence: 3 },
    })

    await expect(fetchDemoPulse()).resolves.toEqual({
      service: "orqestra-demo",
      status: "ok",
      sequence: 3,
    })
  })

  it("rejects with an ApiError carrying status 401 so the app-wide session handler fires", async () => {
    const axiosError = Object.assign(
      new Error("Request failed with status code 401"),
      {
        isAxiosError: true,
        response: {
          status: 401,
          statusText: "Unauthorized",
          data: { detail: "Not authenticated" },
        },
        config: { url: "/api/v1/demo/pulse" },
        toJSON: () => ({}),
      },
    )
    getMock.mockRejectedValue(axiosError)

    const error = await fetchDemoPulse().catch((err) => err)

    expect(error).toBeInstanceOf(ApiError)
    expect((error as ApiError).status).toBe(401)
  })
})
