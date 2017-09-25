<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

include_once("db.php");

// Define a destination
$targetFolder = '/../../lib/asterisk/sounds/'; // Relative to the root

$verifyToken = md5('unique_salt' . $_POST['timestamp']);

$lang_folder = $_POST['file_language'] . "/"; 


if (!empty($_FILES) && $_POST['token'] == $verifyToken) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder . $lang_folder;
	print $targetPath;
	$targetFile = rtrim($targetPath,'/') . '/' . $_FILES['Filedata']['name'];
	
	// Validate the file type
	$fileTypes = array('wav','alaw','ulaw','gsm'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	
	if (in_array($fileParts['extension'],$fileTypes)) {
		move_uploaded_file($tempFile,$targetFile);
		$request = "INSERT INTO audiofiles_table (filename, language, audio_format) VALUES ('" . $_FILES['Filedata']['name'] . "', '" . $_POST['file_language'] . "', '" . $fileParts['extension'] . "')";		
		$STH = $DBH->prepare($request);

		$STH->execute();
		echo '1';
	} else {
		echo 'Invalid file type.';
	}
}
?>
