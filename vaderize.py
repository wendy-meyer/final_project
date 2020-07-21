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
    pos = score['pos']
    neg = score['neg']
    returnValue = 0
    if pos >= neg:
        returnValue = 1
    return returnValue