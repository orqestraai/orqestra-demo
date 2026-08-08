import { useQuery } from "@tanstack/react-query"

import { readDemoPulse } from "@/api/demoPulse"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DemoPulseCard() {
  const {
    data: pulse,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["demo-pulse"],
    queryFn: readDemoPulse,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo Pulse</CardTitle>
        <CardDescription>Live status from the backend</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending && (
          <output className="flex flex-col gap-2">
            <span className="sr-only">Loading demo pulse</span>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </output>
        )}

        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Unable to load demo pulse</AlertTitle>
            <AlertDescription>
              The demo pulse request failed. Try refreshing the page.
            </AlertDescription>
          </Alert>
        )}

        {pulse && (
          <dl className="flex flex-col gap-1 text-sm">
            <div className="flex gap-1">
              <dt className="font-medium">Service:</dt>
              <dd>{pulse.service}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-medium">Status:</dt>
              <dd>{pulse.status}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-medium">Sequence:</dt>
              <dd>{pulse.sequence}</dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  )
}

export default DemoPulseCard
