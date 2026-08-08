import axios from "axios"

import { OpenAPI } from "@/client"
import { ApiError } from "@/client/core/ApiError"

export const DEMO_PULSE_STATUS_OK = "ok" as const
export type DemoPulseStatus = typeof DEMO_PULSE_STATUS_OK | (string & {})

export type DemoPulse = {
  service: string
  status: DemoPulseStatus
  sequence: number
  summary?: string | null
}

const DEMO_PULSE_PATH = "/api/v1/demo/pulse"

export async function fetchDemoPulse(): Promise<DemoPulse> {
  const url = `${OpenAPI.BASE}${DEMO_PULSE_PATH}`
  try {
    const { data } = await axios.get<DemoPulse>(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token") ?? ""}`,
      },
    })
    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const response = error.response
      throw new ApiError(
        { method: "GET", url },
        {
          url,
          ok: false,
          status: response.status,
          statusText: response.statusText,
          body: response.data,
        },
        `Request failed with status ${response.status}`,
      )
    }
    throw error
  }
}
