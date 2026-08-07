from sqlmodel import SQLModel

DEMO_SERVICE_NAME = "orqestra-demo"
DEMO_PULSE_SEQUENCE = 1


class DemoPulse(SQLModel):
    service: str
    status: str
    sequence: int


def build_demo_pulse() -> DemoPulse:
    """Build the canonical demo pulse response."""
    return DemoPulse(
        service=DEMO_SERVICE_NAME,
        status="ok",
        sequence=DEMO_PULSE_SEQUENCE,
    )
