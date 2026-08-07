from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.demo.pulse import DemoPulse, build_demo_pulse, next_pulse_sequence

router = APIRouter(
    prefix="/demo", tags=["demo"], dependencies=[Depends(get_current_user)]
)


@router.get("/pulse", response_model=DemoPulse)
def read_pulse() -> DemoPulse:
    """
    Report a demo service pulse for downstream fixture tickets.
    """
    return build_demo_pulse(next_pulse_sequence())
