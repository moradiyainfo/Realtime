var get_result = function (callback) {

    pool.getConnection(function (err, con) {
        if (err) {
            callback(false, null);
            return;
        }
        con.query("SELECT `id`,`lat`,`long` FROM `loc`", function (err, rows) {

            if (!err) {
                callback(true, rows);
            }
        });

        con.on('error', function (err) {
            callback(false, null);
            return;
        });
    });

}