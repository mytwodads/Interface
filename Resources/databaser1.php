<?php

# Get our DB info
require "databaserdb.php";
require "offset.php";
require "functions.php";

#########################################################
# Connect to the database.
#########################################################
$connection = mysql_connect($mySqlHostname, $mySqlUsername, $mySqlPassword);
if (!$connection)
die("Error " . mysql_errno() . " : " . mysql_error());

# Select the DB
$db_selected = mysql_select_db($mySqlDatabase, $connection);
if (!$db_selected)
die("Error " . mysql_errno() . " : " . mysql_error());

# Set character_set_client and character_set_connection
  mysql_query("SET character_set_client=utf8", $connection);
  mysql_query("SET character_set_connection=utf8", $connection);
  mysql_query("SET character_set_results=utf8", $connection);


#########################################################
# Get tweet info or upload tweet
# if $upstreamCodeValue == 1, then we're decoding
# otherwise we're encoding.
#########################################################

$hashtagName = "h";
$hashtagValue = $_GET[$hashtagName];

$messageName = "m";
$messageValue = $_GET[$messageName];

$secretName = "q";
$secretValue = $_GET[$secretName];

$durationName = "d";
$durationValue = $_GET[$durationName];

$codeValue = "";
for ($i = 0; $i < 6; $i++) {
	$codeValue = $codeValue.strval(rand(0,9));
}

$upstreamHashName = "n";
$upstreamHashValue = $_GET[$upstreamHashName];
$upstreamCodeName = "c";
$upstreamCodeValue = $_GET[$upstreamCodeName];
$upstreamNumberName = "p";
$upstreamNumberValue = $_GET[$upstreamNumberName];

$validString = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

if (is_null($secretValue) && is_null($upstreamCodeValue)) {

	$time = time();
	$duration = $time + $durationValue;
	$time = date("Y-m-d G:i:s",$time);

	$SqlStatement = "INSERT INTO main (timestamp,message,hash,code,mungekey,duration) VALUES ('$time','$messageValue','$hashtagValue','$codeValue','$offset','$duration')";
	# Run the query on the database through the connection
	$result = mysql_query($SqlStatement,$connection);
	if (!$result) die("Error " . mysql_errno() . " : " . mysql_error());
	
	echo ($messageValue);

}

else if (!is_null($secretValue) && is_null($upstreamCodeValue)) {
	$SqlStatement = "SELECT message, hash, visibility, access FROM main
  					WHERE code='$secretValue'";

				# Run the query on the database through the connection
				$result = mysql_query($SqlStatement,$connection);
				if (!$result)
					die("Error " . mysql_errno() . " : " . mysql_error());

				if ($row = mysql_fetch_array($result,MYSQL_NUM)) {
						$message = $row[0];
						//$hash = $row[1];
						$visibility = $row[2];
						$access = $row[3]+1;
						$SqlStatement2 = "UPDATE main SET access = $access WHERE code='$secretValue'";
							# Run the query on the database through the connection
							$result = mysql_query($SqlStatement2,$connection);
							if (!$result) die("Error " . mysql_errno() . " : " . mysql_error());
						if($visibility==1){
							echo($message);
						}
						else {
							echo("This message has expired and is no longer retrievable, sorry.");
						}
				}
				else echo("Sorry, no message found");
}

else if ($upstreamCodeValue==1) {

	$hashKey = arrayze($offset); //turns the word of the day into an offset array
	$hashtag = arrayze($upstreamHashValue); //turns the inputted hashtag into an ascii character code array

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

else if ($upstreamCodeValue==2) {

	$SqlStatement = "SELECT mungekey FROM main
  					WHERE code='$upstreamNumberValue'";

				# Run the query on the database through the connection
				$result = mysql_query($SqlStatement,$connection);
				if (!$result)
					die("Error " . mysql_errno() . " : " . mysql_error());

				if ($row = mysql_fetch_array($result,MYSQL_NUM)) {
						$offset = $row[0];
						$hashKey = arrayze($offset); //turns the word of the day into an offset array
						$hashtag = arrayze($upstreamHashValue); //turns the inputted hashtag into an ascii character code array

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
}

#########################################################
# Disconnect from the database.
#########################################################
mysql_close($connection);

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