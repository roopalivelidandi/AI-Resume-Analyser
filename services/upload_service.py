"""
upload_service.py

Handles dataset upload operations for DataPilot AI.
"""

from pathlib import Path
import pandas as pd


class UploadService:
    """Service responsible for dataset uploads."""

    SUPPORTED_EXTENSIONS = {".csv"}

    def validate_file(self, uploaded_file):
        """Validate the uploaded file."""

        extension = Path(uploaded_file.name).suffix.lower()

        if extension not in self.SUPPORTED_EXTENSIONS:
            raise ValueError(
                f"Unsupported file type: {extension}"
            )

        return True

    def load_dataset(self, uploaded_file):
        """Load a CSV file into a pandas DataFrame."""

        self.validate_file(uploaded_file)

        dataframe = pd.read_csv(uploaded_file)

        return dataframe