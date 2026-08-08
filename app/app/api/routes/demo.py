from fastapi import APIRouter

from app.api.deps import CurrentUser
from app.demo.pulse import DemoPulse, build_demo_pulse
from app.demo.pulse_summary import format_pulse_summary

router = APIRouter(prefix="/demo", tags=["demo"])


@router.get("/pulse", response_model=DemoPulse)
def read_pulse(_current_user: CurrentUser) -> DemoPulse:
    """
    Get demo pulse status.
    """
    pulse = build_demo_pulse()
    pulse.summary = format_pulse_summary(pulse)
    return pulse
