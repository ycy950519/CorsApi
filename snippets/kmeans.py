# ！/usr/bin/env python
# -*- coding: utf-8 -*-

from sklearn.cluster import KMeans
import random

def loadDataSet(data):
    dataset=[]
    global attribute
    attribute=[]
    for key in data.keys():
        attribute.append(key)
    
    for n in range(len(data[attribute[0]])):
        a=[]
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(a)

    return dataset

def splitDataset(dataset, splitRatio):
	trainSize = int(len(dataset) * splitRatio)
	trainSet = []
	copy = list(dataset)
	while len(trainSet) < trainSize:
		index = random.randrange(len(copy))
		trainSet.append(copy.pop(index))
	return [trainSet, copy]

def predict(dtree_predict):
    pred=clf.predict(dtree_predict)
    return pred

def main(original_data,k_value,split):
    data = loadDataSet(original_data)
    trainingSet, testSet = splitDataset(data, split)
    data=[]
    
    data_test=[]
    
    for i in range(len(trainingSet)):
        data.append(trainingSet[i])
       
    for n in range(len(testSet)):
        data_test.append(testSet[n])
        
    
    column_data={}
    for i in range(len(attribute)):
        column_data[attribute[i]]=[]
        for n in range(len(trainingSet)):
            column_data[attribute[i]].append(trainingSet[n][i])
    global clf
    clf = KMeans(n_clusters=k_value) 
    clf = clf.fit(data)
    score = clf.score(data_test)
    return score,column_data
    
