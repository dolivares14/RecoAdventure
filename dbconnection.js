mysql =  require('mysql');


    
    con = mysql.createConnection({
    host:"sql5.freemysqlhosting.net",
    user:"sql5451190",
    password:"lZxDMxgH24",
    database:"sql5451190",


    });


    function  searchquery(sql){
            con.query(sql,function(errquery,result,fields){
            if (errquery){
            	console.log("Hubo un error al realizar el query: "+errquery);
            };
            console.log(results)
            return result; 
        })
    }

     function terminateconnect(){
    	con.end(function(err){
                if (err){
                	console.log("Hubo un error al terminar la conexion:" +err);
                }
         })
    }
exports.searchquery= searchquery;
// exports.terminateconnect= terminateconnect; 