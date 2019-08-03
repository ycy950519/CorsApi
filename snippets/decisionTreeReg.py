# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 20:03:22 2018

@author: 叶哥哥
"""
import re
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_validate
from sklearn import metrics
from sklearn.model_selection import GridSearchCV
import random
import matplotlib.pylab as plt

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


def plotshow(trainingSet,testSet):
    data=[]
    label=[]
    data_test=[]
    label_test=[]
    
    params = {'n_estimators': 500, 'max_depth': 4, 'min_samples_split': 2,'learning_rate': 0.01}
    
    for i in range(len(trainingSet)):
        data.append(list(map(eval,trainingSet[i][:-1])))
        label.append(list(map(eval,trainingSet[i][-1])))
    for n in range(len(testSet)):
        data_test.append(list(map(eval,testSet[n][:-1])))
        label_test.append(list(map(eval,testSet[n][-1])))
    global clf
    clf = GradientBoostingRegressor(**params)
    
    clf = clf.fit(data, label)
    #计算测试集误差
    test_score = np.zeros((params['n_estimators'],), dtype=np.float64)

    for i, y_pred in enumerate(clf.staged_predict(data_test)):
        test_score[i] = clf.loss_(label_test, y_pred)
    plt.rcParams['font.sans-serif']=['SimHei']
    plt.figure(figsize=(12, 6))
    plt.subplot(1, 2, 1)
    plt.title('Deviance')
    plt.plot(np.arange(params['n_estimators']) + 1, clf.train_score_, 'b-',label='Training Set Deviance')
    plt.plot(np.arange(params['n_estimators']) + 1, test_score, 'r-',label='Test Set Deviance')
    plt.legend(loc='upper right')
    plt.xlabel('Boosting Iterations')
    plt.ylabel('Deviance')
    
    
    feature_importance = clf.feature_importances_
    # 各属性的重要性
    feature_importance = 100.0 * (feature_importance / feature_importance.max())
    sorted_idx = np.argsort(feature_importance)
    pos = np.arange(sorted_idx.shape[0]) + .5
    plt.subplot(1, 2, 2)
    attr = np.array(attribute)
    plt.barh(pos, feature_importance[sorted_idx], align='center')
    
    plt.yticks(pos, attr[sorted_idx])
    plt.xlabel('Relative Importance')
    plt.title('Variable Importance')
    plt.savefig("E:/Anaconda/Scripts/CorsApi/snippets/static/picture/decisionTreeReg.jpg") 
    
def main(data,split):
    
    dataSet = createDataSet(data)
    trainingSet, testSet = splitDataset(dataSet, split)
    plotshow(trainingSet,testSet)

def predict(data):
    pred=clf.predict(data)
    return pred    