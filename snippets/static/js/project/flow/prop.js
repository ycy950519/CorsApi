/**
 * @description 该文件主要用来编写不同类型的节点 对于每一种类型，都需要
 *              写一个该类型对应的类，模版可参照testNode
 *              写完一个节点类型后需要在nodeFactory中添加创建该类型对象的方法
 *              方法名必须为该类型名，具体参照testNode
 * @author Wang zhiwen
 * @type {{id: string, text: string, srcClass: string, note: string}}
 */
var rect = {
    id: 'rid',
    text: 'start',
    srcClass: 'glyphicon glyphicon-star',
    note: 'tttt',

}

var prop = {}
// var pos = {
//     x: 0,
//     y: 0
// }
function pos() {
    this.x = 0;
    this.y = 0;
}
var connection = {
    start: '',
    end: ''
}

var tasknode = function () {
    this.id = '';
    this.position = null;
    this.rect = rect;
    this.prop = [];
    this.array = [];
    this.sourcePoint = [];
    this.targetPoint = [];
    this.connections = [];
    this.state =1
};


var hiveIO = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'hive';
    this.name= 'hive';
    this.description= 'HIVE输入'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'hive data',
        srcClass: 'glyphicon glyphicon-star',
        note: 'this is hive task node',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '库名', value: '', name: 'database', editor: 'input'},
		{id :'',label: '数据源', value: '', name: 'output', editor: 'file', initEvent:'tablemateInit',changeEvent:'getfile',otherValue : new Map()},
        
        //{id :'',label: '表名', value: '', name: 'table', editor: 'input'},
        //{id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},
        //{id :'',label: '类名', value: 'io.ReadHive', name: 'className', editor: 'input'},

    ];
    this.state =1
};


var localIO = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'local';
    this.name= 'local';
    this.description= 'this is first test node'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'local data',
        srcClass: 'glyphicon glyphicon-star',
        note: 'this is local task node',
    };
    //节点属性框值列表
    this.prop = [
        // {id :'',label: '文本', value: '', name: 'localData', editor: 'input'},
        {id :'',label: '数据源', value: '', name: 'output', editor: 'select', initEvent:'tablemateInit',changeEvent:'tablemateEventChange',otherValue : new Map()},
        //{id :'',label: '字段', value: '', name: 'className', editor: 'input'},
        //{id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},

    ];
    this.state =1
};



var selectField = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'selectField';
    this.name= 'selectField';
    this.description= '选择字段'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'select field',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
       // {id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '字段', value:'', name: 'selectField', editor: 'checkbox',changeEvent:'checked_attribute',initEvent:'checked_Init'},
       // {id :'',label: '类名', value: '', name: 'className', editor: 'input'},
       // {id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},

    ];
    this.state =1
};

var addField = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'addField';
    this.name= 'addField';
    this.description= '添加字段'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'add field',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        {id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '字段', value: '', name: 'addField', editor: 'input'},
        {id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},

    ];
    this.state =1
};

var cleanMissing = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'cleanMissing';
    this.name= 'cleanMissing';
    this.description= '缺失值填充'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'clean missing data',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        
        {id :'',label: '缺省值处理', value: '', name: 'output', editor: 'deallosing', changeEvent:'show_deallosing'},
        //{id :'',label: '指定缺失值', value: '', name: 'value', editor: 'input'},
        //{id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        //{id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},

    ];
    this.state =1
};

var joinTab = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'joinTab';
    this.name= 'joinTab';
    this.description= '关联表'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'join table',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    //TODO:如何确定左右数据源
    this.prop = [
        {id :'',label: '数据源1', value: '', name: 'src1', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '数据源2', value: '', name: 'src2', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '关联字段', value: '', name: 'joinField', editor: 'input'},
        {id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        {id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},

    ];
    this.state =1
};


var removeDuplicate = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'removeDuplicate';
    this.name= 'removeDuplicate';
    this.description= '去除重复行'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'remove duplicate',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        //{id :'',label: '字段', value: '', name: 'selectField', editor: 'input'},
        //{id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        //{id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},
		{id :'',label: '去除重复行', value: '', name: 'output', editor: 'removeDuplicate', changeEvent:'show_removeDuplicate'},

    ];
    this.state =1
};

