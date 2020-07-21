import config
import tweepy as tw
import pandas as pd
import time
import csv
import re
import operator
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)

consumer_key = config.consumer_key
consumer_secret_key = config.consumer_key_secret
access_token = config.access_token
access_token_secret = config.access_token_secret

search_term="#data"

def getTweets(search_term):

    auth = tw.OAuthHandler(consumer_key, consumer_secret_key)
    auth.set_access_token(access_token, access_token_secret)
    api = tw.API(auth, wait_on_rate_limit=True)

    # Collect tweets
    tweets = tw.Cursor(api.search,
                q=search_term,
                lang="en").items(5)

    # Collect a list of tweets

    users_locs = [[tweet.user.screen_name, re.sub(r'http\S+', '', tweet.text)] for tweet in tweets]

    tweet_text = pd.DataFrame(data=users_locs, columns=['user', 'tweet']) 
    
    # remove special characters, numbers, punctuations
    tweet_text['tidy_tweet'] = tweet_text['tweet'].str.replace("[^a-zA-Z#]", " ")
    #remove short words
    tweet_text['tidy_tweet'] = tweet_text['tidy_tweet'].apply(lambda x: ' '.join([w for w in x.split() if len(w)>2]))

    return tweet_text

    # tweet_text.to_csv("tweet_stream.csv", encoding='utf-8', index=False)

    # print("We're done processing the data!")

df = getTweets(search_term)

full_tweet= df['tidy_tweet']

def sentiment(full_tweet):
    score = analyser.polarity_scores(full_tweet)
    value = max(score.items(), key=operator.itemgetter(1))[0]
    returnValue = 1
    if value == "pos":
        returnValue = 2
    if value == "neg":
        returnValue = 0
    return returnValue

    # train['stemmed_tweet'] = train['stemmed_tweet'].astype(str)
    # train['tidy_tweet'] = train['tidy_tweet'].astype(str)
    # train['tweet'] = train['tweet'].astype(str)

    df['sentiment1'] = df['tweet'].apply(lambda x: sentiment(x))
    df['sentiment2'] = df['tidy_tweet'].apply(lambda x: sentiment(x))

    df['sentiment_sum'] = df['sentiment1'] + df['sentiment2']


    def get_extreme(x):
        returnVal = 1
        if x > 2:
            returnVal = 2
        if x < 2:
            returnVal = 0
        return returnVal

    df['label'] = df['sentiment_sum'].apply(lambda x: get_extreme(x))
    df['text'] = df['tidy_tweet']


