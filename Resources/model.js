Ti.include('oauth_adapter.js');
Ti.include('functions.js');
	
	var secretWord = ""; //global hashtag holder
	var secretMessage = ""; //global message holder
	var duration = 86400;
	
	var theCode = ""; //numerical code
	var originalMessage = "";
	var inited = false;
	
	var oAuthAdapter = new OAuthAdapter(
		        'k7Ii6V1iHKeBShTEBfQ6sHRPRk4PPWSXEcaUEZarsts',
		        'Qg0OPV00LpcO2hrAZTA',
		        'HMAC-SHA1');
					
	Ti.App.addEventListener('sendTweet', function(e)
	{
		sendTheTweet();
	});
		
	Ti.App.addEventListener('checkText',function(e) {
			checkText(e.text,e.source);
	});
		
	Ti.App.addEventListener('encodeHash',function(e) {
			getRequest("http://chinaalbino.com/databaser1.php?n="+e.text+"&c=1");
	});
	
	Ti.App.addEventListener('decodeHash',function(e) {
			getRequest("http://chinaalbino.com/databaser1.php?n="+e.text+"&p="+e.number+"&c=2");
	});
	
	Ti.App.addEventListener('encodeText',function(e) {
			encodeMessage(e.text);
	});

	Ti.App.addEventListener('decodeText',function(e) {
			decodeMessage(e.text);
	});
	
	Ti.App.addEventListener('getCode',function(e) {
			theCode = e.data;
			receiveTheTweet();
	});
	
	Ti.App.addEventListener('generateCode',function(e){
			theCode = (Math.random()*Math.random()).toString().substring(3,9);
			alert(theCode);
			
		/*
	theCode = "";
			for (var i = 0; i < 6; i++) {
				theCode += Math.floor(10*Math.random()).toString();
			}
			alert(theCode);
*/
	});
	
	Ti.App.addEventListener('checkOAuth',function(e) {					
		// Authorize usage of Twitter services on App
		 
		 
		// load the access token for the service (if previously saved)
		oAuthAdapter.loadAccessToken('twitter');
		 // *****************************Code to send below
			// ****************************
		 
		//oAuthAdapter.send('https://api.twitter.com/1/statuses/update.json', [['status', 'I am now using Twiptography, can you decode my tweets?']], 'Twitter', 'Published.', 'Not published.');
		
		// *******************************************************************************
		 
		// if the client is not authorized, ask for authorization.
		// the previous tweet will be sent automatically after authorization
		if (oAuthAdapter.isAuthorized() == false) {
		    // this function will be called as soon as the application is authorized
		    var receivePin = function() {
		        // get the access token with the provided pin/oauth_verifier
		        oAuthAdapter.getAccessToken('http://api.twitter.com/oauth/access_token');
		        // save the access token
		        oAuthAdapter.saveAccessToken('twitter');
		};
		 
		    // show the authorization UI and call back the receive PIN function
		    oAuthAdapter.showAuthorizeUI('http://api.twitter.com/oauth/authorize?' +
		        oAuthAdapter.getRequestToken('http://api.twitter.com/oauth/request_token', 'oob'),
		        receivePin);
		}
		//sendTheTweet();
	});
	
