<?php

	try{
	$DBH = new PDO("mysql:host=localhost;dbname=my_ivr", "root", "", array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 
	}

	catch(PDOException $e) {  
    	echo $e->getMessage();  
	}

	$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
?>
