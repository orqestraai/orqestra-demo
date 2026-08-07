from sqlmodel import Field, SQLModel


class DemoPulse(SQLModel):
    service: str = "orqestra-demo"
    status: str = "ok"
    sequence: int = Field(gt=0)


def build_demo_pulse(sequence: int = 1) -> DemoPulse:
    return DemoPulse(sequence=sequence)
