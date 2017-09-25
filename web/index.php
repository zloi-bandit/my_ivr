<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>UploadiFive Test</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
<script src="jquery.uploadify.min.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="uploadify.css">
<style type="text/css">
body {
        font: 13px Arial, Helvetica, Sans-serif;
}
</style>
</head>

<body>
        <h1>Загрузить аудиофайл</h1>
        <form>
                <div id="queue"></div>
                <input id="file_upload" name="file_upload" type="file" multiple="true">
		<select id="file_language" name="file_language"><option value="kz">казахский</option><option value="ru">русский</option><option value="en">английский</option></select>
        </form>

        <script type="text/javascript">
                <?php $timestamp = time();?>
                $(function() {
			$("#file_language").trigger("change");
                        $('#file_upload').uploadify({
                                'formData'     : {
                                        'timestamp' : '<?php echo $timestamp;?>',
                                        'token'     : '<?php echo md5('unique_salt' . $timestamp);?>',
					'file_language' : $("#file_language option:selected").val()
                                },
                                'swf'      : 'uploadify.swf',
                                'uploader' : 'uploadify.php'
	
			});
                });
        </script>

<br>
<br>
<br>
<h1>Добавить меню IVR:</h2>

<span><a href="./kz/index.html">ҚАЗ&nbsp&nbsp&nbsp</a></span><span><a href="./ru/index.html">РУС&nbsp&nbsp&nbsp</a></span><span><a href="./en/index.html">ENG</a></span>

</body>
</html>

