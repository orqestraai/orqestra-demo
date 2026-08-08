from app.demo.pulse import DemoPulse


def format_pulse_summary(pulse: DemoPulse) -> str:
    """
    Format the human-readable summary for a demo pulse (ADR-121 fixture diamond).
    """
    return f"{pulse.service} is {pulse.status.value} (pulse {pulse.sequence})"
