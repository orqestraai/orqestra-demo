import itertools

from sqlmodel import SQLModel

DEMO_SERVICE_NAME = "orqestra-demo"
DEMO_STATUS_OK = "ok"

_sequence_counter = itertools.count(start=1)


class DemoPulse(SQLModel):
    service: str
    status: str
    sequence: int


def next_pulse_sequence() -> int:
    return next(_sequence_counter)


def build_demo_pulse(sequence: int) -> DemoPulse:
    return DemoPulse(
        service=DEMO_SERVICE_NAME, status=DEMO_STATUS_OK, sequence=sequence
    )
