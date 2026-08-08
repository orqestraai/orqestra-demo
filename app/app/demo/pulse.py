from pydantic import BaseModel

DEMO_SERVICE_NAME = "orqestra-demo"
DEMO_PULSE_STATUS = "ok"


class DemoPulse(BaseModel):
    service: str
    status: str
    sequence: int
    summary: str | None = None


def build_demo_pulse(sequence: int = 1) -> DemoPulse:
    """
    Build the canonical demo pulse response.
    """
    return DemoPulse(
        service=DEMO_SERVICE_NAME,
        status=DEMO_PULSE_STATUS,
        sequence=sequence,
    )
