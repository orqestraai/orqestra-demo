import axios from "axios"

import { ApiError } from "@/client"
import type { ApiRequestOptions } from "@/client/core/ApiRequestOptions"
import type { ApiResult } from "@/client/core/ApiResult"

export interface DemoPulse {
  service: string
  status: string
  sequence: number
  summary?: string | null
}

const PULSE_REQUEST: ApiRequestOptions = {
  method: "GET",
  url: "/api/v1/demo/pulse",
}

export async function fetchDemoPulse(): Promise<DemoPulse> {
  const token = localStorage.getItem("access_token")

  try {
    const response = await axios.get<DemoPulse>(PULSE_REQUEST.url, {
      baseURL: import.meta.env.VITE_API_URL,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })

    return response.data
  } catch (error) {
    throw toApiError(error)
  }
}

// Mirrors src/client/core/request.ts so a failed request rejects with the
// same ApiError shape the app-wide QueryCache.onError handler expects.
function toApiError(error: unknown): Error {
  if (!axios.isAxiosError(error) || !error.response) {
    return error instanceof Error
      ? error
      : new Error("Failed to load demo pulse")
  }

  const { status, statusText, data } = error.response
  const result: ApiResult = {
    url: error.config?.url ?? PULSE_REQUEST.url,
    ok: false,
    status,
    statusText,
    body: data,
  }

  return new ApiError(
    PULSE_REQUEST,
    result,
    `Request failed with status ${status}`,
  )
}
