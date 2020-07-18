import tweepy
import config


class TwitterStreamListener(tweepy.streaming.StreamListener):
    ''' Handles data received from the stream. '''
    def on_status(self, status):
        print(status.id)
        print(status.user.name)
        print(status.text)
        return True

    def on_error(self, status_code):
        print('Got an error with status code: ' + str(status_code))
        return True # To continue listening

    def on_timeout(self):
        print('Timeout...')
        return True # To continue listening

listener = TwitterStreamListener()
auth = tweepy.OAuthHandler(config.consumer_key, config.consumer_key_secret)
auth.set_access_token(config.access_token, config.access_token_secret)
stream = tweepy.streaming.Stream(auth, listener)
stream.filter(track=["#Python"])

