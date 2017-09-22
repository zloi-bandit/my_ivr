function addNewElement() {

doc_language = "en";

press_button_text = "Press button";
no_input_text = "No input";
invalid_input_text = "Invalid input";
english_text = "english";
kazakh_text = "kazakh";
russian_text = "russian";

var rows_quantity=document.getElementsByClassName("tablerow").length;
var rows_quantity_next=rows_quantity + 1;
var last_element_id = "tablerow" + rows_quantity;

var ivr_input_table_row1 = "<table style=\"width:100%\" class=\"tablerow\" id=\"tablerow" + rows_quantity_next;

var ivr_input_table_row2 = "\"><tr><td><select name=\"trig" + rows_quantity_next + "\" id=\"trig" + rows_quantity_next + "\" class=\"trig";

var ivr_input_table_row3 = "\"><option value=\"press_button\">" + press_button_text + "</option><option value=\"no_input\">" + no_input_text + "</option><option value=\"invalid_input\">" + invalid_input_text + "</option> </select> </td><td><input type=\"text\" name=\"number_input" + rows_quantity_next + "\" class=\"number_input\" id=\"number_input" + rows_quantity_next;

var ivr_input_table_row4 = "\"></td>  <td><select name=\"act" + rows_quantity_next + "\" class=\"act\" id=\"act" + rows_quantity_next;
var ivr_input_table_row5 = "\"></select></td> </tr>    </table>";

var argObjectTypes = ["callback_input", "timeout_input", "change_tariff_input", "language_select", "audiofiles_select", "ivr_select"];

var ivr_input_table_row = ivr_input_table_row1 + ivr_input_table_row2 + ivr_input_table_row3 + ivr_input_table_row4 + ivr_input_table_row5;

$(".tablerow:last").after(ivr_input_table_row);

loadActionsTableRow (rows_quantity_next);

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
	var callback_input = "<input type=\"text\" name=\"callback_input" + row_number +"\" class=\"arg\"  id=\"callback_input" + row_number + "\" value=10></input>";
        $(this_element).after(callback_input);
	break;

	case "change_tariff":
	var change_tariff_input = "<input type=\"text\" name=\"change_tariff_input" + row_number +"\" class=\"arg\" id=\"change_tariff_input" + row_number + "\" value=10></input>";
        $(this_element).after(change_tariff_input);
        break;
	
	case "play_and_ignore_input":

	case "play_announcement":

	var new_lang_select = "language_select" + row_number;
	var jquery_lang_select = "#" + new_lang_select;
	var l_selector_id = $(jquery_lang_select).attr("id");

		if (l_selector_id != new_lang_select){

		var select_language = "<select name=\"language_select" + row_number + "\" class=\"arg\" id=\"language_select" + row_number + "\"><option id=\"kz\" value=\"kz\">" + kazakh_text + "</option><option id=\"ru\" value=\"ru\">" + russian_text + "</option><option id=\"en\" value=\"en\">" + english_text + "</option></select>";

		$(this_element).after(select_language);
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

function loadSelectWithActions() {

        var select_id = "action_select";

                $.get("4.php", '', function (result) {

                        if (result.type == 'error'){
                        return(false);
                        }

                var options = '';

                        $(result.select_id).each( function(){
                        options += "<option value=\"" + $(this).attr("id") + "\">" + $(this).attr("title") + "</option>";
                        });

                var select_jquery_id = "#" + select_id;

                $(select_jquery_id).html(options);
                $(select_jquery_id).attr("disabled", false);

                }, "json" );
}


function loadActionsTableRow (rowNumber) {

	var select_id = "act" + rowNumber;

                $.get("5.php", '', function (result) {

                        if (result.type == 'error'){
                        return(false);
                        }

                var options = '';

                        $(result.select_id).each( function(){
                        options += "<option value=\"" + $(this).attr("id") + "\">" + $(this).attr("title") + "</option>";
                        });

                var select_jquery_id = "#" + select_id;

                $(select_jquery_id).html(options);
                $(select_jquery_id).attr("disabled", false);

                }, "json" );
}



