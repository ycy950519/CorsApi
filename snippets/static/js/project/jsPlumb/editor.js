/**
 * Created by caoxiang.
 */
function Editor() {
    this.pannel = function (isHide) {
        var str = ' <div class="panel'
        if (isHide)
            str += ' hide'
        str += '">';
        return str;
    };
    this.smallIcon = function () {
        var str = ' <span class="glyphicon glyphicon-chevron-right" style="float: left;margin-right:10px;"></span>';
        return str;
    };

   //折叠连接
    this.pannelLabel = function (label, id) {
        var str = '<h4 class="panel-title">'
            + '<a data-toggle="collapse" data-parent="#accordion" style="display: block;"'
            + 'href="#' + id + '">' + label
            + '   </a>'
            + ' </h4>';
        return str;

    };

    //给属性列表的节点添加标签 并把节点的id赋值到此 id的值为节点id+index
    this.pannelBody = function (id, content) {
        var str = '<div id="' + id + '" class="panel-collapse collapse">'
            + '<div class="panel-body">'
            + content
            + '</div>'
            + '</div>';
        return str;
    };
	
	Array.prototype.contains = function(obj) {
			var i = this.length;
			while (i--) {
				if (this[i] == obj)                 {
				return true;
				}
			}
			return false;
		};
	
	
	this.file = function(prop){
		var val = prop.value;
        var editor = prop.editor;
        var id = prop.id;
		if(select_html1==''){
			var select_str='<div class="myfile1"><form><span style="font-weight:bold;color:#ff9955;">上传文件必须是utf8格式的csv文件，包含表头</span><input type="file" id="myfile"></form></div>';
			
			return select_str;
		}
		else{
			var select_str = '<div class="myfile1">'+select_html1;
			return select_str;
			
		}
	}
	
	
    this.select = function (prop) {
        //Todo 对于选择框实现 考虑把所有数据都保存到prop.value字段中 通过解析该字段展示不同的内容
        //暂时没实现字段的解析
        
		var val = prop.value;
        var editor = prop.editor;
        var id = prop.id;
		
        //判断json有没有
		
        //var data = editorMethod[prop.initEvent]();
		var clustering_data = ["","kmeans_data"]
		var classify_data = ["","decisiontree_data","randomforest_data","gbdt_data","logistic_data","svm_data","bayes_data","neural_data","linear_data","decisionTreeReg_data","neuralReg_data"]
		if (save_selected != ''){
			if (clustering_data.contains(save_selected['data'])){
				
				clustering_data[0]=save_selected['data'];
				for (var n=1;n<clustering_data.length;n++){
				
					if(clustering_data[n]==clustering_data[0]){
					
						clustering_data.splice(n,1);
					
					}
				}
				clustering_data.push("");
			}
			
			if (classify_data.contains(save_selected['data'])){
				
				classify_data[0]=save_selected['data'];
				for (var n=1;n< classify_data.length;n++){
				
					if( classify_data[n]== classify_data[0]){
					
						 classify_data.splice(n,1);
					
					}
				}
				classify_data.push("");
			}
			
		}
		
	
			
			var select_str = '<div class="clustering"> ' +'<font>聚类：</font>'+'<select name="clustering1" id="'+id+'" style="width : 100%" ';
			
			select_str+='editor="'+editor+'" onclick="setCookie("'+id+'",this.selectedIndex)">';
						
			for(var i=0;i<clustering_data.length;i++)
			{
				if (clustering_data[i]==""){
					select_str+='<option id="s1" value="'+clustering_data[i]+'">'+clustering_data[i]+'</option>';
				}
				else{
					select_str+='<option value="'+clustering_data[i]+'">'+clustering_data[i]+'</option>';
				}
			}
			select_str+='</select></div>';
			
			select_str+='<div class="classify"> ' +'<font>分类：</font>'+'<select name="classify1" id="'+id+'" style="width : 100%" ';
			
			select_str+='editor="'+editor+'" onclick="setCookie("'+id+'",this.selectedIndex)">';
					
			for(var i=0;i<classify_data.length;i++)
			{
				if (classify_data[i]==""){
					select_str+='<option id="s2" value="'+classify_data[i]+'">'+classify_data[i]+'</option>';	
				}
				else{
					select_str+='<option value="'+classify_data[i]+'">'+classify_data[i]+'</option>';
				}
			}
			select_str+='</select>';
			
			select_str+='</div>'
		if(select_html==''){	
			return select_str;
		}
		else{
			select_str += '<div class="source">'+select_html+'</div>';
			return select_str;
			
		}
    };
	

	this.input = function (prop) {
			var val =  prop.value;
			var editor =   prop.editor;	
			var name =   prop.name;
			var id =   prop.id;
			var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
			if (name != null || name != '') {
				str += 'name ="'
				str += name;
				str += '" '
			}
			str += 'style="width:100%;" ';
			if (val != null || val != '') {
				str += 'value="'
				str += val;
				str += '" ';
			}
			str += '>'
			str += ' </div>';
			return str;
		};
	
	this.checkbox = function (prop) {
        //存储被选中checkbox的个数以及value值
		
		
		if(localStorage['length']!='0'){
			//console.log(localStorage);
			var str = '<div class="editor">';	
			for(var i=0;i<r.length;i++){
				var attribute = r[i];
				var judge='True';
				//var a=attribute.replace(/\(.*?\)/g,'')
				//console.log(a.replace(/(^\s+)|(\s+$)/g,'_'))
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
						
					if (localStorage[n]==attribute){
						str+='<div class="check"><input type="checkbox"  id="'+attribute.replace(/\(.*?\)/g,'').replace(' ','') +'" value="'+attribute+'" checked><label for="'+attribute.replace(/\(.*?\)/g,'').replace(' ','')+'">'+attribute+'</label></div>';
						judge='False';
						
						
								
					}
				}
				
				if(judge=='True'){
					str+='<div class="check"><input type="checkbox"  id="'+attribute.replace(/\(.*?\)/g,'').replace(' ','')+'" value="'+attribute+'"><label for="'+attribute.replace(/\(.*?\)/g,'').replace(' ','')+'">'+attribute+'</label></div>';
				}
				
			}	
					
		}
		
		else{
			var str = '<div class="editor">';
			str += data_selected;
			str+='</div>';
		}
		
		return str;
    };
	
	
	
	this.deallosing = function(prop){
		var method = ['','删除缺省值','填充缺省值']
		
		var str = '<div class="method">';	
		str += '<font>处理方法：</font><select name="method"  style="width:100%">';
		for(var i=0;i < method.length;i++){
			str += '<option value="' + method[i] +'">' + method[i] + '</option>'
		}
		str += '</select></div>'
		str += '<div class="editor">';
		str += '<div class="deallosing"><button id="deallosing" type="button" class="form-control">显示缺省值处理结果</button></div>';
		str+='</div>';
		return str;
	}
	
	this.smote = function (prop) {
		var str = '<div class="editor">';
		str += '<div class="smote"><button id="smote" type="button" class="form-control">过抽样处理</button></div>';
		str+='</div>';
		return str;
	}
	
	this.standard = function (prop) {
		var str = '<div class="editor">';
		str += '<div class="standard"><button id="standard" type="button" class="form-control">显示标准化数据</button></div>';
		str+='</div>';
		return str;
		
	}
	
	this.removeDuplicate = function (prop) {
		var str = '<div class="editor">';
		str += '<div class="removeDuplicate"><button id="removeDuplicate" type="button" class="form-control">显示去重后的数据</button></div>';
		str+='</div>';
		return str;
	}
	
	this.normalization = function (prop) {
		var str = '<div class="editor">';
		str += '<div class="normal"><button id="normal" type="button" class="form-control">显示归一化数据</button></div>';
		str+='</div>';
		return str;
	}
	
	this.pca = function (prop) {
		var str = '<div class="editor">';
		str += '<div class="pca"><button id="pca" type="button" class="form-control">显示PCA数据</button></div>';
		str+='</div>';
		return str;
	}
	
	this.boxing = function (prop) {
		var val = prop.value;
        var name = prop.name;
        var editor = prop.editor;
        var id = prop.id;
		var str ='<div class="boxing"><button id="boxing" type="button" class="form-control" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:90%;"';
        if (val != null || val != '') {
            str += ' value="'
            str += val;
            str += '" ';
        }
        str += '>'
		str += '显示分箱结果</button></div>'
		
		return str;
	}
	
	
	
	
	
	//决策树
	this.decision_tree = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	
	this.decision_tree1 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var count = ['','5','6','7','8','9','10']
		var criterion = ['','entropy','gini']
		var splitter = ['','best','random']
		var min_samples_split = ['','2','3','4','5']
		
		var str = '<div class="max_depth">';	
		str += '<font>最大树深：</font><select name="max_depth" id="max_depth" style="width:100%">';
		for(var i=0;i < count.length;i++){
			str += '<option value="' + count[i] +'">' + count[i] + '</option>'
		}
		str += '</select></div>'
		str += '<div class="criterion"><font>特征选择标准：</font><select name="criterion" id="criterion" style="width:100%"> ';
        for(var i=0;i < criterion.length;i++){
			str += '<option value="' + criterion[i] + '">' + criterion[i] + '</option>'
		}
		str += '</select></div>';
		str += '<div class="splitter"> <font>特征划分标准（找出最优划分点的方式）：</font><select name="splitter" id="splitter"  style="width:100%">';
        for(var i=0;i < splitter.length;i++){
			str += '<option value="' + splitter[i] + '">' + splitter[i] + '</option>'
		}
		str += '</select></div>';
		str += '<div class="min_samples_split"> <font>划分最小样本数（剪枝处理）：</font><select id="min_samples_split" name="min_samples_split"  style="width:100%">';
        for(var i=0;i < min_samples_split.length;i++){
			str += '<option value="' + min_samples_split[i] + '">' + min_samples_split[i] + '</option>'
		}
		str += '</select></div>';
		
		return str;
	};
	
	this.decision_tree2 = function(prop){
		
		var str ='<div class="decisionTree"><button id="decisionTree" type="button" class="form-control">显示分类结果</button></div>'
		str += ' </div>';
		return str;
	};
	
	this.decision_tree3 = function(prop){
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="dtree_predict"><button id="dtree_predict type="button" class="form-control">显示预测结果</button></div>'
		return str;
	};
	
	this.decision_tree4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	//随机森林
	this.randomforest = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	
	this.randomforest1 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var criterion = ['','entropy','gini']
		var max_features = ['','auto','log2','sqrt']
		var max_depth = ['','10','20','30','40','50']
		var min_samples_split = ['','2','3','4','5']
		
		
		
		var str = '<div class="criterion"><font>特征选择标准：</font><select id="criterion" name="criterion"  style="width:100%"> ';
        for(var i=0;i < criterion.length;i++){
			str += '<option value="' + criterion[i] + '">' + criterion[i] + '</option>'
		}
		str += '</select></div>';
		
		str += '<div class="max_features"> <font>最大特征数：</font><select id="max_features" name="max_features"  style="width:100%">';
        for(var i=0;i < max_features.length;i++){
			str += '<option value="' + max_features[i] + '">' + max_features[i] + '</option>'
		}
		str += '</select></div>';
		
		str += '<div class="max_depth"> <font>最大深度：</font><select id="max_depth" name="max_depth"  style="width:100%">';
        for(var i=0;i < max_depth.length;i++){
			str += '<option value="' + max_depth[i] + '">' + max_depth[i] + '</option>'
		}
		str += '</select></div>';
		
		str += '<div class="min_samples_split"> <font>划分最小样本数（剪枝处理）：</font><select id="min_samples_split" name="min_samples_split"  style="width:100%">';
        for(var i=0;i < min_samples_split.length;i++){
			str += '<option value="' + min_samples_split[i] + '">' + min_samples_split[i] + '</option>'
		}
		str += '</select></div>';
		
		return str;
	};
	
	this.randomforest2 = function(prop){
		
		var str ='<div class="randomForest"><button id="randomForest" type="button" class="form-control">显示分类结果</button></div>'
		str += ' </div>';
		return str;
	};
	
	this.randomforest3 = function(prop){
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="randomforest_predict"><button id="randomforest_predict" type="button">显示预测结果</button></div>'
		return str;
	};
	
	this.randomforest4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	this.gbdt = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	this.gbdt1 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var loss = ['','deviance', 'exponential']
		var learning_rate = ['','0.1','0.2','0.3']
		var n_estimators = ['','20','40','60','80']
		var max_depth = ['','3','4','5','6','7']
		var max_features = ['','auto','log2','sqrt']
		var min_samples_split = ['','2','3','4','5']
		var str = '<div class="loss">';	
		str += '<font>损失函数：</font><select id="loss" name="loss"  style="width:100%">';
		for(var i=0;i < loss.length;i++){
			str += '<option value="' + loss[i] +'">' + loss[i] + '</option>'
		}
		str += '</select></div>'
		
		str += '<div class="learning_rate"><font>学习率：</font><select id="learning_rate" name="learning_rate"  style="width:100%">';
		for(var i=0;i < learning_rate.length;i++){
			str += '<option value="' + learning_rate[i] +'">' + learning_rate[i] + '</option>'
		}
		str += '</select></div>'
		
		str += '<div class="n_estimators"><font>迭代次数：</font><select id="n_estimators" name="n_estimators"  style="width:100%">';
		for(var i=0;i < n_estimators.length;i++){
			str += '<option value="' + n_estimators[i] +'">' + n_estimators[i] + '</option>'
		}
		str += '</select></div>'
		
		str += '<div class="max_depth"> <font>最大深度：</font><select id="max_depth" name="max_depth"  style="width:100%">';
        for(var i=0;i < max_depth.length;i++){
			str += '<option value="' + max_depth[i] + '">' + max_depth[i] + '</option>'
		}
		str += '</select></div>';
		
		str += '<div class="max_features"><font>最大特征数：</font><select id="max_features" name="max_features"  style="width:100%">';
		for(var i=0;i < max_features.length;i++){
			str += '<option value="' + max_features[i] +'">' + max_features[i] + '</option>'
		}
		str += '</select></div>'
		
		str += '<div class="min_samples_split"> <font>划分最小样本数（剪枝处理）：</font><select id="min_samples_split" name="min_samples_split"  style="width:100%">';
        for(var i=0;i < min_samples_split.length;i++){
			str += '<option value="' + min_samples_split[i] + '">' + min_samples_split[i] + '</option>'
		}
		str += '</select></div>';
		
		return str;
	};
	

	
	this.gbdt2 = function(prop){
		
		var str ='<div class="gbdt"><button id="gbdt" type="button" class="form-control">显示分类结果</button></div>'
		str += ' </div>';
		return str;
	};
	
	this.gbdt3 = function(prop){
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="gbdt_predict"><button id="gbdt_predict" type="button">显示预测结果</button></div>'
		return str;
	};
	
	this.gbdt4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	
	
	this.logistic = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	this.logistic1 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var solver = ['','newton-cg', 'lbfgs', 'liblinear', 'sag']
		
		
		var str = '<div class="solver">';	
		str += '<font>优化参数：</font><select  id="solver"  name="solver"  style="width:100%">';
		for(var i=0;i < solver.length;i++){
			str += '<option value="' + solver[i] +'">' + solver[i] + '</option>'
		}
		str += '</select></div>'
		
		
		
		
		return str;
	};
	
	
	this.logistic2 = function(prop){
		var val = prop.value;
        var name = prop.name;
        var editor = prop.editor;
        var id = prop.id;
        var str = '<div class="logistic">'
            + '<button id="logistic" type="button" class="form-control" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:90%;"';
        if (val != null || val != '') {
            str += ' value="'
            str += val;
            str += '" ';
        }
        str += '>'
        str += ' 查看结果</button> </div>';
        return str;
	};
	
	
	this.logistic3 = function(prop){
		
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="logistic_predict"><button id="logistic_predict" type="button" class="form-control">显示分类结果</button></div>'
		return str;
	};
	
	this.logistic4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	
	this.svm = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	this.svm1 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var penalty = ['','0.5','1.5','2.5','3.5']
		var str = '<div class="kernel">';	
		str += '<font>核函数：</font><input type="text" value="Linear" disabled="disabled" style="width:100%">';
		
		str += '<div class="penalty">';
		str += '<font>惩罚因子：</font><select id="penalty" name="penalty"  style="width:100%">';
		for(var i=0;i < penalty.length;i++){
			str += '<option value="' + penalty[i] +'">' + penalty[i] + '</option>'
		}
		str += '</select></div>'
	
		return str;
	};
	
	this.svm2 = function(prop){
		
		var str ='<div class="svm"><button id="svm" type="button" class="form-control">显示分类结果</button></div>'
		str += ' </div>';
		return str;
	};
	
	
	this.svm3 = function(prop){
		
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="svm_predict"><button id="svm_predict" type="button" class="form-control">显示分类结果</button></div>'
		return str;
	};
	
	
	this.svm4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	
	//朴素贝叶斯
	this.bayes = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	
	this.bayes1 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var method = ['','高斯朴素贝叶斯','多项式分布贝叶斯','伯努利朴素贝叶斯']
		
		var str = '<div class="method">';
		str += '<font>数据分布类型：</font><select id="method" name="method"  style="width:100%">';
		for(var i=0;i < method.length;i++){
			str += '<option value="' + method[i] +'">' + method[i] + '</option>'
		}
		str += '</select></div>'
	
		return str;
	};
	
	this.bayes2 = function(prop){
		
		var str ='<div class="navibayes"><button id="navibayes" type="button" class="form-control">显示分类结果</button></div>'
		str += ' </div>';
		return str;
	};
	
	
	this.bayes3 = function(prop){
		
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="bayes_predict"><button id="bayes_predict" type="button" class="form-control">显示分类结果</button></div>'
		return str;
	};
	
	this.bayes4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	
	this.neural = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	this.neural1 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var activation = ['','sigmoid', 'tanh', 'relu']
		var hiddenlayer = ['','5','6','7','8']
		var solver = ['','adam','adadelta', 'sgd',]
		
		
		var str = '<div class="activation">';	
		str += '<font>激活函数：</font><select id="activation" name="activation"  style="width:100%">';
		for(var i=0;i < activation.length;i++){
			str += '<option value="' + activation[i] +'">' + activation[i] + '</option>'
		}
		str += '</select></div>'
		
		str += '<div class="hiddenlayer"><font>隐藏层的神经元数量：</font><select id="hiddenlayer" name="hiddenlayer"  style="width:100%">';
		for(var i=0;i < hiddenlayer.length;i++){
			str += '<option value="' + hiddenlayer[i] +'">' + hiddenlayer[i] + '</option>'
		}
		str += '</select></div>'
		
		str += '<div class="solver"><font>优化权重：</font><select id="solver" name="solver"  style="width:100%">';
		for(var i=0;i < solver.length;i++){
			str += '<option value="' + solver[i] +'">' + solver[i] + '</option>'
		}
		str += '</select></div>'
		
		
		
		
		return str;
	};
	

	
	
	this.neural2 = function(prop){
		var val = prop.value;
        var name = prop.name;
        var editor = prop.editor;
        var id = prop.id;
		var str ='<div class="neuralNet"><button id="neuralNet" type="button" class="form-control" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:90%;"';
        if (val != null || val != '') {
            str += ' value="'
            str += val;
            str += '" ';
        }
        str += '>'
		str += '显示分类结果</button></div>'
		
		return str;
	};
	
	this.neural3 = function(prop){
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="neural_predict"><button id="neural_predict" type="button" class="form-control">显示分类结果</button></div>'
		return str;
	};
	
	this.neural4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	this.linear = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	
	

	
	
	this.linear1 = function(prop){
		var val = prop.value;
        var name = prop.name;
        var editor = prop.editor;
        var id = prop.id;
		var str ='<div class="linearReg"><button id="linearReg" type="button" class="form-control" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:90%;"';
        if (val != null || val != '') {
            str += ' value="'
            str += val;
            str += '" ';
        }
        str += '>'
		str += '显示分类结果</button></div>'
		
		return str;
	};
	
	this.linear2 = function(prop){
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="linear_predict"><button id="linear_predict" type="button" class="form-control">显示预测结果</button></div>'
		return str;
	};
	
	
	this.linear3 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	this.decisionTreeReg = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	this.decisionTreeReg2 = function(prop){
		
		var str ='<div class="decisionTreeReg"><button id="decisionTreeReg" type="button" class="form-control">显示分类结果</button></div>'
		str += ' </div>';
		return str;
	};
	
	this.decisionTreeReg3 = function(prop){
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="decisionTreeReg_predict"><button id="decisionTreeReg_predict" type="button" class="form-control">显示预测结果</button></div>'
		return str;
	};
	
	this.decisionTreeReg4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	this.neuralReg = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	this.neuralReg1 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var activation = ['','identity','logistic', 'tanh', 'relu']
		
		var solver = ['','adam','lbfgs', 'sgd',]
		
		
		var str = '<div class="activation">';	
		str += '<font>激活函数：</font><select id="activation" name="activation"  style="width:100%">';
		for(var i=0;i < activation.length;i++){
			str += '<option value="' + activation[i] +'">' + activation[i] + '</option>'
		}
		str += '</select></div>'
		
		
		
		str += '<div class="solver"><font>优化权重：</font><select id="solver"  name="solver"  style="width:100%">';
		for(var i=0;i < solver.length;i++){
			str += '<option value="' + solver[i] +'">' + solver[i] + '</option>'
		}
		str += '</select></div>'
		
		
		
		
		return str;
	};
	
	
	this.neuralReg2 = function(prop){
		var val = prop.value;
        var name = prop.name;
        var editor = prop.editor;
        var id = prop.id;
		var str ='<div class="neuralReg"><button id="neuralReg" type="button" class="form-control" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:90%;"';
        if (val != null || val != '') {
            str += ' value="'
            str += val;
            str += '" ';
        }
        str += '>'
		str += '显示分类结果</button></div>'
		
		return str;
	};
	
	this.neuralReg3 = function(prop){
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-2;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="neuralReg_predict"><button id="neuralReg_predict" type="button" class="form-control">显示预测结果</button></div>'
		return str;
	};
	
	
	this.neuralReg4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	
	this.kmeans = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var str = '<div class="editor">'+ '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
		if (name != null || name != '') {
			if (name == 'selectField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				for(var n=0;n<parseInt(localStorage['length'])-1;n++){
					if (localStorage[n]!='result')
					str+= (localStorage[n]+";")					
					}	
				str += '" '
			}
			
			if (name == 'labelField'){
				str += 'name ="'
				str += name;
				str += '" '
				str += 'value ="'
				var judge="True"
				
				if (r[(r.length-1)]=='result'){
					str += r[(r.length-1)];
				}
				if (r[(r.length-1)]!='result'){
					str += '" disabled="disabled"';
				}
									
				str += '" '
			}			
			else{
				str += 'name ="'
				str += name;
				str += '" '
			}
		}		
		str += 'style="width:100%;" ';
		
		str += '>';
		str += ' </div>';
		return str;
	};
	
	
	this.kmeans1 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		var k_value = ['','2','3','4','5','6']
		
		var str = '<div class="k_value">';	
		str += '<font>聚类数（k值）：</font><select id="k_value"  name="k_value"  style="width:100%">';
		for(var i=0;i < k_value.length;i++){
			str += '<option value="' + k_value[i] +'">' + k_value[i] + '</option>'
		}
		str += '</select></div>'
		
		return str;
	};
	
	this.kmeans2 = function(prop) {
        var val = prop.value;
        var name = prop.name;
        var editor = prop.editor;
        var id = prop.id;
        var str = '<div class="KMeans">'
            + '<button id="KMeans" type="button" class="form-control" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:90%;"';
        
        str += '>'
        str += ' 查看聚类结果</button> </div>';
        return str;
    }
	
	this.kmeans3 = function(prop){
		var str = '';
		for(var n=0;n<parseInt(localStorage['length'])-1;n++){
			a = n.toString();
			str+='<div class="attribute">'+ localStorage[a] + ':<input type="text" placeholder="该值的范围为['+ interval[localStorage[a]][0]+ ',' +interval[localStorage[a]][1]+']'+'" id="attribute" style="width:100%"></div>';
			}
		str +='<div class="kmeans_predict"><button id="kmeans_predict" type="button" class="form-control">显示聚类结果</button></div>'
		return str;
	};
	
	
	this.kmeans4 = function(prop){
		var val = prop.value;
		var editor = prop.editor;	
		var name = prop.name;
		var id = prop.id;
		
		var str = '<div class="split">';	
		str += '<font>训练集所占的比例：</font><input type="text" name="split"  style="width:100%" value="0.67">';
		
		str += '</div>'
		
		
		return str;
	};
	
	
    this.doubleSelect = function (prop) {
        //Todo 对于选择框实现 考虑把所有数据都保存到prop.value字段中 通过解析该字段展示不同的内容
        //暂时没实现字段的解析
        var val = prop.value;
        var name= prop.name;
        var editor = prop.editor;
        var id = prop.id;
        var data = editorMethod[prop.initEvent]();
        var str = '<div class="editor"> ' +
            '<select name="' + name + '"id="'+id+'ds1'+'" style="width : 100%" ';
        str+='editor="'+editor+'">';
        data.forEach(function (value,key,map) {
            str+=('<option value="'+key+'">'+data.get(key)+'</option>');
        })
        str+='</select > </div>'
        var dsstr ='<div class="editor"> ' +
            '<select name="' + name + '"id="'+id+'ds2'+'" style="width : 100%" ';
        dsstr+='editor="'+editor+'">';
        if (val != null) {
                    var kv = val.split(";");
                    if(kv.length==2) {
                        var option ='<option value="'+kv[0]+'">'+kv[1]+'</option>';
                        dsstr +=option;
            }
        }
        dsstr+='</select > </div>'
        return str+'<span></span>'+dsstr;
    };

    
	

    this.hideInput = function (prop) {
        var val = prop.value;
        var name = prop.name;
        var editor = prop.editor;
        var id = prop.id;
        var str = '<div class="editor">'
            + '<input type="text" class="form-control hide" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:100%;"';
        if (val != null || val != '') {
            str += ' value="'
            str += val;
            str += '" ';
        }
        str += '>'
        str += ' </div>';
        return str;
    };

 
    this.hideConstInput = function (prop) {
        return this.hideInput(prop);
    }
    this.hideConstOutput = function (prop) {
        return this.hideInput(prop);
    }

}