var SMOTE = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'SMOTE';
    this.name= 'SMOTE';
    this.description= '去除重复行'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'SMOTE',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        //{id :'',label: '字段', value: '', name: 'selectField', editor: 'input'},
        //{id :'',label: 'SMOTE percentage', value: '', name: 'percentage', editor: 'input'},
        //{id :'',label: 'Number of nearest neighbors', value: '', name: 'neighborsNum', editor: 'input'},
        //{id :'',label: 'Random seed', value: '', name: 'rndSeed', editor: 'input'},
        //{id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        //{id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput',group: 'source',initValue:'AutoGenerate'},
		{id :'',label: 'SMOTE', value: '', name: 'output', editor: 'smote', changeEvent:'show_smote'},
    ];
    this.state =1
};

var standard = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'standard';
    this.name= 'standard';
    this.description= '标准化'; //节点描述
    this.position= null;
    this.id =  '';
    this.showType= 'text';
    this.type= 'standard';
    this.name= 'standard';
    this.description= '标准化'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'standard',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        //{id :'',label: '字段', value: '', name: 'selectField', editor: 'input'},
        //{id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        {id :'',label: '标准化', value: '', name: 'output', editor: 'standard', changeEvent:'show_standard'},

    ];
    this.state =1
};


var normalization = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'normalization';
    this.name= 'normalization';
    this.description= '归一化'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'normalization',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        //{id :'',label: '字段', value: '', name: 'selectField', editor: 'input'},
        //{id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        {id :'',label: '归一化', value: '', name: 'output', editor: 'normalization', changeEvent:'show_normalization'},

    ];
    this.state =1
};

var PCA = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'PCA';
    this.name= 'PCA';
    this.description= 'PCA'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'PCA',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        //{id :'',label: '字段', value: '', name: 'selectField', editor: 'input'},
        //{id :'',label: "k", value:'', name:'', editor:'input'},
        //{id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        {id :'',label: 'PCA', value: '', name: 'output', editor: 'pca', changeEvent:'show_pca'},

    ];
    this.state =1
};

var boxing = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'boxing';
    this.name= 'boxing';
    this.description= '分箱'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: '分箱',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        //{id :'',label: '字段', value: '', name: 'selectField', editor: 'input'},
        //{id :'',label: "区间大小", value:'', name:'interval', editor:'input'},
        //{id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        {id :'',label: '分箱结果', value: '', name: 'output', editor: 'boxing', callback:'show_boxing'},

    ];
    this.state =1
};

var sampling = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'sampling';
    this.name= 'sampling';
    this.description= '抽样'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'sampling',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        {id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '抽样比例', value: '', name: 'rate', editor: 'input'},
        {id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        {id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},

    ];
    this.state =1
};

var stat = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'stat';
    this.name= 'stat';
    this.description= '描述性统计'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'statistics',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        {id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '字段', value: '', name: 'selectField', editor: 'input'},
        {id :'',label: '类名', value: '', name: 'className', editor: 'input'},
        {id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},

    ];
    this.state =1
};


var correlation = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'correlation';
    this.name= 'correlation';
    this.description= '线性相关'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'correlation',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        {id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '字段', value: '', name: 'selectField', editor: 'input'},
        {id :'',label: '方法', value: '', name: 'method', editor: 'input'},
        {id :'',label: '类名', value: 'stat.CorrelationMatrix', name: 'className', editor: 'input'},
        {id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},

    ];
    this.state =1
};


var tTest = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'Ttest';
    this.name= 'Ttest';
    this.description= 'T-检验'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.3, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'T-test',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        {label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {label: '字段', value: '', name: 'selectField', editor: 'input'},
        {id :'',label: '类名', value: 'stat.TTest', name: 'className', editor: 'input'},

    ];
    this.state =1
};


var decisionTree = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'decisionTree';
    this.name= 'decisionTree';
    this.description= '决策树'; //节点描述
    this.position= null;
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'decision tree',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        //{id :'',label: '特征字段', value: '', name: 'selectField', editor: 'randomForest'},
        //{id :'',label: '标签字段', value: '', name: 'labelField', editor: 'randomForest'},
        //{id :'',label: '计算混沌方法', value: '', name: 'impurity', editor: 'randomForest'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'decision_tree'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'decision_tree'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'decision_tree4'},
        {id :'',label: '参数', value: '', name: 'className', editor: 'decision_tree1',changeEvent:'dtree_attribute'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'decision_tree2',changeEvent:'dtree_result'},
		{id :'',label: '数据预测', value: '', name: 'className', editor: 'decision_tree3',changeEvent:'dtree_predict'},
        //{id :'',label: '每个变量最大分割数', value: '', name: 'maxBins', editor: 'randomForest'},
        //{id :'',label: '类名', value: 'ml.DecisionTree', name: 'className', editor: 'randomForest'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model',initValue:'AutoGenerate'},
    ];
    this.state =1
};

