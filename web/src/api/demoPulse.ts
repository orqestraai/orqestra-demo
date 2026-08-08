import axios from "axios"

import { OpenAPI } from "@/client"

export type DemoPulse = {
  service: string
  status: string
  sequence: number
  summary?: string | null
}

export async function fetchDemoPulse(): Promise<DemoPulse> {
  const { data } = await axios.get<DemoPulse>(
    `${OpenAPI.BASE}/api/v1/demo/pulse`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token") ?? ""}`,
      },
    },
  )
  return data
}
