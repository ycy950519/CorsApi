  $(function() {
	  
      var dom = document.getElementById("container1");
      //console.log(dom)

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
	  var obj = Object.keys(kmeans_dataset)
	  console.log(obj);
	  for (var n=0;n< kmeans_dataset[obj[0]].length;n++){
		var m=[];  
		for (var a=0;a< obj.length;a++){
			m.push(kmeans_dataset[obj[a]][n]); 
		}
		arr.push(m);
	  }
	  console.log(arr);
      var data = arr;
	
      var clusterNumber = k_value;
      // See https://github.com/ecomfe/echarts-stat
      var step = ecStat.clustering.hierarchicalKMeans(data, clusterNumber, true);
      var result;

      option = {
          timeline: {
              top: 'center',
              right: 35,
              height: 300,
              width: 10,
              inverse: true,
              playInterval: 2500,
              symbol: 'none',
              orient: 'vertical',
              axisType: 'category',
              autoPlay: true,
              label: {
                  normal: {
                      show: false
                  }
              },
              data: []
          },
          baseOption: {
              title: {
                  text: 'Process of Clustering',
                  subtext: 'KMeans',
                  left: 'center'
              },
              xAxis: {
                  type: 'value'
              },
              yAxis: {
                  type: 'value'
              },
              series: [{
                  type: 'scatter'
              }]
          },
          options: []
      };

      for (var i = 0; !(result = step.next()).isEnd; i++) {

          option.options.push(getOption(result, clusterNumber));
          option.timeline.data.push(i + '');

      }
        
      function getOption(result, k) {
          var clusterAssment = result.clusterAssment;
          var centroids = result.centroids;
          var ptsInCluster = result.pointsInCluster;
          var color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
          var series = [];
          for (i = 0; i < k; i++) {
              series.push({
                  name: 'scatter' + i,
                  type: 'scatter',
                  animation: false,
                  data: ptsInCluster[i],
                  markPoint: {
                      symbolSize: 29,
                      label: {
                          normal: {
                              show: false
                          },
                          emphasis: {
                              show: true,
                              position: 'top',
                              formatter: function (params) {
                                  return Math.round(params.data.coord[0] * 100) / 100 + '  ' +
                                      Math.round(params.data.coord[1] * 100) / 100 + ' ';
                              },
                              textStyle: {
                                  color: '#000'
                              }
                          }
                      },
                      itemStyle: {
                          normal: {
                              opacity: 0.7
                          }
                      },
                      data: [{
                          coord: centroids[i]
                      }]
                  }
              });
          }

          return {
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross'
                  }
              },
              series: series,
              color: color
          };
      };
      if (option && typeof option === "object") {
          myChart.setOption(option, true);
          window.onresize = function () {
            //重置容器高宽
          resizedom();
          myChart.resize();
          };
        }
      }
  )