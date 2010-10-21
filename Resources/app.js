// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;

var rip = Titanium.Media.createSound({
	url:'paper.mp3',
	preload:true,
});

var flip = Titanium.Media.createSound({
	url:'flip.mp3',
	preload:true,
});

var rejoin = Titanium.Media.createSound({
	url:'rejoin.mp3',
	preload:true,
});

var encode = Titanium.Media.createSound({
	url:'encode.mp3',
	preload:true,
});


//
// create base UI tab and root window
//
var baseWindow = Titanium.UI.createWindow({  
    backgroundColor:'none',
    zIndex:-10,
});

var topView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
	backgroundImage:"top2.png",
});

var middleView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
	backgroundImage:"middle2.png",
});

var bottomView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
	backgroundImage:"bottom2.png",
});

var contentOverlay = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
	backgroundImage:"none",
});

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

contentOverlay.add(messageText);

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

contentOverlay.add(secretButton);
secretButton.hide();

secretButton.addEventListener('click',function(){

	if (encodeSwitch){
		encodeSwitch.hide();
		secretButton.hide();
	}	
	
	middleView.animate({top:0,duration:250});
	bottomView.animate({top:0,duration:250}, function(){

	var w = Ti.UI.createWindow({
		backgroundImage:'paper2.png'
	});
		
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
		if (contentLength > 7) e.source.value = e.source.value.substring(0, 7);
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
		secretButton.title = "";
		var timer = setTimeout(function(){
			rip.play();
			middleView.animate({top:30, duration:250}); //animations can take an optional callback function which makes stringing functions together super easy
			bottomView.animate({top:30, duration:250}, function(){
				encodeSwitch.show();
				secretButton.show();
				secretButton.title = secretWordUI.value;
			});	
		},500);
		flip.play();
		w.close();
		}
		});
	
	w.add(secretWordUI);
	flip.play();
	w.open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET,navBarHidden:true});
	});
});

var encodeSwitch = Titanium.UI.createSwitch({
	top: 305,
	right: 40,
	value:false,
});

contentOverlay.add(encodeSwitch);
encodeSwitch.hide();

encodeSwitch.addEventListener('change',function(){
	if (encodeSwitch.value) {
		
		rip.play();
		bottomView.animate({top:80, duration:250}, function(){
			sendButton.animate({opacity:1,duration:150});
			resetButton.animate({opacity:1,duration:150}, function(){
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
			});
		});
		messageText.editable = false;
		messageText.color = "#666";
		secretButton.enabled = false;
		secretButton.color = "#666";
	}
	
	else if (!encodeSwitch.value && inited) {
		rejoin.play();
		bottomView.animate({top:-30, duration:250});
		sendButton.animate({opacity:0,duration:150});
		resetButton.animate({opacity:0,duration:150});
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
		rejoin.play();
		bottomView.animate({top:-30, duration:250});
		sendButton.animate({opacity:0,duration:150});
		resetButton.animate({opacity:0,duration:150});
		messageText.editable = true;
		messageText.color = "#aa224c";
		secretButton.enabled = true;
		secretButton.color = "#aa224c";
		
	}
});

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
sendButton.opacity = 0;

sendButton.addEventListener('click',function(){
	Ti.App.fireEvent('sendTweet',{data:1});
});

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
resetButton.opacity = 0;

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
	middleView.animate({top:0, duration:250});
	bottomView.animate({top:0, duration:250});
	});


baseWindow.add(topView);
baseWindow.add(middleView);
baseWindow.add(bottomView);
baseWindow.add(contentOverlay);
baseWindow.open();

Ti.include('model.js');
