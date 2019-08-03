import random
from imblearn.over_sampling import SMOTE
import numpy as np

from collections import Counter

def loadDataSet(data):
    
    attribute=[]
    for key in data.keys():
        attribute.append(key)
    dataset=[]
    labels=[]
    for n in range(len(data[attribute[0]])):
        a=[]
        
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(a[:-1])
        labels.append(a[-1])
    
    return dataset,labels,attribute

def main(data):
    dataset,labels,attribute = loadDataSet(data)
    lic=[]
    for n in range(len(dataset[0])):
        s = str(dataset[0][n])
        if s.count(".")==1:
            s_list = s.split(".")
            right =s_list[1]
            lic.append(len(right))
        else:
            lic.append(eval("0"))
    lic.append(eval("0"))
    dataset = np.array(dataset, dtype = float)
    labels = np.array(labels, dtype = int)
    X_resampled_smote, y_resampled_smote = SMOTE().fit_sample(dataset,labels)
    X_resampled = X_resampled_smote.tolist()
    y_resampled = y_resampled_smote.tolist()
    for i in range(len(X_resampled)):
        X_resampled[i].append(y_resampled[i])
    smote_data={}
    for j in range(len(attribute)):
        smote_data[attribute[j]]=[]
        for n in range(len(X_resampled)):
            smote_data[attribute[j]].append(str(round(X_resampled[n][j],lic[j])))
    return smote_data