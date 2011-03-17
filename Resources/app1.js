// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;

//
// create base UI tab and root window
//
var baseWindow = Titanium.UI.createWindow({  
    backgroundColor:'none',
    backgroundImage:'mainbg.png',
    navBarHidden:true,
    zIndex:-11,
});

var tabGroup = Ti.UI.createTabGroup();

var writeTab = Ti.UI.createTab({
	icon:'',
	title:"Send",
	window:baseWindow
});

var retrieveWindow = Ti.UI.createWindow({
	url:'screen2.js',
	navBarHidden:true,
	zIndex:-11,
});

var retrieveTab = Ti.UI.createTab({
	icon:'',
	title:"Retrieve",
	window:retrieveWindow
});

tabGroup.addTab(writeTab);
tabGroup.addTab(retrieveTab);

var introImageView = Ti.UI.createImageView({
	backgroundImage:'poirot.png',
	zIndex:-10,
});

baseWindow.add(introImageView);
baseWindow.open();

baseWindow.addEventListener('click', function(){
	tabGroup.open();
});

Titanium.API.addEventListener(Titanium.EXIT,function() {
 	baseWindow.hideTabBar();
});
