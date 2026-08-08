import { useQuery } from "@tanstack/react-query"

import { fetchDemoPulse } from "@/api/demoPulse"
import { Alert, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DemoPulseCard() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["demo-pulse"],
    queryFn: fetchDemoPulse,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo Pulse</CardTitle>
        <CardDescription>Live status from the backend fixture</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <output className="flex flex-col gap-2">
            <span className="sr-only">Loading demo pulse</span>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </output>
        ) : isError ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load demo pulse</AlertTitle>
          </Alert>
        ) : (
          <dl className="grid gap-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Service</dt>
              <dd className="font-medium">{data.service}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium">{data.status}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Sequence</dt>
              <dd className="font-medium">{data.sequence}</dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  )
}

export default DemoPulseCard
