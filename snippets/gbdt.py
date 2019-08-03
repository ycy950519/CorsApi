# -*- coding: utf-8 -*-
"""
Created on Mon Dec 17 09:56:40 2018

@author: 叶哥哥
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
import re
import matplotlib.pylab as plt
from graphviz import Digraph
from sklearn.externals.six import StringIO
from sklearn import tree
import pydotplus
import random

def createDataSet(data):
    global attribute
    attribute=[]
    for key in data.keys():
        
        attribute.append(key)
    dataset=[]
    
    for n in range(len(data[attribute[0]])):
        a=[]
        
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(a)
    attribute=[]
    for key in data.keys():
        key = re.sub(u"\\(.*?\\)\\^[0-9]", "", key)
        attribute.append(re.sub(u"\\(.*?\\)", "", key))    
    
    return dataset                                      # 返回数据集和分类属性

def splitDataset(dataset, splitRatio):
	trainSize = int(len(dataset) * splitRatio)
	trainSet = []
	copy = list(dataset)
	while len(trainSet) < trainSize:
		index = random.randrange(len(copy))
		trainSet.append(copy.pop(index))
	return [trainSet, copy]

def plotshow(loss,learning_rate,n_estimators,max_features,max_depth,min_samples_split,trainingSet, testSet):
    data=[]
    label=[]
    data_test=[]
    label_test=[]
    for i in range(len(trainingSet)):
        data.append(trainingSet[i][:-1])
        label.append(trainingSet[i][-1])
    names =  list(set(label)) 
    names.sort(key=label.index)
    class_names = [str(i) for i in names]
    for n in range(len(testSet)):
        data_test.append(testSet[n][:-1])
        label_test.append(testSet[n][-1])
    
    
    #params = {'loss':loss,'n_estimators': 500, 'max_depth': 4, 'min_samples_split': 2,'learning_rate': 0.01}
    

    names =  list(set(label)) 
    names.sort(key=label.index)
    class_names = [str(i) for i in names]
    class_names.sort()
    
    
    global clf
    clf = GradientBoostingClassifier(loss=loss,learning_rate=learning_rate,n_estimators=n_estimators,max_features=max_features,max_depth=max_depth,min_samples_split=min_samples_split)
    clf = clf.fit(data, label)
    score = clf.score(data_test,label_test)
    #计算测试集误差
   
    dot_data = tree.export_graphviz(clf.estimators_[0,0],feature_names=attribute[:-1],class_names=class_names,out_file = None,filled=True, rounded=True,special_characters=True)
    
    graph = pydotplus.graph_from_dot_data(dot_data)

    graph.write_png("E:/Anaconda/Scripts/CorsApi/snippets/static/picture/gbdt.png") 
    return score

def main(loss,learning_rate,n_estimators,max_features,max_depth,min_samples_split,split,data):
    
    dataSet = createDataSet(data)
    trainingSet, testSet = splitDataset(dataSet, split)
    score = plotshow(loss,learning_rate,n_estimators,max_features,max_depth,min_samples_split,trainingSet, testSet)
    return score
def predict(gbdt_predict):
    pred=clf.predict(gbdt_predict)
    return pred