# -*- coding: utf-8 -*-
"""
Created on Fri Dec  7 09:52:34 2018

@author: 叶哥哥
"""

#RandomForestClassifier

import pandas as pd
import numpy as np
import matplotlib.pylab as plt
from sklearn.model_selection import cross_val_score
from sklearn.datasets import make_blobs
from sklearn.ensemble import RandomForestClassifier
import pydotplus
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

 
def createDataSet(data):
    dataset=[]
    labels=[]
    attribute=[]
    for key in data.keys():
        attribute.append(key)
    for n in range(len(data[attribute[0]])):
        a=[]
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(a[:-1])
        labels.append(a[-1])
    
    return dataset,labels,attribute
''' 
def randomforest(dataset,labels,attribute,max_depth,criterion,n_estimators,min_samples_split,max_features):   
    result={}
    x_train, x_test, y_train, y_test = train_test_split(dataset,labels,random_state=1, train_size=0.7)
    global clf
    clf = RandomForestClassifier(n_estimators=n_estimators,max_features=max_features, max_depth=max_depth,min_samples_split=min_samples_split, bootstrap=True)
    
    clf.fit(x_train, y_train)
    
    #随机森林评估特征重要性
    importances=clf.feature_importances_
    indices=np.argsort(importances)[::-1]
    for f in range(len(attribute)-1):
        #给予10000颗决策树平均不纯度衰减的计算来评估特征重要性
        result[attribute[f]]=round(importances[indices[f]],2)
    plt.rcParams['font.sans-serif']=['SimHei']
    plt.title('Feature Importance-RandomForest')
    plt.bar(range(len(attribute)-1),importances[indices],color='lightblue',align='center')
    plt.xticks(range(len(attribute)-1),attribute[:-1],rotation=90)
    plt.xlim([-1,len(attribute)-1])
    plt.tight_layout()
    plt.savefig('E:/Anaconda/Scripts/CorsApi/snippets/static/picture/randomforest.jpg',format='jpg')
    return result
'''

def randomforest(dataset,labels,attribute,max_depth,criterion,min_samples_split,max_features,split):   
    
    scores=[]
    count=[]
    x_train, x_test, y_train, y_test = train_test_split(dataset,labels,random_state=1, train_size=split)
    global clf
    for n in range(5,106,10):
        clf = RandomForestClassifier(n_estimators=n,max_features=max_features, max_depth=max_depth,min_samples_split=min_samples_split, bootstrap=True)
    
        clf.fit(x_train, y_train)
        score = cross_val_score(clf, dataset, labels)
        scores.append(round(np.average(score),4)*100)
        count.append(n)
    plt.rcParams['font.sans-serif']=['SimHei']
    plt.plot(count,scores,linewidth=3,color='r',marker='o', markerfacecolor='blue',markersize=12) 
    plt.xlabel('树的个数') 
    plt.ylabel('模型评分') 
    plt.title('模型结果评价') 
    
    plt.savefig('E:/Anaconda/Scripts/CorsApi/snippets/static/picture/randomforest.jpg',format='jpg')
    

def predict(randomforest_predict):
    pred=clf.predict(randomforest_predict)
    return pred
 
 

 

