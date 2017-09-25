<?php

header('Content-type: text/html; charset=utf-8'); 

include_once("../db.php");

 	$get_value1=$_GET['requested_info'];

		if ($get_value1=="language"){
 		$get_value2=$_GET['language'];
		$STH = $DBH->prepare("SELECT file_id, filename FROM audiofiles_table WHERE language='$get_value2'");
		$id = "file_id";
		$title = "filename";
		$data_type = "audiofiles";
		}

		if ($get_value1=="ivr_table"){
		$get_value2=$_GET['this_menu'];
		$STH = $DBH->prepare("SELECT varchar_ivr_id, ivr_name FROM ivr_names WHERE varchar_ivr_id <> \"$get_value2\"");
		$id = "varchar_ivr_id";
		$title = "ivr_name";
		$data_type = "ivr_menu";
		}

		if ($get_value1=="actions"){
                $get_value2=$_GET['language'];
		$request = "SELECT web_action_name, local_name FROM actions_table, language_" . $get_value2 . " where parameter_name=web_action_name";
                $STH = $DBH->prepare($request);
                $id = "web_action_name";
                $title = "local_name";
                $data_type = "actions";
                }

		if ($get_value1=="actions_this"){
		$get_value2=$_GET['language'];
		$request = "SELECT web_action_name, local_name FROM actions_table, language_" . $get_value2 . " where parameter_name=web_action_name AND allowed_for_this_menu=1";
		$STH = $DBH->prepare($request);
                $id = "web_action_name";
                $title = "local_name";
                $data_type = "actions_this";
                }
	
 	$STH->Execute();
 	$STH->setFetchMode(PDO::FETCH_ASSOC);
 
 	$rows_affected = $STH->rowCount(); 

	 	if ($rows_affected != 0){
	 	$i=0;
	 	$fetch_outcome=array();
 
 	 		while ($i < $rows_affected){
 	 		$row = $STH->Fetch();
 	 		$fetch_outcome[] = array('id' => $row[$id], 'title' => $row[$title]);
 			$i++;
	 		}

  		$result = array('type' => 'success', $data_type => $fetch_outcome);  
 		}

		else {
		$result = array('type' => 'error');
		}

	print json_encode($result);

	$STH = null;

?>