var randomForest = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'randomForest';
    this.name= 'randomForest';
    this.description= '随机森林'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'random forest',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'randomforest'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'randomforest'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'randomforest4'},
		{id :'',label: '参数', value: '', name: 'className', editor: 'randomforest1',changeEvent:'randomforest_attribute'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'randomforest2',changeEvent:'randomforest_result'},
		{id :'',label: '数据预测', value: '', name: 'className', editor: 'randomforest3',changeEvent:'randomforest_predict'},
        //{id :'',label: '计算混沌方法', value: '', name: 'impurity', editor: 'input'},
        //{id :'',label: '最大树深', value: '', name: 'maxDepth', editor: 'input'},
        //{id :'',label: '每个变量最大分割数', value: '', name: 'maxBins', editor: 'input'},
        //{id :'',label: '取样比例', value: '', name: 'SubsamplingRate', editor: 'input'},
        //{id :'',label: '多少棵树', value: '', name: 'NumTrees', editor: 'input'},
        //{id :'',label: '类名', value: 'ml.RandomForest', name: 'className', editor: 'input'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model',initValue:'AutoGenerate'},
    ];
    this.state =1
};


var gbdt = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'gbdt';
    this.name= 'gbdt';
    this.description= 'GBDT'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'GBDT',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'gbdt'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'gbdt'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'gbdt4'},
		{id :'',label: '参数', value: '', name: 'className', editor: 'gbdt1',changeEvent:'gbdt_attribute'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'gbdt2',changeEvent : 'gbdt_result'},
		{id :'',label: '数据预测', value: '', name: 'className', editor: 'gbdt3',changeEvent:'gbdt_predict'},
        //{id :'',label: '计算混沌方法', value: '', name: 'impurity', editor: 'input'},
        //{id :'',label: '最大树深', value: '', name: 'maxDepth', editor: 'input'},
        //{id :'',label: '每个变量最大分割数', value: '', name: 'maxBins', editor: 'input'},
        //{id :'',label: '取样比例', value: '', name: 'SubsamplingRate', editor: 'input'},
        //{id :'',label: '学习速率', value: '', name: 'StepSize', editor: 'input'},
        //{id :'',label: '类名', value: 'ml.GradientBoostTree', name: 'className', editor: 'input'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model', initValue:'AutoGenerate'},
    ];
    this.state =1
};

var logitReg = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'logitReg';
    this.name= 'logitReg';
    this.description= '逻辑回归'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'logistic regression',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'logistic'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'logistic'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'logistic4'},
		{id :'',label: '参数', value: '', name: 'className', editor: 'logistic1',changeEvent:'logistic_attribute'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'logistic2',callback : 'logistic_result'},
		{id :'',label: '数据预测', value: '', name: 'className', editor: 'logistic3',changeEvent:'logistic_predict'},
        //{id :'',label: '规则化系数', value: '', name: 'RegParam', editor: 'input'},
        //{id :'',label: 'L1,L2规则化权重', value: '', name: 'ElasticNetParam', editor: 'input'},
        //{id :'',label: '最大迭代次数', value: '', name: 'MaxIter', editor: 'input'},
        //{id :'',label: '容忍度', value: '', name: 'Tolerance', editor: 'input'},
        //{id :'',label: '是否有截距', value: '', name: 'FitIntercept', editor: 'input'},
        //{id :'',label: '是否标准化', value: '', name: 'Standardization', editor: 'input'},
        //{id :'',label: '类名', value: 'ml.LogitRegression', name: 'className', editor: 'input'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model', initValue:'AutoGenerate'},
    ];
    this.state =1
};

