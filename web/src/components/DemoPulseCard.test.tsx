import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { readDemoPulse } from "@/api/demoPulse"
import { DemoPulseCard } from "@/components/DemoPulseCard"

vi.mock("@/api/demoPulse", () => ({
  readDemoPulse: vi.fn(),
}))

const mockedReadDemoPulse = vi.mocked(readDemoPulse)

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

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe("DemoPulseCard", () => {
  it("renders the service, status, and sequence once the pulse loads", async () => {
    mockedReadDemoPulse.mockResolvedValue({
      service: "orqestra-demo",
      status: "ok",
      sequence: 7,
    })

    renderCard()

    expect(await screen.findByText("orqestra-demo")).toBeInTheDocument()
    expect(screen.getByText("ok")).toBeInTheDocument()
    expect(screen.getByText("7")).toBeInTheDocument()
  })

  it("exposes the loading state to assistive technology", () => {
    mockedReadDemoPulse.mockReturnValue(new Promise(() => {}))

    renderCard()

    expect(screen.getByRole("status")).toHaveTextContent("Loading demo pulse")
  })

  it("shows a visible error when the request fails", async () => {
    mockedReadDemoPulse.mockRejectedValue(new Error("network error"))

    renderCard()

    expect(await screen.findByText("Unable to load demo pulse")).toBeVisible()
  })
})
