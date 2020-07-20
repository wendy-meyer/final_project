from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from api_code import getTweets
import pandas as pd
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search/<input>')
def grab_input(input):
    df = getTweets(input)
    data = df['tidy_tweet'][:10].to_json(orient="split")
    response = requests.post("http://127.0.0.1:5000/invocations", 
                         data=data,
                        headers={"Content-Type": "application/json"})
    predictions = pd.Series(response.json)
    df['sentiment'] = predictions
    return df.to_json()

# def my_form_post():
#     variable = request.form['variable']
#     return variable

if __name__ == "__main__":
    app.run(debug=True)
