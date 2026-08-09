from fastapi.testclient import TestClient

from app.core.config import settings
from app.demo.pulse import DemoPulseStatus


def test_read_pulse_authenticated(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/demo/pulse",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["service"] == "orqestra-demo"
    assert content["status"] == DemoPulseStatus.OK
    assert isinstance(content["sequence"], int)
    assert content["sequence"] > 0
    assert content["summary"] == f"orqestra-demo is ok (pulse {content['sequence']})"


def test_read_pulse_requires_authentication(client: TestClient) -> None:
    response = client.get(f"{settings.API_V1_STR}/demo/pulse")
    assert response.status_code == 401
