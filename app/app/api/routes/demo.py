from fastapi import APIRouter

from app.api.deps import CurrentUser
from app.demo.pulse import DemoPulse, build_demo_pulse
from app.demo.pulse_summary import format_pulse_summary

router = APIRouter(prefix="/demo", tags=["demo"])


@router.get("/pulse", response_model=DemoPulse)
def read_pulse(_current_user: CurrentUser) -> DemoPulse:
    """
    Get the demo service pulse.
    """
    pulse = build_demo_pulse()
    return pulse.model_copy(update={"summary": format_pulse_summary(pulse)})
