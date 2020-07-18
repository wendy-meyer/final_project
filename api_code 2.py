import config
import tweepy as tw
import pandas as pd
import time
import csv
import re
from nltk.tokenize import TweetTokenizer

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
    users_locs = [[tweet.user.screen_name, tweet.text] for tweet in tweets]

    tweet_text = pd.DataFrame(data=users_locs, columns=['user', 'tweet']) 
    
    # remove special characters, numbers, punctuations
    tweet_text['tidy_tweet'] = tweet_text['tweet'].str.replace("[^a-zA-Z#]", " ")
    #remove short words
    tweet_text['tidy_tweet'] = tweet_text['tidy_tweet'].apply(lambda x: ' '.join([w for w in x.split() if len(w)>2]))

    tweet_text.to_csv("tweet_stream.csv", encoding='utf-8', index=False)

    print("We're done processing the data!")

getTweets(search_term)
