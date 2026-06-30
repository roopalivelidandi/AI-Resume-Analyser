"""
project_service.py

Handles project creation and management.
"""
import shutil
from pathlib import Path


class ProjectService:

    PROJECTS_DIR = Path("projects")

    def __init__(self):
        self.PROJECTS_DIR.mkdir(exist_ok=True)

    def create_project(self, project_name):

        project_path = self.PROJECTS_DIR / project_name

        project_path.mkdir(exist_ok=True)

        (project_path / "data").mkdir(exist_ok=True)
        (project_path / "charts").mkdir(exist_ok=True)
        (project_path / "reports").mkdir(exist_ok=True)
        (project_path / "insights").mkdir(exist_ok=True)
        (project_path / "exports").mkdir(exist_ok=True)

        return project_path
    
    def save_dataset(self, uploaded_file, project_name):
        """
        Save uploaded dataset inside the project folder.
        """

        project_path = self.PROJECTS_DIR / project_name

        dataset_path = project_path / "data" / "dataset.csv"

        with open(dataset_path, "wb") as file:
            file.write(uploaded_file.getbuffer())

        return dataset_path

    def list_projects(self):

        return [
            folder.name
            for folder in self.PROJECTS_DIR.iterdir()
            if folder.is_dir()
        ]