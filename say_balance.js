
global.js_func_id[6] = 'say_balance';

function say_balance (arg1, ari, channel, event, db_connection, logger) {

var query = "SELECT balance FROM billing_info WHERE subscriber=?";

        db_connection.query(query, [channel.caller.number], function (err, result) {
        if (err) {
            logger.error(err.message);
            throw err;
        }


	logger.info(result[0].balance);
    });
}

module.exports = function(module_holder) {
    // the key in this dictionary can be whatever you want
    // just make sure it won't override other modules
    module_holder['say_balance'] = say_balance;
};
