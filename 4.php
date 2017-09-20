<?php

include_once("db.php");

// $get_value=$_GET['data'];

 $STH = $DBH->prepare("SELECT web_action_name FROM actions_table WHERE allowed_for_this_menu=1");
 $STH->Execute();
 $STH->setFetchMode(PDO::FETCH_ASSOC);
 
 $rows_affected = $STH->rowCount(); 

	 if ($rows_affected != 0){
	 $i=0;
	 $fetch_outcome=array();
 
 	 	while ($i < $rows_affected){
 	 	$row = $STH->Fetch();
 	 	$fetch_outcome[] = array('id' => $row['web_action_name'], 'title' => $row['web_action_name']);
 		$i++;
	 	}

  	$result = array('type' => 'success', 'select_id' => $fetch_outcome);  
 	}

	else {
	$result = array('type' => 'error');
	}

print json_encode($result);

$STH = null;

?>
