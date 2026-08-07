from enum import Enum
from typing import Final

from sqlmodel import Field, SQLModel

DEMO_SERVICE_NAME: Final[str] = "orqestra-demo"


class DemoPulseStatus(str, Enum):
    OK = "ok"


class DemoPulse(SQLModel):
    service: str = DEMO_SERVICE_NAME
    status: DemoPulseStatus = DemoPulseStatus.OK
    sequence: int = Field(gt=0)


def build_demo_pulse(sequence: int = 1) -> DemoPulse:
    return DemoPulse(sequence=sequence)
