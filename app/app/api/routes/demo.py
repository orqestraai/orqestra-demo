from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.demo.pulse import DemoPulse, build_demo_pulse

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
    return build_demo_pulse()
