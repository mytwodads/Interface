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

tabGroup.open();

var introImageView = Ti.UI.createImageView({
	backgroundImage:'poirot.png',
	zIndex:-10,
});

baseWindow.add(introImageView);

baseWindow.addEventListener('dblclick', function(){
	var win2 = Titanium.UI.createWindow({  
    	url:"screen2.js"
   		//backgroundColor:'#000',
    	//fullscreen:true,	
	});
	win2.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	win2.addEventListener('dblclick', function(){
		win2.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT,});
		baseWindow.show();
	});
	baseWindow.hide();
});

/* OUR ATTEMPT TO USE A PICKER

var timerButton = Titanium.UI.createButton({
	title:"This message will self-destruct in: (optional)",
	font:{fontSize:20,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"none",
	top:40,
	left:20,
	height:40,
	width:220,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

timerButton.addEventListener('click',function(){
	var w = Ti.UI.createWindow();
	
	var picker = Ti.UI.createPicker({
		selectionIndicator:true,
		type:Ti.UI.PICKER_TYPE_PLAIN,
	});
	picker.addEventListener('change',function(e){
	});
	
	var column1 = Ti.UI.createPickerColumn();
	var column2 = Ti.UI.createPickerColumn();
	for (var i = 0; i < 24; i++) {
		column1.addRow(Ti.UI.createPickerRow({title:" "+i+" ",custom_item:i}));
	}	
	for (var j = 0; j < 60; j++) {
		column2.addRow(Ti.UI.createPickerRow({title:" "+j+" ",custom_item:j}));
	}

	var label = Titanium.UI.createLabel({
	    text:"hours",
	    font:{fontSize:24,fontWeight:'bold'},
	    color:"#000",
	    width:'auto',
	    height:'auto'
	});

	picker.add([column1,column2]);
	
	var theButton = Ti.UI.createButton({
		title:"press button"
	});
	theButton.addEventListener('click',function(){
		Ti.API.info(picker.value);
	});
	w.add(theButton);
	w.add(picker);
	w.add(label);
	w.open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,navBarHidden:true})
});

contentOverlay.add(timerButton);
*/

var timerButton = Titanium.UI.createButton({
	title:"This message will self-destruct in: (optional)",
	font:{fontSize:20,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"none",
	top:40,
	left:20,
	height:40,
	width:220,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

timerButton.addEventListener('click', function()
{
	var toolbarSlider = Titanium.UI.createSlider({
		min:0,
		max:23.98,
		value:0,
		width:200
	});
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var label = Ti.UI.createLabel({
		text:'0h 0m' ,
		color:'#fff',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:15,
			fontWeight:"bold"
		},
		textAlign:'left',
		height:40,
		width:75
			
	});
	
	var theToolbar = Titanium.UI.createToolbar({
		items:[label,toolbarSlider,flexSpace],
		barColor:"#000",
		bottom:0,
		translucent:true
	});
	
	toolbarSlider.addEventListener('change',function(e){
		label.text = Math.floor(e.value)+"h "+Math.round((e.value-Math.floor(e.value))*60)+"m";
	});
	
	theToolbar.addEventListener('touchend',function(e){
		duration = Math.round(toolbarSlider.value * 3600);
		timerButton.title = "Will self-destruct in: "+Math.floor(toolbarSlider.value)+"h "+Math.round((toolbarSlider.value-Math.floor(toolbarSlider.value))*60)+"m";
		baseWindow.remove(theToolbar);
	});
	
	baseWindow.add(theToolbar);
});

var contentOverlay = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
	backgroundImage:"none",
});

baseWindow.add(timerButton);

