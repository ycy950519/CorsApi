#-*- coding: utf-8 -*-
# Example of Naive Bayes implemented from Scratch in Python

import random
import math
import pandas as pd
import numpy as np
from matplotlib import pyplot as plt 
from sklearn.naive_bayes import GaussianNB
from sklearn.naive_bayes import MultinomialNB
from sklearn.naive_bayes import BernoulliNB
from sklearn.calibration import CalibratedClassifierCV, calibration_curve
from sklearn.metrics import (brier_score_loss, precision_score, recall_score,f1_score)

def createDataSet(data):
    dataset=[]
    attribute=[]
    for key in data.keys():  
        attribute.append(key)
    for n in range(len(data[attribute[0]])):
        a=[]
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(a)

    return dataset                                       # 返回数据集和分类属性

def splitDataset(dataset, splitRatio):
	trainSize = int(len(dataset) * splitRatio)
	trainSet = []
	copy = list(dataset)
	while len(trainSet) < trainSize:
		index = random.randrange(len(copy))
		trainSet.append(copy.pop(index))
	return [trainSet, copy]

def plotshow(trainingSet,testSet,method):
    y=[]
    data=[]
    label=[]
    data_test=[]
    label_test=[]

    for i in range(len(trainingSet)):
        data.append(list(map(eval,trainingSet[i][:-1])))
        label.append(list(map(eval,trainingSet[i][-1])))
        y.append(list(map(eval,trainingSet[i][-1])))
    for n in range(len(testSet)):
        data_test.append(list(map(eval,testSet[n][:-1])))
        label_test.append(list(map(eval,testSet[n][-1])))
        y.append(list(map(eval,testSet[n][-1])))
        
    global clf
    if method=="高斯朴素贝叶斯":
        clf = GaussianNB(priors=None)
        
        
    if method =="多项式分布贝叶斯":
        clf = MultinomialNB(alpha=1.0, fit_prior=True, class_prior=None)
        
        
    if method =="伯努利朴素贝叶斯":
        clf = BernoulliNB(alpha=1.0, binarize=0.0, fit_prior=True, class_prior=None)
        

    ax1 = plt.subplot2grid((3, 1), (0, 0), rowspan=2)
    ax2 = plt.subplot2grid((3, 1), (2, 0))

    ax1.plot([0, 1], [0, 1], "k:", label="Perfectly calibrated")
    for clf, name in [(clf, "Naive Bayes")]:
        clf = clf.fit(data, label)
        
        if hasattr(clf, "predict_proba"):
            prob_pos = clf.predict_proba(data_test)[:, 1]
        else:  
            prob_pos = clf.decision_function(data_test)
            prob_pos = \
                (prob_pos - prob_pos.min()) / (prob_pos.max() - prob_pos.min())
        
        clf_score = brier_score_loss(label_test, prob_pos, pos_label=np.array(y).max())
        

        fraction_of_positives, mean_predicted_value = \
            calibration_curve(label_test, prob_pos, n_bins=10)

        ax1.plot(mean_predicted_value, fraction_of_positives, "s-",
                 label="%s (%1.3f)" % (name, clf_score))

        ax2.hist(prob_pos, range=(0, 1), bins=10, label=name,
                 histtype="step", lw=2)
    ax1.set_ylabel("Fraction of positives")
    ax1.set_ylim([-0.05, 1.05])
    ax1.legend(loc="lower right")
    ax1.set_title('Calibration plots  (reliability curve)')

    ax2.set_xlabel("Mean predicted value")
    ax2.set_ylabel("Count")
    ax2.legend(loc="upper center", ncol=2)

    plt.tight_layout()
    plt.savefig("E:/Anaconda/Scripts/CorsApi/snippets/static/picture/bayes.jpg")     
    score = clf.score(data_test,label_test)
    
    return score


    
    



def bayes(method,split,data):
    dataSet= createDataSet(data)
    trainingSet, testSet = splitDataset(dataSet, split)
    score = plotshow(trainingSet,testSet,method)
    return score

def predict(bayes_predict):
    lic=[]
    lic.append(list(map(eval,bayes_predict)))
    pred = clf.predict(np.array(lic))
    return pred
