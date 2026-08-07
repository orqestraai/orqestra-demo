from itertools import count

from fastapi import APIRouter

from app.api.deps import CurrentUser
from app.demo.pulse import DemoPulse, build_demo_pulse

router = APIRouter(prefix="/demo", tags=["demo"])

_pulse_sequence = count(1)


@router.get("/pulse", response_model=DemoPulse)
def read_pulse(_current_user: CurrentUser) -> DemoPulse:
    """
    Retrieve a demo pulse. Requires an authenticated user.
    """
    return build_demo_pulse(sequence=next(_pulse_sequence))
