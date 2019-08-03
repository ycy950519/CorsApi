$(function() {
	  var dom = document.getElementById("container1");
  //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
      var resizedom = function () {
        dom.style.width = window.innerWidth*0.8+'px';
        dom.style.height = window.innerHeight*0.7+'px';
        //dom.style.width = 1632+'px';
        //dom.style.height = 771+'px';
       };
    //设置容器高宽
      resizedom();
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	var arr = []
	var obj = Object.keys(linear_dataset)
	
	
	for (var n=0;n< (parseFloat(linear_split)*(linear_dataset[obj[0]].length));n++){
		var m=[];  
		for (var a=0;a< obj.length;a++){
			m.push(linear_dataset[obj[a]][n]); 
		}
		arr.push(m);
	  }
	  
      var data = arr;

// See https://github.com/ecomfe/echarts-stat
var myRegression = ecStat.regression('linear', data);

myRegression.points.sort(function(a, b) {
    return a[0] - b[0];
});

option = {
    title: {
        text: 'Linear Regression',
        
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    xAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
    },
    yAxis: {
        type: 'value',
        min: 1.5,
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
    },
    series: [{
        name: 'scatter',
        type: 'scatter',
        label: {
            emphasis: {
                show: true,
                position: 'left',
                textStyle: {
                    color: 'blue',
                    fontSize: 16
                }
            }
        },
        data: data
    }, {
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: myRegression.points,
        markPoint: {
            itemStyle: {
                normal: {
                    color: 'transparent'
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'left',
                    formatter: myRegression.expression,
                    textStyle: {
                        color: '#333',
                        fontSize: 14
                    }
                }
            },
            data: [{
                coord: myRegression.points[myRegression.points.length - 1]
            }]
        }
    }]
};
if (option && typeof option === "object") {
    myChart.setOption(option, true);
	  window.onresize = function () {
            //重置容器高宽
          resizedom();
          myChart.resize();
          };
}
})