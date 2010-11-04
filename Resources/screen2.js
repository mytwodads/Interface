// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
var win = Ti.UI.currentWindow;

var code = ""; //global to hold numerical code once entered
var started = false; //boolean for decodeSwitch to keep it from doing anything funny.
/*
var encode = Titanium.Media.createSound({
	url:'encode.mp3',
	preload:true,
});
*/

//
// create base UI tab and root window
//


var topView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:-240,
});

var middleView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
});

var bottomView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:0,
});

var contentOverlay = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	top:-240,
	backgroundImage:"none",
});

var waitView = Titanium.UI.createView({
	backgroundColor:"none",
	size:{height:Titanium.Platform.displayCaps.platformHeight,width:Titanium.Platform.displayCaps.platformWidth},
	visible:false,
});

var waitIndicator = Titanium.UI.createActivityIndicator({color:"white",message:"loading...", bottom:10,height:50,width:10,style:Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,});

waitIndicator.show();
waitView.add(waitIndicator);

Ti.App.addEventListener('waitForNetwork',function(e) {
	waitView.show();
});

Ti.App.addEventListener('returnFromNetwork',function(e) {
	waitView.hide();
});

var picker = Ti.UI.createPicker({
	selectionIndicator:true,
});

var column1 = Ti.UI.createPickerColumn({opacity:0});
column1.addRow(Ti.UI.createPickerRow({title:'0',custom_item:'0'}));
column1.addRow(Ti.UI.createPickerRow({title:'1',custom_item:'1'}));
column1.addRow(Ti.UI.createPickerRow({title:'2',custom_item:'2'}));
column1.addRow(Ti.UI.createPickerRow({title:'3',custom_item:'3'}));
column1.addRow(Ti.UI.createPickerRow({title:'4',custom_item:'4'}));
column1.addRow(Ti.UI.createPickerRow({title:'5',custom_item:'5'}));
column1.addRow(Ti.UI.createPickerRow({title:'6',custom_item:'6'}));
column1.addRow(Ti.UI.createPickerRow({title:'7',custom_item:'7'}));
column1.addRow(Ti.UI.createPickerRow({title:'8',custom_item:'8'}));
column1.addRow(Ti.UI.createPickerRow({title:'9',custom_item:'9'}));

var column2 = Ti.UI.createPickerColumn({opacity:0});
column2.addRow(Ti.UI.createPickerRow({title:'0',custom_item:'0'}));
column2.addRow(Ti.UI.createPickerRow({title:'1',custom_item:'1'}));
column2.addRow(Ti.UI.createPickerRow({title:'2',custom_item:'2'}));
column2.addRow(Ti.UI.createPickerRow({title:'3',custom_item:'3'}));
column2.addRow(Ti.UI.createPickerRow({title:'4',custom_item:'4'}));
column2.addRow(Ti.UI.createPickerRow({title:'5',custom_item:'5'}));
column2.addRow(Ti.UI.createPickerRow({title:'6',custom_item:'6'}));
column2.addRow(Ti.UI.createPickerRow({title:'7',custom_item:'7'}));
column2.addRow(Ti.UI.createPickerRow({title:'8',custom_item:'8'}));
column2.addRow(Ti.UI.createPickerRow({title:'9',custom_item:'9'}));

var column3 = Ti.UI.createPickerColumn({opacity:0});
column3.addRow(Ti.UI.createPickerRow({title:'0',custom_item:'0'}));
column3.addRow(Ti.UI.createPickerRow({title:'1',custom_item:'1'}));
column3.addRow(Ti.UI.createPickerRow({title:'2',custom_item:'2'}));
column3.addRow(Ti.UI.createPickerRow({title:'3',custom_item:'3'}));
column3.addRow(Ti.UI.createPickerRow({title:'4',custom_item:'4'}));
column3.addRow(Ti.UI.createPickerRow({title:'5',custom_item:'5'}));
column3.addRow(Ti.UI.createPickerRow({title:'6',custom_item:'6'}));
column3.addRow(Ti.UI.createPickerRow({title:'7',custom_item:'7'}));
column3.addRow(Ti.UI.createPickerRow({title:'8',custom_item:'8'}));
column3.addRow(Ti.UI.createPickerRow({title:'9',custom_item:'9'}));

var column4 = Ti.UI.createPickerColumn({opacity:0});
column4.addRow(Ti.UI.createPickerRow({title:'0',custom_item:'0'}));
column4.addRow(Ti.UI.createPickerRow({title:'1',custom_item:'1'}));
column4.addRow(Ti.UI.createPickerRow({title:'2',custom_item:'2'}));
column4.addRow(Ti.UI.createPickerRow({title:'3',custom_item:'3'}));
column4.addRow(Ti.UI.createPickerRow({title:'4',custom_item:'4'}));
column4.addRow(Ti.UI.createPickerRow({title:'5',custom_item:'5'}));
column4.addRow(Ti.UI.createPickerRow({title:'6',custom_item:'6'}));
column4.addRow(Ti.UI.createPickerRow({title:'7',custom_item:'7'}));
column4.addRow(Ti.UI.createPickerRow({title:'8',custom_item:'8'}));
column4.addRow(Ti.UI.createPickerRow({title:'9',custom_item:'9'}));

