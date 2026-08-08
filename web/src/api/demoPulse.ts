import { OpenAPI } from "@/client"

export interface DemoPulse {
  service: string
  status: string
  sequence: number
  summary?: string | null
}

export async function readDemoPulse(): Promise<DemoPulse> {
  const token = localStorage.getItem("access_token")

  const response = await fetch(`${OpenAPI.BASE}/api/v1/demo/pulse`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  if (!response.ok) {
    throw new Error(`Failed to load demo pulse: ${response.status}`)
  }

  return response.json() as Promise<DemoPulse>
}
