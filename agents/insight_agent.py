import pandas as pd
import numpy as np


class InsightAgent:
    """Generates intelligent insights from the dataset."""

    def run(self, df, profile):

        insights = []

        # Dataset size
        insights.append(
            f"📊 Dataset contains {profile['rows']} rows and {profile['columns']} columns."
        )

        # Missing values
        if profile["missing_values"] == 0:
            insights.append(
                "✅ Excellent! No missing values were detected."
            )
        else:
            missing = df.isnull().sum()
            column = missing.idxmax()

            insights.append(
                f"⚠ Most missing values are in '{column}'."
            )

        # Duplicates
        if profile["duplicates"] > 0:
            insights.append(
                f"⚠ {profile['duplicates']} duplicate rows should be reviewed."
            )
        else:
            insights.append(
                "✅ No duplicate rows found."
            )

        #Data Quality Summary
        quality = profile["quality_score"]

        if quality >= 90:
            insights.append(
                "🌟 Overall dataset quality is excellent and requires minimal cleaning."
            )

        elif quality >= 70:
            insights.append(
                "👍 Dataset quality is good with a few recommended cleaning steps."
            )

        else:
            insights.append(
                "🛠 Dataset needs cleaning before reliable analysis."
            )

        #date Detection
        date_columns = [
            col for col in df.columns
            if "date" in col.lower()
            or "time" in col.lower()
        ]
        if date_columns:
            insights.append(
                f"📅 Date/time related columns detected: {', '.join(date_columns)}."
            )

        #Identifier Detection
        for col in df.columns:

            if df[col].nunique() == len(df):

                insights.append(
                    f"🆔 '{col}' appears to uniquely identify each record."
                )

        # Numeric columns
        numeric = df.select_dtypes(include="number").columns

        insights.append(
            f"📈 {len(numeric)} numerical columns detected."
        )

        # Categorical columns
        categorical = df.select_dtypes(exclude="number").columns

        insights.append(
            f"📝 {len(categorical)} categorical columns detected."
        )
    
        # Constant Columns
        constant_cols = [
            col for col in df.columns
            if df[col].nunique(dropna=False) == 1
        ]

        if constant_cols:
            insights.append(
                f"📌 Constant columns detected: {', '.join(constant_cols)}"
            )

        # High Missing Percentage
        missing_percent = (df.isnull().sum() / len(df)) * 100

        for col, percent in missing_percent.items():
            if percent >= 50:
                insights.append(
                    f"⚠ '{col}' has {percent:.1f}% missing values."
                )

        # Strong Correlations
        numeric_df = df.select_dtypes(include=np.number)

        if numeric_df.shape[1] >= 2:

            corr = numeric_df.corr().abs()

            for i in range(len(corr.columns)):
                for j in range(i + 1, len(corr.columns)):

                    value = corr.iloc[i, j]

                    if value >= 0.85:

                        insights.append(
                            f"📈 Strong correlation: "
                            f"{corr.columns[i]} ↔ {corr.columns[j]} "
                            f"({value:.2f})"
                        )

        # High Cardinality Columns
        for col in df.select_dtypes(include="object"):

            unique = df[col].nunique()

            if unique > len(df) * 0.5:

                insights.append(
                    f"🔑 '{col}' contains many unique values ({unique})."
                )

        # Skewed Numeric Columns
        for col in numeric_df.columns:

            skew = numeric_df[col].skew()

            if abs(skew) > 1:

                direction = "right" if skew > 0 else "left"

                insights.append(
                    f"📊 '{col}' is {direction}-skewed (skew={skew:.2f})."
                )
        return insights