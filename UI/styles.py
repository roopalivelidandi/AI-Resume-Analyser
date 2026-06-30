import streamlit as st


def load_styles():
    st.markdown("""
    <style>

    /* Import Font */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }

    /* Remove Streamlit Header */
    header {
        visibility: hidden;
    }

    /* Remove Footer */
    footer {
        visibility: hidden;
    }

    /* Main Background */
    .stApp {
        background: linear-gradient(
            135deg,
            #f8fafc 0%,
            #eef2ff 100%
        );
    }

    /* Primary Button */
    .stButton>button {

        width:100%;

        border-radius:14px;

        border:none;

        padding:0.8rem;

        font-weight:600;

        background:#2563eb;

        color:white;

        transition:0.3s;
    }

    .stButton>button:hover{

        background:#1d4ed8;

        transform:translateY(-2px);
    }

    </style>
    """, unsafe_allow_html=True)