var svm = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'svm';
    this.name= 'svm';
    this.description= '支持向量机'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'svm',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'svm'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'svm'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'svm4'},
        {id :'',label: '参数', value: '', name: 'className', editor: 'svm1',changeEvent:'svm_attribute'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'svm2',changeEvent:'svm_result'},
		{id :'',label: '数据分类', value: '', name: 'className', editor: 'svm3',changeEvent:'svm_predict'},
        //{id :'',label: '规则化系数', value: '0', name: 'RegParam', editor: 'input'},
        //{id :'',label: '最大迭代次数', value: '50', name: 'MaxIter', editor: 'input'},
        //{id :'',label: '容忍度', value: '0.01', name: 'Tolerance', editor: 'input'},
        //{id :'',label: '学习速率', value: '0.01', name: 'FitIntercept', editor: 'input'},
        //{id :'',label: '类名', value: 'ml.SVM', name: 'className', editor: 'input'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model', initValue:'AutoGenerate'},
    ];
    this.state =1
};

var naiveBayes = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'naiveBayes';
    this.name= 'naiveBayes';
    this.description= '朴素贝叶斯'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'naice bayes',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'bayes'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'bayes'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'bayes4'},
		{id :'',label: '参数', value: '', name: 'className', editor: 'bayes1',changeEvent:'bayes_attribute'},
        {id :'',label: '结果展示', value: '', name: 'className', editor: 'bayes2',changeEvent:'bayes_result'},
		{id :'',label: '数据分类', value: '', name: 'className', editor: 'bayes3',changeEvent:'bayes_predict'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'bayes1', group: 'model', initValue:'AutoGenerate'},
    ];
    this.state =1
};

var neuralNet = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'neuralNet';
    this.name= 'neuralNet';
    this.description= '神经网络'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'neural network',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'neural'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'neural'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'neural4'},
        {id :'',label: '参数', value: '', name: 'className', editor: 'neural1',changeEvent:'neural_attribute'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'neural2',callback:'neural_result'},
		{id :'',label: '数据分类', value: '', name: 'className', editor: 'neural3',changeEvent:'neural_predict'},
        //{id :'',label: '网络结构', value: '', name: 'RegParam', editor: 'input'},
        //{id :'',label: '最大迭代次数', value: '50', name: 'MaxIter', editor: 'input'},
        //{id :'',label: '容忍度', value: '0.01', name: 'Tolerance', editor: 'input'},
        //{id :'',label: '类名', value: 'ml.NeuralNetwork', name: 'className', editor: 'input'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model', initValue:'AutoGenerate'},
    ];
    this.state =1
};

var linearReg = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'linearReg';
    this.name= 'linearReg';
    this.description= '线性回归'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'linear regression',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        //{id :'',label: '特征字段', value: '', name: 'selectField', editor: 'input'},
        //{id :'',label: '标签字段', value: '', name: 'labelField', editor: 'input'},
		{id :'',label: '特征字段', value: '', name: 'selectField', editor: 'linear'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'linear'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'linear3'},
        //{id :'',label: '参数', value: '', name: 'className', editor: 'linear1',changeEvent:'linear_attribute'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'linear1',callback:'linear_result'},
		{id :'',label: '数据分类', value: '', name: 'className', editor: 'linear2',changeEvent:'linear_predict'},
        //{id :'',label: '规则化系数', value: '', name: 'RegParam', editor: 'input'},
        //{id :'',label: 'L1,L2规则化权重', value: '', name: 'ElasticNetParam', editor: 'input'},
        //{id :'',label: '最大迭代次数', value: '', name: 'MaxIter', editor: 'input'},
        //{id :'',label: '容忍度', value: '', name: 'Tolerance', editor: 'input'},
        //{id :'',label: '是否有截距', value: '', name: 'FitIntercept', editor: 'input'},
        //{id :'',label: '是否标准化', value: '', name: 'Standardization', editor: 'input'},
        //{id :'',label: '类名', value: 'ml.LinearRegression', name: 'className', editor: 'input'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model', initValue:'AutoGenerate'},
    ];
    this.state =1
};

