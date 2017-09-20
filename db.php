<?php

	try{
	$DBH = new PDO("mysql:host=localhost;dbname=my_ivr", "root", ""); 
	}

	catch(PDOException $e) {  
    	echo $e->getMessage();  
	}

	$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
?>
