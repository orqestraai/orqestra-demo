from fastapi import APIRouter

from app.api.deps import CurrentUser
from app.demo.pulse import DemoPulse, build_demo_pulse

router = APIRouter(prefix="/demo", tags=["demo"])


@router.get("/pulse", response_model=DemoPulse)
def read_pulse(_current_user: CurrentUser) -> DemoPulse:
    """
    Report the demo service pulse for the authenticated user.
    """
    return build_demo_pulse()
