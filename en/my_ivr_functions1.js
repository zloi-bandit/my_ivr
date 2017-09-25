function addNewElement() {

doc_language = "en";

	if (doc_language == "kz"){

	press_button_text = "Нөмірді енгізу";
	no_input_text = "Нөмір енгізілмейді";
	invalid_input_text = "Нөмір қате енгізілді";
        english_text = "ағылшын";
	kazakh_text = "қазақ";
	russian_text = "орыс";
	}

	if (doc_language == "ru"){

	press_button_text = "Ввод номера";
        no_input_text = "Нет ввода";
        invalid_input_text = "Неправильный набор";
        english_text = "английский";
        kazakh_text = "казахский";
        russian_text = "русский";
	}

	if (doc_language == "en"){

	press_button_text = "Enter digit";
	no_input_text = "No input";
	invalid_input_text = "Invalid input";
	english_text = "english";
	kazakh_text = "kazakh";
	russian_text = "russian";
	}


var rows_quantity=document.getElementsByClassName("tablerow").length;
var rows_quantity_next=rows_quantity + 1;
var last_element_id = "tablerow" + rows_quantity;

var ivr_input_table_row1 = "<table style=\"width:100%\" class=\"tablerow\" id=\"tablerow" + rows_quantity_next;

var ivr_input_table_row2 = "\"><tr><td><select name=\"trig" + rows_quantity_next + "\" id=\"trig" + rows_quantity_next + "\" class=\"trig";

var ivr_input_table_row3 = "\"><option value=\"press_button\">" + press_button_text + "</option><option value=\"no_input\">" + no_input_text + "</option><option value=\"invalid_input\">" + invalid_input_text + "</option> </select> </td><td><input type=\"text\" name=\"number_input" + rows_quantity_next + "\" class=\"number_input\" id=\"number_input" + rows_quantity_next;

var ivr_input_table_row4 = "\"></td>  <td><select name=\"act" + rows_quantity_next + "\" class=\"act\" id=\"act" + rows_quantity_next;
var ivr_input_table_row5 = "\"></select></td> </tr>    </table>";

var argObjectTypes = ["callback_input", "timeout_input", "change_tariff_input", "language_select", "audiofiles_select", "ivr_select", "wait_exten_input"];

var ivr_input_table_row = ivr_input_table_row1 + ivr_input_table_row2 + ivr_input_table_row3 + ivr_input_table_row4 + ivr_input_table_row5;

$(".tablerow:last").after(ivr_input_table_row);

//loadActionsTableRow (rows_quantity_next, doc_language);

//var actions_counter=document.getElementById("actions_counter");

//actions_counter.InnerHTML(rows_quantity_next); 


var menu_counter=document.getElementById("menu_rows_counter");
menu_counter.setAttribute("value", rows_quantity_next);

$(".act").off;
$(".arg").off;

$(".trig").change ( function () {
var action_trig=$(this, "option:selected").val();
var this_element = this;
var re = /[0-9]+/g;
var re_array = re.exec(this.id);
var input_id = "number_input" + re_array[0];
var input = document.getElementById(input_id);

        if (action_trig == "no_input" || action_trig == "invalid_input"){
        $(input).html($(input).attr("disabled", true)); return(false);
        }
	
	else {
	$(input).html($(input).attr("disabled", false)); return(true);
	}
});

$(".trig:last").trigger('change');

var act_select_id = "act" + rows_quantity_next;
var data = "requested_info=actions&language=" + doc_language;

   	$.get("3.php", data, function (result) {

         	if (result.type == 'error'){
                return(false);
                }

      	var options = '';

        	$(result.actions).each( function(){
                options += "<option value=\"" + $(this).attr("id") + "\">" + $(this).attr("title") + "</option>";
                });

                var jq_act_select_id = "#" + act_select_id;

                $(jq_act_select_id).html(options);
                $(jq_act_select_id).attr("disabled", false);

        }, "json" );

var jq_act_object = 0;

jq_act_object = $(".act").change ( function () {

var this_element = this;
var re = /[0-9]+/g;
var re_array = re.exec(this.id);
var row_number = re_array[0];
var argObjectTypesSize = argObjectTypes.length;
var jq_act_object = "#" + this.id + row_number;

	for (i=0; i<argObjectTypesSize; i++){
	elementName = "#" + argObjectTypes[i] + row_number;
	$(elementName).remove();
 	}	

var selected_action=$(this, "option:selected").val();

	if (selected_action == null){
	selected_action="play_announcement";
	}

	switch (selected_action){

	case "check_balance":

	case "terminate_call":
	break;

	case "call_back":
	var callback_input = "<input type=\"text\" placeholder=\"TIMEOUT\" name=\"callback_input" + row_number +"\" class=\"arg\"  id=\"callback_input" + row_number + "\" value=10></input>";
        $(this_element).after(callback_input);
	break;

	case "change_tariff":
	var change_tariff_input = "<input type=\"text\" placeholder=\"TIMEOUT\" name=\"change_tariff_input" + row_number +"\" class=\"arg\" id=\"change_tariff_input" + row_number + "\" value=10></input>";
        $(this_element).after(change_tariff_input);
        break;

	case "wait_extension":
        var wait_exten_input = "<input type=\"text\" name=\"wait_exten_input" + row_number +"\" placeholder=\"TIMEOUT\" class=\"arg\" id=\"wait_exten_input" + row_number + "\" value=10></input>";
        $(this_element).after(wait_exten_input);
        break;
	
	case "play_and_ignore_input":

	case "play_announcement":

	var new_lang_select = "language_select" + row_number;
	var jquery_lang_select = "#" + new_lang_select;
	var l_selector_id = $(jquery_lang_select).attr("id");

		if (l_selector_id != new_lang_select){
		
		var this_select_lang = document.createElement("select");
                this_select_lang.setAttribute("id", new_lang_select);
                this_select_lang.setAttribute("class", "arg");
                this_select_lang.setAttribute("name", new_lang_select);

                        var parent = this.parentElement;

                        parent.appendChild(this_select_lang);


		language_options = "<option id=\"kz\" value=\"kz\">" + kazakh_text + "</option><option id=\"ru\" value=\"ru\">" + russian_text + "</option><option id=\"en\" value=\"en\">" + english_text + "</option>"

		$jq_lang_id = "#" + this_select_lang.id;
		$($jq_lang_id).html(language_options);
		}

	 	if (selected_action=="play_announcement"){
        	var timeout_input = "<input type=\"text\" name=\"timeout_input" + row_number + "\" class=\"arg\" id=\"timeout_input" + row_number + "\" value=10></input>";
                $(this_element).after(timeout_input);
                }
    	break;

	case "go_to_another_menu":
	var new_ivr_select = "ivr_select" + row_number;
	var jquery_ivr_select = "#" + new_ivr_select;
	var ivr_selector_id = $(jquery_ivr_select).attr("id");	

		if (ivr_selector_id != new_ivr_select){
		var ivr_select_1 = "<select name=\"ivr_select" + row_number + "\" class=\"arg\" id=\"ivr_select" + row_number + "\">";
		var data = "requested_info=ivr_table&this_menu=1";

				 	$.get("3.php", data, function (result) {

                                        if (result.type == 'error'){
                                        return(false);
                                        }

                                var ivr_select_2 = '';

                                        $(result.ivr_menu).each( function() {
                                        ivr_select_2 += "<option value=\"" + $(this).attr("id") + "\">" + $(this).attr("title") + "</option>";
                                        });

                                var ivr_select_3 = "</select>";
                                var ivr_select = ivr_select_1 + ivr_select_2 + ivr_select_3;
				$(jquery_ivr_select).remove();
				$(this_element).after(ivr_select);

                                }, "json" );
		}

	break;	

        default:
        break;
        }

	jq_lang_select = 0;
	jq_lang_select = $(".arg").change( function (){
		
		var re = /[0-9]+/g;
		var re_array = re.exec(this.id);
		var row_number = re_array[0];
		var language_id_for_compare = "language_select" + row_number;
	
			if (this.id == language_id_for_compare){
			new_audiofiles_select = "audiofiles_select" + row_number;
			jq_audiofiles_name = "#" + new_audiofiles_select;
			$(jq_audiofiles_name).remove();
			f_selector_id = $(jq_audiofiles_name).id;

			if ($(jq_audiofiles_name).length == 0){	
			var audiofiles_select_1 = "<select name=\"audiofiles_select" + row_number + "\" id=\"audiofiles_select" + row_number + "\" class=\"arg\">";
			jq_lang_option = "#" + language_id_for_compare + " option:selected"; 
			var selected_language = "&language=" + $(jq_lang_option).attr("id");
			var data = "requested_info=language" + selected_language;

                		$.get("3.php", data, function (result) {

                        		if (result.type == 'error'){
                        		return(false);
                        		}

                		var audiofiles_select_2 = '';

                        		$(result.audiofiles).each( function() {
                        		audiofiles_select_2 += "<option value=\"" + $(this).attr("id") + "\">" + $(this).attr("title") + "</option>";
                        		});

				var audiofiles_select_3 = "</select>";
				var audiofiles_select = audiofiles_select_1 + audiofiles_select_2 + audiofiles_select_3;
				jq_lang_select = "#" + language_id_for_compare;
			$(jq_audiofiles_name).remove();
				$(jq_lang_select).after(audiofiles_select);

 	          		}, "json" );
			}
			}
					
			return jq_lang_select;
		});
	
	if (jq_lang_select){	
//	$(jq_lang_select).trigger("change");
	}

	return jq_act_object;
	});


	if (jq_act_object){
	$(".act:last").trigger("change");
	}
}

