/**
 * style ：endpointOption,代表这这个点的样式
 *          targetPoint代表輸入點， sourcePoint代表輸出點
 *         项目应用的sourcePoint targetPoint在该文件下面有定义 要不同的样式可以修改默认的文件 也可在new之后修改
 * anchor : 由一个四元组构成，分为x,y,dx,dy，其中x,y的值可为0~1,dx,dy的值为-1~1
 *          x代表水平方向，y代表竖直方向，dx代表点引出来的线出来时水平方向的偏移角度,dy代表点引出来的线出来时竖直方向的偏移角度
 * uuid : 点唯一的标识
 */
function SP() {
    this.style = sourceEndpoint;
    this.anchor = [];//输入为四元数组 分为 x,y,dx,dy x代表水平位置
    this.uuid = '';
    this.pointType=''
}
function TP() {
    this.style = targetEndpoint;
    this.anchor = [];//输入为四元数组 分为 x,y,dx,dy x代表水平位置
    this.uuid = ''
    this.pointType=''
}

var PointFactory = {
    //default的意思是位置确定（居中）
    getDefaultInPointByType : function (type) {
        var ip = new SP();
        ip.uuid = Math.uuid(16);
        ip.anchor = [0.5, 1, 0.3, -0.7];
        ip.pointType = type;
        return ip;
    },
    getDefaultOutPointByType : function (type) {
        var tp = new TP();
        tp.uuid = Math.uuid(16);
        tp.anchor = [0.5, 0, -0.1, 0.7];
        tp.pointType = type
        return tp;
    },
    getInPoint : function(type,anchor) {
        var ip = new SP();
        ip.uuid = Math.uuid(16);
        ip.anchor = anchor;
        ip.pointType = type
        return ip;
    },
    getOutPoint : function (type,anchor) {
        var tp = new TP();
        tp.uuid = Math.uuid(16);
        tp.anchor = anchor;
        tp.pointType = type
        return tp;
    }

}