from fastapi.testclient import TestClient

from app.core.config import settings
from app.demo.pulse import DEMO_SERVICE_NAME, DemoPulse, DemoPulseStatus
from app.demo.pulse_summary import format_pulse_summary


def test_read_pulse(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/demo/pulse",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["service"] == DEMO_SERVICE_NAME
    assert content["status"] == DemoPulseStatus.OK.value
    assert isinstance(content["sequence"], int)
    assert content["sequence"] > 0
    expected_pulse = DemoPulse(
        service=content["service"],
        status=DemoPulseStatus(content["status"]),
        sequence=content["sequence"],
    )
    assert content["summary"] == format_pulse_summary(expected_pulse)


def test_read_pulse_requires_authentication(client: TestClient) -> None:
    response = client.get(f"{settings.API_V1_STR}/demo/pulse")
    assert response.status_code == 401
