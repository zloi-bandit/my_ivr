
global.js_func_id[8] = 'call_back';

function call_back (arg1, ari, channel, event, db_connection, logger) {

	var number = "";
	channel.on('ChannelDtmfReceived', dtmfReceived);

        function dtmfReceived (event, channel) {

        var this_digit = event.digit;

		switch(this_digit){
		case '#':
	console.log(number);
        ari.channels.continueInDialplan({channelId: channel.id});

	 	setTimeout(function (){
                ari.channels.continueInDialplan({channelId: channel.id});
                }
        	}, 10000);

        	break;	

		default:
		number += this_digit;
		}
	}



	console.log(number);
}

module.exports = function(module_holder) {
    // the key in this dictionary can be whatever you want
    // just make sure it won't override other modules
    module_holder['call_back'] = call_back;
};
