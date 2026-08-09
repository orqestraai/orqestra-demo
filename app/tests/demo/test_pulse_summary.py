from app.demo.pulse import build_demo_pulse
from app.demo.pulse_summary import format_pulse_summary


def test_format_pulse_summary_returns_exact_text() -> None:
    pulse = build_demo_pulse()

    summary = format_pulse_summary(pulse)

    assert summary == "orqestra-demo is ok (pulse 1)"
