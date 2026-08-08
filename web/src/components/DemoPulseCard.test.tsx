import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { fetchDemoPulse } from "@/api/demoPulse"
import { DemoPulseCard } from "./DemoPulseCard"

vi.mock("@/api/demoPulse", () => ({
  fetchDemoPulse: vi.fn(),
}))

const mockedFetchDemoPulse = vi.mocked(fetchDemoPulse)

function renderWithQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <DemoPulseCard />
    </QueryClientProvider>,
  )
}

describe("DemoPulseCard", () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it("shows an accessible loading state while the pulse request is pending", () => {
    mockedFetchDemoPulse.mockReturnValue(new Promise(() => {}))

    renderWithQueryClient()

    expect(screen.getByRole("status").textContent).toBe("Loading demo pulse")
  })

  it("renders the service, status, and sequence once the pulse loads", async () => {
    mockedFetchDemoPulse.mockResolvedValue({
      service: "orqestra-demo",
      status: "ok",
      sequence: 1,
      summary: "orqestra-demo is ok at sequence 1",
    })

    renderWithQueryClient()

    await waitFor(() => {
      expect(screen.getByText("orqestra-demo")).toBeDefined()
    })
    expect(screen.getByText("ok")).toBeDefined()
    expect(screen.getByText("Sequence #1")).toBeDefined()
  })

  it("shows a visible failure message when the pulse request rejects", async () => {
    mockedFetchDemoPulse.mockRejectedValue(new Error("network error"))

    renderWithQueryClient()

    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toBe(
        "Unable to load demo pulse",
      )
    })
  })
})
