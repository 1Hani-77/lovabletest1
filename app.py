import streamlit as st
import pandas as pd
import numpy as np

# Check for required sklearn components
try:
    from sklearn.model_selection import train_test_split
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
except ImportError as e:
    st.error(f"""
    Critical dependency error: {e}
    
    Please install required packages using:
    !pip install scikit-learn pandas numpy streamlit
    """)
    st.stop()

# Set page configuration
st.set_page_config(
    page_title="Abha Real Estate Price Predictor",
    page_icon="🏠",
    layout="wide"
)

# App title and description
st.title("Abha Real Estate Price Predictor")
st.markdown("""
This app predicts real estate prices in Abha based on property characteristics.
""")

# Sidebar for navigation
st.sidebar.title("Navigation")
page = st.sidebar.radio("Go to", ["Home", "Prediction", "Dataset", "About"])

# Function to load data
@st.cache_data
def load_data():
    try:
        data_url = "https://raw.githubusercontent.com/1Hani-77/TEST/refs/heads/main/abha%20real%20estate.csv"
        df = pd.read_csv(data_url)
        
        # Clean column names
        df.columns = df.columns.str.strip().str.lower()
        
        # Column name standardization
        column_mapping = {
            'price': 'price_in_sar',
            'price(sar)': 'price_in_sar',
            'price in sar': 'price_in_sar',
            'neighborhood': 'neighborhood_name'
        }
        
        df = df.rename(columns=column_mapping)
        
        return df
    except Exception as e:
        st.error(f"Error loading data: {e}")
        st.stop()

# Load the data
df = load_data()

# Function to preprocess data
def preprocess_data(df):
    try:
        processed_df = df.copy()
        
        if 'neighborhood_name' in processed_df.columns:
            processed_df['neighborhood_encoded'] = pd.factorize(processed_df['neighborhood_name'])[0]
        
        if 'area' in processed_df.columns and 'price_in_sar' in processed_df.columns:
            processed_df['price_per_sqm'] = processed_df['price_in_sar'] / processed_df['area']
        
        return processed_df
    except Exception as e:
        st.error(f"Data processing error: {e}")
        st.stop()

# Function to train model
def train_model(df):
    try:
        processed_df = preprocess_data(df)
        
        features = []
        if 'neighborhood_encoded' in processed_df.columns:
            features.append('neighborhood_encoded')
        if 'area' in processed_df.columns:
            features.append('area')
        
        if 'price_in_sar' not in processed_df.columns:
            st.error("Missing price column in dataset")
            return None, None, None, None, None
        
        X = processed_df[features]
        y = processed_df['price_in_sar']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)
        
        y_pred = model.predict(X_test)
        
        mae = mean_absolute_error(y_test, y_pred)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2 = r2_score(y_test, y_pred)
        
        return model, processed_df, mae, rmse, r2
    except Exception as e:
        st.error(f"Model training error: {e}")
        st.stop()

# Page rendering
if page == "Home":
    st.header("Welcome to the Abha Real Estate Price Predictor")
    st.write("""
    This application uses machine learning to predict real estate prices in Abha, Saudi Arabia.
    """)
    st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Abha_City.jpg/1200px-Abha_City.jpg", 
             caption="Abha City, Saudi Arabia")

elif page == "Prediction":
    st.header("Predict Real Estate Prices")
    
    if df is not None:
        model_result = train_model(df)
        
        if model_result[0] is not None:
            model, processed_df, mae, rmse, r2 = model_result
            
            neighborhoods = df['neighborhood_name'].unique()
            
            with st.form("prediction_form"):
                st.subheader("Enter Property Details")
                neighborhood = st.selectbox("Select Neighborhood", neighborhoods)
                area = st.number_input("Property Area (sqm)", 
                                     min_value=int(df['area'].min()), 
                                     max_value=int(df['area'].max()),
                                     value=int(df['area'].median()))
                
                if st.form_submit_button("Predict Price"):
                    try:
                        neighborhood_encoded = processed_df[processed_df['neighborhood_name'] == neighborhood]['neighborhood_encoded'].values[0]
                        input_data = [[neighborhood_encoded, area]]
                        prediction = model.predict(input_data)[0]
                        
                        st.success(f"Predicted Price: {prediction:,.2f} SAR")
                        st.info(f"Price per Square Meter: {prediction/area:,.2f} SAR")
                    except Exception as e:
                        st.error(f"Prediction error: {e}")

            st.subheader("Model Performance")
            col1, col2, col3 = st.columns(3)
            col1.metric("MAE", f"{mae:,.2f} SAR")
            col2.metric("RMSE", f"{rmse:,.2f} SAR")
            col3.metric("R² Score", f"{r2:.2f}")

elif page == "Dataset":
    st.header("Dataset Overview")
    st.dataframe(df)
    
    st.subheader("Summary Statistics")
    st.write(df.describe())
    
    if 'price_in_sar' in df.columns:
        st.subheader("Price Distribution")
        st.bar_chart(df['price_in_sar'])
    
    if 'area' in df.columns and 'price_in_sar' in df.columns:
        st.subheader("Area vs Price")
        st.scatter_chart(df, x='area', y='price_in_sar')

elif page == "About":
    st.header("About")
    st.write("""
    Real estate price prediction app for Abha, Saudi Arabia.
    Built with Streamlit and Scikit-learn.
    """)

# Requirements.txt should contain:
# streamlit>=1.22.0
# pandas>=1.5.0
# numpy>=1.24.0
# scikit-learn>=1.2.0
