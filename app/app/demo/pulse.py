from sqlmodel import SQLModel

DEMO_SERVICE_NAME = "orqestra-demo"


class DemoPulse(SQLModel):
    service: str
    status: str
    sequence: int


def build_demo_pulse() -> DemoPulse:
    """Build the canonical demo pulse payload."""
    return DemoPulse(service=DEMO_SERVICE_NAME, status="ok", sequence=1)
