from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from api_code import getTweets
from vaderize import vaderize
import pandas as pd
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/traindata')
def traindata():
    return render_template('traindata.html')

@app.route('/search/<input>')
def grab_input(input):
    df = getTweets(input)
    df = vaderize(df)
    return df.to_json(orient="records")

if __name__ == "__main__":
    app.run(debug=True)
