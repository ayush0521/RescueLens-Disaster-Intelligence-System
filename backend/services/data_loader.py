import pandas as pd

DATA_FILE = "data/disaster_data.csv"


def load_data():
    df = pd.read_csv(DATA_FILE)
    df.columns = [col.strip().lower() for col in df.columns]
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    return df