from agents.profile_agent import ProfileAgent
from agents.visualization_agent import VisualizationAgent
from agents.insight_agent import InsightAgent
from agents.cleaning_agent import CleaningAgent
from agents.report_agent import ReportAgent
from agents.model_recommendation_agent import ModelRecommendationAgent


class ManagerAgent:

    def __init__(self):
        self.profile_agent = ProfileAgent()
        self.visualization_agent = VisualizationAgent()
        self.insight_agent = InsightAgent()
        self.cleaning_agent = CleaningAgent()
        self.report_agent = ReportAgent()
        self.model_recommendation_agent = ModelRecommendationAgent()
    def run(self, df):

        logs = []

        logs.append("🚀 Manager Agent Started")

        # Profile Agent
        profile = self.profile_agent.analyze(df)

        logs.append("✅ Profile Agent Completed")

        # Visualization Agent
        chart = self.visualization_agent.generate_chart(df)

        logs.append("✅ Visualization Agent Completed")

        # Insight Agent
        insights = self.insight_agent.run(df, profile)

        logs.append("✅ Insight Agent Completed")

        # Cleaning Agent
        cleaning_suggestions = self.cleaning_agent.analyze(df)

        logs.append("✅ Cleaning Agent Completed")

        # Model Recommendation Agent
        model_recommendation = self.model_recommendation_agent.analyze(df)

        logs.append("✅ Model Recommendation Agent Completed")

        #report agent
        report = self.report_agent.generate(
            profile,
            insights,
            cleaning_suggestions,
            model_recommendation
        )

        logs.append("✅ Report Agent Completed")

        return profile, chart, logs, insights, cleaning_suggestions, model_recommendation, report
    
    