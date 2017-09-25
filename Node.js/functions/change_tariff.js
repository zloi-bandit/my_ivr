
global.js_func_id[7] = 'change_tariff';

function change_tariff (arg1, ari, channel, event, db_connection, logger) {

channel.on('ChannelDtmfReceived', dtmfReceived);
	var channel_hung_up = 0;

console.log("AAAAA!");

	function dtmfReceived (event, channel) {

console.log("BBBBB");
	var digit = event.digit;
	console.log(digit);	
	var query = "UPDATE billing_info SET current_tariff=" + digit + " WHERE subscriber=?";

        db_connection.query(query, [channel.caller.number], function (err, result) {
        	if (err) {
            	logger.error(err.message);
            	throw err;
        	}

	ari.channels.continueInDialplan({channelId: channel.id})
	channel_hung_up = 1;
    	});
	}

	ari.channels.get(
  	{channelId: channel.id},
  	function (err, channel) {}
);
	
	setTimeout(function (){ 
	
		if ( channel_hung_up === 0){
		ari.channels.continueInDialplan({channelId: channel.id});
		} 
	}, 20000);
}


module.exports = function(module_holder) {
    // the key in this dictionary can be whatever you want
    // just make sure it won't override other modules
    module_holder['change_tariff'] = change_tariff;
};
