# -*- coding: utf-8 -*-
"""
Created on Mon Dec 24 20:03:15 2018

@author: 叶哥哥
"""
from sklearn import preprocessing


def standard(data):
    scaler = preprocessing.StandardScaler()
    list_new = scaler.fit_transform(data)
    
    return list_new