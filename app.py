import streamlit as st
import pandas as pd
import time

from agents.manager_agent import ManagerAgent
from services.upload_service import UploadService
from services.analysis_service import AnalysisService
from utils.constants import APP_NAME, APP_TAGLINE


st.set_page_config(
    page_title="DataPilot AI",
    layout="wide"
)

st.title(f"🚀 {APP_NAME}")
st.caption(APP_TAGLINE)

st.markdown("""
Upload a dataset and let a team of AI agents:

-  Analyze your data
-  Detect data quality issues
-  Generate visualizations
-  Recommend machine learning models
-  Create reports
""")

from services.project_service import ProjectService

project_service = ProjectService()

project_name = st.text_input(
    "📁 Project Name",
    placeholder="Example: Sales Analysis"
)

uploaded_file = st.file_uploader(
    "Upload a CSV file",
    type=["csv"]
)

if uploaded_file and project_name:

    project_service.create_project(project_name)

    project_service.save_dataset(
    uploaded_file,
    project_name
    )

    st.success("✅ File uploaded successfully!")

    col1, col2 = st.columns(2)

    with col1:
        st.write(f"**Filename:** {uploaded_file.name}")

    with col2:
        file_size = uploaded_file.size / 1024
        st.write(f"**Size:** {file_size:.2f} KB")

    with st.spinner("🤖 AI Agents are analyzing your dataset..."):
        time.sleep(1)



    upload_service = UploadService()

    df = upload_service.load_dataset(uploaded_file)


    analysis_service = AnalysisService()

    profile, chart, logs, insights, cleaning_suggestions, model_recommendation, report = analysis_service.analyze(df)


    st.success("🎉 Dataset analyzed successfully!")


    st.subheader("🤖 AI Analysis Summary")

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("Quality Score", f"{profile['quality_score']}%")

    with col2:
        st.metric(
            "Recommended Task",
            model_recommendation["task"]
        )

    with col3:
        st.metric(
            "Insights",
            len(insights)
        )

    status = (
        "✅ Ready for Machine Learning"
        if profile["quality_score"] >= 70
        else "⚠ Needs Cleaning"
    )

    st.info(status)

    st.divider()

    st.info(
        f"""
    **Dataset:** {uploaded_file.name}

    Rows: **{profile['rows']}**

    Columns: **{profile['columns']}**
    """
    )

    st.subheader(" Dataset Summary")

    st.divider()

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric(
        label="📄 Rows",
        value=profile["rows"]
        )
        st.metric(
        label="🧩 Columns",
        value=profile["columns"]
)

    with col2:
        st.metric(
        label="⚠ Missing",
        value=profile["missing_values"]
 )
        st.metric(
    label="📋 Duplicates",
    value=profile["duplicates"]
        )
    with col3:

        st.metric(
    "Data Quality Score",
    f"{profile['quality_score']}%"
    )

    st.progress(profile["quality_score"] / 100)


    if profile["quality_score"] >= 90:
        st.success("Excellent Dataset ✅")

    elif profile["quality_score"] >= 70:
        st.warning("Good Dataset ⚠")

    else:
        st.error("Poor Dataset ❌")

    st.subheader(" Agent Activity")

    st.divider()

    for log in logs:
        st.success(log)

    st.subheader("💡 AI Insights")

    for index, insight in enumerate(insights, start=1):
        st.info(f"**Insight {index}**\n\n{insight}")

    st.subheader("🧹 Cleaning Suggestions")

    if cleaning_suggestions:

        cleaning_df = pd.DataFrame(cleaning_suggestions)

        st.dataframe(
            cleaning_df,
            use_container_width=True
        )

    else:

        st.success("🎉 No cleaning suggestions found.")


    st.subheader("🤖 Model Recommendation")

    st.success(f"Recommended Task: {model_recommendation['task']}")

    st.write("### Suggested Models")

    for model in model_recommendation["models"]:
        st.write(f"✅ {model}")

    st.info(model_recommendation["reason"])



    st.subheader("Smart Visualization")

    st.divider()

    if chart:
        st.plotly_chart(
            chart,
            use_container_width=True
        )
        with st.expander("📈 Visualization Details"):

            st.write("""
                This visualization was automatically selected by the
                Visualization Agent based on the structure and data types
                present in your dataset.
                """)

    st.subheader(" Dataset Preview")

    st.divider()

    st.dataframe(df.head(),use_container_width=True)

    st.download_button(
    label="📥 Download Preview as CSV",
    data=df.head().to_csv(index=False),
    file_name="preview.csv",
    mime="text/csv"
    )
    
    st.subheader("📄 AI Report")

    st.download_button(
        label="Download Analysis Report",
        data=report,
        file_name="DataPilot_Report.txt",
        mime="text/plain"
    )

    st.divider()

    st.caption(
    "🚀 Powered by DataPilot AI | Multi-Agent Data Analysis Platform"
    )

    