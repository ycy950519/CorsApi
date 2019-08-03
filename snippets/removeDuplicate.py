# -*- coding: utf-8 -*-
"""
Created on Fri Dec 28 10:06:39 2018

@author: 叶哥哥
"""


import numpy as np


def loadDataSet(data):
    
    attribute=[]
    for key in data.keys():
        attribute.append(key)
    dataset=[]
    
    for n in range(len(data[attribute[0]])):
        a=[]
        
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(a)

    
    return dataset,attribute

def main(data):
    dataset,attribute = loadDataSet(data)
    news_dataset = []
    duplicate={}
    for item in dataset:
        if item not in news_dataset:
            news_dataset.append(item)
    for j in range(len(attribute)):
        duplicate[attribute[j]]=[]
        for n in range(len(news_dataset)):
            duplicate[attribute[j]].append(news_dataset[n][j])
  
    return duplicate