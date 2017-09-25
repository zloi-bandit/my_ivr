
global.js_func_id[9] = 'say_balance';

function say_balance (arg1, ari, channel, event, db_connection, logger) {

var query = "SELECT balance FROM billing_info WHERE subscriber=?";



        db_connection.query(query, [channel.caller.number], function (err, result) {
        if (err) {
            logger.error(err.message);
            throw err;
        }

var playback = ari.Playback();

	var digits = result[0].balance.toString().split('');

		for (i = 0; i < digits.length; i++){
		
		var arg_sound = "sound:digits/" + digits[i];
		channel.play({media: arg_sound}, playback, function (err, playback) {})
		}

	logger.info(result[0].balance);
    });
}

module.exports = function(module_holder) {
    // the key in this dictionary can be whatever you want
    // just make sure it won't override other modules
    module_holder['say_balance'] = say_balance;
};