var messageText = Titanium.UI.createTextArea({
	autocorrect:false,
	value:"Please enter your message.",
	font:{fontSize:24,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"none",
	width:250, //you have to define the size in order for it to show up
	height:200,
	top:100,
	editable:true,
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
});

messageText.addEventListener('change',function(e){
	if (e.source.value.length > 127) {
			e.source.value = e.source.value.substring(0, 127);
	}
	Ti.App.fireEvent('checkText',{text:e.source.value,source:"messageText"});
});

messageText.addEventListener('focus',function(){
	if (messageText.value == "Please enter your message.") {
		messageText.value = "";
	}
});

Ti.App.addEventListener('setText',function(e){
	if (e.source == "secretWord") {
		secretWordUI.value = e.text;
	}
	if (e.source == "messageText") {
		messageText.value = e.text;
	}
});

messageText.addEventListener('blur',function(){
	if (messageText.value == "") {
		messageText.value = "Please enter your message.";
	}
	else {
		secretButton.show();	
	}
});

baseWindow.add(messageText);

var secretButton = Titanium.UI.createButton({
	title:"Enter a secret word",
	font:{fontSize:20,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"none",
	top:300,
	left:20,
	height:40,
	width:220,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
});

baseWindow.add(secretButton);

secretButton.addEventListener('click',function(){
		
	var secretWordUI = Titanium.UI.createTextField({
		autocorrect: false,
		height:32,
		hintText:"Enter a secret word",
		width:160,
		font:{fontSize:13},
		color:'#333',
		paddingLeft:10,
		top:200,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
		appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
	});
	
	var a = Titanium.UI.createAlertDialog({
		title:'Warning',
		message:'Please enter at least 2 characters',
	});
		
	secretWordUI.addEventListener('change',function(e){
		var contentLength = e.source.value.length;
		if (contentLength > 20) e.source.value = e.source.value.substring(0, 20);
		Ti.App.fireEvent('checkText',{text:e.source.value,source:"secretWord"});
	});	
		
	secretWordUI.addEventListener('blur',function(e){
		if (secretWordUI.value.length < 2) {
			secretWordUI.focus();
			a.show();
			Titanium.Media.vibrate();
		}
		else {
			Ti.App.fireEvent('encodeHash',{text:e.source.value});
			secretButton.title = secretWordUI.value;
		}
	});
	baseWindow.add(secretWordUI);
});

var encodeSwitch = Titanium.UI.createSwitch({
	top: 305,
	right: 40,
	value:false,
});

baseWindow.add(encodeSwitch);

encodeSwitch.addEventListener('change',function(){
	if (encodeSwitch.value) {
		Ti.App.fireEvent('encodeText',{text:messageText.value});	
		var counter = 0;
		
		var timer = setInterval(function(){
			if (counter < originalMessage.length+1) {
				messageText.value = secretMessage.substr(0,counter)+originalMessage.substr(counter+1);
				counter ++;
			}
			else {
				inited = true;
				clearInterval(timer);
			}
		},25);		
		
		messageText.editable = false;
		messageText.color = "#666";
		secretButton.enabled = false;
		secretButton.color = "#666";
	}
	
	else if (!encodeSwitch.value && inited) {
		messageText.editable = true;
		messageText.color = "#aa224c";
		secretButton.enabled = true;
		secretButton.color = "#aa224c";

		var counter = originalMessage.length+1;
				
		var timer = setInterval(function(){
			if (counter >= 0) {
				messageText.value = secretMessage.substr(0,counter)+originalMessage.substr(counter);
				counter --;
			}
			else {
				clearInterval(timer);
			}
		},25);
	}
	
	else {
		messageText.editable = true;
		messageText.color = "#aa224c";
		secretButton.enabled = true;
		secretButton.color = "#aa224c";
		
	}
});

/*
var sendButton = Titanium.UI.createButton({
	title:"Tweet",
	font:{fontSize:20,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	top:350,
	left:40,
	height:40,
	width:60,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	borderColor:"#fffff4",
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});
*/

var retrieveButton = Titanium.UI.createButton({
	backgroundImage:'retrieveButton.png',
	top:320,
	left:48,
	height:58,
	width:227,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	borderColor:"#fffff4",
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

baseWindow.add(retrieveButton);

var sendButton = Titanium.UI.createButton({
	backgroundImage:'sendButton.png',
	top:387,
	left:48,
	height:58,
	width:227,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	borderColor:"#fffff4",
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

baseWindow.add(sendButton);

sendButton.addEventListener('click',function(){
	Ti.App.fireEvent('checkOAuth',{data:1});
	Ti.App.fireEvent('generateCode',{data:1});
	Ti.App.fireEvent('sendTweet',{data:1});
});

var resetButton = Titanium.UI.createButton({
	title:"Reset",
	font:{fontSize:20,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
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

baseWindow.add(resetButton);

resetButton.addEventListener('click',function(){
	secretButton.hide();
	encodeSwitch.hide();
	encodeSwitch.value = false;
	sendButton.opacity = 0;
	resetButton.opacity = 0;
	secretButton.title = "Enter a secret word";
	secretButton.enabled = true;
	secretButton.color = "#aa224c";
	messageText.editable = true;
	messageText.color = "#aa224c";
	});

baseWindow.open();

Ti.include('model.js');
