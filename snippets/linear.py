import matplotlib.pyplot as plt
import numpy as np
from sklearn import datasets, linear_model
import re
import math
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
        dataset.append(np.array(a))
        
    attribute=[]
    for key in data.keys():
        key = re.sub(u"\\(.*?\\)\\^[0-9]", "", key)
        attribute.append(re.sub(u"\\(.*?\\)", "", key))    
    
    return dataset

def splitDataset(dataset, splitRatio):
	trainSize = int(len(dataset) * splitRatio)
	trainSet = []
	copy = list(dataset)
	while len(trainSet) < trainSize:
		index = random.randrange(len(copy))
		trainSet.append(copy.pop(index))
	return [trainSet, copy]

def plotshow(trainingSet,testSet):
    data=[]
    label=[]
    data_test=[]
    label_test=[]
    for i in range(len(trainingSet)):
        data.append(trainingSet[i][:-1])
        label.append(trainingSet[i][-1])
    
    for n in range(len(testSet)):
        data_test.append(testSet[n][:-1])
        label_test.append(testSet[n][-1])
      
    global clf
    clf = linear_model.LinearRegression()
    
    clf = clf.fit(data,label)
    score = clf.score(data_test,label_test)
    
    return score
    
def main(data,split):
    dataSet= createDataSet(data)
    trainingSet, testSet = splitDataset(dataSet, split)
    column_data={}
    for i in range(len(attribute)):
        column_data[attribute[i]]=[]
        for n in range(len(trainingSet)):
            column_data[attribute[i]].append(trainingSet[n][i])
    score = plotshow(trainingSet,testSet)
    return score,column_data
    
def predict(predict_data):    
    lic=[]
    lic.append(list(map(eval,predict_data)))
    
    pred = clf.predict(np.array(lic))
    a = pred.tolist()
 
    return a[0]
    
