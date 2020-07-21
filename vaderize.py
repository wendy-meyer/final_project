import config
import tweepy as tw
import pandas as pd
import json
import time
import operator
import csv
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def vaderize(df):
    analyzer = SentimentIntensityAnalyzer()
    df['tidy_tweet'] = df['tidy_tweet'].astype(str)
    df['sentiment'] = df['tidy_tweet'].apply(lambda x: getSentiment(x, analyzer))
    return df

def getSentiment(sentence, analyzer):
    score = analyzer.polarity_scores(sentence)
    value = max(score.items(), key=operator.itemgetter(1))[0]
    returnValue = 0
    if value == "pos":
        returnValue = 1
    return returnValue