import config
import tweepy
import pandas as pd
import time

auth = tweepy.OAuthHandler(config.consumer_key, config.consumer_key_secret)
auth.set_access_token(config.access_token, config.access_token_secret)
api = tweepy.API(auth)

search_words= "#data"
numTweets= 5
numRuns= 2
tweet_list=[]


def scraptweets(search_words, numTweets, numRuns):
    
    # Define a for-loop to generate tweets at regular intervals
    # We cannot make large API call in one go. Hence, let's try T times
    
    # Define a pandas dataframe to store the date:
    db_tweets = pd.DataFrame(columns = ['username', 'location', 'text']
                                )
    program_start = time.time()
    for i in range(0, numRuns):
        # We will time how long it takes to scrape tweets for each run:
        start_run = time.time()
        
        # Collect tweets using the Cursor object
        # .Cursor() returns an object that you can iterate or loop over to access the data collected.
        # Each item in the iterator has various attributes that you can access to get information about each tweet
        tweets = tweepy.Cursor(api.search, q=search_words, lang="en", tweet_mode='extended').items(numTweets)
# Store these tweets into a python list
        tweet_list = [tweet for tweet in tweets]

# Begin scraping the tweets individually:
        noTweets = 0
for tweet in tweet_list:
# Pull the values
            username = tweet.user.screen_name
            location = tweet.user.location
            text = tweet.full_text
                
# Add the 11 variables to the empty list - ith_tweet:
            ith_tweet = [username, acctdesc, location, following, followers, totaltweets,
                         usercreatedts, tweetcreatedts, retweetcount, text, hashtags]
# Append to dataframe - db_tweets
            db_tweets.loc[len(db_tweets)] = ith_tweet
# increase counter - noTweets  
            noTweets += 1
        
        # Run ended:
            end_run = time.time()
            duration_run = round((end_run-start_run)/60, 2)
            
            print('no. of tweets scraped for run {} is {}'.format(i + 1, noTweets))
            print('time take for {} run to complete is {} mins'.format(i+1, duration_run))
            
            time.sleep(920) #15 minute sleep time


        # Store dataframe in csv with creation date timestamp
            
            db_tweets.to_csv("tweets_stream.csv", index = False)
            
            program_end = time.time()

            print('Scraping has completed!')
            print('Total time taken to scrap is {} minutes.'.format(round(program_end - program_start)/60, 2))

scraptweets