var column5 = Ti.UI.createPickerColumn({opacity:0});
column5.addRow(Ti.UI.createPickerRow({title:'0',custom_item:'0'}));
column5.addRow(Ti.UI.createPickerRow({title:'1',custom_item:'1'}));
column5.addRow(Ti.UI.createPickerRow({title:'2',custom_item:'2'}));
column5.addRow(Ti.UI.createPickerRow({title:'3',custom_item:'3'}));
column5.addRow(Ti.UI.createPickerRow({title:'4',custom_item:'4'}));
column5.addRow(Ti.UI.createPickerRow({title:'5',custom_item:'5'}));
column5.addRow(Ti.UI.createPickerRow({title:'6',custom_item:'6'}));
column5.addRow(Ti.UI.createPickerRow({title:'7',custom_item:'7'}));
column5.addRow(Ti.UI.createPickerRow({title:'8',custom_item:'8'}));
column5.addRow(Ti.UI.createPickerRow({title:'9',custom_item:'9'}));

var column6 = Ti.UI.createPickerColumn({opacity:0});
column6.addRow(Ti.UI.createPickerRow({title:'0',custom_item:'0'}));
column6.addRow(Ti.UI.createPickerRow({title:'1',custom_item:'1'}));
column6.addRow(Ti.UI.createPickerRow({title:'2',custom_item:'2'}));
column6.addRow(Ti.UI.createPickerRow({title:'3',custom_item:'3'}));
column6.addRow(Ti.UI.createPickerRow({title:'4',custom_item:'4'}));
column6.addRow(Ti.UI.createPickerRow({title:'5',custom_item:'5'}));
column6.addRow(Ti.UI.createPickerRow({title:'6',custom_item:'6'}));
column6.addRow(Ti.UI.createPickerRow({title:'7',custom_item:'7'}));
column6.addRow(Ti.UI.createPickerRow({title:'8',custom_item:'8'}));
column6.addRow(Ti.UI.createPickerRow({title:'9',custom_item:'9'}));

// 6 columns as an array
picker.add([column1,column2,column3,column4,column5,column6]);

contentOverlay.add(picker);

picker.setSelectedRow(4,4,false);

/*
picker.addEventListener('change',function(e)
{
	Ti.API.info("You selected row: "+e.row+", column: "+e.column+", custom_item: "+e.row.custom_item);
	messageText.value = "row index: "+e.rowIndex+", column index: "+e.columnIndex;
});

*/

var retrieveButton = Titanium.UI.createButton({
	title:"Search for Tweet",
	font:{fontSize:20,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"none",
	top:450,
	left:20,
	height:40,
	width:220,
	borderColor:"none",
	borderWidth:0,
	borderRadius:0,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
});

retrieveButton.addEventListener('click',function(){
	for (var i = 0; i < 6; i++) {
		code += picker.getSelectedRow(i).title;
	}
	Ti.App.fireEvent('getCode',{data:code.substring(code.length-6,code.length)});
});

contentOverlay.add(retrieveButton);

var receivedText = Titanium.UI.createTextArea({
	autocorrect:false,
	font:{fontSize:24,fontFamily:"Comic Zine OT"},
	color:"#aa224c",
	backgroundColor:"none",
	width:250, //you have to define the size in order for it to show up
	height:200,
	top:600,
	editable:false,
});

Ti.App.addEventListener('serverResponse',function(e){
	receivedText.value = e.text;
	secretMessage = e.text;
});

contentOverlay.add(receivedText);

var secretWordSlot = Titanium.UI.createTextField({
	autocorrect: false,
	height:32,
	left: 40,
	hintText:"Enter a secret word",
	width:160,
	font:{fontSize:13},
	color:'#333',
	paddingLeft:10,
	top:500,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
});

secretWordSlot.addEventListener('blur',function(){
	if (secretWordSlot.value.length < 2) {
		alert("Please enter a secret word longer than 2 characters.");
	}
	else {
		Ti.App.fireEvent('waitForNetwork',{name:'waitView'});
		Ti.App.fireEvent('decodeHash',{text:secretWordSlot.value,number:code});
	}
});

contentOverlay.add(secretWordSlot);

var decodeSwitch = Titanium.UI.createSwitch({
	top: 500,
	right: 40,
	value:false,
});

decodeSwitch.addEventListener('change',function(){
	if (decodeSwitch.value) {
		Ti.App.fireEvent('decodeText',{text:secretMessage});
		var counter = 0;
		var length = receivedText.value.length+1
		var timer = setInterval(function(){
			if (counter <= length) {
				receivedText.value = originalMessage.substr(0,counter)+secretMessage.substr(counter+1);
				counter ++;
			}
			else {
				started = true;
				clearInterval(timer);
			}
		},25);		
	}
	
	else if (!decodeSwitch.value && started) {
		var counter = receivedText.value.length + 1;
		var timer = setInterval(function(){
			if (counter >= 0) {
				receivedText.value = originalMessage.substr(0,counter)+secretMessage.substr(counter);
				counter --;
			}
			else {
				clearInterval(timer);
			}
		},25);		
	}
	else {
	
	}
});




contentOverlay.add(decodeSwitch);



/*
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
	Ti.App.fireEvent('checkOAuth',{data:1});
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

*/


/*
win.add(topView);
win.add(middleView);
win.add(bottomView);
*/



win.add(contentOverlay);
win.add(waitView);



Ti.include('model.js');
inited = false;

