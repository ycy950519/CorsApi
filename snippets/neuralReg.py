# -*- coding: utf-8 -*-
"""
Created on Mon Dec 24 10:11:29 2018

@author: 叶哥哥
"""

import numpy as np
import random
from sklearn.neural_network import  MLPRegressor
import matplotlib.pyplot as plt


def loadDataSet(data):
    dataset=[]
    
    attribute=[]
    for key in data.keys():  
        attribute.append(key)
    
    for n in range(len(data[attribute[0]])):
        a=[]
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(a)
        
    
    return dataset                                      # 返回数据集和分类属性

def splitDataset(dataset, splitRatio):
	trainSize = int(len(dataset) * splitRatio)
	trainSet = []
	copy = list(dataset)
	while len(trainSet) < trainSize:
		index = random.randrange(len(copy))
		trainSet.append(copy.pop(index))
	return [trainSet, copy]

def plotshow(activation,solver,trainingSet, testSet):
    data=[]
    label=[]
    data_test=[]
    label_test=[]
    #print(trainingSet)
    
    
    for i in range(len(trainingSet)):
        data.append(list(map(eval,trainingSet[i][:-1])))
        #print(type(trainingSet[i][-1]))
        label.append(float(trainingSet[i][-1]))
        
    
    for n in range(len(testSet)):
        data_test.append(list(map(eval,testSet[n][:-1])))
        label_test.append(float(testSet[n][-1]))
    
    global clf
    clf = MLPRegressor(activation=activation,solver=solver,hidden_layer_sizes=(50,50))
   
    clf.fit(data,label)
    score = clf.score(data_test,label_test)
    
    label_test = [[i] for i in label_test]
    
    mlp_pridict=clf.predict(data_test)
    plt.figure(figsize=(12, 6))
    
    plt.title('fitting curve') 
    line1,=plt.plot(range(len(label_test)), label_test, 'g',label='dataset')
    line2,=plt.plot(range(len(mlp_pridict)), mlp_pridict, 'r--',label='MLPRegressor',linewidth=2)

    plt.grid()
    plt.tight_layout()
    plt.legend(handles=[line1,line2])

    plt.savefig("E:/Anaconda/Scripts/CorsApi/snippets/static/picture/neuralReg.jpg") 
    
    return score
    

def main(activation,solver,data,split):
    
    dataSet = loadDataSet(data)
    trainingSet, testSet = splitDataset(dataSet, split)
    
    score = plotshow(activation,solver,trainingSet, testSet)
    return score
    
    
def predict(predict_data):
    
    pred = clf.predict(predict_data)
    return pred