$(function () {
//点击搜索图标出现搜索框
    $("#search").click(function () {
            $(".search").toggle();
    });
    var path = basePath+"/project/dispatcherWithNoParame?userId="+userId;
    toolbar.addButtonToPage("glyphicon glyphicon-plus","新建项目",path);
})

