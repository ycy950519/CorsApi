# -*- coding: utf-8 -*-
"""
Created on Tue Dec 18 11:33:47 2018

@author: 叶哥哥
"""
from sklearn.neural_network import MLPClassifier
import pandas as pd
import numpy as np
from ann_visualizer.visualize import ann_viz
import re
import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Dense
from keras.utils import plot_model
from sklearn import preprocessing
import os
import keras

os.environ['TF_CPP_MIN_LOG_LEVEL']='2'
import tensorflow as tf

os.environ["PATH"] += os.pathsep + 'F:/Graphviz2.38/bin'

def createDataSet(data):
    global attribute
    attribute=[]
    for key in data.keys():
        
        attribute.append(key)
    dataset=[]
    labels=[]
    for n in range(len(data[attribute[0]])):
        a=[]
        
        for key in data.keys():
            a.append(data[key][n])
        dataset.append(np.array(a[:-1]))
        labels.append(a[-1])
    attribute=[]
    for key in data.keys():
        key = re.sub(u"\\(.*?\\)\\^[0-9]", "", key)
        attribute.append(re.sub(u"\\(.*?\\)", "", key))    
    
    return dataset,labels                                      
'''
def plotshow(activation,hiddenlayer,solver,max_iter,dataSet,labels):
    
    global clf
    clf = MLPClassifier(activation=activation,solver=solver,max_iter=max_iter,hidden_layer_sizes=(100,hiddenlayer))
    clf.fit(dataSet,labels)
    
    
    
    plt.savefig('E:/Anaconda/Scripts/CorsApi/snippets/static/picture/neural.jpg',format='jpg')

'''
def keras_fun(activation,hiddenlayer,solver,dataSet,labels,split):
   
    keras.backend.clear_session()
    np.random.seed(7)
    global model
    
    model = Sequential()
    model.add(Dense(hiddenlayer,input_dim=len(attribute)-1,activation=activation))#输入层，激活函数
    model.add(Dense(1,input_dim=len(attribute)-1,activation='sigmoid'))
    model.compile(loss='binary_crossentropy',optimizer=solver,metrics=['accuracy'])#缺失函数binary_crossentropy针对二分类问题，性能评估函数
    
    history = model.fit(np.array(dataSet),np.array(labels),validation_split=1-split,epochs=10)
    ann_viz(model,title="Neural network",filename="E:/Anaconda/Scripts/CorsApi/snippets/static/picture/neural.gv")
    
    #plot_model(model, to_file='E:/Anaconda/Scripts/CorsApi/snippets/static/picture/neural.jpg',show_shapes=True)
    model._make_predict_function()
    plt.figure(figsize=(12, 6))
    plt.subplot(1, 2, 1)
    plt.plot(history.history['acc'])
    
    plt.plot(history.history['val_acc'])
    plt.title('Model accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Test'], loc='upper left')
    
    # Plot training & validation loss values
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'])
    plt.plot(history.history['val_loss'])
    plt.title('Model loss')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Test'], loc='upper left')
    plt.savefig("E:/Anaconda/Scripts/CorsApi/snippets/static/picture/neural_pic.jpg") 
    

def main(activation,hiddenlayer,solver,split,data):
    
    dataSet,labels = createDataSet(data)
    #plotshow(activation,hiddenlayer,solver,max_iter,dataSet,labels)
    keras_fun(activation,hiddenlayer,solver,dataSet,labels,split)

def predict(neural_predict):
    neural_list = list(map(eval,neural_predict))
   # print(np.array(neural_list).reshape(len(neural_list),1))
    neural_final=[]
    
    neural_final.append(neural_list)
    
    #dd = model.predict_classes(np.zeros((1, len(attribute)-1)))
    pred = model.predict_classes(np.array(neural_final),verbose=1, batch_size=10)
   
    return pred[0]