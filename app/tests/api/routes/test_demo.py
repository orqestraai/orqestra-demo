from fastapi.testclient import TestClient

from app.core.config import settings
from app.demo.pulse import DEMO_SERVICE_NAME, DemoPulseStatus


def test_read_pulse_authenticated(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/demo/pulse",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["service"] == DEMO_SERVICE_NAME
    assert content["status"] == DemoPulseStatus.OK
    assert content["sequence"] > 0


def test_read_pulse_requires_authentication(client: TestClient) -> None:
    response = client.get(f"{settings.API_V1_STR}/demo/pulse")
    assert response.status_code == 401
