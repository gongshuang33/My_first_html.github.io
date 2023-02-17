
function compute(){
	var a=document.getElementById('txt_a').value;
	var b=document.getElementById('txt_b').value;
	var type=document.getElementById('computeType').value;
	if(a==''||b==''){
		alert('请输入参数!');
		return;
	}
	else{
		var y;
		if(type=='add'){
			y=add(a,b);
			alert('加的结果是: '+y);
		}
		else if(type=='minus'){
			y=minus(a,b);
			alert('减得结果是：'+y);
		}
		else if(type=='multiply'){
			y=multiply(a,b);
			alert('乘的结果是：'+y);
		}
		else{
			y=divide(a,b);
			alert('除的结果是：'+y);
		}
	}
	document.getElementById('txt_c').value=y;
}
function add(a,b){
	return Number(a)+Number(b);
}
function minus(a,b){
	return a-b;
}
function multiply(a,b){
	return a*b;
}
function divide(a,b){
	return a/b;
}
function loadEcharts(){
	var myChart = echarts.init(document.getElementById('echartsTest'));
	var 
option = {
title:{
	text:'体能测试成绩图'
},
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['2000米长跑', '1000米跑','50米跑', '立定跳远', '引体向上', '肺活量', '坐位体前屈','乒乓球'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'分数（百分制）',
            type:'bar',
            barWidth: '58%',
            data:[80,99 , 92, 65, 90, 88, 70,80]
        }
    ]
};
myChart.setOption(option);
}
function loadEcharts2(){
	var myChart = echarts.init(document.getElementById('echartsTest2'));
	var option = {
    title : {
        text: '每天的时间哪去了',
        subtext: '时间的大致分布',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['上课','写作业','户外运动','打游戏','聊天','逛街','看课外书','睡觉','参加活动','其它']
    },
    series : [
        {
            name: '项目',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:35, name:'上课'},
                {value:8, name:'写作业'},
                {value:10, name:'户外运动'},
                {value:2, name:'打游戏'},
                {value:8, name:'逛街'},
                {value:2, name:'看课外书'},
                {value:25, name:'睡觉'},
                {value:9, name:'参加活动'},
                {value:1, name:'其它'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart.setOption(option);
}