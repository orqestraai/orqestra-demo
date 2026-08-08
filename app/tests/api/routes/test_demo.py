from fastapi.testclient import TestClient

from app.core.config import settings
from app.demo.pulse import build_demo_pulse
from app.demo.pulse_summary import format_pulse_summary


def test_read_pulse_authenticated(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/demo/pulse",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["service"] == "orqestra-demo"
    assert content["status"] == "ok"
    assert isinstance(content["sequence"], int)
    assert content["sequence"] > 0
    assert content["summary"] is not None
    assert content["summary"] == f"orqestra-demo is ok (pulse {content['sequence']})"


def test_read_pulse_summary_matches_formatter(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/demo/pulse",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    expected = format_pulse_summary(build_demo_pulse(sequence=content["sequence"]))
    assert content["summary"] == expected


def test_read_pulse_requires_authentication(client: TestClient) -> None:
    response = client.get(f"{settings.API_V1_STR}/demo/pulse")
    assert response.status_code == 401
