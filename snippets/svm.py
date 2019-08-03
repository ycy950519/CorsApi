# coding: utf-8
import numpy as np

from sklearn import svm
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import random

"""
采用 sklearn 中的svm ，对数据进行分类
"""
# 导入csv数据
def loadDataSet(data):
    attribute=[]
    for key in data.keys():
        attribute.append(key)
    dataset=[]
    
    for n in range(len(data[attribute[0]])):
        a=[]
        
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(a)
        
    oringal_data=[]
    for i in data.keys():
        oringal_data.append(list(map(eval,data[i])))
    return dataset,oringal_data

def splitDataset(dataset, splitRatio):
	trainSize = int(len(dataset) * splitRatio)
	trainSet = []
	copy = list(dataset)
	while len(trainSet) < trainSize:
		index = random.randrange(len(copy))
		trainSet.append(copy.pop(index))
	return [trainSet, copy]

def main(data,penalty,split):
    dataSet,oringal_data = loadDataSet(data)
    trainingSet, testSet = splitDataset(dataSet, split)
    
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
    
    cls = svm.SVC(kernel="linear", C=penalty)
    cls.fit(data, label)
    score = cls.score(data_test,label_test)
    sv_idx = cls.support_  # 支持向量索引
    
    global w
    w = cls.coef_  # 方向向量 W
    
    global b
    b = cls.intercept_

    global ax
    ax = plt.subplot(111, projection='3d') # 创建一个3d的画布
    x = np.arange(min(oringal_data[0]),max(oringal_data[0]),0.1)
    y = np.arange(min(oringal_data[1]),max(oringal_data[1]),0.1)
    x, y = np.meshgrid(x, y) # 将向量x和y定义的区域转换成矩阵X和Y
    z = (w[0,0]*x + w[0,1]*y + b) / (-w[0,2]) # 构建分类平面表达式
    
    surf = ax.plot_surface(x, y, z, rstride=5, cstride=5, alpha=0.6)

    # 绘制三维散点图
    x_array = np.array(data, dtype=float)
    y_array = np.array(label, dtype=int)
    setosa = x_array[np.where(y_array==1)]
    versicolor = x_array[np.where(y_array==0)]
    ax.scatter(setosa[:,0], setosa[:,1], setosa[:,2], c='r', label='setosa')
    ax.scatter(versicolor[:,0], versicolor[:,1], versicolor[:,2], c='b', label='versicolor')
    X = np.array(data,dtype=float)
    for i in range(len(sv_idx)):
        ax.scatter(X[sv_idx[i],0], X[sv_idx[i],1], X[sv_idx[i],2],s=50,
                   c='',marker='o', edgecolors='g')
    
    ax.set_zlabel('Z')    # 坐标轴
    ax.set_ylabel('Y')
    ax.set_xlabel('X')
    ax.set_zlim([min(oringal_data[2]),max(oringal_data[2])])
    plt.legend(loc='upper left')

    ax.view_init(35,300)
    plt.savefig('E:/Anaconda/Scripts/CorsApi/snippets/static/picture/svm.jpg',format='jpg')
    return score

def predict(svm_predict):
    # 以下为用户输入
    
    z1 = (w[0, 0] * svm_predict[0] + w[0, 1] * svm_predict[1] + b) / (-w[0, 2])
    if svm_predict[2]>z1:
        User_y = [0]
        x_array = np.array(svm_predict, dtype=float)
        ax.scatter(svm_predict[0], svm_predict[1], svm_predict[2], c='b', marker='x',s=30)
    else:
        User_y = [1]
        x_array = np.array(svm_predict, dtype=float)
        ax.scatter(svm_predict[0], svm_predict[1], svm_predict[2], c='r', marker='x',s=30)

    
    plt.savefig('E:/Anaconda/Scripts/CorsApi/snippets/static/picture/svm_predict.jpg',format='jpg')