function loadSelectWithActions(language) {

doc_language = "en";

        if (doc_language == "kz"){

        press_button_text = "Нөмірді енгізу";
        no_input_text = "Нөмір енгізілмейді";
        invalid_input_text = "Нөмір қате енгізілді";
        english_text = "ағылшын";
        kazakh_text = "қазақ";
        russian_text = "орыс";
        }

        if (doc_language == "ru"){

        press_button_text = "Ввод номера";
        no_input_text = "Нет ввода";
        invalid_input_text = "Неправильный набор";
        english_text = "английский";
        kazakh_text = "казахский";
        russian_text = "русский";
        }

        if (doc_language == "en"){

        press_button_text = "Enter digit";
        no_input_text = "No input";
        invalid_input_text = "Invalid input";
        english_text = "english";
        kazakh_text = "kazakh";
        russian_text = "russian";
        }



	var select_id = "action_select1"; 

        var data = "requested_info=actions_this&language=" + language;

                $.get("3.php", data, function (result) {

                        if (result.type == 'error'){
                        return(false);
                        }

                var options = "";

                        $(result.actions_this).each( function(){


                        options +="<option value=\"" +  $(this).attr("id") + "\">" + $(this).attr("title") + "</option>";
                        });

                var jq_act_this_select_id = "#" + select_id;

                $(jq_act_this_select_id).html(options);

                }, "json" );


	$("#action_select1").change( function () {	
		$(".t_action_arg1").remove();

		selected_option=$("#action_select1 option:selected").val();

			if(selected_option == null){
			selected_option="play_announcement";
			}	

			switch (selected_option){
				
			case "play_announcement":
			var action_timeout_input = "<input type=\"text\" class=\"t_action_arg1\" name=\"t_action_timeout_input1\" id=\"t_action_timeout_input1\" value=10></input>";
                	$(this).after(action_timeout_input);

			case "play_and_ignore_input":
			var t_action_select_language = "<select name=\"t_action_language_select1\" class=\"t_action_arg1\" id=\"t_action_language_select1\"><option id=\"kz\" value=\"kz\">" + kazakh_text + "</option><option id=\"ru\" value=\"ru\">" + russian_text + "</option><option id=\"en\" value=\"en\">" + english_text + "</option></select>";

                	$(this).after(t_action_select_language);

				$("#t_action_language_select1").change( function () {

				$("#t_action_audiofiles_select1").remove();
				selected_language = $("#t_action_language_select1 option:selected").val();
				var t_action_audiofiles_select_1 = "<select name=\"t_action_audiofiles_select1\" id=\"t_action_audiofiles_select1\" class=\"t_action_arg1\">";
				var data = "requested_info=language&language=" + selected_language;
                                $.get("3.php", data, function (result) {

                                        if (result.type == 'error'){
                                        return(false);
                                        }

					t_action_audiofiles_select_2 = '';
			
                                        $(result.audiofiles).each( function() {
                                        t_action_audiofiles_select_2 += "<option value=\"" + $(this).attr("id") + "\">" + $(this).attr("title") + "</option>";
                                        });

                                var t_action_audiofiles_select_3 = "</select>";
                                var t_action_audiofiles_select = t_action_audiofiles_select_1 + t_action_audiofiles_select_2 + t_action_audiofiles_select_3;
                                $("#t_action_language_select1").after(t_action_audiofiles_select);

                                }, "json" );
				});

				$("#t_action_language_select1").trigger("change");
			
			case "terminate_call":
			break;
			}
	});

	$("#action_select1").trigger("change");	
}