var decisionTreeReg = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'decisionTreeReg';
    this.name= 'decisionTreeReg';
    this.description= '决策树回归'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'decision tree regression',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'decisionTreeReg'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'decisionTreeReg'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'decisionTreeReg4'},
		//{id :'',label: '参数', value: '', name: 'className', editor: 'gbdt1',changeEvent:'gbdt_attribute'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'decisionTreeReg2',changeEvent : 'decisionTreeReg_result'},
		{id :'',label: '数据预测', value: '', name: 'className', editor: 'decisionTreeReg3',changeEvent:'decisionTreeReg_predict'},
		//{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        //{id :'',label: '特征字段', value: '', name: 'selectField', editor: 'input'},
        //{id :'',label: '标签字段', value: '', name: 'labelField', editor: 'input'},
        //{id :'',label: '计算混沌方法', value: '', name: 'impurity', editor: 'input'},
        //{id :'',label: '最大树深', value: '', name: 'maxDepth', editor: 'input'},
        //{id :'',label: '每个变量最大分割数', value: '', name: 'maxBins', editor: 'input'},
        //{id :'',label: '取样比例', value: '', name: 'SubsamplingRate', editor: 'input'},
        //{id :'',label: '学习速率', value: '', name: 'StepSize', editor: 'input'},
        //{id :'',label: '类名', value: 'ml.DecisionTree', name: 'className', editor: 'input'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model', initValue:'AutoGenerate'},
    ];
    this.state =1
};

var neuralReg = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'neuralReg';
    this.name= 'neuralReg';
    this.description= '神经网络回归'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'neuralReg',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'neuralReg'},
        {id :'',label: '标签字段', value: '', name: 'labelField', editor: 'neuralReg'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'neuralReg4'},
        {id :'',label: '参数', value: '', name: 'className', editor: 'neuralReg1',changeEvent:'neuralReg_attribute'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'neuralReg2',callback:'neuralReg_result'},
		{id :'',label: '数据分类', value: '', name: 'className', editor: 'neuralReg3',changeEvent:'neuralReg_predict'},
        //{id :'',label: '网络结构', value: '', name: 'RegParam', editor: 'input'},
        //{id :'',label: '最大迭代次数', value: '50', name: 'MaxIter', editor: 'input'},
        //{id :'',label: '容忍度', value: '0.01', name: 'Tolerance', editor: 'input'},
        //{id :'',label: '类名', value: 'ml.NeuralNetwork', name: 'className', editor: 'input'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model', initValue:'AutoGenerate'},
    ];
    this.state =1
};

var kMeans = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'kMeans';
    this.name= 'kMeans';
    this.description= 'K-均值'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'model']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'k-means',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //{id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'kmeans'},
		{id :'',label: '标签字段', value: '', name: 'labelField', editor: 'kmeans'},
		{id :'',label: '数据集划分', value: '', name: 'className', editor: 'kmeans4'},
        {id :'',label: '参数', value: '', name: 'numCluster', editor: 'kmeans1',changeEvent:'kmeans_attribute'},
        //{id :'',label: '容忍度', value: '0.01', name: 'Tolerance', editor: 'input'},
		{id :'',label: '结果展示', value: '', name: 'className', editor: 'kmeans2' ,callback : 'kmeans_result'},
		{id :'',label: '数据聚类', value: '', name: 'className', editor: 'kmeans3',changeEvent:'kmeans_predict'},
        //{id :'',label: '类名', value: 'ml.KMeans', name: 'className', editor: 'input'},
        //{id :'',label: '模型ID', value: '', name: 'modelId', editor: 'hideConstOutput', group: 'model', initValue:'AutoGenerate'},
    ];
    this.state =1
};


var scoreModel = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'scoreModel';
    this.name= 'scoreModel';
    this.description= '模型预测'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [[0.5, 1, 0.3, -0.7,'source']];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.3, 0, -0.1, 0.7,'source'], [0.7, 0, -0.1, 0.7,'model']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'score model',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        {id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '类名', value: 'ml.Predict', name: 'className', editor: 'input'},
        {id :'',label: '输出', value: '', name: 'output', editor: 'hideConstOutput', group: 'source',initValue:'AutoGenerate'},

    ];
    this.state =1
};

var evaluationMetrices = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'evaluationMetrices';
    this.name= 'evaluationMetrices';
    this.description= '模型预测'; //节点描述
    this.position= null;
    //保存节点元素的源点信息 可以多个
    this.sourcePointMeta = [];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.5, 0, -0.1, 0.7,'source']];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'evaluation metrices',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        {id :'',label: '数据源', value: '', name: 'src', editor: 'hideConstInput', group: 'source'},
        {id :'',label: '特征字段', value: '', name: 'selectField', editor: 'input'},
        {id :'',label: '类名', value: '', name: 'className', editor: 'input'},
    ];
    this.state =1
};

