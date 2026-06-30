"""
analysis_service.py

Coordinates the AI analysis workflow.
"""

from agents.manager_agent import ManagerAgent


class AnalysisService:
    """Service responsible for running the AI analysis."""

    def __init__(self):
        self.manager = ManagerAgent()

    def analyze(self, dataframe):
        """
        Analyze the uploaded dataset.

        Returns:
            profile, chart, logs, insights, cleaning_suggestions,report
        """
        (
        profile,
        chart,
        logs,
        insights,
        cleaning_suggestions,
        model_recommendation,
        report
        ) = self.manager.run(dataframe)

        return (
            profile,
            chart,
            logs,
            insights,
            cleaning_suggestions,
            model_recommendation,
            report
        )