<?php

//ASCII Lookup Table: http://kellyjones.netfirms.com/webtools/ascii_utf8_table.shtml or http://www.utf8-chartable.de/

//error_reporting(E_ALL ^ E_NOTICE); 
//ini_set('display_errors', 1);

require "functions.php";
require "offset.php";

$scriptName = $_SERVER['PHP_SELF']; 
$hashtagName = "h";
$hashtagValue = $_GET[$hashtagName];
$codeName = "c";
$codeValue = $_GET[$codeName];

$validString = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

if ($codeValue) {

	$hashKey = arrayze($offset); //turns the word of the day into an offset array
	$hashtag = arrayze($hashtagValue); //turns the inputted hashtag into an ascii character code array

	for ($i = 0; $i < count($hashtag); $i++) { //applies offset and encrypt function to the hashtag array
		$encryptor = $functions[$hashKey[$i%count($hashKey)]];
		$hashtag[$i] = ($hashtag[$i] + $encryptor)%96 + 32;
		if ($hashtag[$i] < 48) {
			$hashtag[$i] += 192;
		}
		else if ($hashtag[$i] < 65 && $hashtag[$i] > 57) {
			$hashtag[$i] += 183;
		}
		else if ($hashtag[$i] < 97 && $hashtag[$i] > 90) {
			$hashtag[$i] += 152;
		}
		else if ($hashtag[$i] > 123 && $hashtag[$i] < 128) {
			$hashtag[$i] += 69;
		}
	}
	
	echo(urlencode(reString($hashtag)));

}

else {
	$hashKey = arrayze($offset); //turns the word of the day into an offset array
	$hashtag = substr($hashtagValue, 1);
	$hashtag = substr($hashtag, 0, -1);
	$hashtag = urldecode($hashtag);
	$hashtag = arrayze($hashtag); //turns the inputted hashtag into an ascii character code array

	for ($i = 0; $i < count($hashtag); $i++) { //applies offset and encrypt function to the hashtag array
		if ($hashtag[$i] < 240 && $hashtag[$i] > 224) {
			$hashtag[$i] -= 192;
		}
		else if ($hashtag[$i] < 248 && $hashtag[$i] > 240) {
			$hashtag[$i] -= 183;
		}
		else if ($hashtag[$i] < 249 && $hashtag[$i] > 242) {
			$hashtag[$i] -= 152;
		}
		else if ($hashtag[$i] > 192 && $hashtag[$i] < 197) {
			$hashtag[$i] -= 69;
		}
		$hashtag[$i] -= 32;
		$encryptor = $functions[$hashKey[$i%count($hashKey)]];
		$hashtag[$i] = $hashtag[$i] - $encryptor;
		while ($hashtag[$i] < 32) {
			$hashtag[$i] += 96;
		}
	}
	echo(reString($hashtag));
}

//UTILITY FUNCTIONS

//Takes a string and breaks it into an array of ascii decimal character codes
function arrayze($aString) {
	$textArray = str_split($aString);
	for ($i = 0; $i < count($textArray); $i++) {
		$textArray[$i] = ord($textArray[$i]);
	}
	return $textArray;
}

//Takes an array of ascii decimal character codes and returns a string
function reString($anArray) {
	for ($i = 0; $i < count($anArray); $i++) {
		$anArray[$i] = chr($anArray[$i]);
	}
	$reStrung = implode($anArray);
	return $reStrung;
}

function pickOne($string) {
	return substr($string, rand(0,strlen($string)-1),1);
}

?>
