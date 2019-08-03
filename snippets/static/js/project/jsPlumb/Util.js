/**
 */
 
var Util = {
	//一下为ajax更新数据库方法
	//放下结点保存结点信息
	//by yang
	draggingNode:function(id,x,y,t){
		var data={"nodeid":id,"x":x,"y":y,"nodetype":t,"type":"dragnode"}
                $.ajax({
                    type: "POST",
			        url:"/task",
                    data: JSON.stringify(data),
                    success: function(data) {
                        if(data.code=="0"){
                            layer.msg("请查看结点是否存在！！",{icon:0});
                        }

                    }
                });
	},

	//移动结点时数据库更新x和y
	//by yang
	dragnewNode:function(sourceid,x,y,t){
		var data={"nodeid":sourceid,"x":x,"y":y,"nodetype":t,"type":"dragnewnode"}
		//console.log(data);
		$.ajax({
			type: "POST",
			url:"/task",
			data: JSON.stringify(data),
			success: function(data) {
				if(data.code!='1'){
					layer.msg("请查看结点是否存在！！",{icon:0});
				}
			}
		});
	},

	//by yang
	delConnection: function(sid,tid) {
		var data= {'sourceid': sid,'targetid': tid,'type': 'delConnection'};
		$.ajax({
			type: "POST",
			url:"/task",
			data: JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			success: function(msg) {
				if(msg.code != '1') {
					alert('erro accur:' + msg.msg);
				}
			}
		});
	},
	//by yang
	saveConnection: function(id, sid, tid,stype,ttype) {
		 var data= {
                    'relId': id,
					'task.taskId': sid,
					'toTaskId': tid,
					'sourceType':stype,
					'targetType':ttype,
					'type':'saveConnection',
                
            };
		$.ajax({
			type: "POST",

			url:"/task",
			data: JSON.stringify(data),
			success: function(data) {
				if(data.code=='0'){
					layer.msg("连接失败！！",{icon:0});
				}
				else if(data.code=='1'){
					r = data.attribute;
					data_selected='';
					for(var i=0;i<r.length;i++){
					var attribute = r[i];
						data_selected+='<div class="check"><input type="checkbox"  id="'+attribute.replace(/\(.*?\)/g,'').replace(' ','')+'" value="'+attribute+'"><label for="'+attribute.replace(/\(.*?\)/g,'').replace(' ','')+'">'+attribute+'</label></div>';
					}

				}
				else if(data.code=='2'){
					layer.msg("连接成功！！上一个结点信息已传入下一个结点！！",{icon:1});
				}
			}
		});
	},

	doPost: function(path, data) {
		var result = null;
		$.ajax({
			type: "POST",
			url: path,
			data: data,
			async: false,
			success: function(msg) {
				result = msg;
			}
		});
		return result;
	},

	doGet: function(path, data) {
		var result = null;
		$.ajax({
			type: "GET",
			url: path,
			data: data,
			success: function(msg) {
				result = msg;
			}
		});
		return result;
	},

	///////////////////////////////////////////////////////////////////

	//project中的c_window设置成jsPlumb对象 也是全局唯一的helper
	helper: new jsPlumbHelper('c_window'),

	getHelper: function() {
		if(this.helper.isInit == false) {
			this.helper.init();
		}
		return this.helper;
	},

	getJSPlumb: function() {
		return this.helper.getJsPlumbInstance();
	},

	//阻止事件冒泡
	stopBubble: function(e) {
		//如果提供了事件对象，则这是一个非IE浏览器
		if(e && e.stopPropagation)
		//因此它支持W3C的stopPropagation()方法
			e.stopPropagation();
		else
		//否则，我们需要使用IE的方式来取消事件冒泡
			window.event.cancelBubble = true;
	},

	//右边属性框icon改变时间 upDownEvent同样
	rightDownEvent: function(id) {
		var panel = $('#' + id).parent('.panel');
		var span = panel.children('span')[0];
		var $span = $(span);
		if($span.hasClass('glyphicon-chevron-down')) {
			$span.removeClass('glyphicon-chevron-down');
			$span.addClass('glyphicon-chevron-right');
			return;
		}

		if($span.hasClass('glyphicon-chevron-right')) {
			$span.removeClass('glyphicon-chevron-right');
			$span.addClass('glyphicon-chevron-down');
			return
		}
	},

	//the event of click contorller right span
	upDownEvent: function(e) {
		var span = $(this);
		span.toggleClass("glyphicon-chevron-up").toggleClass("glyphicon-chevron-down");
		if(span.hasClass("glyphicon-chevron-up")) {
			span.siblings("p").show();
		}
		if(span.hasClass("glyphicon-chevron-down")) {
			span.siblings("p").hide();
		}
		if(e && e.stopPropagation)
		//因此它支持W3C的stopPropagation()方法
			e.stopPropagation();
		else
		//否则，我们需要使用IE的方式来取消事件冒泡
			window.event.cancelBubble = true;
	},

	/**
	 * @description 鼠标点击task节点事件
	 *    主要包括：
	 * 1.更新上一个节点信息到数据库
	 * 2.把点击选择到的节点的所有prop信息展示到属性框
	 * 3.给添加的每一个属性样式添加点击事件
	 * @param e
	 */
	clickEventOnNode: function(e) {
		var util = this;
		var helper = this.helper;
		var key = '';
		//先保存上一个节点
		var lastnode = helper.getCurrentNode();
		if(lastnode != null) {
			//todo update node here
			
		}
		if(e != null)
			key = e.currentTarget.id;
		else {
			//对于ie浏览器
		}
		var content = $('#prop_container');
		content.empty();
		helper.setCurrentNode(key);

		var node = helper.container.getNode(key);
		var props = node.prop;
		for(var i = 0; i < props.length; i++) {
			var inputType = props[i].editor;
			var str = this.buildPannel(node, i);
			switch(inputType) {
				case 'file':
					var filePannel = $(str).appendTo(content);
					var file = filePannel.find('input');
					file.change(editorMethod[props[i].changeEvent]);
					break;
				
				case 'select':
					var selectPannel = $(str).appendTo(content);
					var select = selectPannel.find('select');
					select.change(editorMethod[props[i].changeEvent]);
					break;
				
				case 'doubleSelect':
					var selectPannel = $(str).appendTo(content);
					var select = selectPannel.find('select')[0];
					$(select).change(editorMethod[props[i].changeEvent]);
					break;
				case 'checkbox':
					var checkboxPannel = $(str).appendTo(content);
					var check = checkboxPannel.find('input');
					check.click(editorMethod[props[i].changeEvent]);
					break;
				case 'deallosing':
					var deallosingPannel = $(str).appendTo(content);
					var deallosing = deallosingPannel.find('button');
					deallosing.click(editorMethod[props[i].changeEvent]);
					break;
				case 'removeDuplicate':
					var removeDuplicatePannel = $(str).appendTo(content);
					var removeDuplicate = removeDuplicatePannel.find('button');
					removeDuplicate.click(editorMethod[props[i].changeEvent]);
					break;
				case 'smote':
					var smotePannel = $(str).appendTo(content);
					var smote = smotePannel.find('button');
					smote.click(editorMethod[props[i].changeEvent]);
					break;
				case 'standard':
					var standardPannel = $(str).appendTo(content);
					var standard = standardPannel.find('button');
					standard.click(editorMethod[props[i].changeEvent]);
					break;
				case 'normalization':
					var normalizationPannel = $(str).appendTo(content);
					var normal = normalizationPannel.find('button');
					normal.click(editorMethod[props[i].changeEvent]);
					break;
				case 'pca':
					var pcaPannel = $(str).appendTo(content);
					var pca = pcaPannel.find('button');
					pca.click(editorMethod[props[i].changeEvent]);
					break;
				case 'boxing':
					var boxingPannel = $(str).appendTo(content);
					var boxing = boxingPannel.find('button');
					boxing.click(editorMethod[props[i].callback]);
					break;
					
				case 'bayes1':	
					var bayesPannel = $(str).appendTo(content);
					var navibayes = bayesPannel.find('select');
					navibayes.click(editorMethod[props[i].changeEvent]);
					break;
				case 'bayes2':	
					var bayesPannel2 = $(str).appendTo(content);
					var bayes2 = bayesPannel2.find('button');
					bayes2.click(editorMethod[props[i].changeEvent]);
					break;
				case 'bayes3':	
					var bayesPannel3 = $(str).appendTo(content);
					var bayes3 = bayesPannel3.find('button');
					bayes3.click(editorMethod[props[i].changeEvent]);
					break;
					
				case 'decision_tree1':	
					var d_treePannel1 = $(str).appendTo(content);
					var decision_tree1 = d_treePannel1.find('select');
					decision_tree1.click(editorMethod[props[i].changeEvent]);
					break;
				case 'decision_tree2':	
					var d_treePannel2 = $(str).appendTo(content);
					var decision_tree2 = d_treePannel2.find('button');
					decision_tree2.click(editorMethod[props[i].changeEvent]);
					break;
				case 'decision_tree3':	
					var d_treePannel3 = $(str).appendTo(content);
					var decision_tree3 = d_treePannel3.find('button');
					decision_tree3.click(editorMethod[props[i].changeEvent]);
					break;
				
				case 'randomforest1':	
					var randomforestPannel1 = $(str).appendTo(content);
					var randomforest1 = randomforestPannel1.find('select');
					randomforest1.click(editorMethod[props[i].changeEvent]);
					break;
				case 'randomforest2':	
					var randomforestPannel2 = $(str).appendTo(content);
					var randomforest2 = randomforestPannel2.find('button');
					randomforest2.click(editorMethod[props[i].changeEvent]);
					break;
				case 'randomforest3':	
					var randomforestPannel3 = $(str).appendTo(content);
					var randomforest3 = randomforestPannel3.find('button');
					randomforest3.click(editorMethod[props[i].changeEvent]);
					break;
				
				case 'gbdt1':	
					var gbdtPannel1 = $(str).appendTo(content);
					var gbdt1 = gbdtPannel1.find('select');
					gbdt1.click(editorMethod[props[i].changeEvent]);
					break;
				case 'gbdt2':	
					var gbdtPannel2 = $(str).appendTo(content);
					var gbdt2 = gbdtPannel2.find('button');
					gbdt2.click(editorMethod[props[i].changeEvent]);
					break;
				case 'gbdt3':	
					var gbdtPannel3 = $(str).appendTo(content);
					var gbdt3 = gbdtPannel3.find('button');
					gbdt3.click(editorMethod[props[i].changeEvent]);
					break;
				
				
				
				case 'logistic1':	
					var logisticPannel1 = $(str).appendTo(content);
					var logistic1 = logisticPannel1.find('select');
					logistic1.click(editorMethod[props[i].changeEvent]);
					break;
				case 'logistic2':	
					var logisticPannel2 = $(str).appendTo(content);
					var logistic2 = logisticPannel2.find('button');
					logistic2.click(editorMethod[props[i].callback]);
					break;
				case 'logistic3':	
					var logisticPannel3 = $(str).appendTo(content);
					var logistic3 = logisticPannel3.find('button');
					logistic3.click(editorMethod[props[i].changeEvent]);
					break;
				case 'svm1':	
					var svmPannel1 = $(str).appendTo(content);
					var svm1 = svmPannel1.find('select');
					svm1.click(editorMethod[props[i].changeEvent]);
					break;
				
				case 'svm2':	
					var svmPannel2 = $(str).appendTo(content);
					var svm2 = svmPannel2.find('button');
					svm2.click(editorMethod[props[i].changeEvent]);
					break;
				
				case 'svm3':	
					var svmPannel3 = $(str).appendTo(content);
					var svm3 = svmPannel3.find('button');
					svm3.click(editorMethod[props[i].changeEvent]);
					break;
				

				case 'neural1':	
					var neuralPannel1 = $(str).appendTo(content);
					var neural1 = neuralPannel1.find('select');
					neural1.click(editorMethod[props[i].changeEvent]);
					break;
				case 'neural2':	
					var neuralPannel2 = $(str).appendTo(content);
					var neural2 = neuralPannel2.find('button');
					neural2.click(editorMethod[props[i].callback]);
					break;
				case 'neural3':	
					var neuralPannel3 = $(str).appendTo(content);
					var neural3 = neuralPannel3.find('button');
					neural3.click(editorMethod[props[i].changeEvent]);
					break;		
				
				case 'linear1':	
					var linearPannel1 = $(str).appendTo(content);
					var linear1 = linearPannel1.find('button');
					linear1.click(editorMethod[props[i].callback]);
					break;
				case 'linear2':	
					var linearPannel2 = $(str).appendTo(content);
					var linear2 = linearPannel2.find('button');
					linear2.click(editorMethod[props[i].changeEvent]);
					break;		
				
				case 'decisionTreeReg2':	
					var decisionTreeRegPannel2 = $(str).appendTo(content);
					var decisionTreeReg2 = decisionTreeRegPannel2.find('button');
					decisionTreeReg2.click(editorMethod[props[i].changeEvent]);
					break;
				case 'decisionTreeReg3':	
					var decisionTreeRegPannel3 = $(str).appendTo(content);
					var decisionTreeReg3 = decisionTreeRegPannel3.find('button');
					decisionTreeReg3.click(editorMethod[props[i].changeEvent]);
					break;
				
				case 'neuralReg1':	
					var neuralRegPannel1 = $(str).appendTo(content);
					var neuralReg1 = neuralRegPannel1.find('select');
					neuralReg1.click(editorMethod[props[i].changeEvent]);
					break;
				case 'neuralReg2':	
					var neuralRegPannel2 = $(str).appendTo(content);
					var neuralReg2 = neuralRegPannel2.find('button');
					neuralReg2.click(editorMethod[props[i].callback]);
					break;
				case 'neuralReg3':	
					var neuralRegPannel3 = $(str).appendTo(content);
					var neuralReg3 = neuralRegPannel3.find('button');
					neuralReg3.click(editorMethod[props[i].changeEvent]);
					break;		
				
				case 'kmeans1':	
					var kmeansPannel1 = $(str).appendTo(content);
					var kmeans1 = kmeansPannel1.find('select');
					kmeans1.click(editorMethod[props[i].changeEvent]);
					break;
				case 'kmeans2':
					var kmeansPannel2 = $(str).appendTo(content);
					var kmeans2 = kmeansPannel2.find('button');
					kmeans2.click(editorMethod[props[i].callback])
					break;
				case 'kmeans3':	
					var kmeansPannel3 = $(str).appendTo(content);
					var kmeans3 = kmeansPannel3.find('button');
					kmeans3.click(editorMethod[props[i].changeEvent]);
					break;
				default:
					content.append(str);
			}

		}

		$('.panel-collapse').on('show.bs.collapse', function() {
			var id = this.id;
			util.rightDownEvent(id);
		});
		$('.panel-collapse').on('hidden.bs.collapse', function() {
			var id = this.id;
			util.rightDownEvent(id);
		})
		this.stopBubble(e);
	},

	//构建task元素字符串
	buildRect: function(node) {
		var s = '<div id="' + node.id +
			'" class="tasknode">' +
			'<span class="' + node.rect.srcClass +
			'"></span> <strong>' + node.rect.text +
			'</strong>' +
			'<span class="glyphicon glyphicon-chevron-down"></span>' +
			'<p>' + node.rect.note + '</p></div>';
		return s;
	},

	//构建右边属性框元素字符串
	buildPannel: function(node, index) {
		var props = node.prop;
		var id = node.id + index;
		var val = props[index].value;
		var editor = props[index].editor;
		var name = props[index].name;
		var str = null;

		//判断字符是否带有hide字
		if(editor.match('hide'))
			str = this.helper.editor.pannel(true);
		else
			str = this.helper.editor.pannel(false);
		str += this.helper.editor.smallIcon();
		str += this.helper.editor.pannelLabel(props[index].label, id);
		var content = null;
		
		if(editor == 'select') {
			content = this.helper.editor[editor](props[index]);
		} else {
			content = this.helper.editor[editor](props[index]);
		}
		str += this.helper.editor.pannelBody(id, content);
		str += '</div>';
		return str;
	},

	//绑定右键菜单事件 该方法使用了Jquery的右键菜单依赖 需要导入相关jq库
	bindcontextmenu: function(idValue) {
		var util = this;
		var helper = this.getHelper();
		var id = "#" + idValue;
		var el = $(id);
		$(id).contextPopup({
			//		title: 'My Popup Menu',
			items: [{
				label: '删除本节点',
				action: function() {
					if(confirm("确定删除本节点吗?")) {

						var target = helper.container.getNode(idValue);
						var entype=target.type;
						//删除连线操作
						helper.container.nodes.forEach(function(node, index, array) {

							var connections = node.connections;
							for(var i = 0; i < connections.length; i++) {
								if(connections[i].targetId == idValue ||
									connections[i].sourceId == idValue) {
									helper.container.removeConnection(
										connections[i].sourceId,
										connections[i].suuid,
										connections[i].tuuid
									)
								}
							}
						});
						helper.instance.detachAllConnections(el);
						var del = helper.container.getNode(idValue);

						var data= {'endid': idValue,'endtype':del.type ,'type':'delNode'};
						// alert(idValue)
						$.ajax({
							type: "POST",
							url: "/task",
							data:JSON.stringify(data),
							// contentType: 'application/json; charset=UTF-8',
							success: function() {
								alert("删除结点成功！")
								}
							});


						helper.instance.removeAllEndpoints(idValue);
						$(id).remove();



					}

				}
			}, {
				label: '查看日志',
				action: function() {
					alert('查看日志');
				}
			}, {
				label: '运行到此处',
				action: function() {
                    if (confirm("确定运行至本节点吗?")) {
                        var endnode = helper.container.getNode(idValue)
                        var data= {'endid': idValue,'endtype':endnode.type,'type':'saveLine'};

                        $.ajax({
                            type: "POST",
                            url: "/task",
                            data: JSON.stringify(data),
                             // contentType: 'application/json; charset=UTF-8',
                            success: function () {

                                alert("运行成功");

                            }
                        });

                    }
                }
			}, {
				label: '查看结果',
				action: function() {
					alert('查看结果');
				}
			},{   //查看算法结构
			   label: '查看代码/介绍',
			   action: function() {
				  //弹出框

				  var node = Util.helper.container.getNode(idValue);
				  var n_type=node.type;
				  var tableParams = $('#table-params');
				  //移除hide class用于layer显示
				  tableParams.removeClass("hide");
				  //todo ajax for here
				  var s='<div '+ 'id="container1" '+'style="height: 100%;width: 100% "> '+'</div>';
				  $(function() {
				   marked.setOptions({
				  renderer: new marked.Renderer(),
				  gfm: true,
				  tables: true,
				  breaks: true,
				  pedantic: false,
				  sanitize: false,
				  smartLists: false,
				  smartypants: false,
				  highlight: function (code) {
					return hljs.highlightAuto(code).value;
				  }
				 });
				 hljs.initHighlightingOnLoad();
				 $.get("/static/code_md/"+n_type, function(response, status, xhr){
				  $("#container1").html(marked(response));
				  //$("#container1").addClass("table")
			});
			})

				  //var s1='<script src="'+'/'+'static'+'/js/project/load_md.js'+'">'+'</script>'
				  var s2='<script src="/static/js/highlight.pack.js"></script>'
				  //console.log(s1)
				  $("#table-params").html(s)
				  //$("#table-params").append(s1)
				  $("#table-params").append(s2)
				  var lt = layer.open({
					 type: 1,
					 title: n_type,
					 fix: true,
					 scrollbar: true,
					 area: ['85%', '90%'], //宽高
					 content: $('#table-params'), //project.jsp中的一个隐藏div
					 btn: ['保存', '取消'],
					 yes: function(index, layero) {
						// var trs = $($(tableParams[0]).find('table')[0]).find('tr');
						// var prop = Util.helper.container.getPropByID(prop_id, node);
						// var value_str = '';
					 },
					 btn2: function(index, layero) {}
				  });
			   }
			}

			]
		});
	},
	/**
	 * @author Wang zhiwen
	 * @description 构建弹出框显示元数据表格
	 * @param list
	 * @returns {string}
	 */
	buildMetaTable: function(list) {
		var str = '<table class="table table-striped">' +
			'<caption>选择元数据字段</caption>' +
			'<thead>' +
			'<tr>' +
			'<th>字段名</th>' +
			'<th>别名</th>' +
			'<th>描述</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody>'
		for(var i = 0; i < list.length; i++) {
			var column = '<tr><td>' + list[i].fieldName + '</td>' +
				'<td>' + list[i].fieldCnName + '</td>' +
				'<td>' + list[i].fieldDesc + '</td>' +
				'<td>'
				// +'<div class="btn-group" data-toggle="buttons">'
				+
				'<label class="btn btn-primary">' +
				'<input type="radio" name="' + 'isSelect' + i + '" value="yes" checked="checked"> 已选 </label>' +
				'<label class="btn btn-primary">' +
				'<input type="radio" name="' + 'isSelect' + i + '" value="no"> 未选 </label>'
				// +'</div>'
				+
				'</td>' +
				'</tr>'
			str += column
		}
		str += '</tbody>'
		str += '</table>'
		return str;
	}
};