var noneDef = function () {
    this.id =  '';
    this.showType= 'text';
    this.type= 'noneDef';
    this.name= 'noneDef';
    this.description= '未定义组件'; //节点描述
    this.position= null;
                            // 點注釋在point.js中
    this.sourcePointMeta = [[0.3, 1, 0.3, -0.7,'left',1],[0.7, 1, 0.3, -0.7,'right',1]];
    this.sourcePoint= [];
    //保存节点元素的目标点信息，只有一个
    this.targetPointMeta = [[0.3, 0, -0.1, 0.7,'left',1],[0.7, 0, -0.1, 0.7,'right',1]];
    this.targetPoint= [];
    //节点连线信息
    this.connections= [];
    //节点元素的样式信息
    this.rect= {
        id: 'rid',
        text: 'noneDef',
        srcClass: 'glyphicon glyphicon-star',
        note: '',
    };
    //节点属性框值列表
    this.prop = [
        //initValue属性 给value值赋初始值 当其值是AutoGenerate时由系统自动生成value值 否则生成initValue指定的值
        //实现代码在 jsPlumbHelper.js line176-line182
        {id :'',label: '数据源', value: '', name: 'src', editor: 'input',initValue:'AutoGenerate'},
        {id :'',label: '输出', value: '', name: 'output', editor: 'input'},
        /**
         * initEvent的字段值是初始化选择框的初始化方法名 具体调用在editor.js line45
         * changeEvent同理 集体调用在Util.js line208
         *
         */
        {id :'',label: '输出', value: '', name: 'output', editor: 'select',
            initEvent:'tablemateInit',changeEvent:'tablemateEventChange',otherValue : new Map()},
        {id :'',label: '双级连动', value: '', name: 'soutput', editor: 'doubleSelect',
            initEvent:'tablemateInit',changeEvent:'tablemateEventChange',otherValue : new Map()},
        {id :'',label: '弹出框', value: 'bv', name: 'modelOutput', editor: 'popupButton' ,callback : 'buttonPopup'},
        //grop属性：给editor分组 只有属于相同组的Editor才会继承字段 实现于jsPlumpHelper.js line386-line395
        {id :'',label: '模型输入', value: '', name: 'modelInput', editor: 'hideConstInput' },
        {id :'',label: '模型输出', value: '', name: 'modelOutput', editor: 'hideConstOutput'},
    ];
    this.state =1
};

function nodeFactory() {
    this.noneDef = function () {
        return new noneDef();
    };
    this.hiveIO = function () {
        return new hiveIO();
    };
    this.localIO = function () {
        return new localIO();
    };
    this.selectField = function () {
        return new selectField();
    };
    this.addField = function () {
        return new addField();
    };
    this.cleanMissing = function () {
        return new cleanMissing();
    };
    this.joinTab = function () {
        return new joinTab();
    };
    this.removeDuplicate = function () {
        return new removeDuplicate();
    };
    this.SMOTE = function () {
        return new SMOTE();
    };
    this.normalization = function () {
        return new normalization();
    };
    this.standard = function () {
        return new standard();
    };
    this.PCA = function () {
        return new PCA();
    };
    this.boxing = function () {
        return new boxing();
    };
    this.sampling = function () {
        return new sampling();
    };
    this.stat = function () {
        return new stat();
    };
    this.correlation = function () {
        return new correlation();
    };
    this.tTest = function () {
        return new tTest();
    };
    this.decisionTree = function () {
        return new decisionTree();
    };
    this.randomForest = function () {
        return new randomForest();
    };
    this.gbdt = function () {
        return new gbdt();
    };
    this.logitReg = function () {
        return new logitReg();
    };
    this.svm = function () {
        return new svm();
    };
    this.naiveBayes = function () {
        return new naiveBayes();
    };
    this.neuralNet = function () {
        return new neuralNet();
    };
    this.linearReg = function () {
        return new linearReg();
    };
    this.decisionTreeReg = function () {
        return new decisionTreeReg();
    };
	this.neuralReg = function () {
        return new neuralReg();
    };
    this.kMeans = function () {
        return new kMeans();
    };
    this.scoreModel = function () {
        return new scoreModel();
    };
    this.evaluationMetrices = function () {
        return new evaluationMetrices();
    };
}
