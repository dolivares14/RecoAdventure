mysql =  require('mysql');


    
    con = mysql.createConnection({
    host:"sql10.freesqldatabase.com",
    user:"sql10456973",
    password:"WFwlDFEIk8",
    database:"sql10456973",



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