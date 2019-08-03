/**
 */

//the event of click contorller right span
var contorlClickEvent = function() {
	var span = $(this);
	span.toggleClass("glyphicon-chevron-up").toggleClass("glyphicon-chevron-down");
	if(span.hasClass("glyphicon-chevron-up")) {
		span.siblings("p").show();
	}
	if(span.hasClass("glyphicon-chevron-down")) {
		span.siblings("p").hide();
	}
};
$('.glyphicon.glyphicon-chevron-down').on('click', contorlClickEvent);

$('.label.label-primary.darg-data').draggable({
		revert: "invalid",
		helper: "clone",
		cursor: "move",
		opacity: 0.8, //拖拽时透明
		scope: "park",
	    appendTo: "#c_window"
	}

);


$("#c_window").droppable({
	scope: "park",
	drop: function(event, ui) {
		var left = ui.position.left;
		var top = ui.position.top;
		var node = helper.createTaskNode();
		helper.container.updatePosition(node.id,{
			x : left,
			y : top
		});
		var rectStr = Util.buildRect(node);
		var container = $("#c_window");
		container.append(rectStr);

		helper.setPosition(node,left,top);//必须先设置位置 否则端点会留在顶端
		helper.setDraggable('.tasknode');

		var source = Object.create(Point);
		source.style = Object.create(sourceEndpoint);
		source.anchor = [0.5, 1, 0.3, -0.7];
		source.uuid = Math.uuid(16);
		var target = Object.create(Point);
		target.style = Object.create(targetEndpoint);
		target.anchor = [0.5, 0, -0.1, 0.7];
		target.uuid = Math.uuid(16);
		helper.addEndpoint(node.id, source);
		helper.addEndpoint(node.id, target);
		$('#'+ node.id).bind('click',Util.clickEventOnNode);
		$('#'+ node.id +'>.glyphicon.glyphicon-chevron-down').bind('click', contorlClickEvent);

	}
})
