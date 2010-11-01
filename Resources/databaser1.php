<?php

# Get our DB info
require "databaserdb.php";

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
# Get tweet info
#########################################################
$hashtagName = "h";
$hashtagValue = $_GET[$hashtagName];

$messageName = "m";
$messageValue = $_GET[$messageName];

$secretName = "q";
$secretValue = $_GET[$secretName];

$codeValue = "";
for ($i = 0; $i < 6; $i++) {
	$codeValue = $codeValue.strval(rand(0,9));
}

if (is_null($secretValue)) {

$SqlStatement = "INSERT INTO main (message,hash,code) VALUES ('$messageValue','$hashtagValue','$codeValue')";
	# Run the query on the database through the connection
	$result = mysql_query($SqlStatement,$connection);
	if (!$result) die("Error " . mysql_errno() . " : " . mysql_error());
	
	echo ($messageValue);

}

else {
	$SqlStatement = "SELECT message, hash FROM main
  					WHERE code='$secretValue'";

				# Run the query on the database through the connection
				$result = mysql_query($SqlStatement,$connection);
				if (!$result)
					die("Error " . mysql_errno() . " : " . mysql_error());

				if ($row = mysql_fetch_array($result,MYSQL_NUM))
					{ # Successful login
						$message = $row[0];
						//$hash = $row[1];
						echo($message);
					}
				else echo("sorry, no message found");
}

#########################################################
# Disconnect from the database.
#########################################################
mysql_close($connection);
?>