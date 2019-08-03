/**
 *
 * jsPlumb适配器 二次封装jsPlumb的常用方法
 * 使用前提：
 *   导入jsPlumb插件  导入baseTpe文件
 */
var allBaseType = Object.create(baseType);

/**
 * nodeContainer 基于Map保存节点信息 key为node id,value为节点信息
 * 提供基本的节点存取方法和一些节点细节信息的读写方法
 *
 */
function nodeContainer() {
    this.nodes = new Map(); //用于保存流程中的每一个节点信息 暂时放置于此 后期可能还需要考虑放到别的位置维护

    this.getPropByID = function(id,node) {
        var props = node.prop
        for(var i = 0 ;i<props.length; i++) {
            if(props[i].id==id)
                return props[i];
        }
        return null;
    }
    this.getPoint = function (key, source, isIn) {
        var node = this.nodes.get(key);
        if (isIn) {
            var sources = node.sourcePoint;
            for (var i = 0; i < sources.length; i++) {
                if (sources[i].uuid == source)
                    return sources[i];
            }
        }
        else {
            var targets = node.targetPoint;
            for (var i = 0; i < targets.length; i++) {
                if (targets[i].uuid == source)
                    return targets[i];
            }
        }
    }
    this.addNode = function (key, value) {
        this.nodes.set(key, value);
    };

    this.getNode = function (key) {
        return this.nodes.get(key);
    };
    //接受的参数是taskNode对象,如果传入的是其他对象则会给原对象添加新属性
    this.updateNode = function (key, tasknode) {
        var result = this.nodes.get(key);
        $.extend(true, result, tasknode);
        this.nodes.set(key, result);
        return result;
    };
    this.addSourcePoint = function (key, point) {
        var result = this.nodes.get(key);
        if (point.style.isSource == true) {
            var points = result.sourcePoint;
            points[points.length] = point;
            $.extend(true, result.sourcePoint, []);
            $.extend(true, result.sourcePoint, points);
            this.nodes.set(key, result);
        }
        else {
            var points = result.targetPoint;
            points[points.length] = point;
            $.extend(true, result.targetPoint, []);
            $.extend(true, result.targetPoint, points);
            this.nodes.set(key, result);
        }
        return result;

    };
    this.addConnection = function (key, connection) {
        var result = this.nodes.get(key);
        result[result.length] = connection;
        this.nodes.set(key, result);
        return result;
    };
    this.addConnection = function (sourceId, targetId, uuid, suuid, tuuid,sourceType,targetType) {
        var connection = {
            uuid: uuid,
            sourceId: sourceId,
            targetId: targetId,
            suuid: suuid,
            tuuid: tuuid,
            sourceType:sourceType,
            targetType:targetType
        };
        var result = this.nodes.get(sourceId);
        var connections = result.connections;

        result.connections[connections.length] = connection;

        this.nodes.set(sourceId, result);

        return result;
    };
    this.removeConnection = function (skey,tkey, sourceId, targetId) {
        var result = this.nodes.get(skey);
        var connections = result.connections;
        // alert("connections="+(connections.length));
        var newArray = new Array();
        var flag = 0;
        for (var i = 0; i < connections.length; i++) {
            //只要有一个不等的逻辑
            // alert(connections[i]['suuid']+" and sourceid ="+sourceId);
            // alert(connections[i]['tuuid']+" and targetid ="+targetId);
            if (connections[i]['suuid'] != sourceId) {
                newArray.push(connections[i]);
            }
            else {
                if (connections[i]['tuuid'] != targetId) {
                    newArray.push(connections[i]);
                }
                else {
                    //删除
                    // alert(connections[i]['uuid']);
                    Util.delConnection(skey,tkey);
                    var node = this.getNode(connections[i].sourceId);
                }
            }
        }
        result.connections = newArray;

        this.nodes.set(skey, result);
    };
    this.updateProp = function (key, prop) {
        var result = this.nodes.get(key);
        $.extend(true, result.prop, prop);
        this.nodes.set(key, result);
        return result;
    };
    this.updatePosition = function (key, position) {
        var result = this.nodes.get(key);
        $.extend(true, result.position, position);
        this.nodes.set(key, result);
        return result;
    };
    this.updatePosition = function (key, vx, vy) {
        var result = this.nodes.get(key);
        var position = new pos();
        position.x = vx;
        position.y = vy;
        result.position = position;
        this.nodes.set(key, result);
        return result;
    }
}
