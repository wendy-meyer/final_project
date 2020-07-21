import config
import tweepy as tw
import pandas as pd
import json
import time
import csv
import re
import operator
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)
analyzer = SentimentIntensityAnalyzer()

consumer_key = config.consumer_key
consumer_secret_key = config.consumer_key_secret
access_token = config.access_token
access_token_secret = config.access_token_secret

comp_searches = ("@Google", "@IBM", "@Microsoft", "@Tesla", "@amazon")

def initialize():
    auth = tw.OAuthHandler(consumer_key, consumer_secret_key)
    auth.set_access_token(access_token, access_token_secret)
    api = tw.API(auth, parser = tw.parsers.JSONParser())
    return api
api = initialize()

# Array to hold sentiment
sentiments = []
# Iterate through all the comp_searches
for search in comp_searches:
       
    # Bring out the 100 tweets
    comp_tweets = api.user_timeline(search, count=5)
    
    # Loop through the 100 tweets
    for tweet in comp_tweets:
        text = tweet["text"]
        
     # Add each value to the appropriate array
        sentiments.append({"User": search,
                           "text":text,
                       "Date": tweet["created_at"] 
                        })

#convert array to dataframe
df = pd.DataFrame.from_dict(sentiments)

scores = []
# Declare variables for scores
compound_list = []
positive_list = []
negative_list = []
neutral_list = []
for i in range(df['text'].shape[0]):
#print(analyser.polarity_scores(sentiments_pd['text'][i]))
    compound = analyzer.polarity_scores(df['text'][i])["compound"]
    pos = analyzer.polarity_scores(df['text'][i])["pos"]
    neu = analyzer.polarity_scores(df['text'][i])["neu"]
    neg = analyzer.polarity_scores(df['text'][i])["neg"]
    
    scores.append({"Compound": compound,
                       "Positive": pos,
                       "Negative": neg,
                       "Neutral": neu
                  })
sentiments_score = pd.DataFrame.from_dict(scores)
df = df.join(sentiments_score)

print(df)

# def getTweets(search_term):

#     auth = tw.OAuthHandler(consumer_key, consumer_secret_key)
#     auth.set_access_token(access_token, access_token_secret)
#     api = tw.API(auth, wait_on_rate_limit=True)

#     # Collect tweets
#     tweets = tw.Cursor(api.search,
#                 q=search_term,
#                 lang="en").items(5)

#     # Collect a list of tweets

#     users_locs = [[tweet.user.screen_name, re.sub(r'http\S+', '', tweet.text)] for tweet in tweets]

#     tweet_text = pd.DataFrame(data=users_locs, columns=['user', 'tweet']) 
    
#     # remove special characters, numbers, punctuations
#     tweet_text['tidy_tweet'] = tweet_text['tweet'].str.replace("[^a-zA-Z#]", " ")
#     #remove short words
#     tweet_text['tidy_tweet'] = tweet_text['tidy_tweet'].apply(lambda x: ' '.join([w for w in x.split() if len(w)>2]))

#     return tweet_text

#     # tweet_text.to_csv("tweet_stream.csv", encoding='utf-8', index=False)

#     # print("We're done processing the data!")

# df = getTweets(search_term)

# full_tweet= df['tidy_tweet']

# tweet = []
# number_favourites = []
# vs_compound = []
# vs_pos = []
# vs_neu = []
# vs_neg = []

# from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
# analyzer = SentimentIntensityAnalyzer()

# for i in range(0, len(full_tweet)):
#     tweet.append(full_tweet)
#     vs_compound.append(analyzer.polarity_scores(data_all[i]['text'])['compound'])
#     vs_pos.append(analyzer.polarity_scores(data_all[i]['text'])['pos'])
#     vs_neu.append(analyzer.polarity_scores(data_all[i]['text'])['neu'])
#     vs_neg.append(analyzer.polarity_scores(data_all[i]['text'])['neg'])

# def sentiment(full_tweet):

#     score = analyser.polarity_scores(full_tweet)
#     value = max(score.items(), key=operator.itemgetter(1))[0]
#     returnValue = 1
#     if value == "pos":
#         returnValue = 2
#     if value == "neg":
#         returnValue = 0
#     return returnValue

#     df['sentiment1'] = df['tweet'].apply(lambda x: sentiment(x))
#     df['sentiment2'] = df['tidy_tweet'].apply(lambda x: sentiment(x))

#     df['sentiment_sum'] = df['sentiment1'] + df['sentiment2']


#     def get_extreme(x):
#         returnVal = 1
#         if x > 2:
#             returnVal = 2
#         if x < 2:
#             returnVal = 0
#         return returnVal

#     df['label'] = df['sentiment_sum'].apply(lambda x: get_extreme(x))
#     df['text'] = df['tidy_tweet']

# print(full_tweet)


