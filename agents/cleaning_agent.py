import pandas as pd


class CleaningAgent:
    """Analyzes dataset quality and suggests cleaning actions."""

    def analyze(self, df):

        suggestions = []

        total_rows = len(df)

        # -----------------------------
        # Missing Values
        # -----------------------------
        missing = df.isnull().sum()

        for column, count in missing.items():

            if count == 0:
                continue

            percentage = (count / total_rows) * 100

            if percentage > 50:
                recommendation = "Consider dropping this column (more than 50% missing)."

            elif pd.api.types.is_numeric_dtype(df[column]):
                recommendation = "Fill missing values using Median."

            else:
                recommendation = "Fill missing values using Mode."

            suggestions.append(
                {
                    "column": column,
                    "issue": f"{count} Missing Values ({percentage:.1f}%)",
                    "recommendation": recommendation,
                }
            )

        # -----------------------------
        # Duplicate Rows
        # -----------------------------
        duplicates = df.duplicated().sum()

        if duplicates > 0:
            suggestions.append(
                {
                    "column": "-",
                    "issue": f"{duplicates} Duplicate Rows",
                    "recommendation": "Remove duplicate records."
                }
            )

        # -----------------------------
        # Constant Columns
        # -----------------------------
        for column in df.columns:

            if df[column].nunique(dropna=False) == 1:

                suggestions.append(
                    {
                        "column": column,
                        "issue": "Constant Column",
                        "recommendation": "Remove this column because it has only one unique value."
                    }
                )

        # -----------------------------
        # Identifier Columns
        # -----------------------------
        for column in df.columns:

            if df[column].nunique() == total_rows:

                suggestions.append(
                    {
                        "column": column,
                        "issue": "Possible Identifier",
                        "recommendation": "This column appears to be a unique ID. Exclude it from model training if appropriate."
                    }
                )

        # -----------------------------
        # Numeric Stored as Text
        # -----------------------------
        for column in df.select_dtypes(include="object").columns:

            sample = df[column].dropna().astype(str).head(20)

            if len(sample) == 0:
                continue

            numeric_like = sample.str.replace(".", "", regex=False).str.isdigit()

            if numeric_like.all():

                suggestions.append(
                    {
                        "column": column,
                        "issue": "Numeric Values Stored as Text",
                        "recommendation": "Convert this column to a numeric datatype."
                    }
                )

        return suggestions