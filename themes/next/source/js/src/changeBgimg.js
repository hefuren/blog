/**
 * 随机改变Blog背景（如果获取不到背景图片，采用默认的背景）
 * 默认背景图片最多为30张
 *
 */

var changeBackgroundFun = function(){
 	var randNum;
 	//生成[min,max]的随机数 Math.floor(Math.random()*(max-min+1)+min);
 	var min = 1;
 	var max = 36;
 	randNum = parseInt(Math.random()*(max-min+1)+min,10);
 	var bgimgName = "bgImg-"+randNum + ".jpg";
 	
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
 	//获取主机地址之后的目录，如： http://localhost:4000/categories/
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:4000
    var localhostPath = curWwwPath.substring(0, pos);

    //var bgImgFilePath = localhostPath + "/images/background/" + bgimgName; // 本地背景图片

    //var defaultPath = localhostPath + "/images/background/";// 本地背景图片

    var defaultPath = "http://p0dnihx2r.bkt.clouddn.com/";// 七牛存储背景图片

    var bgImgFilePath = defaultPath + bgimgName; 
    

    //alert(bgImgFilePath);
    
 	document.body.style.backgroundImage="url("+bgImgFilePath+")";//改变背景图片
 	
}


!function(){	
	changeBackgroundFun(); 
}(window,document);

