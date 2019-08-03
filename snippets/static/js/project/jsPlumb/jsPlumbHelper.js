



function jsPlumbHelper(container) {

    this.instance = null;
    this.editor = new Editor();
    this.container = new nodeContainer();
    this.currentNode = null;
    this.nodeFactory = new nodeFactory();
    this.getCurrentNode = function () {
        return this.currentNode;
    };
    this.setCurrentNode = function (key) {
        this.currentNode = this.container.getNode(key);
    };
    this.setCurrentNodeEmpty = function () {
        this.currentNode = null;
    }
    this.getJsPlumbInstance = function () {
        return this.instance;
    };
    this.createTaskNode = function (name) {
        var taskNode = this.nodeFactory[name]();
        var id = Math.uuid(16);
        taskNode.id = id;
        this.container.addNode(id, taskNode);
        var props = taskNode.prop;
        for (var i = 0; i < props.length; i++) {
            props[i].id = Math.uuid(16);
            if('initValue' in props[i]) {
                if('AutoGenerate'==props[i].initValue) {
                    props[i].value= props[i].name+Math.uuid(8);
                }
                else
                    props[i].value = props[i].initValue
            }
        }
        return taskNode;
    };
    this.isInit = false;
    this.init = function (container) {
        _jsPlumb = jsPlumb.getInstance({
            deleteEndpointsOnDetach:false,
            ConnectionOverlays: [
                ["Arrow", {
                    location: 1,
                    visible: true,
                    width: 11,
                    length: 11,
                    id: "ARROW",
                    events: {
                        click: function () {
                            console.log("you clicked on the arrow overlay")
                        }
                    }
                }],
                ["Label", {
                    location: 0.1,
                    id: "label",
                    cssClass: "aLabel",
                    events: {
                        tap: function () {

                        }
                    }
                }]
            ],

            Container: container
        });
        var helper = this;
        _jsPlumb.bind("connection", function (connInfo, originalEvent) {
            helper.addConnection(connInfo, originalEvent);
        });
        _jsPlumb.bind("contextmenu", function (conn, originalEvent) { //dblclick
            helper.removeConnection(conn);
        });
        this.instance = _jsPlumb;
        this.isInit = true;

    };

    /*
     * 给jsPlumb注册链接类型，该类型是一对象，里面设置了做连接操作是的各个属性
     */
    this.registerConnectionType = function (typename, type) {
        this.instance.registerConnectionType(typename, type);
    };

    /*
     * 组合组建初始化类型，以下几个conbine方法都由一个基类两次从original和type两个类型中扩展而来
     */
    this.conbineConnectionType = function (original, type) {
        var resultType = Object.create(basicConnectionType);
        $.extend(true, resultType, original);
        $.extend(true, resultType, type);
        return resultType;
    };
    this.conbineSourceEndpoint = function (original, type) {
        var resultType = Object.create(sourceEndpoint);
        $.extend(true, resultType, original);
        $.extend(true, resultType, type);
        return resultType;
    };
    this.conbineTargetEndpoint = function (original, type) {
        var resultType = Object.create(targetEndpoint);
        $.extend(true, resultType, original);
        $.extend(true, resultType, type);
        return resultType;
    };
    this.conbine = function (typename, original, type) {
        var resultType = allBaseType[typename];
        $.extend(true, resultType, original);
        $.extend(true, resultType, type);
        return resultType;
    };

    /**
     * 添加jsPlumb时间监听器
     * @param {Object} _jsPlumb jsPlumb实例
     * @param {String} evenType 事件类型（字符串）
     * @param {Fucetion} callback 监听时间的回调函数（函数）
     */
    this.addEvenListener = function (evenType, callback) {
        this.instance.bind(evenType, callback);
    };

    /**
     * 给指定元素添加连接点
     * @param {Object} instance jsPlumb实例
     * @param {Object} toId 元素id
     * @param {Object} sourceAnchors 添加的源锚点位置
     * @param {Object} targetAnchors 添加的目标锚点位置
     * @param {Object} sourceEndpoint 源点样式对象
     * @param {Object} targetEndpoint 目标点样式对象
     */
    this.addEndpoints = function (toId, sourceAnchors, targetAnchors, sourceEndpoint, targetEndpoint) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = 'anchor-' + toId + '-' + sourceAnchors[i];
            this.instance.addEndpoint(toId, sourceEndpoint, {
                anchor: sourceAnchors[i],
                uuid: sourceUUID
            });
        }
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = 'anchor-' + toId + '-' + targetAnchors[j];
            this.instance.addEndpoint(toId, targetEndpoint, {
                anchor: targetAnchors[j],
                uuid: targetUUID
            });
        }
    };
    this.addEndpoint = function (toId, point) {
        if (point == null) {
            point = Object.create(point);
            point.style = allBaseType.sourceEndpoint;
            point.style = [0.5, 1, 1, 0];
            //			point.uuid = 'xxxxxxxxxxxxxxxxx';
        }
        this.instance.addEndpoint(toId, point.style, {
            anchor: point.anchor,
            uuid: point.uuid
        });

        this.container.addSourcePoint(toId, point);

        //      instance.addEndpoint(toId, { uuid: point.uuid }, point.style );
    };


    /**
     * 设置jsPlumb可以拖拉的对象
     * @param {Object} _jsPlumb jsPlumb实例
     * @param {String} selector 可以拖动的元素
     */
    this.setDraggable = function (selector, filter) {
        var helper = this;
        var option = {
            drag: function () {
                console.log('....draging....')
            },
            stop: function (event, ui) {
                console.log('....stop....');
                var id = event.el.id;
                var x = event.pos[0];
                var y = event.pos[1];
                helper.setPosition(id, x, y);
                var node = helper.container.getNode(id);
                //todo update node here
				Util.dragnewNode(id,x,y,node.type)
            },
            containment: "parent"
        };
        this.instance.draggable(jsPlumb.getSelector(selector), option);
    };

    /**
     * 调用jsPlumb的batch接口，可以在里面执行多步操作
     * @param {Object} _jsPlumb
     * @param {Object} fn
     */
    this.batch = function (fn) {
        this.instance.batch(fn);
    };

    /**
     * 把指定的元素绑定到一个特定组中 拖动是整个组的元素一起拖动 暂时没有需求 没写
     */
    this.addToPosse = function () {

    };
    this.removeFromPosse = function () {

    };

    //用于复现时添加连接
    this.connectByPoint = function (p1, p2) {
        var conn = this.instance.connect({
            uuids: [p1.uuid, p2.uuid]
        });
        return conn;
    };
    this.connectByUuid = function (source, target) {
        var conn = this.instance.connect({
            uuids: [source, target]
        });
        return conn;
    };

    //该方法必须绑定connection事件后才能获取conn进行使用
    this.removeConnection = function (conn) {
        var sourceId = conn.endpoints[0]._jsPlumb.uuid;
        var targetId = conn.endpoints[1]._jsPlumb.uuid;
        var sKey = conn.sourceId;
        var tKey = conn.targetId;
        this.container.removeConnection(sKey,tKey, sourceId, targetId);
        var sn = this.container.nodes.get(sKey);
        var tn = this.container.nodes.get(tKey);
        var sProp = sn.prop;
        var tProp = tn.prop;
        for(var i =0;i<sProp.length;i++) {
            if(sProp[i].editor == 'hideConstOutput') {
                for(var j =0;j<tProp.length;j++) {
                    if(tProp[j].editor == 'hideConstInput') {
                        if(tProp[j].group == sProp[i].group) {
                            tProp[j].value='';
                        }
                    }
                }
            }
        }
       //todo update node here
        this.instance.detach(conn);
    };
    //jsPlumb绑定的方法
    this.addConnection = function (connInfo, originalEvent) {
        var helper = Util.getHelper();
        var sourceId = connInfo.sourceId;
        var targetId = connInfo.targetId;
        var suuid = connInfo.sourceEndpoint._jsPlumb.uuid;//綫頭
        var tuuid = connInfo.targetEndpoint._jsPlumb.uuid;//
        var sp = helper.container.getPoint(sourceId,suuid,true);
        var tp = helper.container.getPoint(targetId,tuuid,false);
        // var sourceType=helper.container.getPropByID(sourceId).type(this);
        // print(sourceType);
        var sourceType=sp.pointType;
        var targetType=tp.pointType;
        var type_s=helper.container.getNode(sourceId).type;
        var type_t=helper.container.getNode(targetId).type;
        // var stType=connInfo.type;
        if(sourceType !=targetType) {
            helper.instance.detach(connInfo);
            layer.msg("不能连接不同属性的结点！！！！",{icon:0});
            return
        }
        var data={'sourceid':sourceId,'sourcetype':type_s,"type":"checkupnode"};
		$.ajax({
            type: "POST",
            url: "/task",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=UTF-8',
            success: function (msg) {
                if (msg.code == "1") {

                    var node = helper.container.getNode(sourceId);
                    var connections = node.connections;
                    for (var i = 0; i < connections.length; i++) {
                        if (connections[i].sourceId == sourceId &&
                            connections[i].targetId == targetId &&
                            connections[i].suuid == suuid &&
                            connections[i].tuuid == tuuid) {
                            return;
                        }
                    }
                    var uuid = Math.uuid(16);
                    helper.container.addConnection(sourceId, targetId, uuid, suuid, tuuid,type_s,type_t);

                    Util.saveConnection(uuid, sourceId, targetId,type_s,type_t);

                    var sn = helper.container.nodes.get(sourceId);
                    var tn = helper.container.nodes.get(targetId);
                    var sProp = sn.prop;
                    var tProp = tn.prop;
                    for(var i =0;i<sProp.length;i++) {
                        if(sProp[i].editor == 'hideConstOutput') {
                            for(var j =0;j<tProp.length;j++) {
                                if(tProp[j].editor == 'hideConstInput') {
                                    if(tProp[j].group == sProp[i].group) {
                                        tProp[j].value=sProp[i].value;
                                    }
                                }
                            }
                        }
                    }
                }
                else if(msg.code == "0"){
                     helper.instance.detach(connInfo);
                    //helper.removeConnection(connInfo)
                    layer.msg("请选择上一个结点属性！！！",{icon:0});
                    return
                }
            }
        })
    }
    this.setPosition = function (tasknode, x, y) {
        var node = $('#' + tasknode);
        node.css('left', x);
        node.css('top', y);
        this.container.updatePosition(tasknode, x, y);
    }

    /**
     * 发布jsPlumb实例
     * @param {String} name
     * @param {Object} _jsPlumb
     */
    this.publish = function (name) {
        jsPlumb.fire(name, this.instance);
    }
}




