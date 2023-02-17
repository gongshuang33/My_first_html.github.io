var map;
function init(){
	map = new BMap.Map("baidumap");	
	map.centerAndZoom(new BMap.Point(114.353622,30.56486),14);
	map.addControl(new BMap.MapTypeControl());
	map.setCurrentCity("武汉");
	map.enableScrollWheelZoom(true);
  // 添加带有定位的导航控件
 var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
  });
  map.addControl(navigationControl);
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
  });
  map.addControl(geolocationControl);
  
  var sel = document.getElementById('stylelist');
	for(var key in mapstyles){
		var style = mapstyles[key];
		var item = new  Option(style.title,key);
		sel.options.add(item);
	}
	//单击获取经纬度
map.addEventListener("click",function(e){
	alert(e.point.lng + "," +e.point.lat);
}) ;

}
 
 
 
 
 var mapType1 = new BMap.MapTypeControl(
		{
			mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],
			anchor: BMAP_ANCHOR_TOP_LEFT
		}
	);

	var overView = new BMap.OverviewMapControl();
	var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
	//添加地图类型和缩略图
	function add_control(){
		map.addControl(mapType1);          //2D图，混合图
		map.addControl(overView);          //添加默认缩略地图控件
		map.addControl(overViewOpen);      //右下角，打开
	}
	//移除地图类型和缩略图
	function delete_control(){
		map.removeControl(mapType1);   //移除2D图，混合图
		map.removeControl(overView);
		map.removeControl(overViewOpen);
	}


	function changeMapStyle(style){
		map.setMapStyle({style:style});
		$('#desc').html(mapstyles[style].desc);
	}
function WalkRouteQuery(){
	map.clearOverlays();
	var a=document.getElementById("text_a").value;
	var b=document.getElementById("text_b").value;
	var walking=new BMap.WalkingRoute(map,{renderOptions:{map:map,panel:"r-result",autoViewport:true}});
	walking.search(a,b);
}
function DrivingRouteQuery(){
	map.clearOverlays();
	var a=document.getElementById("text_a").value;
	var b=document.getElementById("text_b").value;
	var walking=new BMap.DrivingRoute(map,{renderOptions:{map:map,panel:"r-result",autoViewport:true}});
	driving.search(a,b);
}
function BusQuery(){
	map.clearOverlays();
	var a=document.getElementById("text_a").value;
	var b=document.getElementById("text_b").value;
	var walking=new BMap.TransitRoute(map,{renderOptions:{map:map,panel:"r-result"}});
	transit.search(a,b);
}

var aa = new BMap.Autocomplete(    //建立一个自动完成的对象
	{"input" : "text_a"
	,"location" : map
});

aa.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
var str = "";
	var _value = e.fromitem.value;
	var value = "";
	if (e.fromitem.index > -1) {
		value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
	}    
	str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
	
	value = "";
	if (e.toitem.index > -1) {
		_value = e.toitem.value;
		value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
	}    
	str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
	G("searchResultPanel").innerHTML = str;
});

var myValue;
aa.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
var _value = e.item.value;
	myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
	G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
	
	setPlace();
});

var ab = new BMap.Autocomplete(    //建立一个自动完成的对象
	{"input" : "text_b"
	,"location" : map
});

ab.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
var str = "";
	var _value = e.fromitem.value;
	var value = "";
	if (e.fromitem.index > -1) {
		value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
	}    
	str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
	
	value = "";
	if (e.toitem.index > -1) {
		_value = e.toitem.value;
		value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
	}    
	str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
	G("searchResultPanel").innerHTML = str;
});

