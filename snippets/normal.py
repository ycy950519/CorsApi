# -*- coding: utf-8 -*-
"""
Created on Wed Dec  5 10:02:26 2018

@author: 叶哥哥
"""
from sklearn import preprocessing

def normal(data):
    min_max_scaler = preprocessing.MinMaxScaler()  
    X_minMax = min_max_scaler.fit_transform(data) 
    return X_minMax