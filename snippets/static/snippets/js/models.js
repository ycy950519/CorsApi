//存储API记号数据的方式，在应用内创建用户验证
(function ($, Backbone, _, app){
	
	function csrfSafeMethod(method){
		return(/^(GET|HEAD|OPTIONS|TRACE)$/i.test(method));
	}
	
	function getCookie(name){
		var cookieValue = null;
		if(document.cookie && document.cookie !=''){
			var cookies = document.cookie.split(';');
			for(var i=0; i<cookies.length; i++){
				var cookie = $.trim(cookies[i]);
				if(cookie.substring(0,name.length+1)==(name+ '=')){
					cookieValue=decodeURIComponent(
						cookie.substring(name.length+1));
					break;
				}
			}
		}
		return cookieValue;
	}
	
	$.ajaxPrefilter(function(settings,originalOptions,xhr){
		var csrftoken;
		if(!csrfSafeMethod)
	})
	
	varSession = Backbone.Model.extend({
		defaults:{
			token:null
		},
		initialize: function(options){
			this.options = options;
			$.ajaxPrefilter($.proxy(this._setupAuth, this));//检查用户是否已经被验证过
			this.load();
		},
		load: function(){//对捕获的数值记号进行初始设置
			var token = localStorage.apiToken;
			if(token){
				this.set('token',token);
			}
		},
		save: function(token){//检查是否为真实的记号数值，如果不是，移除该数值并对用户取消授权
			this.set('token',token);
			if(token === null){
				localStorage.removeItem('apiToken');
			}else{
				localStorage.apiToken = token;
			}
		},
		delete: function(){
			this.save(null);
		},
		authenticated: function(){
			return this.get('token') !== null;
		}，
		_setupAuth:function(settings,originalOptions,xhr){//检查验证，并在通过验证后将记号传入XMLHttpRequest的头信息参数中
			if(this.authenticated()){
				xhr.setRequestHeader(
					'Authorization',
					'Token' + this.get('token')
				);
			}
		}
	});
	app.session = new Session();
})(jQuery, Backbone, _, app);