var myValue;
ab.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
var _value = e.item.value;
	myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
	G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
	
	setPlace();
});
function setPlace(){
	map.clearOverlays();    //清除地图上所有覆盖物
	function myFun(){
		var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
		map.centerAndZoom(pp, 18);
		map.addOverlay(new BMap.Marker(pp));    //添加标注
	}
	var local = new BMap.LocalSearch(map, { //智能搜索
	  onSearchComplete: myFun
	});
	local.search(myValue);
}
function G(id) {
	return document.getElementById(id);
}
//小学
function addPrimary(){
	map.clearOverlays();
	var point=new BMap.Point(113.91406,29.980059);
	map.centerAndZoom(point,18);
	var marker=new BMap.Marker(point);
	map.addOverlay(marker);
	var label=new BMap.Label("My primary school",{offset:new BMap.Size(20,-10)});
	marker.setLabel(label);

}
//初中
function addJuniormiddle(){
	map.clearOverlays();
	var point=new BMap.Point(113.923117,29.977056);
	map.centerAndZoom(point,18);
	var marker=new BMap.Marker(point);
	map.addOverlay(marker);
	var label=new BMap.Label("My senior school",{offset:new BMap.Size(20,-10)});
	marker.setLabel(label);

}
//高中
function addSeniormiddle(){
	map.clearOverlays();
	var point=new BMap.Point(113.945835,29.971625);
	map.centerAndZoom(point,18);
	var marker=new BMap.Marker(point);
	map.addOverlay(marker);
	var label=new BMap.Label("My high school",{offset:new BMap.Size(20,-10)});
	marker.setLabel(label);

}
//大学
function addUniversity(){
	map.clearOverlays();
	var point=new BMap.Point(114.340713,30.58292);
	map.centerAndZoom(point,18);
	var marker=new BMap.Marker(point);
	map.addOverlay(marker);
	var label=new BMap.Label("My university",{offset:new BMap.Size(20,-10)});
	marker.setLabel(label);
	//
	var sContent="<iframe width='450px' height='300px' frameboder='no' border='0' marginwidth='0' marginheight='0' src='Echarts01.html'/>"
	var infoWindow=new BMap.InfoWindow(sContent);
marker.addEventListener("click",function(){
	this.openInfoWindow(infoWindow);
});
}

function getHbuData(){
	var myChart=echarts.init(document.getElementById('hbuEcharts'));
	var option={
		title:{
			text:'湖北大学概况'
		},
		tooltip:{},
		legend:{
			data:['数量']
		},
		xAxis:{
			data:["专任教师","研究生","本科生"]
		},
		yAxis:{},
		series:[{
			name:'数据量',
			type:'bar',
			data:[1200,5600,12000]
		}]
	};
	myChart.setOption(option);
}
//显示全部
function fullscreen(){
	map.clearOverlays();
	var data_info=[[113.91406,29.980059,"My primary school"],
					[113.923117,29.977056,"My senior school"],
					[113.945835,29.971625,"My high school"],
					[114.340713,30.58292,"My university"]];
for(var i=0;i<data_info.length;i++){
	var point=new BMap.Point(data_info[i][0],data_info[i][1]);
	var marker=new BMap.Marker(point);
	map.addOverlay(marker);
	var content=data_info[i][2];
	var label=new BMap.Label(content,{offset:new BMap.Size(20,-10)});
	marker.setLabel(label);
}
}
//加载线型覆盖物
function loadpolyline(){
	var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
		scale: 0.6,//图标缩放大小
		strokeColor:'#fff',//设置矢量图标的线填充颜色
		strokeWeight: '2',//设置线宽
	});
	var icons = new BMap.IconSequence(sy, '10', '30');
	// 创建polyline对象
	var pois = [
		new BMap.Point(113.91406,29.980059),
		new BMap.Point(113.923117,29.977056),
		new BMap.Point(113.945835,29.971625),
		new BMap.Point(114.340713,30.58292)
	];
	var polyline =new BMap.Polyline(pois, {
	   enableEditing: false,//是否启用线编辑，默认为false
	   enableClicking: true,//是否响应点击事件，默认为true
	   icons:[icons],
	   strokeWeight:'8',//折线的宽度，以像素为单位
	   strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
	   strokeColor:"#18a45b" //折线颜色
	});
	
	map.addOverlay(polyline);          //增加折线
	
}

function loadcurve(){
	var Primary=new BMap.Point(113.91406,29.980059),
	Junior=new BMap.Point(113.923117,29.977056),
	Senior=new BMap.Point(113.945835,29.971625),
	University=new BMap.Point(114.340713,30.58292);
	var point=[Primary,Junior,Senior,University];
	var curve=new BMapLib.CurveLine(point,{strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5});
	map.addOverlay(curve);
	curve.enableEditing();
	MarioRun(Senior,University);
	lushurun(Senior,University);
}

