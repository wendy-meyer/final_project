import numpy as np

import tensorflow as tf
import tensorflow_hub as hub

import pandas as pd

import mlflow
import mlflow.sklearn
import mlflow.keras

def predict(input):
	#help(tf.compat.v1.keras.experimental.load_from_saved_model)
	loaded_model = tf.compat.v1.keras.experimental.load_from_saved_model('FinalProjectModel.h5', custom_objects={'KerasLayer':hub.KerasLayer})

	output = loaded_model.predict_classes(input)
	return output