import config
import tweepy as tw
import pandas as pd
import json
import time
import csv
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()

df = pd.read_csv('tweets_from_api.csv')

sentiment = df['tidy_tweet'].apply(lambda x: analyzer.polarity_scores(x))
df = pd.concat([df,sentiment.apply(pd.Series)],1)

score= df['compound']

# print(score)

def vaderize(score):

    if score >= 0.05 : 
        result = "positive"
    elif score <= - 0.05 : 
        result = "negative"
    else : 
        result = "neutral"

    return(result)

df['score'] = df['compound'].apply(vaderize)

print(df)