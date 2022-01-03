import os
import tempfile

import pytest

from server import app

@pytest.fixture
def client():
    app.config()