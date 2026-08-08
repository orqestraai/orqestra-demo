import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { DemoPulseCard } from "./DemoPulseCard"

const { fetchDemoPulse } = vi.hoisted(() => ({
  fetchDemoPulse: vi.fn(),
}))

vi.mock("@/api/demoPulse", () => ({
  fetchDemoPulse,
}))

function renderCard() {
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
  it("exposes an accessible loading state while the pulse request is pending", () => {
    fetchDemoPulse.mockReturnValue(new Promise(() => {}))

    renderCard()

    expect(screen.getByRole("status").textContent).toContain(
      "Loading demo pulse",
    )
  })

  it("renders the service, status, and sequence once the pulse loads", async () => {
    fetchDemoPulse.mockResolvedValue({
      service: "orqestra-demo",
      status: "ok",
      sequence: 7,
    })

    renderCard()

    await waitFor(() => {
      expect(screen.getByText("orqestra-demo")).toBeTruthy()
    })
    expect(screen.getByText("ok")).toBeTruthy()
    expect(screen.getByText("7")).toBeTruthy()
  })

  it("shows a visible message when the pulse request fails", async () => {
    fetchDemoPulse.mockRejectedValue(new Error("network error"))

    renderCard()

    await waitFor(() => {
      expect(screen.getByText("Unable to load demo pulse")).toBeTruthy()
    })
  })
})
