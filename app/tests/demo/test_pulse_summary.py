from app.demo.pulse import build_demo_pulse
from app.demo.pulse_summary import format_pulse_summary


def test_format_pulse_summary_returns_human_readable_text() -> None:
    pulse = build_demo_pulse(sequence=7)

    summary = format_pulse_summary(pulse)

    assert summary == "orqestra-demo is ok (pulse 7)"
