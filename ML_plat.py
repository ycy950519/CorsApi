# coding:utf-8
from flask import Flask, request, session, redirect, url_for
from flask import render_template
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from pandas import DataFrame
import pandas as pd
from flask import jsonify
from flask import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'you never guess'
'''数据的特征处理'''
data_path = ""
ziduan_select = {}
line = []
sourceid=""
targetid=""

finalpath={}


def minMax(file_path):
    '''
    数据的归一化，避免某一特征对最终结果造成很大的影响
    缺点：容易受异常点的影响
    '''
    pre_data = pd.read_csv(file_path, header=None)
    mms = MinMaxScaler()
    data = mms.fit_transform(pre_data)
    df = DataFrame(data)
    df.to_csv("guiyi.csv", index=False, header=False)
    print(data)


@app.route('/', methods=['GET', 'POST'])
def index():
    print(request.method)

    if request.method == 'POST':
        user_name = str(request.values.get("name"))
        print(user_name)
        minMax("./test_clean")
    return render_template('project.html')


@app.route('/kmeans')
def kmeans():
    return render_template('kmeans_vsavetaskisual.html')


@app.route('/', methods=['GET', 'POST'])
def savetask():
    # return redirect(url_for('kmeans'))
    if request.method == 'POST':
        rev = request.get_json()['name']
        print(rev)
        return redirect(url_for('kmeans'))
    else:
        return "0"


@app.route('/data_source', methods=['GET', 'POST'])
def data_source():
    if request.method == 'POST':
        data_info = [{'a': "/static/a.csv"}, {'b': "/static/b.csv"}]
        return jsonify(data_info)
    else:
        return "0"


@app.route('/canshu', methods=['GET', 'POST'])
def get_canshu():
    path = ""
    if request.method == 'POST':
        path = request.form.get('path')
        print("111")
        print(path)
        return "1"
    else:
        path = "a"
        return "0"


@app.route('/saveConnection', methods=['GET', 'POST'])
def saveConnection():
    if request.method == 'POST':
        data = json.loads(request.form.get('data'))
        relId = data['relId']
        taskid = data['task.taskId']
        totaskId = data['toTaskId']
        sType = data['sourceType']
        tType = data['targetType']

        listtype = []
        listtype.append(sType)
        listtype.append(tType)

        listid = []
        listid.append(taskid)
        listid.append(totaskId)

        connections = {}
        connections['cid'] = relId
        connections['connids'] = listid
        connections['conntype'] = listtype

        line.append(connections)
        # print("最初的：")
        # print(line)

        return "1"
    else:
        return "0"


@app.route('/delConnection', methods=['GET', 'POST'])
def delConnection():
    if request.method == 'POST':
        data = json.loads(request.form.get('data'))
        sourceid=data['sourceid']
        targetid=data['targetid']
        finalConnections(line, sourceid, targetid)

        return "1"

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




@app.route('/delNode', methods=['GET', 'POST'])
def delNode():
    if request.method == 'POST':
        data = json.loads(request.form.get('data'))
        endid=data['endid']
        # print("shanchujieidna :"+endid)
        finalNode(line, endid)

        return "1"
    else:
        return "0"


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





@app.route('/saveLine', methods=['GET', 'POST'])
def saveLine():
    if request.method == 'POST':
        data = json.loads(request.form.get('data'))
        endid=data['endid']
        endtype=data['endtype']

        finalline(line,endid,endtype)

        return "1"
    else:
        return "0"



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
    with open("static/connection.json",'r') as json_file:
        json_dict = json.load(json_file)
        json_dict.append(finalpath)
        print(json_dict)
        json_file.close()


    with open("static/connection.json",'w') as json_file:
        json_conn=json.dumps(json_dict,indent=4)
        json_file.write(json_conn)
        json_file.close()




    return finalpath


    # print(saveconn)







if __name__ == '__main__':
    app.run()
    app.debug = True
