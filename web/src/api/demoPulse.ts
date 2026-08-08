import axios from "axios"

export interface DemoPulse {
  service: string
  status: string
  sequence: number
  summary?: string | null
}

export async function fetchDemoPulse(): Promise<DemoPulse> {
  const token = localStorage.getItem("access_token")

  const response = await axios.get<DemoPulse>("/api/v1/demo/pulse", {
    baseURL: import.meta.env.VITE_API_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  return response.data
}
