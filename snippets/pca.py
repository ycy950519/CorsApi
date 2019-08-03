# -*- coding: utf-8 -*-
"""
Created on Tue Dec  4 10:10:55 2018

@author: 叶哥哥
"""
from sklearn.decomposition import PCA
from sklearn import decomposition
import numpy as np
import matplotlib.pyplot as plt
def createDataSet(data):
    dataset=[]
    keys=[key for key in data]
    for n in range(len(data[keys[0]])):
        a=[]
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(a)
    
    
    return dataset    

def pca(data):
    inner=[]
    label=[]
    dataset = createDataSet(data)
    for n in range(len(dataset)):
        inner.append(dataset[n][:-1])
        label.append(dataset[n][-1])
    pca = PCA(n_components=2,copy=False)
    array=np.array(inner)
    array = array.astype('float64')
    pca.fit(array)

    X_new = pca.transform(array)
    list_new = X_new.tolist()
    for i in range(len(list_new)):
        list_new[i].append(label[i])
    
    return list_new
    
def components(data):
    inner=[]
    dataset = createDataSet(data)
    for n in range(len(dataset)):
        inner.append(dataset[n][:-1])
    array=np.array(inner)
    pca = PCA(n_components=None, copy=True, whiten=False)
    pca.fit(array)
    plt.figure()
    plt.rcParams['font.sans-serif']=['SimHei'] #用来正常显示中文标签
    plt.rcParams['axes.unicode_minus']=False #用来正常显示负号
    plt.plot(pca.explained_variance_, 'k', linewidth=2)
    plt.xlabel('保留的主成分个数', fontsize=16)
    plt.ylabel('方差', fontsize=16)
    plt.savefig('E:/Anaconda/Scripts/CorsApi/snippets/static/picture/n_components.jpg',format='jpg')
    return pca.explained_variance_ratio_[0:2],pca.explained_variance_,pca.n_components_