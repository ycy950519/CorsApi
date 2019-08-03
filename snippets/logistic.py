#! /usr/bin/env python
# -*- coding: utf-8 -*-

import numpy as np
from sklearn.linear_model.logistic import LogisticRegression
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap
from sklearn.preprocessing import StandardScaler
import random
import re

def loadDataSet(data):
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
    
    return dataset

def splitDataset(dataset, splitRatio):
	trainSize = int(len(dataset) * splitRatio)
	trainSet = []
	copy = list(dataset)
	while len(trainSet) < trainSize:
		index = random.randrange(len(copy))
		trainSet.append(copy.pop(index))
	return [trainSet, copy]


def versiontuple(v):
    return tuple(map(int, (v.split("."))))

def sigmoid(z):
    return 1.0 / (1.0+np.exp(-z))


def plotshow(solver,trainingSet, testSet):
    
    data=[]
    label=[]
    data_test=[]
    label_test=[]
    
    for i in range(len(trainingSet)):
        data.append(list(map(eval,trainingSet[i][:-1])))
        label.append(list(map(eval,trainingSet[i][-1])))
    for n in range(len(testSet)):
        data_test.append(list(map(eval,testSet[n][:-1])))
        label_test.append(list(map(eval,testSet[n][-1])))
   
    
    global clf
    clf = LogisticRegression(C=1000.0,solver=solver,multi_class="ovr")
   
    clf.fit(data,label)
    score = clf.score(data_test,label_test)
    data = np.array(data)
    label = np.array(label)   
    
    x_min, x_max = data[:, 0].min() - .5, data[:, 0].max() + .5
    y_min, y_max = data[:, 1].min() - .5, data[:, 1].max() + .5
    h = .02  # step size in the mesh
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h), np.arange(y_min, y_max, h))
    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()])
    
    # Put the result into a color plot
    Z = Z.reshape(xx.shape)
    plt.figure(figsize=(12, 6))
    plt.subplot(1, 2, 1)
    plt.title('Logistic') 
    #plt.figure(1, figsize=(4, 3))
    plt.pcolormesh(xx, yy, Z, cmap=plt.cm.Paired)
    
    # Plot also the training points
    plt.scatter(data[:, 0], data[:, 1], c=np.squeeze(label), edgecolors='k', cmap=plt.cm.Paired)
    plt.xlabel('petal length')
    plt.ylabel('petal width')
    plt.xlim(xx.min(), xx.max())
    plt.ylim(yy.min(), yy.max())
    plt.xticks(())
    plt.yticks(())
    
    plt.subplot(1, 2, 2)
    z = np.arange(-5,5,0.05)
    phi_z = sigmoid(z)
    plt.title('Sigmoid') 
    plt.plot(z,phi_z)
    plt.axvline(0.0,color='k')
    plt.ylim(-0.1,1.1)
    
    plt.yticks([0.0,0.5,1.0])
    ax = plt.gca()
    ax.yaxis.grid(True)
    plt.tight_layout()
    plt.savefig("E:/Anaconda/Scripts/CorsApi/snippets/static/picture/logistic.jpg") 
    return score
    

def main(solver,split,data):
    
    dataSet = loadDataSet(data)
    trainingSet, testSet = splitDataset(dataSet, split)
    score = plotshow(solver,trainingSet, testSet)
    return score
    
    
def predict(predict_data):
    lic=[]
    lic.append(list(map(eval,predict_data)))
    pred = clf.predict(np.array(lic))
    return pred


