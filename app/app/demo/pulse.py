from sqlmodel import Field, SQLModel

SERVICE_NAME = "orqestra-demo"
STATUS_OK = "ok"


class DemoPulse(SQLModel):
    service: str
    status: str
    sequence: int = Field(gt=0)
    summary: str | None = None


def build_demo_pulse(sequence: int) -> DemoPulse:
    return DemoPulse(service=SERVICE_NAME, status=STATUS_OK, sequence=sequence)
