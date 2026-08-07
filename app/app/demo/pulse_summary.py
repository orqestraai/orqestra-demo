from app.demo.pulse import DemoPulse


def format_pulse_summary(pulse: DemoPulse) -> str:
    return f"{pulse.service} is {pulse.status.value} (pulse {pulse.sequence})"
