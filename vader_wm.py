#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import re
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import operator
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)

get_ipython().run_line_magic('matplotlib', 'inline')


train = pd.read_csv('Resources/train.csv')
analyser = SentimentIntensityAnalyzer()

def sentiment(sentence):
    score = analyser.polarity_scores(sentence)
    value = max(score.items(), key=operator.itemgetter(1))[0]
    returnValue = 1
    if value == "pos":
        returnValue = 2
    if value == "neg":
        returnValue = 0
    return returnValue

train['stemmed_tweet'] = train['stemmed_tweet'].astype(str)
train['tidy_tweet'] = train['tidy_tweet'].astype(str)
train['tweet'] = train['tweet'].astype(str)

train['sentiment1'] = train['tweet'].apply(lambda x: sentiment(x))
train['sentiment2'] = train['tidy_tweet'].apply(lambda x: sentiment(x))

train = train.drop(columns=['no_query'])
train['sentiment_sum'] = train['sentiment1'] + train['sentiment2']

def get_extreme(x):
    returnVal = 1
    if x > 2:
        returnVal = 2
    if x < 2:
        returnVal = 0
    return returnVal

train['label'] = train['sentiment_sum'].apply(lambda x: get_extreme(x))
train['text'] = train['tidy_tweet']

