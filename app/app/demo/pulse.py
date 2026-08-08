from sqlmodel import SQLModel


class DemoPulse(SQLModel):
    service: str
    status: str
    sequence: int


def build_demo_pulse(sequence: int = 1) -> DemoPulse:
    """
    Build the demo pulse response for the ADR-121 fixture diamond.
    """
    return DemoPulse(service="orqestra-demo", status="ok", sequence=sequence)
