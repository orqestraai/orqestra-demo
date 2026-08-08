from app.demo.pulse import DemoPulse


def format_pulse_summary(pulse: DemoPulse) -> str:
    """Build the human-readable summary for a demo pulse."""
    return f"{pulse.service} is {pulse.status} (pulse {pulse.sequence})"
