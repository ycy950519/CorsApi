# -*- coding: utf-8 -*-
import pandas as pd #导入数据分析库Pandas
from scipy.interpolate import lagrange #导入拉格朗日插值函数
import numpy as np

#自定义列向量插值函数
#s为列向量，n为被插值的位置，k为取前后的数据个数，默认为5

def deallosing(dataset):
    #逐个元素判断是否需要插值
    lis=['null']
    for i in dataset.keys():
        location = []
        for n in range(len(dataset[i])):
            if dataset[i][n] in lis:
                location.append(n)
        dataset[i] = ['0.0' if x in lis else x for x in dataset[i]]
        dataset[i] = list(map(float,dataset[i]))
        mean = np.mean(dataset[i])
        
        for j in location:
            dataset[i][j] = round(mean,2)
            
    return dataset

def dellosing(dataset):
    keys = [attribute for attribute in dataset.keys()]
    data=[]
    
    for n in range(len(dataset[keys[0]])):
        a=[]
        for key in dataset.keys():
            a.append(dataset[key][n])
        data.append(a)
    dataset=[]
    for i in range(len(data)):
        if 'null' in data[i]:
            dataset.append(data[i+1])
            i+=2
        else:
            dataset.append(data[i])
    
    dic = {}
    for a in range(len(keys)):
        dic[keys[a]]=[]
        for m in range(len(dataset)):
            dic[keys[a]].append(dataset[m][a])
        #dic[keys[a]] = list(map(float,dic[keys[a]]))
    return dic