var data_selected='';
var transform ='';
var interval = '';
var save_selected = '';
var dtree_data='';
var randomforest_data='';
var centroids='';
var kmeans_dataset='';
var gbdt_data='';
var linear_dataset='';
var logistic_data='';
var svm_data='';
var bayes_data='';
var k_value='';
var gbdt_data='';
var linear_split='';
var neuralReg_data='';
var select_html='';
var select_html1='';
var file_orignal='';
var editorMethod = {
	defaultInit: function(prop) {
		if(prop != null)
			alert(prop)
		var map = new Map();
		map.set('key1', 'value1');
		map.set('key2', 'value2');
		return map;
	},
	defaultChange: function(event) {
		//Todo change事件看需求写 暂时没想法

		var select = $(this).val()
		alert(select)
	},
	
	getfile:function(){
		var formData = new FormData();
		formData.append('file_obj',$("#myfile")[0].files[0]);
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:formData,
            contentType: false,
            processData: false,
			
			//  新增content-type头部属性
			success: function(data) {
				r = data.attribute;
				rows = data.rows;
				if (r=='输入的文件不符合要求！'){
					alert("输入的文件不符合要求！")
				}
				data_selected = ''; 
				file_orignal = 'hive';
				
				for(var i=0;i<r.length;i++){
					var attribute = r[i];
					
					data_selected+='<div class="check"><input type="checkbox"  id="'+attribute.replace(/\(.*?\)/g,'').replace(' ','')+'" value="'+attribute+'"><label for="'+attribute.replace(/\(.*?\)/g,'').replace(' ','')+'">'+attribute+'</label></div>';
					}
				var html='<div class="source"><table border="1" style="table-layout:fixed;"><tr>';
				for(var attr=0;attr<rows[0].length;attr++){
					
					html+='<th>'+rows[0][attr].replace(/\(.*?\)/g,'')+'</th>';
				}
				html += '</tr>';	
				for(var n=1;n<rows.length;n++){
					
					html += '<tr>';
					for(var item=0;item<rows[0].length;item++){
						
						html += "<td>" + rows[n][item] + "</td>";
						}
					html+='</tr>';
					
					};
				html+='</table></div>';
				
				$("div.source").remove();
				$(".myfile1").append(html);
				select_html1 = $(".myfile1").html();
				select_html='';
			}
		});
		
	},
	
	tablemateEventChange: function() {
		
		localStorage.clear();//清除localStorage保存对象的全部数据
		var selected = $(this).val();
		var name=$(this).attr("name");
		var check_id=$(this).attr("id");
		
		//var clustering_data = ["","kmeans_data"]
		//var classify_data = ["","decisiontree_data","randomforest_data","gbdt_data","logistic_data","svm_data","bayes_data","neural_data","linear_data","decisionTreeReg_data","neuralReg_data"]
		if(name=='classify1')
		{
			
			var s1=document.getElementById('s1');
			s1.selected=true;
		}
		else{
			
			var s2=document.getElementById('s2');
			s2.selected=true;
		}
			
		var prop_id = this.id.substring(0, 16);
		
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node = Util.helper.container.getNode(node_id);
		var prop = Util.helper.container.getPropByID(prop_id, node);
		 
		//var secendSelect = $('#' + prop_id + 'ds2')[0];
		//todo ajax for here
		var data = {"dataid":node_id,"data":selected,"nodetype":node.type,"type":'data_source'};
		
		save_selected = data;
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				//r = data.attribute;
				rows = data.rows;
				data_selected = ''; 
				file_orignal='local';
				//console.log(localStorage);
				//for(var i=0;i<r.length;i++){
					//var attribute = r[i];
					
					//data_selected+='<div class="check"><input type="checkbox"  id="'+attribute.replace(/\s+/g,"")+'" value="'+attribute+'"><label for="'+attribute.replace(/\s+/g,"")+'">'+attribute+'</label></div>';
				//	}
				var html='<div class="source"><table border="1" style="table-layout:fixed;"><tr>';
				for(var attr=0;attr<rows[0].length;attr++){
					
					html+='<th>'+rows[0][attr].replace(/\(.*?\)/g,'')+'</th>';
				}
				html += '</tr>';	
				for(var n=1;n<rows.length;n++){
					
					html += '<tr>';
					for(var item=0;item<rows[0].length;item++){
						
						html += "<td>" + rows[n][item] + "</td>";
						}
					html+='</tr>';
					
					};
				html+='</table></div>';
				$("div.source").remove();
				$(".classify").append(html);
				select_html = $(".source").html();
				select_html1='';
			}
		});
	},	
	
	
	checked_attribute: function() {
		localStorage.clear();//清除localStorage保存对象的全部数据
		var arr = new Array();
	
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		
		var obj = $("input[type='checkbox']");
		
		for(k in obj){
			if(obj[k].checked)
				arr.push(obj[k].value);
		}
				
		var data = {"data":arr,"type":'field','file_orignal':file_orignal,"nodeid":node_id,"nodetype":nodetype,};
		//var data = {"data":arr,"nodeid":node_id,"nodetype":nodetype,"type":'field'};
		
		var checked=$('input[type=checkbox]:checked');
		checked.each(function (i) {
			localStorage.setItem(i,$(this).val());
			
			
		});
		localStorage.setItem('length',checked.length);
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				transform = data.column_data;
				interval = data.interval;
				//console.log(interval);
					
				
			}    
			
		});
	},	
	
	show_deallosing:function(){
		var method = $(".method option:selected").val();
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var data = {"nodeid":node_id,"nodetype":nodetype,"type":'deallosing','method':method};
		//var data = {"type":'deallosing','method':method};
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data){ 
			
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
				
					deallosing = data.deallosing;
					
					transform=deallosing;
					var html='<table border="1" style="table-layout:fixed;"><tr>';
					$.each(deallosing,function(i,item){
						html+='<th>'+i.replace(/\(.*?\)/g,'')+'</th>';
					});
					html+='</tr><tr>';
					$.each(deallosing,function(i,item){
						html+='<td><table>';
						var item=0;
						for(var n=0;n<deallosing[i].length;n++){
							var item = deallosing[i][n];
							
							html += "<tr><td>" + parseFloat(item) + "</td></tr>";
							}
						html+='</table></td>';
						
						});
					html+='</tr></table>';
					
					$(".editor").append(html);
				}
			}
		});
	},
	
	
	show_removeDuplicate:function(){
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var data = {"nodeid":node_id,"nodetype":nodetype,"type":'removeDuplicate'};
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data){ 
			
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					removeDuplicate = data.removeDuplicate;
					transform=removeDuplicate;
					var html='<table border="1" style="table-layout:fixed;text-align:center"><tr>';
					$.each(removeDuplicate,function(i,item){
						html+='<th>'+i.replace(/\(.*?\)/g,'')+'</th>';
					});
					html+='</tr><tr>';
					$.each(removeDuplicate,function(i,item){
						html+='<td><table>';
						var item=0;
						for(var n=0;n<removeDuplicate[i].length;n++){
							var item = removeDuplicate[i][n];
							
							html += "<tr><td>" + parseFloat(item) + "</td></tr>";
							}
						html+='</table></td>';
						
						});
					html+='</tr></table>';
					
					$(".editor").append(html);
				}
			}
		});
	},
	
	
	
	show_smote:function(){
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var data = {"nodeid":node_id,"nodetype":nodetype,"type":'smote'};
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data){ 
			
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					smote = data.smote;
					transform=smote;
					var html='<table border="1" style="table-layout:fixed;text-align:center"><tr>';
					$.each(smote,function(i,item){
						html+='<th>'+i.replace(/\(.*?\)/g,'')+'</th>';
					});
					html+='</tr><tr>';
					$.each(smote,function(i,item){
						html+='<td><table>';
						var item=0;
						for(var n=0;n<smote[i].length;n++){
							var item = smote[i][n];
							
							html += "<tr><td>" + parseFloat(item) + "</td></tr>";
							}
						html+='</table></td>';
						
						});
					html+='</tr></table>';
					//$(".smote").remove();
					$(".editor").append(html);
				}
			}
		});
	},
	
	show_standard:function(){
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var data = {"nodeid":node_id,"nodetype":nodetype,"type":'standard'};
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data){ 
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					show_standard = data.standard;
					transform=show_standard;
					var html='<table border="1" style="table-layout:fixed;"><tr>';
					$.each(show_standard,function(i,item){
						html+='<th>'+i.replace(/\(.*?\)/g,'')+'</th>';
					});
					html+='</tr><tr>';
					$.each(show_standard,function(i,item){
						html+='<td><table>';
						var item=0;
						for(var n=0;n<show_standard[i].length;n++){
							var item = show_standard[i][n];
							
							html += "<tr><td>" + parseFloat(item) + "</td></tr>";
							}
						html+='</table></td>';
						
						});
					html+='</tr></table>';
					//$(".standard").remove();
					$(".editor").append(html);
				}
				
			}
		});
	},
	
	show_normalization:function(){
		
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var data = {"nodeid":node_id,"nodetype":nodetype,"type":'normal'};
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data){ 
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					normal = data.normalization;
					transform=normal;
					var html='<table border="1" style="table-layout:fixed;"><tr>';
					$.each(normal,function(i,item){
						html+='<th>'+i.replace(/\(.*?\)/g,'')+'</th>';
					});
					html+='</tr><tr>';
					$.each(normal,function(i,item){
						html+='<td><table>';
						var item=0;
						for(var n=0;n<normal[i].length;n++){
							var item = normal[i][n];
							
							html += "<tr><td>" + parseFloat(item) + "</td></tr>";
							}
						html+='</table></td>';
						
						});
					html+='</tr></table>';
					//$(".normal").remove();
					$(".editor").append(html);
				}
			}
		});
	},
	
	show_pca:function(){
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var data = {"nodeid":node_id,"nodetype":nodetype,"type":'pca'};
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					var ratios = data.ratios;
					var value = data.value;
					var components = data.components;
					var pca = data.pca;
					//console.log(pca);
					transform=pca;
					var html='<p>特征占主成分的比例为(前两个)：</p><p>';
					for(var n=0;n<ratios.length;n++){
						html+= ratios[n]+'&nbsp';
						
					}
					html+='</p>'
					html+='<p>特征维度的数目为： ' + components + '</p><p>';
					html+='<p>每个特征维度的方差分别为:</p>';
					for(var n=0;n<value.length;n++){
						html+= value[n]+'&nbsp';	
					}
					html+='</p>'
					html+='<div id="gallery"><a href="static/picture/n_components.jpg" "><img src="static/picture/n_components.jpg" width="50" height="50" alt="" /></a></div>';
					html+='<table border="1" style="table-layout:fixed;">';
					$.each(pca,function(i,item){
						html+='<td><table><tr><th>'+i.replace(/\(.*?\)/g,'')+'</th></tr>';
						var item=0;
						for(var n=0;n<pca[i].length;n++){
							var item = pca[i][n];
							
							html += "<tr><td>" + parseFloat(item) + "</td></tr>";
							}
						html+='</table></td>';
						
						});
					html+='</table>';
					
					
					$(".pca").append(html);
					$(function() {
						$('#gallery a').lightBox();
					});
				
				}
				}
			    
			
		});
	},
	
	//分箱
	show_boxing:function(event,prop){
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var data = {"nodeid":node_id,"nodetype":nodetype,"type":'boxing'};
		//var data = {"type":'boxing'};
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data){ 
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					boxing = data.boxing;
					var index = null;
					var button = event.delegateTarget;
					var prop_id = button.id;
					var prop_value = button.value;
					var collapse = $('#' + prop_id).closest('.panel-collapse')[0];
					var node_id = collapse.id.substring(0, 16);
					var node = Util.helper.container.getNode(node_id);

					var tableParams = $('#table-params');
					//移除hide class用于layer显示
					tableParams.removeClass("hide");
					var metaDataList = null;
					
					var html='<div '+ 'id="container1" '+'style="height: 100%;width: 100% "> '+'</div>';
					html += '<table cellspacing="10" style="table-layout:fixed;">';
					html += '<tr><td><table border="1" style="table-layout:fixed;">';
					
					$.each(boxing,function(i,item){
						html+='<tr><th>'+i.replace(/\(.*?\)/g,'')+'</th></tr>';
						html+='<tr>'
						$.each(boxing[i],function(j,item1){
							html+='<td><table cellspacing="0" cellpadding="0"><tr><th>'+j+'</th></tr>';
							var obj = Object.keys(item1);
							for(var n=0;n<obj.length;n++){
								
								var value = item1[n];
													
								html += "<tr><td>" + parseFloat(value).toFixed(5) + "</td></tr>";
							}
							html+='</table></td>';
						});
						
					});
					
					
					html += '</table></td>';
					html += '<td><table>';
					html += '<tr><td><p>IV的意思是信息价值,用来衡量自变量的预测能力</p></td></tr>';
					html += '<tr><td><p>WOE的意思是证据权重，他表示的是当前这个组中响应的客户和未响应客户的比值，和所有样本中这个比值的差异。这个差异是用这两个比值的比值，再取对数来表示的。WOE越大，这种差异越大，这个分组里的样本响应的可能性就越大，WOE越小，差异越小，这个分组里的样本响应的可能性就越小</p></td></tr>'
					html += '<tr><td><p>bad_rate指的是分类标签是1的比例</p></td></tr>';
					html += '<tr><td><p>group_rate指的是当前分箱类别所占的比例</p></td></tr></table>';
					html += '</td></tr></table>';
					
					//$(".boxing").html(s);
					$("#table-params").html(html);
					var lt = layer.open({
						type: 1,
						title: 'Boxing',
						fix: true,
						scrollbar: true,
						area: ['85%', '90%'], //宽高
						content: $('#table-params'), //project.jsp中的一个隐藏div
						btn: ['保存', '取消'],
						yes: function(index, layero) {
							var trs = $($(tableParams[0]).find('table')[0]).find('tr');
							var prop = Util.helper.container.getPropByID(prop_id, node);
							var value_str = '';
							
							prop.value = value_str;
						},
						btn2: function(index, layero) {}
					});
				}
			}
		});
	},
	
	
	
	
	dtree_attribute:function(){
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var max_depth = $(".max_depth option:selected").val();
		var criterion = $(".criterion option:selected").val();
		var splitter = $(".splitter option:selected").val();
		var min_samples_split = $(".min_samples_split option:selected").val();
		var split = $(".split input").val();
		dtree_data = {'nodeid':node_id,"nodetype":nodetype,'type':'decision_tree','max_depth':max_depth,'criterion':criterion,'splitter':splitter,'min_samples_split':min_samples_split,'split':split};
		//console.log(dtree_data);
	},	
	
	
	dtree_result:function(){
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(dtree_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					var score = data.score;
					var html = '<div class="score"><p>测试模型的有效性为：' + parseFloat(score).toFixed(2) +'</p></div>' 
					html += '<div id="gallery"><a href="static/picture/dtree.png" "><img src="static/picture/dtree.png" width="50" height="50" alt="" /><span id="clickMe"></span></a></div>'
					$("div.score").remove();
					$("div#gallery").remove();
					$(".decisionTree").append(html);
					$("div#gallery img").attr('src','/static/picture/dtree.png?t='+Math.random());
					$(function() {
						$('#gallery a').lightBox();
					});
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe").dispatchEvent(e);
						};
					},20);
				}
			}	
		});
		
	},
	
	dtree_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		var dtree = {'data':predict_data,'type':'dtree_predict'}
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(dtree),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + pred['0'] +'"></div>';
				$("div.result").remove();
				$(".dtree_predict").append(html);
				
			
			}	
		});
	},
	
	
	randomforest_attribute:function(){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var criterion = $(".criterion option:selected").val();
		var max_features = $(".max_features option:selected").val();
		var max_depth = $(".max_depth option:selected").val();
		var min_samples_split = $(".min_samples_split option:selected").val();
		var split = $(".split input").val();
		randomforest_data = {'nodeid':node_id,"nodetype":nodetype,'type':'randomforest','max_features':max_features,'max_depth':max_depth,'criterion':criterion,'min_samples_split':min_samples_split,'split':split}
	},	
	
	
	randomforest_result:function(){
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(randomforest_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					var result = data.result;
					var html = '<div class="score"><p>不同树的个数建立的模型评分为:</p>' ;
					
					
					html+='</div>';
					html += '<div id="gallery"><a href="static/picture/randomforest.jpg" "><img src="static/picture/randomforest.jpg" width="50" height="50" alt="" /><span id="clickMe"></span></a></div>'
					
					$("div#gallery").remove();
					$(".randomForest").append(html);
					$("div#gallery img").attr('src','/static/picture/randomforest.jpg?t='+Math.random());
					$(function() {
						$('#gallery a').lightBox();
					});
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe").dispatchEvent(e);
						};
					},20);
				}
			}	
		});
		
	},
	
	randomforest_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		var randomforest = {'data':predict_data,'type':'randomforest_predict'}
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(randomforest),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + pred['0'] +'"></div>';
				$("div.result").remove();
				$(".randomforest_predict").append(html);
				
			
			}	
		});
	},

	gbdt_attribute:function(){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var loss = $(".loss option:selected").val();
		var learning_rate = $(".learning_rate option:selected").val();
		var n_estimators = $(".n_estimators option:selected").val();
		var max_features = $(".max_features option:selected").val();
		var max_depth = $(".max_depth option:selected").val();
		var min_samples_split = $(".min_samples_split option:selected").val();
		var split = $(".split input").val();
		gbdt_data = {'nodeid':node_id,"nodetype":nodetype,'type':'gbdt','loss':loss,'learning_rate':learning_rate,'n_estimators':n_estimators,'max_depth':max_depth,'max_features':max_features,'min_samples_split':min_samples_split,'split':split}
	},	
	
	
	gbdt_result:function(){
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(gbdt_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					var score = data.score;
					
					var html = '<div class="score"><p>测试模型的有效性为：' + parseFloat(score).toFixed(2) +'</p></div>' ;
					html += '<div id="gallery"><a href="static/picture/gbdt.png" "><img src="static/picture/gbdt.png" width="50" height="50" alt="" /><span id="clickMe"></span></a></div>'
					$("div.score").remove();
					$("div#gallery").remove();
					$(".gbdt").append(html);
					$("div#gallery img").attr('src','/static/picture/gbdt.png?t='+Math.random());
					$(function() {
						$('#gallery a').lightBox();
					});
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe").dispatchEvent(e);
						};
					},20);
				}
			}	
		});
		
	},
	
	gbdt_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		var gbdt = {'data':predict_data,'type':'gbdt_predict'}
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(gbdt),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + pred['0'] +'"></div>';
				$("div.result").remove();
				$(".gbdt_predict").append(html);
				
			
			}	
		});
	},
	
	logistic_attribute:function(){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var solver = $(".solver option:selected").val();
		var split = $(".split input").val();
		logistic_data = {'nodeid':node_id,"nodetype":nodetype,'type':'logistic','solver':solver,'split':split}
	},	
	
	logistic_result:function(){
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(logistic_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
				
					var score = data.score;
					var html = '<div class="score"><p>测试模型的有效性为：' + parseFloat(score).toFixed(2) +'</p></div>'
					html +='<div id="gallery"><a href="static/picture/logistic.jpg" "><img src="static/picture/logistic.jpg" width="50" height="50" alt="" /><span id="clickMe"></span></a></div>'
					$("div.score").remove();
					$("div#gallery").remove();
					$(".logistic").append(html);
					$("div#gallery img").attr('src','/static/picture/logistic.jpg?t='+Math.random());
					$(function() {
						$('#gallery a').lightBox();
					});
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe").dispatchEvent(e);
						};
					},20);
				}
			}	
				
				
		});
		
	},
	
	logistic_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		var logistic_data = {'data':predict_data,'type':'logistic_predict'}
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(logistic_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + pred['0'] +'"></div>';
				$("div.result").remove();
				$(".logistic_predict").append(html);
				
			
			}	
		});
	},
	
	svm_attribute:function(){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var penalty = $(".penalty option:selected").val();
		var split = $(".split input").val();
		svm_data = {'nodeid':node_id,"nodetype":nodetype,'type':'svm','penalty':penalty,'split':split}
		
	},	
	
	
	svm_result:function(){
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(svm_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					var score = data.score;
					var html = '<div class="score"><p>测试模型的有效性为：' + parseFloat(score).toFixed(2) +'</p></div>'
					html +='<div id="gallery"><a href="static/picture/svm.jpg" "><img src="static/picture/svm.jpg" width="50" height="50" alt="" /><span id="clickMe"></span></a></div>'
					$("div.score").remove();
					$("div#gallery").remove();
					$(".svm").append(html);
					$("div#gallery img").attr('src','/static/picture/svm.jpg?t='+Math.random());
					$(function() {
						$('#gallery a').lightBox();
					});
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe").dispatchEvent(e);
						};
					},20);
				}
			}	
		});
		
	},
	
	
	svm_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		
		var svm = {'data':predict_data,'type':'svm_predict'}
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(svm),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				var html ='<div id="gallery"><a href="static/picture/svm_predict.jpg" "><img src="static/picture/svm_predict.jpg" width="50" height="50" alt="" /><span id="clickMe"></span></a></div>'
				
				$("div#gallery").remove();
				$(".svm_predict").append(html);
				$("div#gallery img").attr('src','/static/picture/svm_predict.jpg?t='+Math.random());
				$(function() {
					$('#gallery a').lightBox();
				});
				setTimeout(function() {
					if(document.all) {
						document.getElementById("clickMe").click();
					}
					else{
						var e = document.createEvent("MouseEvents");
						e.initEvent("click", true, true);
						document.getElementById("clickMe").dispatchEvent(e);
					};
				},20);
			
			}	
		});
	},
	
	
	bayes_attribute:function(){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var method = $(".method option:selected").val();
		var split = $(".split input").val();
		bayes_data = {'nodeid':node_id,"nodetype":nodetype,'type':'bayes','method':method,'split':split}
		
	},	
	
	
	bayes_result:function(){
		
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(bayes_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					var score = data.score;
					var html = '<div class="score"><p>测试模型的有效性为：' + parseFloat(score).toFixed(2) +'</p></div>'
					html+='<div id="gallery"><a href="static/picture/bayes.jpg" "><img src="static/picture/bayes.jpg" width="50" height="50" alt="" /><span id="clickMe"></span></a></div>'
					//html+='<img class="dialog" src="static/picture/bayes.png" width="50" height="50"><div id="dialog_large_image"></div>'
					//html+='<div height="400" width="600" style="margin:50px"><canvas id="chart"> 你的浏览器不支持HTML5 canvas </canvas></div>'
					$("div.score").remove();
					$("div#gallery").remove();
					$(".navibayes").append(html);
					$("div#gallery img").attr('src','/static/picture/bayes.jpg?t='+Math.random());
					$(function() {
						$('#gallery a').lightBox();
					});
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe").dispatchEvent(e);
						};
					},20);
				}
			}	
		});
		
		//localStorage.clear();
	},
	
	
	bayes_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		
		var bayes = {'data':predict_data,'type':'bayes_predict'}
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(bayes),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + pred['0'] +'"></div>';
				$("div.result").remove();
				$(".bayes_predict").append(html);
				
				
			
			}	
		});
	},
	
	neural_attribute:function(){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var activation = $(".activation option:selected").val();
		var hiddenlayer = $(".hiddenlayer option:selected").val();
		var solver = $(".solver option:selected").val();
		var split = $(".split input").val();
		
		neural_data = {'nodeid':node_id,"nodetype":nodetype,'type':'neural','activation':activation,'hiddenlayer':hiddenlayer,'solver':solver,'split':split}
	},	
	
	
	neural_result:function(event, prop){
		
		$.ajax({
			type: "POST",
			url: "/task",
			async:false,
			data:JSON.stringify(neural_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					var index = null;
					var button = event.delegateTarget;
					
					var prop_id = button.id;
					var prop_value = button.value;
					var collapse = $('#' + prop_id).closest('.panel-collapse')[0];
					var node_id = collapse.id.substring(0, 16);
					var node = Util.helper.container.getNode(node_id);

					var tableParams = $('#table-params');
					//移除hide class用于layer显示
					tableParams.removeClass("hide");
					var metaDataList = null;
					
					var html = '<script src="/static/js/plugins/JQuery/neural.js"></script>'
					html += '<div id="gallery"><a href="static/picture/neural_pic.jpg" "><img src="static/picture/neural_pic.jpg" width="50" height="50" alt="" /><span id="clickMe2"></span></a></div>'
					var s='<div '+ 'id="container1" '+'style="height: 100%;width: 100% "> '+'</div>';
					var s1 ='<a href="/static/web/viewer.html?name=/static/picture/neural.gv.pdf" target="pdfContainer" onclick="showPdf(true)"><span id="clickMe"></span></a>'
					s1 += '<div class="lightbox" id="lightbox"></div><div id="pop" class="pop" style="display: none;"><a href="javascript:close()" style="position: absolute;right: -90px;display: inline-block;width: 80px;height: 30px;" id="close">关闭</a><iframe src="" frameborder="0" id="pdfContainer" name="pdfContainer"></iframe></div>'
					
					
					$("div#gallery").remove();
					$("#table-params").html(s)
					$("#table-params").append(s1)
					
					$(".neuralNet").append(html);
					$("div#gallery img").attr('src','/static/picture/neural_pic.jpg?t='+Math.random());
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe2").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe2").dispatchEvent(e);
						};
					},20);
					
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe").dispatchEvent(e);
						};
					},20);

					
						
					
					$(function() {
						$('#gallery a').lightBox();
					});
				}
			}	
		});
		
	},
	
	neural_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		var gbdt = {'data':predict_data,'type':'neural_predict'}
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(gbdt),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + pred['0'] +'"></div>';
				$("div.result").remove();
				$(".neural_predict").append(html);
				
			
			}	
		});
	},
	
	linear_result:function(event,prop){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		linear_split = $(".split input").val();
		linear_data = {'nodeid':node_id,"nodetype":nodetype,'type':'linear','split':linear_split}
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(linear_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					linear_dataset = data.orignal_data;
					var score = data.score;
					var index = null;
					var button = event.delegateTarget;
					var prop_id = button.id;
					var prop_value = button.value;
					var collapse = $('#' + prop_id).closest('.panel-collapse')[0];
					var node_id = collapse.id.substring(0, 16);
					var node = Util.helper.container.getNode(node_id);

					var tableParams = $('#table-params');
					//移除hide class用于layer显示
					tableParams.removeClass("hide");
					var metaDataList = null;
					//todo ajax for here
					var s='<div '+ 'id="container1" '+'style="height: 100%;width: 100% "> '+'</div>';
					var s1='<script src="/static/js/plugins/JQuery/linear.js"></script>'
					var html = '<div class="score"><p>测试模型的有效性为：' + parseFloat(score).toFixed(2) +'</p></div>'
					$("div.score").remove();
					$("#table-params").html(s);
					$("#table-params").append(s1);
					$(".linearReg").append(html)
					
					var lt = layer.open({
						type: 1,
						title: 'Linear',
						fix: true,
						scrollbar: true,
						area: ['85%', '90%'], //宽高
						content: $('#table-params'), //project.jsp中的一个隐藏div
						btn: ['保存', '取消'],
						yes: function(index, layero) {
							var trs = $($(tableParams[0]).find('table')[0]).find('tr');
							var prop = Util.helper.container.getPropByID(prop_id, node);
							var value_str = '';
							
							prop.value = value_str;
						},
						btn2: function(index, layero) {}
					});
				}
			}	
				
		});
		
		
	},
	
	linear_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		var linear_data = {'data':predict_data,'type':'linear_predict'}
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(linear_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + parseFloat(pred['0']).toFixed(5) +'"></div>';
				$("div.result").remove();
				$(".linear_predict").append(html);
				
			
			}	
		});
	},
	
	decisionTreeReg_result:function(){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var split = $(".split input").val();
		decisionTreeReg_data = {'nodeid':node_id,"nodetype":nodetype,'type':'decisionTreeReg','split':split}
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(decisionTreeReg_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					var html = '<div id="gallery"><a href="static/picture/decisionTreeReg.jpg" "><img src="static/picture/decisionTreeReg.jpg" width="50" height="50" alt="" /><span id="clickMe"></span></a></div>'
					
					$("div#gallery").remove();
					$(".decisionTreeReg").append(html);
					$(function() {
						$('#gallery a').lightBox();
					});
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe").dispatchEvent(e);
						};
					},20);
				}
			}	
		});
		
	},
	
	decisionTreeReg_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		var randomforest = {'data':predict_data,'type':'decisionTreeReg_predict'}
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(randomforest),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + pred['0'] +'"></div>';
				$("div.result").remove();
				$(".decisionTreeReg_predict").append(html);
				
			
			}	
		});
	},
	
	neuralReg_attribute:function(){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var activation = $(".activation option:selected").val();
		
		var solver = $(".solver option:selected").val();
		var split = $(".split input").val();
		
		neuralReg_data = {'nodeid':node_id,"nodetype":nodetype,'type':'neuralReg','activation':activation,'solver':solver,'split':split}
	},	
	
	neuralReg_result:function(){
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(neuralReg_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					score = data.score;
					var html = '<div class="score"><p>测试模型的有效性为：' + parseFloat(score).toFixed(2) +'</p></div>'
					html += '<div id="gallery"><a href="/static/picture/neuralReg.jpg" "><img src="/static/picture/neuralReg.jpg" width="50" height="50" alt="" /><span id="clickMe"></span></a></div>'
					$("div.score").remove();
					$("div#gallery").remove();
					
					$(".neuralReg").append(html);
					$("div#gallery img").attr('src','/static/picture/neuralReg.jpg?t='+Math.random());
					$(function() {
						$('#gallery a').lightBox();
					});
					setTimeout(function() {
						if(document.all) {
							document.getElementById("clickMe").click();
						}
						else{
							var e = document.createEvent("MouseEvents");
							e.initEvent("click", true, true);
							document.getElementById("clickMe").dispatchEvent(e);
						};
					},20);
				}
			}	
		});
		
	},
	
	neuralReg_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		var randomforest = {'data':predict_data,'type':'neuralReg_predict'}
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(randomforest),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + pred['0'] +'"></div>';
				$("div.result").remove();
				$(".neuralReg_predict").append(html);
				
			
			}	
		});
	},
	
	
	kmeans_attribute:function(){
		
		var collapse = $('#'+this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
	    var node=Util.helper.container.getNode(node_id);
	    var nodetype=node.type;
		var k_value = $(".k_value option:selected").val();
		var split = $(".split input").val();
		kmeans_data = {'nodeid':node_id,"nodetype":nodetype,'type':'kmeans','k_value':k_value,'split':split}
		//console.log(kmeans_data);
	},	
	
	
	kmeans_result: function(event, prop) {
		//Todo 弹出框实现方法 目前弹出框没内容
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(kmeans_data),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				if(data.code=='0'){
					layer.msg("请连线再做操作！！谢谢！！",{icon:2});
				}
				else if(data.code=='1'){
					kmeans_dataset = data.orignal_data;
					score = data.score;
					k_value = data.k_value;
					//获取node对象
					var index = null;
					var button = event.delegateTarget;
					//console.log(button);
					var prop_id = button.id;
					var prop_value = button.value;
					var collapse = $('#' + prop_id).closest('.panel-collapse')[0];
					var node_id = collapse.id.substring(0, 16);
					var node = Util.helper.container.getNode(node_id);

					var tableParams = $('#table-params');
					//移除hide class用于layer显示
					tableParams.removeClass("hide");
					var metaDataList = null;
					//todo ajax for here
					var s='<div '+ 'id="container1" '+'style="height: 100%;width: 100% "> '+'</div>';
					var s1='<script src="/static/js/plugins/JQuery/kmeans.js"></script>'
					var html = '<div class="score"><p>测试模型的有效性为：' + parseFloat(score).toFixed(2) +'</p></div>'
					$("div.score").remove();
					$(".KMeans").append(html);
					
					$("#table-params").html(s);
					$("#table-params").append(s1);
					var lt = layer.open({
						type: 1,
						title: 'Kmeans',
						fix: true,
						scrollbar: true,
						area: ['85%', '90%'], //宽高
						content: $('#table-params'), //project.jsp中的一个隐藏div
						btn: ['保存', '取消'],
						yes: function(index, layero) {
							var trs = $($(tableParams[0]).find('table')[0]).find('tr');
							var prop = Util.helper.container.getPropByID(prop_id, node);
							var value_str = '';
							
							prop.value = value_str;
						},
						btn2: function(index, layero) {}
					});
				}
			}	
		});

	},

	
	kmeans_predict:function(){
		var predict_data = [];
		$(".attribute input[type='text']").each(function(){
			predict_data.push($(this).val())
		});
		
		var kmeans = {'data':predict_data,'type':'kmeans_predict','centroids':centroids}
		
		$.ajax({
			type: "POST",
			url: "/task",
			data:JSON.stringify(kmeans),
			contentType: 'application/json; charset=UTF-8',
			//  新增content-type头部属性
			success: function(data) {
				pred = data.pred;
				var html='<div class="result">预测结果:<input type="text"  style="width:100%" value="' + pred +'"></div>';
				$("div.result").remove();
				$(".kmeans_predict").append(html);	
			
			}	
		});
	},
	

    
        

}