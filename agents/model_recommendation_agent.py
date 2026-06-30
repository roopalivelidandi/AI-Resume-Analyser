import pandas as pd


class ModelRecommendationAgent:
    """Recommends suitable ML tasks and models."""

    def analyze(self, df):

        numeric_cols = df.select_dtypes(include="number").columns
        categorical_cols = df.select_dtypes(exclude="number").columns

        recommendation = {}

        # Detect date columns
        has_date = any(
            "date" in col.lower() or "time" in col.lower()
            for col in df.columns
        )

        if has_date:

            recommendation = {
                "task": "Time Series Forecasting",
                "models": [
                    "ARIMA",
                    "Prophet",
                    "LSTM"
                ],
                "reason": "Date/time columns detected."
            }

        elif len(categorical_cols) > len(numeric_cols):

            recommendation = {
                "task": "Classification",
                "models": [
                    "Random Forest",
                    "XGBoost",
                    "Logistic Regression"
                ],
                "reason": "Dataset contains several categorical features."
            }

        elif len(numeric_cols) >= 3:

            recommendation = {
                "task": "Regression",
                "models": [
                    "Linear Regression",
                    "Random Forest Regressor",
                    "XGBoost Regressor"
                ],
                "reason": "Dataset is primarily numerical."
            }

        else:

            recommendation = {
                "task": "Clustering",
                "models": [
                    "K-Means",
                    "DBSCAN",
                    "Hierarchical Clustering"
                ],
                "reason": "No obvious prediction target detected."
            }

        return recommendation