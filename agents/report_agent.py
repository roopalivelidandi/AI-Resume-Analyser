class ReportAgent:
    """Generates an analysis report."""

    def generate(
        self,
        profile,
        insights,
        cleaning_suggestions,
        model_recommendation,
    ):

        report = []

        report.append("===== DATAPILOT AI REPORT =====\n")

        report.append(
            f"Rows : {profile['rows']}"
        )

        report.append(
            f"Columns : {profile['columns']}"
        )

        report.append(
            f"Missing Values : {profile['missing_values']}"
        )

        report.append(
            f"Duplicates : {profile['duplicates']}"
        )

        report.append(
            f"Quality Score : {profile['quality_score']}%"
        )

        report.append("\nAI INSIGHTS\n")

        for item in insights:
            report.append(f"- {item}")

        report.append("\nCLEANING SUGGESTIONS\n")

        if cleaning_suggestions:

            for item in cleaning_suggestions:

                report.append(
                    f"- {item['column']} : {item['recommendation']}"
                )

        else:

            report.append(
                "No cleaning suggestions."
            )

            
        report.append("\nMODEL RECOMMENDATION\n")

        report.append(
            f"Recommended Task : {model_recommendation['task']}"
        )

        report.append(
            f"Reason : {model_recommendation['reason']}"
        )

        report.append("\nSuggested Models")

        for model in model_recommendation["models"]:
            report.append(f"- {model}")


        return "\n".join(report)