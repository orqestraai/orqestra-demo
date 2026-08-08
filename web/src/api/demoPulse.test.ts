import axios from "axios"
import { afterEach, describe, expect, it, vi } from "vitest"

import { ApiError } from "@/client/core/ApiError"
import { fetchDemoPulse } from "./demoPulse"

vi.mock("axios", async (importOriginal) => {
  const actual = await importOriginal<typeof import("axios")>()
  return {
    default: {
      ...actual.default,
      get: vi.fn(),
    },
  }
})

const mockedGet = vi.mocked(axios.get)

describe("fetchDemoPulse", () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it("translates a 401 axios rejection into an ApiError so the global auth handler fires", async () => {
    mockedGet.mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 401,
        statusText: "Unauthorized",
        data: { detail: "Not authenticated" },
      },
    })

    await expect(fetchDemoPulse()).rejects.toBeInstanceOf(ApiError)
    await expect(fetchDemoPulse()).rejects.toMatchObject({ status: 401 })
  })
})
