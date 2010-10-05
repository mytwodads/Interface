// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
//
// create base UI tab and root window
//
var baseWindow = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'none',
});

var topView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
	backgroundImage:"top2.png",
	zindex:1,
});

var middleView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
	backgroundImage:"middle2.png",
	zindex:2,
});

var bottomView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
	backgroundImage:"bottom2.png",
	zindex:0,
});

var contentOverlay = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
	backgroundImage:"none",
});

var messageText = Titanium.UI.createTextArea({
	autocorrect:false,
	value:"Hello hello hello hello hello hello hello hello hello hello hello hello hello Appcelerator FTW!",
	font:{fontSize:24,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"none",
	width:250, //you have to define the size in order for it to show up
	height:200,
	top:40,
	editable:true,
});

contentOverlay.add(messageText);

var secretButton = Titanium.UI.createButton({
	title:"Enter a secret word",
	font:{fontSize:20,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"fffff4",
	top:280,
	left:40,
	height:40,
	width:220,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	borderColor:"#fffff4",
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

contentOverlay.add(secretButton);

var encodeSwitch = Titanium.UI.createSwitch({
	top: 200,
	right: 40,
	value:false,
});

contentOverlay.add(encodeSwitch);

var sendButton = Titanium.UI.createButton({
	title:"Tweet",
	font:{fontSize:20,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"fffff4",
	top:400,
	left:40,
	height:40,
	width:60,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	borderColor:"#fffff4",
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

contentOverlay.add(sendButton);

var resetButton = Titanium.UI.createButton({
	title:"Reset",
	font:{fontSize:20,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"fffff4",
	top:400,
	right:40,
	height:40,
	width:60,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	borderColor:"#fffff4",
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

contentOverlay.add(resetButton);


baseWindow.add(topView);
baseWindow.add(middleView);
baseWindow.add(bottomView);
baseWindow.add(contentOverlay);
baseWindow.open();