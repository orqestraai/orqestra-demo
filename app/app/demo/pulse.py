from typing import Literal

from sqlmodel import SQLModel

DEMO_SERVICE_NAME = "orqestra-demo"
DEMO_PULSE_SEQUENCE = 1
DEMO_PULSE_STATUS_OK = "ok"


class DemoPulse(SQLModel):
    service: str
    status: Literal["ok"]
    sequence: int


def build_demo_pulse() -> DemoPulse:
    """Build the canonical demo pulse response."""
    return DemoPulse(
        service=DEMO_SERVICE_NAME,
        status=DEMO_PULSE_STATUS_OK,
        sequence=DEMO_PULSE_SEQUENCE,
    )