/*	
	
	encodeSwitch.addEventListener('change',function(e) 
		{			
			if (encodeSwitch.value) {
				
				encodeMessage();
				var counter = 0;
				
				var timer = setInterval(function(){
					if (counter < originalMessage.length+1) {
						messageField.value = secretMessage.substr(0,counter)+originalMessage.substr(counter+1);
						counter ++;
					}
					else {
						inited = true;
						clearInterval(timer);
					}
				},25);
			}

			else if (!encodeSwitch.value && inited) {
				//decodeMessage();
				var counter = originalMessage.length+1;
				
				var timer = setInterval(function(){
					if (counter >= 0) {
						messageField.value = secretMessage.substr(0,counter)+originalMessage.substr(counter);
						counter --;
					}
					else {
						clearInterval(timer);
					}
				},25);
			}
		});
			
	receive.addEventListener('click', function()
	{
		var theLength = scrollView.views.length;
			for (var i = theLength - 1; i > 0; i-- ) {
				scrollView.removeView(scrollView.views[i]);
			}
		view1.hide();
		receiveTheTweet();
	});
		
	secretKeyField2.addEventListener('change',function(e) 
		{
		var contentLength = e.source.value.length;
		if (contentLength > 7) e.source.value = e.source.value.substring(0, 7);
		label.text = 'Remaining characters: ' + (8-contentLength).toString();
		checkText(e.source);
	});
	
	secretKeyField2.addEventListener('focus',function(e){
		var contentLength = e.source.value.length;
		label.text = 'Remaining characters: ' + (8-contentLength).toString();
	});
	
	secretKeyField2.addEventListener('blur',function() {
			getRequest("http://chinaalbino.com/validator.php?h=#"+secretKeyField.value+"&c=1");
	});
*/
			
	
	// ---------------- UTILITY ------------------------
	// ---------------- FUNCTIONS ----------------------
	
	
	// Turns inputed string into an array of ascii character codes   
	function arrayze(String){
	    var theArray = String.split(""); // this splits every character
	    for (var i = 0; i < theArray.length; i++) {
	        theArray[i] = ord(theArray[i]);
	    }
	    return theArray;
	}
	
	// Turns hashtag into array of ascii character codes
	function getHashtag(){
	    hashTag = arrayze(secretWord);
	    return hashTag;
	}
	
	// Makes sure that text in a text field contains no illegal characters
	function checkText(aString,e) {
		var subtext = aString.charAt(aString.length-1);
		if (ord(subtext) < 32 || ord(subtext) > 126) {
			Ti.App.fireEvent('setText',{text:aString.substring(0,aString.length-1),source:e});
		}
	}
	
	// Encodes a message
	function encodeMessage(aString) {
		originalMessage = aString;
	    var message = arrayze(aString); // convert each character into ascii code and save result in array
	    var offset = getHashtag(); // grabs offset from hastag
	    var munged = munge(message, offset); // munges the array of characters based on function list and offset
	    var tweetReady = reString(munged);
	    secretMessage = tweetReady;
	}
	
	// Decodes a message
	function decodeMessage(aString) {
		secretMessage = aString;
	    message = arrayze(aString); // convert each character into ascii code and save result in array
	    var offset = getHashtag(); // grabs offset from hastag
	    var unmunged = unMunge(message, offset); // munges the array of characters based on function list and offset
	    var displayReady = reString(unmunged);
	    originalMessage = displayReady;
	}

	
	// Applies text transforms selected from functions.js to an array of ascii char codes
	function munge(mungeArray, offset){
	    for (var i = 0; i < mungeArray.length; i++) {
	    	var encryptFunction = encryptr[offset[i%offset.length]]; //Selecting a function from our list
	    	mungeArray[i] = encryptFunction(mungeArray[i]) % 96 + 32; //Calls the selected function on the selected array element
	    }
	    return mungeArray;
	}
	 
	// Sends inputted URL off to the server for encoding (used to hash the hashtag)
	function getRequest(theURL){
		var thr = Titanium.Network.createHTTPClient();
		thr.onerror = function() {
			alert("Connection error. Please check that you are online and try again.");
			Ti.App.fireEvent("returnFromNetwork",{name:"waitView"});
		};
		thr.open("GET", theURL);
		thr.onreadystatechange = function() {
	   		if(thr.status >= 200 && thr.status <= 300) {
	  		}
	  		else {
	    		//onError(response);
	  		}
	 	}
		thr.send();
		thr.onload = function() {
			secretWord = unescape(this.responseText);
			Ti.App.fireEvent('returnFromNetwork',{name:'waitView'});
		};
	}
	
	// Decodes an array of ascii character codes encoded using a specific hash
	function unMunge(mungeArray, offset){
		for (var i = 0; i < mungeArray.length; i++) {
			mungeArray[i] -= 32; 
	        var decryptFunction = decryptr[offset[i%offset.length]];
	        if (decryptFunction(mungeArray[i]) < 32) {
				mungeArray[i] = decryptFunction(mungeArray[i]) + 96;
				if (mungeArray[i] < 32) mungeArray[i] += 96;
			}
			else mungeArray[i] = decryptFunction(mungeArray[i]);
	        }
	     return mungeArray;
	}
	           
	// Converts the first character of a string into its ascii int representation
	function ord(String){
		return String.charCodeAt(0);
	}
	            
	// Converts an int into its ascii character
	function chr(asciiint){
		return String.fromCharCode(asciiint);
	}
	            			
	// Converts an array of individual character ascii codes back into an alphanumeric string		            
	function reString(theArray){
		for (var i = 0; i < theArray.length; i++) {
			theArray[i] = chr(theArray[i]);
		}
		var finished = theArray.join("");
		return finished;
	}
	
	// Formats and sends the Tweet to Twitter
	function sendTheTweet() {
		postToTheDatabase(secretMessage,secretWord);
		//alert(secretMessage + secretWord);
		oAuthAdapter.send('https://api.twitter.com/1/statuses/update.json', [
	  	['status', secretMessage + " #" + theCode.substring(theCode.length-6,theCode.length)]], 'Secret Message', 'Sent.', 'Not sent.');
	}
	
	function postToTheDatabase(messageText,hashTag) {
		var xhr = Titanium.Network.createHTTPClient();
		var theHashy = hashTag;
		theHashy = encodeURIComponent(theHashy);
		var theMessage = encodeURIComponent(messageText);
		xhr.open("GET", "http://chinaalbino.com/databaser1.php?m="+theMessage+"&h="+theHashy+"&d="+duration+"&t="+theCode);
		xhr.onreadystatechange = function(status, response) {
	   		if(status >= 200 && status <= 300) {
	    		onSuccess(response);
	  		}
	  		else {
	    		//onError(response);
	  		}
	 	}
		xhr.send();
		xhr.onload = function() { //UNCOMMENT THIS FOR IT TO POST TO TWITTER
			//oAuthAdapter.send('https://api.twitter.com/1/statuses/update.json', [
	  		//['status', secretMessage + " #" + theCode.substring(theCode.length-6,theCode.length)]], 'Secret Message', 'Sent.', 'Not sent.');
		};
	}
	
	// This function looks for tweets encoded with the hashtag
	function receiveTheTweet() {
		var xhr = Titanium.Network.createHTTPClient();
		/*
		var theHashy = secretWord.substring(1,secretWord.length-1);
		theHashy = encodeURIComponent(theHashy);
		*/
		xhr.open("GET", "http://chinaalbino.com/databaser1.php?q="+theCode);
		//xhr.open("GET", "http://search.twitter.com/search.json?q="+secretWord+"&rpp=1");
		//xhr.open("GET", "http://search.twitter.com/search.json?q="+theCode+"&rpp=5"); //temporary, for Twitter scroll view test
		xhr.onreadystatechange = function(status, response) {
	   		if(status >= 200 && status <= 300) {
	    		onSuccess(response);
	   		}
	   		else {
	     		//onError(response);
	  		}
		}
		xhr.send();
		xhr.onload = function () {
						
			var message = this.responseText;
			message = decodeURIComponent(message);	
			Ti.App.fireEvent('serverResponse',{text:message});
			/*
for (var i = 0; i < message.results.length; i++) {
				
				var theString = message.results[i].text;
				
				theString = theString.replace(/&quot;/g,'"');
				theString = theString.replace(/&amp;/g,'&');
				theString = theString.replace(/&gt;/g,'>');
				theString = theString.replace(/&lt;/g,'<');
				
				alert("The message is: " + theString);			
			}
*/
		};

	}