"""
upload_service.py

Handles dataset upload operations for DataPilot AI.
"""

from pathlib import Path
import pandas as pd


class UploadService:

    SUPPORTED_EXTENSIONS = {".csv"}

    def validate_file(self, uploaded_file):

        filename = getattr(
            uploaded_file,
            "filename",
            getattr(uploaded_file, "name", "")
        )

        extension = Path(filename).suffix.lower()

        if extension not in self.SUPPORTED_EXTENSIONS:
            raise ValueError(
                f"Unsupported file type: {extension}"
            )

        return True

    def load_dataset(self, uploaded_file):

        self.validate_file(uploaded_file)

        file_object = getattr(
            uploaded_file,
            "file",
            uploaded_file
        )

        dataframe = pd.read_csv(file_object)

        return dataframe