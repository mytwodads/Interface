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

$time = time();

# Set character_set_client and character_set_connection
  mysql_query("SET character_set_client=utf8", $connection);
  mysql_query("SET character_set_connection=utf8", $connection);
  mysql_query("SET character_set_results=utf8", $connection);

	$SqlStatement = "UPDATE main SET visibility = 0 WHERE duration < $time";
		# Run the query on the database through the connection
		$result = mysql_query($SqlStatement,$connection);
		if (!$result) die("Error " . mysql_errno() . " : " . mysql_error());
		echo("success");
	
#########################################################
# Disconnect from the database.
#########################################################
mysql_close($connection);

?>