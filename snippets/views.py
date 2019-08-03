from rest_framework.response import Response
from django.shortcuts import render_to_response  
from django.http import HttpResponse
from django.template import RequestContext,Template
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth import  get_user_model
from rest_framework.decorators import api_view
from rest_framework import authentication, permissions,viewsets
import numpy as np
from rest_framework_jwt.settings import api_settings
import ast
from django.db import connection
from sklearn.decomposition import PCA
from .serializers import TaskSerializer
import csv
import json
import sys  
sys.path.append(r'E:\Anaconda\Scripts\CorsApi\snippets')
from .models import *
import dealLosing
import removeDuplicate
import standard
import normal
import pca
import boxing
import smote
import naivebayes
import decisiontree
import randomforest
import decisionTreeReg
import gbdt
import logistic
import svm
import neural
import linear
import neuralReg
import kmeans
import os
os.environ['TF_CPP_MIN_LOG_LEVEL']='2'
import tensorflow as tf
data_path = ""
ziduan_select = {}
line = []
sourceid=""
targetid=""
finalpath={}

storeage={}


@api_view(['GET', 'POST'])
def task_list(request):
    Method = request.method
    cursor = connection.cursor()
    #print(request.FILES)
    #print(request.body)
    
    if request.method == 'GET':
        #serializer = TaskSerializer(data=request.data)
        
        return render(request, 'snippets/project.html', locals())

    elif request.method == 'POST':
        
        try:
            postBody = request.body
            json_result = json.loads(postBody)
            
        #print(json_result)
        except:
            try:
                file_obj = request.FILES.get('file_obj')
                
                with open('E:/Anaconda/Scripts/CorsApi/snippets/temp_file/'+file_obj.name, 'wb+') as f:
                    for i in  file_obj.readlines():
                        f.write(i)
                
                myfile = file_obj.name.strip('.csv')
                
                with open('E:/Anaconda/Scripts/CorsApi/snippets/temp_file/'+myfile+'.csv','rt',encoding="utf-8") as csvfile:
                    reader = csv.reader(csvfile)
                    rows = [row for row in reader]
                csvfile.close()
                global myfile_name
                myfile_name=myfile
                global row
                row = rows[0]
                resp={
                        'attribute':row,
                        'rows':rows,
                        }
                storeage['data_source'] = {'data':rows,'attribute':row}#data是列表数据集，dataset是字典数据集
            except:
                resp={
                        'attribute':'输入的文件不符合要求！',
                        
                        }
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type'] == 'dragnode':
            nodeid = json_result['nodeid']
            nodex = json_result['x']
            nodey = json_result['y']
            nodetype = json_result['nodetype']
            resp = {}
            if nodetype != '':
                if nodetype == 'local':
                    n = Localdata.objects.create(id=nodeid, positionx=nodex, positiony=nodey)
                    n.save()
                    resp = {'code': '1'}
                else:
                    dataname = nodetype.lower()
                    cursor.execute(
                        "insert into " + dataname + " (id,positionx,positiony) values('" + nodeid + "','" + str(
                            nodex) + "','" + str(nodey) + "')")
                    resp = {'code': '1'}
            else:
                resp = {'code': '0'}

            return HttpResponse(json.dumps(resp), content_type="application/json")

            # 移动结点时更新x和y

        if json_result['type'] == 'dragnewnode':
            nodeid = json_result['nodeid']
            print(nodeid)
            nodex = json_result['x']
            nodey = json_result['y']
            nodetype = json_result['nodetype']
            resp = {}
            if nodetype != '':
                if nodetype == 'local':
                    n = Localdata.objects.get(id=nodeid)
                    n.positionx = nodex
                    n.positiony = nodey
                    n.save()
                    resp = {'code': '1'}
                else:
                    dataname = nodetype.lower()
                    cursor.execute("update " + dataname + " set positionx='" + str(nodex) + "',positiony='" + str(
                        nodey) + "' where id='" + nodeid + "'")
                    resp = {'code': '1'}
            else:
                resp = {'code': '0'}

            return HttpResponse(json.dumps(resp), content_type="application/json")

        if json_result['type'] == 'checkupnode':
            sourceid = json_result['sourceid']
            sourcetype = json_result['sourcetype']
            resp = {}
            if sourcetype == '':
                resp = {'code': '0'}
            else:
                if sourcetype == 'local':
                    print("连接的source！！是local")
                    cursor.execute("select type from localdata where id='" + sourceid + "'")
                    raw = cursor.fetchone()
                    if raw[0] is None:
                        resp = {'code': '0'}
                    else:
                        resp = {'code': '1'}
                else:
                    print("连接的source！！" + sourcetype)
                    dataname = sourcetype.lower()
                    cursor.execute("select type from " + dataname + " where id='" + sourceid + "'")
                    raw = cursor.fetchone()
                    if raw[0] is None:
                        resp = {'code': '0'}
                    else:
                        resp = {'code': '1'}
            return HttpResponse(json.dumps(resp), content_type="application/json")

        if json_result['type'] == 'delConnection':
            sourceid = json_result['sourceid']
            targetid = json_result['targetid']
            # finalConnections(line, sourceid, targetid)
            cursor.execute(
                "select targettype from connections where targetid='" + targetid + "' and sourceid='" + sourceid + "'")
            raw = cursor.fetchone()[0]
            cursor.execute("update " + raw.lower() + " set type=null where id='" + targetid + "'")

            cursor.execute("delete from connections where sourceid='" + sourceid + "' and targetid='" + targetid + "'")

            resp = {
                'code': '1'
            }
            return HttpResponse(json.dumps(resp), content_type="application/json")

        if json_result['type'] == 'saveConnection':

            relId = json_result['relId']
            taskid = json_result['task.taskId']
            totaskId = json_result['toTaskId']
            sType = json_result['sourceType']
            tType = json_result['targetType']

            filterresult = Connections.objects.filter(connectionid=relId)
            if (len(filterresult) > 0):
                resp = {'code': '0'}
            else:
                c = Connections.objects.create(connectionid=relId, sourceid=taskid, targetid=totaskId, sourcetype=sType,
                                               targettype=tType)
                c.save()
                if sType=='local' and tType=='selectField':
                    _sql="select `row` from localdata where id='"+taskid+"';"
                    
                    print(_sql)
                    cursor.execute(_sql)
                    datatitle=cursor.fetchone()#从上一个节点中找到属性并传入下一个结点
                    print("连接后把信息传入下一个结点:")
                    print(datatitle[0])
                    datatitlelist=eval(datatitle[0])

                    resp = {
                        'code': '1',
                        'attribute': datatitlelist
                    }
                else:
                    resp={'code':'2'}

            return HttpResponse(json.dumps(resp), content_type="application/json")

        if json_result['type'] == 'delNode':

            endid = json_result['endid']
            endtype = json_result['endtype']

            if endtype == 'local':
                Localdata.objects.filter(id=endid).delete()
            else:
                cursor.execute("delete from " + endtype.lower() + " where id='" + endid + "'")

            cursor.execute("delete from connections where sourceid='" + endid + "' or targetid='" + endid + "'")

            finalNode(line, endid)
            resp = {}
            return HttpResponse(json.dumps(resp), content_type="application/json")
        
        
        if json_result['type']=='saveLine':
            
            endid=json_result['endid']
            endtype=json_result['endtype']
            finalline(line,endid,endtype)
            resp={}
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
       
        
        
        if json_result['type']=='data_source':
            global filename
            dataid = json_result['dataid']
            filename = json_result['data']
            nodetype=json_result['nodetype']

            print("选择的数据库是："+filename)
            choosedata = 'E:/Anaconda/Scripts/CorsApi/snippets/Resource/‎file/' + filename + '.csv'
            with open(choosedata, 'rt', encoding="UTF-8-sig") as csvfile:
                reader = csv.reader(csvfile)
                datarows = [row for row in reader]
            csvfile.close()
            
            global row1
            row1 = datarows[0]  #所有列表头
            print(row1)
            #更新结点信息，把选择的数据保存到数据库中
            Localdata.objects.filter(id=dataid).update(choosedataset=choosedata, type=nodetype,row=row1)

            resp = {
                'code': '1',
                'rows': datarows  # rows表示所有数据
            }
            # storeage['data_source'] = {'data':datatitle,'attribute':datatitle}#data是列表数据集，dataset是字典数据集
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='field':
            arr=json_result['data']
            nodeid = json_result['nodeid']
            nodetype = json_result['nodetype']


            print("复选框的结点id：" + nodeid + "复选框的结点type：" + nodetype)
            
            cursor.execute("select sourceid,sourcetype from connections where targetid='" + nodeid + "'")
            raw = cursor.fetchone()
            dataid = raw[0]
            print(raw)

            cursor.execute("select choosedataset from localdata where id='" + dataid + "'")
            choosedata = cursor.fetchone()[0]
            file_orignal=json_result['file_orignal']
            #print(file_orignal)
            column_data = {}  
            dataset={}
            lis=['']
            interval = {}
            for attribute in arr:
                if(file_orignal=='hive'):
                    with open('E:/Anaconda/Scripts/CorsApi/snippets/temp_file/'+myfile_name+'.csv','rt',encoding="UTF-8-sig") as csvfile:
                    
                        reader = csv.DictReader(csvfile)               
                        column = [row[attribute] for row in reader]
                        #column_data[attribute]=column
                        
                        try:
                            column_data[attribute]=column
                            column=list(map(eval,column))
                            interval[attribute]=[min(column),max(column)]
                        except:
                            column = ["null" if x in lis else x for x in column]
                            column_data[attribute]=column
                            for i in range(len(column)-1,-1,-1):
                                if column[i]=='null':
                                    column.pop(i)
                            
                            interval[attribute]=[min(column),max(column)]
                if(file_orignal=='local'):
                    with open('E:/Anaconda/Scripts/CorsApi/snippets/Resource/‎file/'+filename+'.csv','rt',encoding="UTF-8-sig") as csvfile:
                    
                        reader = csv.DictReader(csvfile)               
                        column = [row1[attribute] for row1 in reader]
                        #column_data[attribute]=column
                        
                        try:
                            column_data[attribute]=column
                            column=list(map(eval,column))
                            interval[attribute]=[min(column),max(column)]
                        except:
                            column = ["null" if x in lis else x for x in column]
                            column_data[attribute]=column
                            for i in range(len(column)-1,-1,-1):
                                if column[i]=='null':
                                    column.pop(i)
                            
                            interval[attribute]=[min(column),max(column)]
                        
            #print(column_data)        
            resp={
                    'column_data': column_data,
                    'interval':interval,
                    }
            Selectfield.objects.filter(id=nodeid).update(checkbox=arr, type=nodetype,datasource=column_data)

            
            #storeage['attribute'] = {'data':arr,'column':column_data,'dataset':dataset} 
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='deallosing':
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                dataset = ast.literal_eval(s)
                
                column_data = {}
                #dataset = storeage['attribute']['dataset']
                method = json_result['method']
                
                if method=='填充缺省值':
                    dataset = dealLosing.deallosing(dataset)
                if method=='删除缺省值':
                    dataset = dealLosing.dellosing(dataset)
                
                resp={
                        'code':'1',
                        'deallosing':dataset,
                        
                        }
                #storeage['transform'] = {'data':dataset,'type':'deallosing'}
                Cleanmissing.objects.filter(id=nodeid).update(type=nodetype,attribute=method,datasource=dataset)
        
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='removeDuplicate':
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                
                duplicate = removeDuplicate.main(data)
                
                resp={
                        'code':'1',
                        'removeDuplicate':duplicate,
                        
                        }
            #storeage['transform'] = {'data':duplicate,'type':'duplicate'}
                Removeduplicate.objects.filter(id=nodeid).update(type=nodetype,datasource=duplicate)
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='smote':
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
              
                smote_data = smote.main(data)
                
                resp={
                        'code':'1',
                        'smote':smote_data,
                        
                        }
                #storeage['transform'] = {'data':smote_data,'type':'smote'}
                Smote.objects.filter(id=nodeid).update(type=nodetype,datasource=smote_data)
                
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='standard':
            column_data = {}
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                
                for attribute in data:
                    inner_list=[]
                    
                    if attribute!='result':
                        X = np.array(data[attribute],dtype=np.float64).reshape(-1,1)
                          
                        list_new = standard.standard(X) 
                        for n in list_new:
                        
                            inner_list.append(str(round(n[0],2)))
                        column_data[attribute]=inner_list 
                    else:
                        rs=map(str,data[attribute])
                        column_data[attribute]=list(rs)  
                
                resp={
                        'code':'1',
                        'standard':column_data,
                        
                        }
                #storeage['transform'] = {'data':column_data,'type':'standard'}
                Standard.objects.filter(id=nodeid).update(type=nodetype,datasource=column_data)
                
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='normal':
            column_data = {}
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                
                for attribute in data:
                    inner_list=[]
                    
                    if attribute!='result':
                         
                        X = np.array(data[attribute],dtype=np.float64).reshape(-1,1)
                          
                        X_minMax = normal.normal(X) 
                        for n in X_minMax:
                        
                            inner_list.append(str(round(n[0],2)))
                        column_data[attribute]=inner_list 
                    else:
                        rs=map(str,data[attribute])
                        column_data[attribute]=list(rs)  
                #print(column_data.keys())
                resp={
                        'code':'1',
                        'normalization':column_data,
                        
                        }
                Normalization.objects.filter(id=nodeid).update(type=nodetype,datasource=column_data)
                #storeage['transform'] = {'data':column_data,'type':'normal'}
                
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='pca':
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                
                column_data = {}
                attribute=['dimension1','dimension2','result']
                inner_list=[]   
                column_data={}
                 
                ratios,value,components = pca.components(data)
                list_new = pca.pca(data)
                
                for i in range(len(list_new[0])):
                    column_data[attribute[i]]=[]
                    for n in range(len(list_new)):
                        column_data[attribute[i]].append(str(round(float(list_new[n][i]),2)))
                
                canshu = {
                        'ratios':list([round(item,2) for item in ratios]),
                        'value':list([round(item,2) for item in value]),
                        'components':components
                        }
                
                resp={
                        'code':'1',
                        'ratios':list([round(item,2) for item in ratios]),
                        'value':list([round(item,2) for item in value]),
                        'components':components,
                        'pca':column_data,
                        }
                #storeage['transform'] = {'data':column_data,'type':'pca'}
                #storeage['transform'] = {'data':value}
                Pca.objects.filter(id=nodeid).update(type=nodetype,datasource=column_data,attribute=canshu)
                
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='boxing':
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                column_data = {}
                
                for attribute in data:
                    
                    if attribute=='result':
                        rs=map(eval,data[attribute])
                
                try:
                    data.pop('result')   
                except:
                    data=data
                column_data = boxing.main(data,list(rs))
                
                resp={
                        'code':'1',
                        'boxing':column_data,
                        
                        }
                Boxing.objects.filter(id=nodeid).update(type=nodetype,datasource=column_data)
                
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        

        
        if json_result['type']=='decision_tree':         
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                max_depth = int(json_result['max_depth'])
                criterion = json_result['criterion']
                splitter = json_result['splitter']
                min_samples_split = int(json_result['min_samples_split'])
                split =  float(json_result['split'])
                canshu = {'max_depth':max_depth,'criterion':criterion,'splitter':splitter,
                          'min_samples_split':min_samples_split,'split':split}
                Decisiontree.objects.filter(id=nodeid).update(attribute=canshu,type='decisiontree')
                score = decisiontree.dtree(max_depth,criterion,splitter,min_samples_split,split,data)
                
                resp={
                        'code':'1',
                        'score':score,
                        }
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='dtree_predict':
            a=[]
            dtree_predict= json_result['data']
            #dtree_predict = np.float64(dtree_predict)
            
            a.append(dtree_predict)
            pred = decisiontree.predict(a)
            
            resp={
                    'pred':[str(i) for i in pred],
                    }
            
            return HttpResponse(json.dumps(resp),content_type="application/json")    
    
        if json_result['type']=='randomforest':         
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                max_depth = int(json_result['max_depth'])
                criterion = json_result['criterion']
                min_samples_split = int(json_result['min_samples_split'])
                max_features = json_result['max_features']
                split =  float(json_result['split'])
                dataset,labels,attribute = randomforest.createDataSet(data)
                
                canshu = {'max_depth':max_depth,'criterion':criterion,'max_features':max_features,
                          'min_samples_split':min_samples_split,'split':split}
                
                
                
                randomforest.randomforest(dataset,labels,attribute,max_depth,criterion,min_samples_split,max_features,split)
                
                resp={
                        'code':'1',
                        }
                Randomforest.objects.filter(id=nodeid).update(attribute=canshu,type='randomforest')
                
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='randomforest_predict':
            a=[]
            randomforest_predict= json_result['data']
            #dtree_predict = np.float64(dtree_predict)
            
            a.append(randomforest_predict)
            pred = randomforest.predict(a)
            
            resp={
                    'pred':[str(i) for i in pred],
                    }
            
            return HttpResponse(json.dumps(resp),content_type="application/json") 
        
        if json_result['type']=='gbdt':         
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
            
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                loss = json_result['loss']
                learning_rate = float(json_result['learning_rate'])
                n_estimators = int(json_result['n_estimators'])
                max_features = json_result['max_features']
                max_depth = int(json_result['max_depth'])
                min_samples_split = int(json_result['min_samples_split'])
                split =  float(json_result['split']) 
                canshu = {'loss':loss,'learning_rate':learning_rate,'n_estimators':n_estimators,'max_features':max_features,
                          'max_depth':max_depth,'min_samples_split':min_samples_split,'split':split
                          }
                
                score = gbdt.main(loss,learning_rate,n_estimators,max_features,max_depth,min_samples_split,split,data)
                
                resp={
                        'code':'1',
                        'score':score,
                        }
                Gbdt.objects.filter(id=nodeid).update(attribute=canshu,type='gbdt')
                
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='gbdt_predict':
            a=[]
            gbdt_predict= json_result['data']
            #dtree_predict = np.float64(dtree_predict)
            
            a.append(gbdt_predict)
            pred = gbdt.predict(a)
            
            resp={
                    'pred':[str(i) for i in pred],
                    }
            
            return HttpResponse(json.dumps(resp),content_type="application/json") 
        
        if json_result['type']=='logistic':         
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                
                solver = json_result['solver']
                split = float(json_result['split'])
                canshu = {'solver':solver,'split':split}
                score = logistic.main(solver,split,data)
                
                resp={
                        'code':'1',
                        'score':score,
                        }
                Logitreg.objects.filter(id=nodeid).update(attribute=canshu,type='logitreg')
                
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='logistic_predict':         
            
            
            logistic_predict = json_result['data']
            
            pred = logistic.predict(logistic_predict)
            
            resp={
                    'pred':[str(i) for i in pred],
                    }
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='svm':         
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                split = float(json_result['split'])
                penalty = eval(json_result['penalty'])
                
                canshu = {'split':split,'penalty':penalty}
                    
                
                score = svm.main(data,penalty,split) 
                resp={
                        'code':'1',
                        'score':score,
                        }
                Svm.objects.filter(id=nodeid).update(attribute=canshu,type='svm')
                
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='svm_predict':
            
            data=[]
            
            svm_predict= json_result['data']
            
            svm.predict(list(map(eval,svm_predict)))
            resp={
                    
                    }
        
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='bayes':
            
            nodeid = json_result['nodeid']
            tablen=Connections.objects.filter(targetid=nodeid)
            
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                split = float(json_result['split'])   
                method = json_result['method']
                
                canshu = {'split':split,'method':method}
                
                
                score = naivebayes.bayes(method,split,data)
               
                
                resp={
                        'code':'1',
                       
                        'score':score,
                        
                        }
                Naivebayes.objects.filter(id=nodeid).update(attribute=canshu,type='naivebayes')
                
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        
        if json_result['type']=='bayes_predict':
            
            
            bayes_predict= json_result['data']
            #dtree_predict = np.float64(dtree_predict)
            
            pred = naivebayes.predict(bayes_predict)
            
            resp={
                    'pred':[str(i) for i in pred],
                    }
        
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='neural':
            
            nodeid = json_result['nodeid']
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                activation = json_result['activation']
                hiddenlayer = int(json_result['hiddenlayer'])
                solver = json_result['solver']
                split = float(json_result['split'])
                
                canshu = {'activation':activation,'hiddenlayer':hiddenlayer,
                          'solver':solver,'split':split}
                
                
                neural.main(activation,hiddenlayer,solver,split,data)
                
                resp={
                        'code':'1'
                        }
                Neuralnet.objects.filter(id=nodeid).update(attribute=canshu,type='neuralnet')
                 
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='neural_predict':
            
            neural_predict= json_result['data']
            #dtree_predict = np.float64(dtree_predict)
            
            
            pred = neural.predict(neural_predict)
            
            resp={
                    'pred':[str(i) for i in pred],
                    }
            
            return HttpResponse(json.dumps(resp),content_type="application/json") 
        
        if json_result['type']=='linear':
            
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                split = float(json_result['split'])
                
                canshu = {'split':split}
                
                
                score,column_data = linear.main(data,split)
                
                resp={
                        'code':'1',
                        'orignal_data':column_data,
                        'score':score,
                        }
                Linearreg.objects.filter(id=nodeid).update(type='linearreg',attribute=canshu)
                
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='linear_predict':         
           
            linear_predict = json_result['data']
            
            pred = linear.predict(linear_predict)
            
            resp={
                    'pred':[str(pred)],
                    }
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='decisionTreeReg':         
            
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                split = float(json_result['split'])
                
                canshu = {'split':split}
                
                
                decisionTreeReg.main(data,split)
                
                resp={
                        'code':'1'
                        }
                Decisiontreereg.objects.filter(id=nodeid).update(type='decisiontreereg',attribute=canshu)
                
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='decisionTreeReg_predict':         
            
            data=[]
            
            decisionTreeReg_predict= json_result['data']
            data.append(list(map(eval,decisionTreeReg_predict)))
            pred = decisionTreeReg.predict(data)
            
            resp={
                    'pred':[round(i,2) for i in pred],  
                    }
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='neuralReg':         
            
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                activation = json_result['activation']
                solver = json_result['solver']
                split = float(json_result['split'])
                
                canshu = {'activation':activation,'solver':solver,'split':split}
                
                
                score = neuralReg.main(activation,solver,data,split)
                
                resp={
                        'code':'1',
                        'score':score,
                        }
                Neuralreg.objects.filter(id=nodeid).update(attribute=canshu,type='neuralreg')
                
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='neuralReg_predict':         
            
            data=[]
            
            neuralReg_predict= json_result['data']
            data.append(list(map(eval,neuralReg_predict)))
            pred = neuralReg.predict(data)
            
            resp={
                    'pred':[round(i,2) for i in pred],  
                    }
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='kmeans':         
            
            nodeid = json_result['nodeid']
            
            tablen=Connections.objects.filter(targetid=nodeid)
            if len(tablen)==0:
                resp={'code':'0'}
            elif len(tablen)>0:
                nodetype = json_result['nodetype']
                cursor.execute("select sourcetype,sourceid from connections where targettype='" + nodetype + "'"+"and targetid='"+nodeid+"'")
                result = cursor.fetchone()
                
                tableName = result[0]
                tablename = tableName.lower()
                tableid = result[1]
                
                cursor.execute("select datasource from " + tablename + " where id='"+tableid+"'")
                s = cursor.fetchone()[0]
                data = ast.literal_eval(s)
                
                k_value = int(json_result['k_value'])
                split = float(json_result['split'])
                
                canshu = {'k_value':k_value,'split':split}
                
                
                score,column_data = kmeans.main(data,k_value,split)     
                
                resp={
                        'code':'1',
                        'orignal_data':column_data,
                        'k_value':k_value,
                        'score':score,
                        }
                Kmeans.objects.filter(id=nodeid).update(attribute=canshu,type='kmeans')
                
            
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        if json_result['type']=='kmeans_predict':
            
            data=[]
            
            kmeans_predict= json_result['data']
            data.append(kmeans_predict)
      
            pred = kmeans.predict(data)
        
            resp={
                    'pred':[str(i) for i in pred],
                    }
        
            return HttpResponse(json.dumps(resp),content_type="application/json")
        
        return render(request, 'snippets/project.html', locals())

    

