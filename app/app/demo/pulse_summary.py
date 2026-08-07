from app.demo.pulse import DemoPulse


def format_pulse_summary(pulse: DemoPulse) -> str:
    return f"{pulse.service} is {pulse.status} (pulse {pulse.sequence})"
