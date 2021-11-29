mysql =  require('mysql');


    
    con = mysql.createConnection({
    host:"recoadventureserver.000webhostapp.com",
    user:"id17944597_recoserveruser",
    password:"<4EZA-KMSs>kFdA#",
    database:"id17944597_recoserver",


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