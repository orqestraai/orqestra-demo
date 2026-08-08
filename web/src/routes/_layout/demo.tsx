import { createFileRoute } from "@tanstack/react-router"

import { DemoPulseCard } from "@/components/DemoPulseCard"

export const Route = createFileRoute("/_layout/demo")({
  component: Demo,
  head: () => ({
    meta: [
      {
        title: "Demo Pulse - FastAPI Cloud",
      },
    ],
  }),
})

function Demo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Demo Pulse</h1>
        <p className="text-muted-foreground">
          Live status from the demo backend service
        </p>
      </div>
      <DemoPulseCard />
    </div>
  )
}

export default Demo
