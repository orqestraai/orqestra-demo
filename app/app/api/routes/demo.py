from itertools import count

from fastapi import APIRouter

from app.api.deps import CurrentUser
from app.demo.pulse import DemoPulse, build_demo_pulse
from app.demo.pulse_summary import format_pulse_summary

router = APIRouter(prefix="/demo", tags=["demo"])

_pulse_sequence = count(1)


@router.get("/pulse", response_model=DemoPulse)
def read_pulse(_current_user: CurrentUser) -> DemoPulse:
    """
    Retrieve a demo pulse. Requires an authenticated user.
    """
    pulse = build_demo_pulse(sequence=next(_pulse_sequence))
    pulse.summary = format_pulse_summary(pulse)
    return pulse