function postgraduate(){
	map.centerAndZoom(new BMap.Point(114.353622,30.56486),5);
	map.clearOverlays();
	//
	var hbpoint=new BMap.Point(114.340553,30.582753);
	var AN_point=new BMap.Point(116.316833,39.998877);
	var BN_point=new BMap.Point(86.064688,44.309995);
	var CN_point=new BMap.Point(121.430226,31.149538);
	var DN_point=new BMap.Point(113.303633,23.097379);
	var EN_point=new BMap.Point(106.237491,38.253731);
	var FN_point=new BMap.Point(106.784323,26.563337);
	var GN_point=new BMap.Point(106.237491,38.253731);
	var HN_point=new BMap.Point(120.424278,36.076293);
	var IN_point=new BMap.Point(119.209948,26.064652);
	//
	var data_info=[[AN_point,"green"],
					[BN_point,"red"],
					[CN_point,"blue"],
					[DN_point,"orange"],
					[EN_point,"purple"],
					[FN_point,"yellow"],
					[GN_point,"grey"],
					[HN_point,"pink"],
					[IN_point,"black"]];
	//
	for(var i=0;i<data_info.length;i++){
		var point=data_info[i][0];
		var marker=new BMap.Marker(point);
		map.addOverlay(marker);
	//
	var npoints = [hbpoint,point];
	var color=data_info[i][1];
	var curve = new BMapLib.CurveLine(npoints, {strokeColor:color, strokeWeight:5, strokeOpacity:0.5}); //创建弧线对象
	map.addOverlay(curve); //添加到地图中
	}
}
//路书
function loadlushu(){
	map.clearOverlays();
	var start=new BMap.Point(113.945835,29.971625);
    var end=new BMap.Point(114.340713,30.58292);
	
	MarioRun(start,end);lushurun(start,end);
	
}

function MarioRun(){
	var myP1 = new BMap.Point(113.945835,29.971625);    //起点
	var myP2 = new BMap.Point(114.340713,30.58292);    //终点
	var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
		//offset: new BMap.Size(0, -5),    //相当于CSS精灵
		imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
	  });
	var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
	driving2.search(myP1, myP2);    //显示一条公交线路

	window.run = function (){
		var driving = new BMap.DrivingRoute(map);    //驾车实例
		driving.search(myP1, myP2);
		driving.setSearchCompleteCallback(function(){
			var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
			var paths = pts.length;    //获得有几个点

			var carMk = new BMap.Marker(pts[0],{icon:myIcon});
			map.addOverlay(carMk);
			i=0;
			function resetMkPoint(i){
				carMk.setPosition(pts[i]);
				if(i < paths){
					setTimeout(function(){
						i++;
						resetMkPoint(i);
					},0);
				}
			}
			setTimeout(function(){
				resetMkPoint(5);
			},10)

		});
	}

	setTimeout(function(){
		run();
	},10);
}
function lushurun(start,end){
	var lushu;
	// 实例化一个驾车导航用来生成路线
    var drv = new BMap.DrivingRoute('北京', {
        onSearchComplete: function(res) {
            if (drv.getStatus() == BMAP_STATUS_SUCCESS) {
                var plan = res.getPlan(0);
                var arrPois =[];
                for(var j=0;j<plan.getNumRoutes();j++){
                    var route = plan.getRoute(j);
                    arrPois= arrPois.concat(route.getPath());
                }
                map.addOverlay(new BMap.Polyline(arrPois, {strokeColor: '#111'}));
                map.setViewport(arrPois);

                lushu = new BMapLib.LuShu(map,arrPois,{
                defaultContent:"",//"从天安门到百度大厦"
                autoView:true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                icon  : new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/car.png", new BMap.Size(52,26),{anchor : new BMap.Size(27, 13)}),
                speed: 90000,
                enableRotation:true,//是否设置marker随着道路的走向进行旋转
				});
				lushu.start();
            }
        }
    });
    
	drv.search(start, end);
}























