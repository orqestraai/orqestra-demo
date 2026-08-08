import { useQuery } from "@tanstack/react-query"

import { DEMO_PULSE_STATUS_OK, fetchDemoPulse } from "@/api/demoPulse"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function demoPulseQueryOptions() {
  return {
    queryKey: ["demo-pulse"],
    queryFn: fetchDemoPulse,
  }
}

export function DemoPulseCard() {
  const { data, isPending, isError } = useQuery(demoPulseQueryOptions())

  if (isPending) {
    return (
      <Card>
        <CardContent>
          <output>Loading demo pulse</output>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardContent>
          <p role="alert">Unable to load demo pulse</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.service}</CardTitle>
        <CardDescription>Sequence #{data.sequence}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge
          variant={
            data.status === DEMO_PULSE_STATUS_OK ? "default" : "destructive"
          }
        >
          {data.status}
        </Badge>
        {data.summary ? <p>{data.summary}</p> : null}
      </CardContent>
    </Card>
  )
}

export default DemoPulseCard
