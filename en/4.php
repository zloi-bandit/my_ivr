<?php

include_once("db.php");

$argument_types = array(

        0 => "callback_input",
        1 => "timeout_input",
        2 => "change_tariff_input",
        3 => "language_select",
        4 => "audiofiles_select",
        5 => "ivr_select",
        6 => "action_select",
        7 => "t_action_timeout_input",
        8 => "t_action_language_select",
        9 => "t_action_audiofiles_select",
        10 => "number_input",
        11 => "trig",
        12 => "act",
        13 => "this_ivr",
	14 => "wait_exten_input",
	15 => "t_action_wait_exten_input"
);

$arguments_types_size = count($argument_types);

	$menu_rows_count=$_GET['menu_rows'];
        $actions_rows_count=$_GET['actions_rows'];

	$STH=$DBH->prepare("SELECT MAX(varchar_ivr_id) AS varchar_ivr_id from ivr_names"); 
	$STH->Execute();
        $STH->setFetchMode(PDO::FETCH_ASSOC);
        $select_result = $STH->Fetch();

		if ($select_result['varchar_ivr_id'] == ''){
		$this_ivr_val = 1;
		}

		else {
		$this_ivr_val = $select_result['varchar_ivr_id'] + 1;
		}

	$this_ivr_name=$_GET['this_ivr_name'];	

		if ($this_ivr_name == ''){
		$this_ivr_name = $this_ivr_val;
		}

		if ($actions_rows_count == 0){
                $this_wait_exten_input_val = "10";
		$this_action_val = "wait_extension";
	
               	$select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_ivr_val . "'";

                $STH=$DBH->prepare($select_request);
                $STH->Execute();
                $STH->setFetchMode(PDO::FETCH_ASSOC);
                $select_result = $STH->Fetch();

                     	if ($select_result['priority'] != NULL){
                        $new_priority = $select_result['priority'] + 1;
                        }

                        else {
                        $new_priority = 1;
                        }

             	$select_request = "SELECT action_id FROM actions_table WHERE web_action_name='" . $this_action_val . "'";

                $STH=$DBH->prepare($select_request);
                $STH->Execute();
                $STH->setFetchMode(PDO::FETCH_ASSOC);

                $select_result = $STH->Fetch();

                $insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_ivr_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', '". $this_wait_exten_input_val . "')";

                $STH=$DBH->prepare($insert_request);
                $STH->Execute();
                }	
	
	for ($i=1; $i<=$actions_rows_count; $i++){
		
	$error = 0;
	$this_action_select = "action_select" . $i;

			if (isset($_GET[$this_action_select])){
			$this_action_val = $_GET[$this_action_select];

				if ($this_action_val == "wait_extension") {
                                $this_wait_exten_input = "t_action_wait_exten_input" . $i;

					if (isset($_GET[$this_wait_exten_input])){
                                        $this_wait_exten_input_val = $_GET[$this_wait_exten_input];
                                        }

                                        else {
                                        $this_timeout_val = "10";
                                        }


				  $select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_ivr_val . "'";

                                  $STH=$DBH->prepare($select_request);
                                  $STH->Execute();
                                  $STH->setFetchMode(PDO::FETCH_ASSOC);
                                  $select_result = $STH->Fetch();

                                     	if ($select_result['priority'] != NULL){
                                        $new_priority = $select_result['priority'] + 1;
                                        }

                                        else {
                                        $new_priority = 1;
                                        }

				$select_request = "SELECT action_id FROM actions_table WHERE web_action_name='" . $this_action_val . "'";

                                $STH=$DBH->prepare($select_request);
                                $STH->Execute();
                                $STH->setFetchMode(PDO::FETCH_ASSOC);

                                $select_result = $STH->Fetch();

				$insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_ivr_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', '". $this_wait_exten_input_val . "')"; 

                                $STH=$DBH->prepare($insert_request);
                                $STH->Execute();
                                }

				if ($this_action_val == "play_announcement") {
				$this_timeout = "t_action_timeout_input" . $i;

					if (isset($_GET[$this_timeout])){
					$this_timeout_val = $_GET[$this_timeout];
					}

					else {
					$this_timeout_val = "10";
					}

				
				$this_language = "t_action_language_select" . $i;

					if (isset($_GET[$this_language])){
					$this_language_val = $_GET[$this_language];
					}

					else {
					$error = 1;
					$error_code = " t_lang";
					}
				

				$this_audiofile = "t_action_audiofiles_select" . $i;

					if (isset($_GET[$this_audiofile])){
					$this_audiofile_val = $_GET[$this_audiofile];
					}
									
					else {
					$error = 1;
					$error_code = " t_audio";
					}


					if (!$error){

					$select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_ivr_val . "'";

                                        $STH=$DBH->prepare($select_request);
                                        $STH->Execute();
                                        $STH->setFetchMode(PDO::FETCH_ASSOC);
                                        $select_result = $STH->Fetch();

                                                if ($select_result['priority'] != NULL){
                                                $new_priority = $select_result['priority'] + 1;
                                                }

                                                else {
                                                $new_priority = 1;
                                                }

                                        $select_request = "SELECT actions_table.action_id, filename, audio_directory from actions_table, audiofiles_table, lang_directories WHERE web_action_name='" . $this_action_val . "' AND file_id='" . $this_audiofile_val . "' AND lang_directories.language='" . $this_language_val . "'";

                                        $STH=$DBH->prepare($select_request);
                                        $STH->Execute();
                                        $STH->setFetchMode(PDO::FETCH_ASSOC);
                                        $select_result = $STH->Fetch();
	
					$audio_filename = $select_result['audio_directory'] . $select_result['filename'];
					$function_args = $audio_filename . ";" . $this_timeout_val;
					$insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_ivr_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', '" . $function_args . "')";					

					$STH=$DBH->prepare($insert_request);
					$STH->Execute();
					}

					else  {
					print "<p>error! 1 $error_code</p>";
					}
				}

				else {

				if ($this_action_val == "play_and_ignore_input"){

                                $this_language = "t_action_language_select" . $i;

                                        if (isset($_GET[$this_language])){
                                        $this_language_val = $_GET[$this_language];
                                        }

                                        else {
                                        $error = 1;
                                        }


                                $this_audiofile = "t_action_audiofiles_select" . $i;

                                        if (isset($_GET[$this_audiofile])){
                                        $this_audiofile_val = $_GET[$this_audiofile];
                                        }

                                        else {
                                        $error = 1;
                                        }

                                        if (!$error){

					$select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_ivr_val . "'"; 

					$STH=$DBH->prepare($select_request);
                                        $STH->Execute();
                                        $STH->setFetchMode(PDO::FETCH_ASSOC);
                                        $select_result = $STH->Fetch();

						if ($select_result['priority'] != NULL){
						$new_priority = $select_result['priority'] + 1;
						}

						else {
						$new_priority = 1;						
						}


					$select_request = "SELECT actions_table.action_id, filename, audio_directory from actions_table, audiofiles_table, lang_directories WHERE web_action_name='" . $this_action_val . "' AND file_id='" . $this_audiofile_val . "' AND lang_directories.language='" . $this_language_val . "'";

                                        $STH=$DBH->prepare($select_request);
                                        $STH->Execute();
                                        $STH->setFetchMode(PDO::FETCH_ASSOC);
					$select_result = $STH->Fetch();

                                        $audio_filename = $select_result['audio_directory'] . $select_result['filename'];
                                        $function_args = $audio_filename;

                                        $insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_ivr_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', '" . $function_args . "')";

                                        $STH=$DBH->prepare($insert_request);
                                        $STH->Execute();
                                        }

                                        else {
                                        print "<p>error! 2</p>";
                                        }
                                }
				
				else {
			
				if ($this_action_val == "terminate_call"){
				
				$select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_ivr_val . "'";

                                $STH=$DBH->prepare($select_request);
                                $STH->Execute();
                                $STH->setFetchMode(PDO::FETCH_ASSOC);
                                $select_result = $STH->Fetch();

                                                if ($select_result['priority'] != NULL){
                                                $new_priority = $select_result['priority'] + 1;
                                                }

                                                else {
                                                $new_priority = 1;
                                                }


				$select_request = "SELECT action_id FROM actions_table WHERE web_action_name='" . $this_action_val . "'";

				$STH=$DBH->prepare($select_request);
                                $STH->Execute();
                                $STH->setFetchMode(PDO::FETCH_ASSOC);

                                $select_result = $STH->Fetch();

				$insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_ivr_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', '')";
				$STH=$DBH->prepare($insert_request);
                                $STH->Execute();
				}
				}
				}
			}

			else {
			$error = 1;
			print "<p>error! 3</p>";
                        }

			if ($error == 1){
			break;
			}
	}

	if ($error == 1){
	exit();
	}

	for ($i=2; $i<=$menu_rows_count; $i++){
	
	$error = 0;
        $this_act = "act" . $i;

                        if (isset($_GET[$this_act])){
                        $this_act_val = $_GET[$this_act];

                                if ($this_act_val == "play_announcement"){
                                $this_timeout_ = "timeout_input" . $i;

                                        if (isset($_GET[$this_timeout_])){
                                        $this_timeout__val = $_GET[$this_timeout_];
                                        }

                                        else {
                                        $this_timeout__val = "10";
                                        }


                                $this_language_ = "language_select" . $i;

                                        if (isset($_GET[$this_language_])){
                                        $this_language__val = $_GET[$this_language_];
                                        }

                                        else {
                                        $error = 1;
                                        }


                                $this_audiofile_ = "audiofiles_select" . $i;

                                        if (isset($_GET[$this_audiofile_])){
                                        $this_audiofile__val = $_GET[$this_audiofile_];
                                        }

                                        else {
                                        $error = 1;
                                        }


				$this_trig = "trig" . $i;
				
					if (isset($_GET[$this_trig])){
					$this_trig_val = $_GET[$this_trig];
					}

					else {
					$error = 1;
                                        }
				
					if ($this_trig_val == "press_button"){
					$this_number_input = "number_input" . $i;
 
						if (isset($_GET[$this_number_input])){
						$this_number_input_val = $_GET[$this_number_input];

							if ($this_number_input_val == ''){
							$this_number_input_val = 'u';
							}
						}

						else {
						$this_number_input_val = "u";
						}
					}
						
					else {
						
						if ($this_trig_val == "no_input"){
						$this_number_input_val = "u";
						}

						else {

							if ($this_trig_val == "invalid_input"){
							$this_number_input_val = "i";
							}

							else {
							$error = 1;
							}
						}
					}

					if (!$error){

					$this_location_val = $this_ivr_val . "_" . "$this_number_input_val";

					$select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_location_val . "'";

                                        $STH=$DBH->prepare($select_request);
                                        $STH->Execute();
                                        $STH->setFetchMode(PDO::FETCH_ASSOC);
                                        $select_result = $STH->Fetch();

                                                if ($select_result['priority'] != NULL){
                                                $new_priority = $select_result['priority'] + 1;
                                                }

                                                else {
                                                $new_priority = 1;
                                                }

                                        $select_request = "SELECT actions_table.action_id, filename, audio_directory from actions_table, audiofiles_table, lang_directories WHERE web_action_name='" . $this_act_val . "' AND file_id='" . $this_audiofile__val . "' AND lang_directories.language='" . $this_language__val . "'";

                                        $STH=$DBH->prepare($select_request);
                                        $STH->Execute();
                                        $STH->setFetchMode(PDO::FETCH_ASSOC);
                                        $select_result = $STH->Fetch();

                                        $audio_filename = $select_result['audio_directory'] . $select_result['filename'];
                                        $function_args = $audio_filename . ";" . $this_timeout__val;					

                                        $insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_location_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', '" . $function_args . "'); INSERT INTO ivr_map VALUES ('" . $this_ivr_val . "', '" . $this_number_input_val . "', '" . $this_location_val . "')";

                                        $STH=$DBH->prepare($insert_request);
                                        $STH->Execute();
                                        }
				
					else {
					print "<p>error! 4</p>";
					break;
					}	
				}

				else {

					if ($this_act_val == "play_and_ignore_input"){

                                $this_language_ = "language_select" . $i;

                                        	if (isset($_GET[$this_language_])){
                                        $this_language__val = $_GET[$this_language_];
                                        	}

                                        	else {
                                        $error = 1;
                                        	}


                                $this_audiofile_ = "audiofiles_select" . $i;

                                        	if (isset($_GET[$this_audiofile_])){
                                        $this_audiofile__val = $_GET[$this_audiofile_];
                                        	}

                                        	else {
                                        $error = 1;
                                        	}


                                $this_trig = "trig" . $i;

                                        	if (isset($_GET[$this_trig])){
                                        $this_trig_val = $_GET[$this_trig];
                                        	}

                                        	else {
                                        $error = 1;
					 	}

                                        	if ($this_trig_val == "press_button"){
                                        $this_number_input = "number_input" . $i;

                                                	if (isset($_GET[$this_number_input])){
                                                $this_number_input_val = $_GET[$this_number_input];

							 	if ($_GET[$this_number_input] != ''){
                                                        	$this_number_input_val = $_GET[$this_number_input];
                                                        	}

                                                        	else {
                                                        	$this_number_input_val = "u";
                                                        	}
                                                	}

                                                	else {
                                                $this_number_input_val = "u";
                                                	}
                                        	}

                                        	else {

                                                	if ($this_trig_val == "no_input"){
                                                $this_number_input_val = "u";
                                                	}

                                                	else {

                                                        if ($this_trig_val == "invalid_input"){
                                                        $this_number_input_val = "i";
                                                        }

                                                        	else {
                                                        $error = 1;
                                                        	}
                                                	}
                                        	}

                                        	if (!$error){

                                        $this_location_val = $this_ivr_val . "_" . "$this_number_input_val";

					$select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_location_val . "'";

                                        $STH=$DBH->prepare($select_request);
                                        $STH->Execute();
                                        $STH->setFetchMode(PDO::FETCH_ASSOC);
                                        $select_result = $STH->Fetch();

                                                	if ($select_result['priority'] != NULL){
                                                $new_priority = $select_result['priority'] + 1;
                                                	}

                                                	else {
                                                $new_priority = 1;
                                                	}

					$select_request = "SELECT actions_table.action_id, filename, audio_directory FROM actions_table, audiofiles_table, lang_directories WHERE web_action_name='" . $this_act_val . "' AND file_id='" . $this_audiofile__val . "' AND lang_directories.language='" . $this_language__val . "'";
                                        $STH=$DBH->prepare($select_request);
                                        $STH->Execute();
                                        $STH->setFetchMode(PDO::FETCH_ASSOC);
                                        $select_result = $STH->Fetch();

                                        $audio_filename = $select_result['audio_directory'] . $select_result['filename'];
                                        $function_args = $audio_filename;

                                        $insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_location_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', '" . $function_args . "'); INSERT INTO ivr_map VALUES ('" . $this_ivr_val . "', '" . $this_number_input_val . "', '" . $this_location_val . "')";

                                        $STH=$DBH->prepare($insert_request);
                                        $STH->Execute();
                                        	}

                                        	else {
                                        print "<p>error! 5</p>";
                                        break;
                                        	}
                                	}
				
					else {
				
					if ( $this_act_val == "check_balance" || $this_act_val == "terminate_call" ){

			 	$this_trig = "trig" . $i;

                                        if (isset($_GET[$this_trig])){
                                        $this_trig_val = $_GET[$this_trig];
                                        }

                                        else {
                                        $error = 1;
                                         }

                                        if ($this_trig_val == "press_button"){
                                        $this_number_input = "number_input" . $i;

                                                if (isset($_GET[$this_number_input])){

							if ($_GET[$this_number_input] != ''){
	                                              	$this_number_input_val = $_GET[$this_number_input];
         	                                       	}

							else {
							$this_number_input_val = "u";
							}
						}

                                                else {
                                                $this_number_input_val = "u";
                                                }
                                        }

                                        else {

                                                if ($this_trig_val == "no_input"){
                                                $this_number_input_val = "u";
                                                }

                                                else {

                                                        if ($this_trig_val == "invalid_input"){
                                                        $this_number_input_val = "i";
                                                        }

                                                        else {
                                                        $error = 1;
                                                        }
                                                }
                                        }	
			

				if (!$error){	
				$this_location_val = $this_ivr_val . "_" . "$this_number_input_val";

				$select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_location_val . "'";

                                $STH=$DBH->prepare($select_request);
                                $STH->Execute();
                                $STH->setFetchMode(PDO::FETCH_ASSOC);

                                $select_result = $STH->Fetch();

					if ($select_result['priority'] == NULL){
                                        $new_priority = 1;
                                        }

                                        else {
                                        $new_priority = $select_result['priority'] + 1;
                                        }
				
				$select_request = "SELECT action_id FROM actions_table WHERE  web_action_name='" . $this_act_val . "'";

				$STH=$DBH->prepare($select_request);
                                $STH->Execute();
                                $STH->setFetchMode(PDO::FETCH_ASSOC);

                                $select_result = $STH->Fetch();


                                $insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_location_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', ''); INSERT INTO ivr_map VALUES ('" . $this_ivr_val . "', '" . $this_number_input_val . "', '" . $this_location_val . "')";

                                $STH=$DBH->prepare($insert_request);
                                $STH->Execute();				
				}			

				else {
                                print "<p>error! 6</p>";
                                break;
                                }
                 	}

			else {
				 if ($this_act_val == "call_back" || $this_act_val == "change_tariff" || $this_act_val == "wait_extension"){

					if ($this_act_val == "call_back"){
					$this_timeout_ = "callback_input" . $i;
					}

					else {

						if ($this_act_val == "change_tariff"){
						$this_timeout_ = "change_tariff_input" . $i;
						}

						else {
						$this_timeout_ = "wait_exten_input" . $i;
						}
					}					

                                        if (isset($_GET[$this_timeout_])){
                                        $this_timeout__val = $_GET[$this_timeout_];
                                        }

                                        else {
                                        $this_timeout__val = "10";
                                        }

				$this_trig = "trig" . $i;

                                        if (isset($_GET[$this_trig])){
                                        $this_trig_val = $_GET[$this_trig];
                                        }

                                        else {
                                        $error = 1;
                                         }

                                        if ($this_trig_val == "press_button"){
                                        $this_number_input = "number_input" . $i;

                                                if (isset($_GET[$this_number_input])){
                                                $this_number_input_val = $_GET[$this_number_input];

							 if ($_GET[$this_number_input] != ''){
                                                         $this_number_input_val = $_GET[$this_number_input];
                                                         }

                                                         else {
                                                         $this_number_input_val = "u";
                                                         }
                                                }

                                                else {
                                                $this_number_input_val = "u";
                                                }
                                        }

                                        else {

                                                if ($this_trig_val == "no_input"){
                                                $this_number_input_val = "u";
                                                }

                                                else {

                                                        if ($this_trig_val == "invalid_input"){
                                                        $this_number_input_val = "i";
                                                        }

                                                        else {
                                                        $error = 1;
                                                        }
                                                }
                                        }

				if (!$error){
                                $this_location_val = $this_ivr_val . "_" . "$this_number_input_val";

				$select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_location_val .  "'";

                                $STH=$DBH->prepare($select_request);
                                $STH->Execute();
                                $STH->setFetchMode(PDO::FETCH_ASSOC);

                                $select_result = $STH->Fetch();

				 	if ($select_result['priority'] == NULL){
                                        $new_priority = 1;
                                        }

                                        else {
                                        $new_priority = $select_result['priority'] + 1;
                                        }
				
				$select_request = "SELECT action_id FROM actions_table WHERE web_action_name='" . $this_act_val . "'";

				$STH=$DBH->prepare($select_request);
                                $STH->Execute();
                                $STH->setFetchMode(PDO::FETCH_ASSOC);

                                $select_result = $STH->Fetch();

                                $insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_location_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', '". $this_timeout__val . "'); INSERT INTO ivr_map VALUES ('" . $this_ivr_val . "', '" . $this_number_input_val . "', '" . $this_location_val . "')";

                                $STH=$DBH->prepare($insert_request);
                                $STH->Execute();
                                }

                                else {
                                print "<p>error! 7</p>";
                                break;
                                }
                        }	
			
	
			else {
			
			if ($this_act_val == "go_to_another_menu"){
			
			$this_trig = "trig" . $i;

                                        if (isset($_GET[$this_trig])){
                                        $this_trig_val = $_GET[$this_trig];
                                        }

                                        else {
                                        $error = 1;
                                         }

                                        if ($this_trig_val == "press_button"){
                                        $this_number_input = "number_input" . $i;

                                                if (isset($_GET[$this_number_input])){

						 	if ($_GET[$this_number_input] != ''){
                                                        $this_number_input_val = $_GET[$this_number_input];
                                                        }

                                                        else {
                                                        $this_number_input_val = "u";
                                                        }
                                                }

                                                else {
                                                $this_number_input_val = "u";
                                                }
                                        }

                                        else {

                                                if ($this_trig_val == "no_input"){
                                                $this_number_input_val = "u";
                                                }

                                                else {

                                                        if ($this_trig_val == "invalid_input"){
                                                        $this_number_input_val = "i";
                                                        }

                                                        else {
                                                        $error = 1;
                                                        }
                                                }
                                        }

					$this_ivr_select = "ivr_select" . $i;

						if (isset($_GET[$this_ivr_select])){
                                                $this_ivr_select_val = $_GET[$this_ivr_select];
                                                }

                                                else {
                                                $error = 1;
                                                }
                                        }				

				if (!$error){
                                $this_location_val = $this_ivr_val . "_" . "$this_number_input_val";
		
				$select_request = "SELECT MAX(priority) AS priority FROM ivr_actions WHERE varchar_location_id='" . $this_location_val . "'";
                                
				$STH=$DBH->prepare($select_request);
                                $STH->Execute();
                                $STH->setFetchMode(PDO::FETCH_ASSOC);

                                $select_result = $STH->Fetch();

                                        if ($select_result['priority'] == NULL){
                                        $new_priority = 1;
                                        }

                                        else {
                                        $new_priority = $select_result['priority'] + 1;
                                        }

				$select_request = "SELECT action_id FROM actions_table WHERE web_action_name='" . $this_act_val . "'";

                                $STH=$DBH->prepare($select_request);
                                $STH->Execute();
                                $STH->setFetchMode(PDO::FETCH_ASSOC);

                                $select_result = $STH->Fetch();

                                $insert_request = "INSERT INTO ivr_actions VALUES ('" . $this_location_val . "', '" . $new_priority . "', '" . $select_result['action_id'] . "', '" . $this_ivr_select_val . "'); INSERT INTO ivr_map VALUES ('" . $this_ivr_val . "', '" . $this_number_input_val . "', '" . $this_location_val . "')";

                                $STH=$DBH->prepare($insert_request);
                                $STH->Execute();
                                }

                                else {
                                print "<p>error! 8</p>";
                                break;
                                }
                        }
			}
			}
			}
			}	

		 	else {
                        $error = 1;
                        print "<p>error! 9</p>";
                        }

                        if ($error == 1){
                        break;
                        }
        	}

        if ($error == 1){
        exit();
        }

	else {
	$insert_request = "INSERT INTO ivr_names VALUES ('" . $this_ivr_val . "', '" . $this_ivr_name . "')";
	$STH=$DBH->prepare($insert_request);
	$STH->Execute();
       	}





						

						


