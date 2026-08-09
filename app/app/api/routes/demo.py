from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.demo.pulse import DemoPulse, build_demo_pulse
from app.demo.pulse_summary import format_pulse_summary

router = APIRouter(prefix="/demo", tags=["demo"])


@router.get(
    "/pulse",
    response_model=DemoPulse,
    dependencies=[Depends(get_current_user)],
)
def read_pulse() -> DemoPulse:
    """
    Get the demo service pulse.
    """
    pulse = build_demo_pulse()
    pulse.summary = format_pulse_summary(pulse)
    return pulse
