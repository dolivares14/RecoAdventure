mysql =  require('mysql');
require('dotenv').config()


    
    dbcon = mysql.createConnection({
        host:process.env.DBHOST,
        user:process.env.DBUSER,
        password:process.env.DBPASSWORD,
        database:process.env.DBDATABASE,
    });


exports.dbcon= dbcon;
