from enum import Enum

from sqlmodel import SQLModel

DEMO_SERVICE_NAME = "orqestra-demo"


class DemoPulseStatus(str, Enum):
    OK = "ok"


class DemoPulse(SQLModel):
    service: str
    status: DemoPulseStatus
    sequence: int


def build_demo_pulse(sequence: int = 1) -> DemoPulse:
    """
    Build the demo pulse response for the ADR-121 fixture diamond.
    """
    return DemoPulse(
        service=DEMO_SERVICE_NAME, status=DemoPulseStatus.OK, sequence=sequence
    )