function loadActionsTableRow (language) {

	doc_language = "en";

        if (doc_language == "kz"){

        press_button_text = "Нөмірді енгізу";
        no_input_text = "Нөмір енгізілмейді";
        invalid_input_text = "Нөмір қате енгізілді";
        english_text = "ағылшын";
        kazakh_text = "қазақ";
        russian_text = "орыс";
        }

        if (doc_language == "ru"){

        press_button_text = "Ввод номера";
        no_input_text = "Нет ввода";
        invalid_input_text = "Неправильный набор";
        english_text = "английский";
        kazakh_text = "казахский";
        russian_text = "русский";
        }

        if (doc_language == "en"){

        press_button_text = "Enter digit";
        no_input_text = "No input";
        invalid_input_text = "Invalid input";
        english_text = "english";
        kazakh_text = "kazakh";
        russian_text = "russian";
        }

	

	var rows_quantity=document.getElementsByClassName("action_select").length;
	var row_number_next = rows_quantity + 1;
	var last_id = "action_select" + row_number_next;

	var actions_counter=document.getElementById("actions_counter");
	actions_counter.setAttribute("value", row_number_next);



//	$("#actions_counter").html(row_number_next);

	var tbl_style = "width:40%";
	var tbl_id = "action_select_table" + row_number_next; 
//	var td_id = "action_select_td" + row_number_next;

//	var tbl_parameters = "{id: " + tbl_id + ", style: " + tbl_style + "}";
//	var tbl_parameters = "{id: " + tbl_id + "}"; 

	
	var this_table=document.createElement('table');
	this_table.setAttribute("id", tbl_id);
	this_table.setAttribute("style", tbl_style);
	var this_tr=document.createElement('tr');
	var this_td=document.createElement('td');
	
	this_table.appendChild(this_tr);
	this_tr.appendChild(this_td);
	
	var sel_class = "action_select";
	var sel_id = "action_select" + row_number_next;
	var sel_name = "action_select" + row_number_next;
	
	var this_select = document.createElement("select");
	this_select.setAttribute("id", sel_id);
	this_select.setAttribute("class", sel_class);
	this_select.setAttribute("name", sel_name);
	
	
	this_td.appendChild(this_select);

	var button_ref = document.getElementById("select_action_button");
	var button_parent = button_ref.parentNode; 
	button_parent.insertBefore(this_table, button_ref);	
	
	var data = "requested_info=actions_this&language=" + language;
	
//	var output_begin = "<table style=\"width:40%\" id=\"action_select_table" + row_number_next + "\"><tr><td><select class=\"action_select\" id=\"action_select" + row_number_next + "\" name=\"action_select" + row_number_next + "\">";

                $.get("3.php", data, function (result) {

                        if (result.type == 'error'){
                        return(false);
                        }

                var options = '';

                        $(result.actions_this).each( function(){
                        options += "<option value=\"" + $(this).attr("id") + "\">" + $(this).attr("title") + "</option>";
                        });

//		var output = output_begin + options + "</select></td></tr></table>";

  //              var jq_act_this_select_table_id = "#" + "action_select_table" + rows_quantity;

    //            $(jq_act_this_select_table_id).after(output);
		
		jq_this_select = "#" + sel_id;	

		$(jq_this_select).html(options);

                }, "json" );

	var jq_last_t_select_id = "#" + last_id;
		$(jq_last_t_select_id).on("change", function () {

		jq_t_action_arg_class = ".t_action_arg" + row_number_next;
                $(jq_t_action_arg_class).remove();

		jq_selected_option = "#action_select" + row_number_next + " option:selected";
                selected_option=$(jq_selected_option).val();

                        if(selected_option == null){
                        selected_option="play_announcement";
                        }

                        switch (selected_option){

                        case "play_announcement":
                        var action_timeout_input = "<input type=\"text\" class=\"t_action_arg" + row_number_next +"\" name=\"t_action_timeout_input" + row_number_next +"\" id=\"t_action_timeout_input" + row_number_next + "\" value=10></input>";
                        $(this).after(action_timeout_input);

                        case "play_and_ignore_input":

			sel_id1 = "t_action_language_select" + row_number_next;
			sel_name1 = "t_action_language_select" + row_number_next;
			sel_class1 = "t_action_arg" + row_number_next;

		        var this_select1 = document.createElement("select");
      			this_select1.setAttribute("id", sel_id1);
        		this_select1.setAttribute("class", sel_class1);
        		this_select1.setAttribute("name", sel_name1);

			var parent = this.parentElement;

        		parent.appendChild(this_select1);

			this_select_options = "<option id=\"kz\" value=\"kz\">" + kazakh_text + "</option><option id=\"ru\" value=\"ru\">" + russian_text + "</option><option id=\"en\" value=\"en\">" + english_text + "</option>";

			var jq_this_select_ref = "#" + sel_id1; 

			$(jq_this_select_ref).html(this_select_options);

// var t_action_select_language = "<select name=\"t_action_language_select" + row_number_next + "\" class=\"t_action_arg" + row_number_next + "\" id=\"t_action_language_select" + row_number_next + "\"><option id=\"kz\" value=\"kz\">" + kazakh_text + "</option><option id=\"ru\" value=\"ru\">" + russian_text + "</option><option id=\"en\" value=\"en\">" + english_text + "</option></select>";

			jq_action_lang_select = "#" + "t_action_language_select" + row_number_next;			

				$(jq_action_lang_select).change( function () {
				jq_action_audiof_select = "#" + "t_action_audiofiles_select" + row_number_next;
                                $(jq_action_audiof_select).remove();
				jq_t_act_lang_sel = "#" + "t_action_language_select" + row_number_next + " option:selected";

                                selected_language = $(jq_t_act_lang_sel).val();
                                var t_action_audiofiles_select_1 = "<select name=\"t_action_audiofiles_select" + row_number_next + "\" id=\"t_action_audiofiles_select" + row_number_next + "\" class=\"t_action_arg" + row_number_next + "\">";
                                var data = "requested_info=language&language=" + selected_language;
                                $.get("3.php", data, function (result) {

                                        if (result.type == 'error'){
                                        return(false);
                                        }

                                        t_action_audiofiles_select_2 = '';

                                        $(result.audiofiles).each( function() {
                                        t_action_audiofiles_select_2 += "<option value=\"" + $(this).attr("id") + "\">" + $(this).attr("title") + "</option>";
                                        });

                                var t_action_audiofiles_select_3 = "</select>";
                                var t_action_audiofiles_select = t_action_audiofiles_select_1 + t_action_audiofiles_select_2 + t_action_audiofiles_select_3;

				
                                $(jq_action_lang_select).after(t_action_audiofiles_select);

                                }, "json" );



                                });

			  var jq_act_lang_sel = "#t_action_language_select" + row_number_next;
                          $(jq_act_lang_sel).trigger("change");

			break;
			
			case "wait_extension":

			var t_action_wait_exten_input = "<input type=\"text\" name=\"t_action_wait_exten_input" + row_number_next + "\" class=\"t_action_arg" + row_number_next +  "\" id=\"t_action_wait_exten_input" + row_number_next + "\" value=10></input>";
        		$(this).after(t_action_wait_exten_input);
			
			
                        case "terminate_call":
                        break;
                        }
        	});

	var jq_act_select = "#action_select" + row_number_next;
	$(jq_act_select).trigger("change");
}



