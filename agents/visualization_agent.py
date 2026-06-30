import pandas as pd
import plotly.express as px


class VisualizationAgent:
    """Automatically selects the most suitable visualization."""

    def generate_chart(self, df):

        numeric_cols = list(df.select_dtypes(include="number").columns)
        categorical_cols = list(df.select_dtypes(include=["object", "category"]).columns)

        # Detect date columns
        date_cols = [
            col for col in df.columns
            if "date" in col.lower() or "time" in col.lower()
        ]

        # ---------------------------------------------------
        # 1. Line Chart (Date + Numeric)
        # ---------------------------------------------------
        if date_cols and numeric_cols:

            date_col = date_cols[0]
            value_col = numeric_cols[0]

            try:
                temp = df.copy()
                temp[date_col] = pd.to_datetime(temp[date_col])

                fig = px.line(
                    temp.sort_values(date_col),
                    x=date_col,
                    y=value_col,
                    title=f"{value_col} over {date_col}"
                )

                return fig

            except Exception:
                pass

        # ---------------------------------------------------
        # 2. Scatter Plot (Two Numeric Columns)
        # ---------------------------------------------------
        if len(numeric_cols) >= 2:

            fig = px.scatter(
                df,
                x=numeric_cols[0],
                y=numeric_cols[1],
                title=f"{numeric_cols[0]} vs {numeric_cols[1]}"
            )

            return fig

        # ---------------------------------------------------
        # 3. Bar Chart (Categorical + Numeric)
        # ---------------------------------------------------
        if categorical_cols and numeric_cols:

            cat = categorical_cols[0]
            num = numeric_cols[0]

            summary = (
                df.groupby(cat)[num]
                .mean()
                .reset_index()
            )

            fig = px.bar(
                summary,
                x=cat,
                y=num,
                title=f"Average {num} by {cat}"
            )

            return fig

        # ---------------------------------------------------
        # 4. Histogram (Fallback)
        # ---------------------------------------------------
        if numeric_cols:

            fig = px.histogram(
                df,
                x=numeric_cols[0],
                title=f"Distribution of {numeric_cols[0]}"
            )

            return fig

        return None