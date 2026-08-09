from enum import Enum

from sqlmodel import SQLModel

DEMO_SERVICE_NAME = "orqestra-demo"


class DemoPulseStatus(str, Enum):
    OK = "ok"


class DemoPulse(SQLModel):
    service: str
    status: DemoPulseStatus
    sequence: int
    summary: str | None = None


def build_demo_pulse() -> DemoPulse:
    """Build the canonical demo pulse payload."""
    return DemoPulse(service=DEMO_SERVICE_NAME, status=DemoPulseStatus.OK, sequence=1)