def finalline(line,endid,endtype):
    i = 0
    new_list = line

    saveconns = []
    while i < len(new_list):
        if 'local'in new_list[i]['conntype'] or 'hive' in new_list[i]['conntype']:
            saveconns.append(new_list[i])
            new_list.remove(new_list[i])
            i=0
            break
        else:
            i += 1

    j=0
    while i<len(new_list) and j<len(saveconns):
        if saveconns[j]['connids'][1]==endid:
            break
        else :
            if saveconns[j]['connids'][1]==new_list[i]['connids'][0]:
                saveconns.append(new_list[i])
                new_list.remove(new_list[i])
                j+=1
                i=0
                if saveconns[j]['connids'][1] == endid:
                    break
            else:
                i+=1

    saveids=[]
    savetypes=[]
    for i in range(len(saveconns)):
        saveids.append(saveconns[i]['connids'][0])
        saveids.append(saveconns[i]['connids'][1])
        savetypes.append(saveconns[i]['conntype'][0])
        savetypes.append(saveconns[i]['conntype'][1])

    saveids1=list(set(saveids))
    saveids1.sort(key=saveids.index)

    savetypes1 = list(set(savetypes))
    savetypes1.sort(key=savetypes.index)

    finalpath['connid']=saveids1
    finalpath['conntype']=savetypes1


    json_dict=[]
    with open("E:/Anaconda/Scripts/CorsApi/snippets/static/connection.json",'r') as json_file:
        json_dict = json.load(json_file)
        json_dict.append(finalpath)
        print(json_dict)
        json_file.close()


    with open("E:/Anaconda/Scripts/CorsApi/snippets/static/connection.json",'w') as json_file:
        json_conn=json.dumps(json_dict,indent=4)
        json_file.write(json_conn)
        json_file.close()

    return finalpath

def finalConnections(connectionlist,sourceid,targetid):
    i=0
    while i<len(connectionlist):
        # print(connectionlist)
        evelist=connectionlist[i]['connids']
        if evelist[0]==sourceid and evelist[1]==targetid:
            connectionlist.remove(connectionlist[i])
        else:
            i+=1
    line=connectionlist
    # print("删除连线以后：")
    # print(line)

    return line       

def finalNode(connectionlist,endid):
    i=0
    # print("要删除的结点id信息："+endid)
    while i<len(connectionlist):
        eveidlist=connectionlist[i]['connids']
        if endid in eveidlist:
            connectionlist.remove(connectionlist[i])
        else:
            i=+1
    line = connectionlist
    # print("删除结点以后：")
    # print(line)

    return line

@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk, format=None):
	try:
		task = Task.objects.get(pk=pk)
	except Task.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = TaskSerializer(task)
		return Response(serializer.data)

	elif request.method == 'PUT':
		serializer = StoreSerializer(store, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		task.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
    

