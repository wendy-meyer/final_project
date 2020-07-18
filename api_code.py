import config
import tweepy as tw
import pandas as pd
import time
import csv

consumer_key = config.consumer_key
consumer_secret_key = config.consumer_key_secret
access_token = config.access_token
access_token_secret = config.access_token_secret

auth = tw.OAuthHandler(consumer_key, consumer_secret_key)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

search_term="#data"

# Collect tweets
tweets = tw.Cursor(api.search,
              q=search_term,
              lang="en").items(5)

# Collect a list of tweets
users_locs = [[tweet.text, tweet.user.screen_name, tweet.user.location] for tweet in tweets]

tweet_text = pd.DataFrame(data=users_locs, columns=['tweet','user', "location"])

tweet_text.to_csv("tweet_stream.csv", encoding='utf-8', index=False)
