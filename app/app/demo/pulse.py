from sqlmodel import SQLModel

DEMO_SERVICE_NAME = "orqestra-demo"
DEMO_STATUS_OK = "ok"


class DemoPulse(SQLModel):
    service: str
    status: str
    sequence: int
    summary: str | None = None


def build_pulse(sequence: int = 1) -> DemoPulse:
    """Build the canonical demo pulse response for a given sequence number."""
    if sequence <= 0:
        raise ValueError("sequence must be a positive integer")
    return DemoPulse(
        service=DEMO_SERVICE_NAME, status=DEMO_STATUS_OK, sequence=sequence
    )
