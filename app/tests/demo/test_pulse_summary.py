from app.demo.pulse import build_pulse
from app.demo.pulse_summary import format_pulse_summary


def test_format_pulse_summary_returns_canonical_text() -> None:
    pulse = build_pulse(sequence=7)
    assert format_pulse_summary(pulse) == "orqestra-demo is ok (pulse 7)"
