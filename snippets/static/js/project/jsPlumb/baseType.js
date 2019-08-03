var baseType = {
	EndPointStyle: {
		Dot: {
			radis: '10px',
			cssClass: {},
			hoverClass: {}
		},
		Rectangle: {
			width: 20,
			height: 20,
			cssClass: {},
			hoverClass: {}
		},
		Image: {
			src: '',
			cssClass: {},
			hoverClass: {}
		}
	},
	Connector: {
		Bezier: {
			curviness: 70
		},
		Straight: {
			stub: [40, 60],
			gap: 0
		},
		Flowchart: {
			stub: [40, 60],
			gap: 10,
			cornerRadius: 5,
			midpoint: 0.5,
			alwaysRespectStubs: true
		},
		basicConnectionType: {
			paintStyle: {},
			hoverPaintStyle: {},
			cssClass: '',
			overlays: []
		},
		connectorPaintStyle: {
			strokeWidth: 2,
			stroke: "#555555",
			joinstyle: "round",
			outlineStroke: "white",
			outlineWidth: 2
		},
		connectorHoverStyle: {
			strokeWidth: 3,
			stroke: "#216477",
			outlineWidth: 5,
			outlineStroke: "white"
		}
	},
	Overlays: {
		overlays: []
	},

	endpointHoverStyle: {
		fill: "#216477",
		stroke: "#216477"
	},
	paintStyle: {
		stroke: "#999999",
		fill: "transparent",
		radius: 7,
		strokeWidth: 1
	}
	
};

/*
 * 定义点的基本样式
 */
var endpoint = {
		endpoint: "Dot",
		paintStyle: {
            stroke: "#fefefe",
            // stroke: "none",
			fill: "transparent",
			// fill: "#555555",
			radius: 5,
			strokeWidth: 2
		},
		connector: ["Bezier", {
			curviness: 70
		}],
		connectorStyle: {
			strokeWidth: 2,
			stroke: "#555555",
			joinstyle: "round",
			// outlineStroke: "white",
			// outlineWidth: 2
		},
		hoverPaintStyle: {
			fill: "#216477",
			stroke: "#216477"
		},
		connectorHoverStyle: {
			strokeWidth: 3,
			stroke: "#216477",
			// outlineWidth: 5,
			// outlineStroke: "white"
		},
		dragOptions: {},
	};

var sourceEndpoint = $.extend(true,  {isSource : true, isTarget : false, maxConnections: -1},endpoint);
var targetEndpoint = $.extend(true, {isTarget : true, isSource : false, maxConnections: -1,dropOptions: {
				hoverClass: "hover",
				activeClass: "active"
			}},endpoint);



