/**
 * Created by Chen jianxuan on 2017/3/22.
 */
var toolbar = {
    toolbarContainer: $('#btn_toolbar', window.parent.document),

    //清除工具条的所有内容
    clear: function () {
        this.toolbarContainer.empty();
    },

    /**
     * 自定义添加代码
     */
    add:function (htmlcode) {
      this.toolbarContainer.append(htmlcode);
    },

    /**
     * 有响应页面
     *
     * @param iconClass 图标class 名字
     * @param buttonContent buttonContent按钮内容
     * @param link跳转的目的地
     */
    addButtonToPage:function (iconClass,buttonContent,link) {
            this.toolbarContainer.append('<a target="iframe" href="'+link+'" class="inner_display_a"><i class="'+iconClass+'"></i><span class="t_font">'+buttonContent+'</span></a>');
    },

    /**
     *
     * @param iconClass 图标class 名字
     * @param buttonContent  buttonContent按钮内容
     * @param functiionNameAndArgs   方法名和参数
     *                  注意 ：方法必须提前申明
     */
    addButtonAndADDFunction:function(iconClass,buttonContent,functiionNameAndArgs){
        this.toolbarContainer.append('<a onclick="'+functiionNameAndArgs+'" target="iframe" href="javascrpt:void(0)" class="inner_display_a"><i class="'+iconClass+'"></i><span class="t_font">'+buttonContent+'</span></a>');
   }


}
// function gg(d) {alert(d)}
$(function () {
    toolbar.clear();
    // toolbar.addButtonAndADDFunction("glyphicon glyphicon-plus","ggg","gg('d')")
})