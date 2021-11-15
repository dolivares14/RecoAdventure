var express = require("express");
var bodyParser=require("body-parser");
var aws= require("aws-sdk");
var fs = require('fs');
var fileUpload = require("express-fileupload");




mysql =  require('mysql');  
con = mysql.createConnection({
    host:"fdb28.awardspace.net",
    user:"3514550_3514550",
    password:"2015mericista",
    database:"3514550_3514550"

    });



var dbcon= require("./dbconnection");




var app= express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,parameterLimit: 100000,
    limit: '10mb'
}));








app.post("/playerlist",(req,res)=>{
    idplayer=req.body.idplayer
    scoretype=req.body.scoretype;
    sql="Select username, "+scoretype+" from players order by "+scoretype+" desc";
    con.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error");
        }
        var data=[];
        for (var i =0 - 1; i <=results.length; i++) {
            var alreadyinsertedid=false;
            if(i<10){
                data.push(results[i]);

                if(results.id_player==idplayer){
                    alreadyinsertedid=true;
                }

            }else if(!alreadyinsertedid){
                if(results.id_player==idplayer){
                    data.push(results[i]);
                    alreadyinsertedid=true;
                }
            }
        }
        res.json(data);
    })
    
})





//funcion ingresar nuevo usuario
app.post("/newuser",(req,res)=>{
    hash=req.body.playerhash;
    username=req.body.username;
    sql="Insert into players(username,playerhash) values('"+username+"','"+hash+"')";
    con.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error");
        }else{
                res.send(results);
            }
        
    })
})





app.post("/UpdateUser",(req,res)=>{
    var hash=req.body.playerhash;
    var username=req.body.username;
    var scoreall=parseFloat(req.body.scoreall);
    var scoremulti=parseFloat(req.body.scorenormal);
    var scoreeasy=parseFloat(req.body.scoreeasy);
    var scorehard=parseFloat(req.body.scorehard);
    var timessolo=parseInt(req.body.TimesPlayed);
    sql="Update players SET username='"+username+"', playercountsolo="+timessolo+",";
    sql+=" highscoreeasy="+scoreeasy+",highscoresolo="+scoreall+", highscorenormal="+scoremulti+",highscorehard="+scorehard+" WHERE playerhash='"+hash+"'";
    con.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error");
        }else{
                res.send(results);
            }
        
    })
})






// buscar usuario en la base de datos
app.post("/login",(req,res)=>{
    var hash=req.body.playerhash;
    sql="SELECT * FROM `players` WHERE playerhash= "+mysql.escape(hash);
    con.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error");
        }else if(results.length<=0){
           
            res.send(false); 
        }else{
            res.json(results);
        }
    })
})






app.post("/insertNewObject",(req,res)=>{
   
    sql="Insert INTO elementos(name,difficulty,category) values('"+req.body.name+"','"+req.body.difficulty+"','"+req.body.category+"')";
    con.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error");
        }      
        res.redirect("/InsertObjects");
    })
})






app.post("/ToSearch",(req,res)=>{
    var sql="";
    if(req.body.difficulty=="all")
        sql="Select * from elementos";
    else if(req.body.difficulty=="easy")
        sql="Select * from elementos where difficulty='Easy'";
    else if(req.body.difficulty=="normal")
        sql="Select * from elementos where difficulty='normal'";
    else if(req.body.difficulty=="hard")
        sql="Select * from elementos where difficulty IN('hard','VeryHard')";
    con.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error");
        }      
        res.json(results);
    })
})






app.get("/InsertObjects",(req,res)=>{
    sql="Select * from elementos";
    con.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Ocurrio el siguiente error"+err);
        }      
        let pagina='<!DOCTYPE html><html><head><title>Insertar objetos a buscar</title>';
        pagina+='<meta charset=utf-8><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">';
        pagina+='<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script></head>';
        pagina+='<body><div class="container"><h1>Insertar un nuevo objeto</h1><form action="insertNewObject" method="POST"><div class="form-group">';
        pagina+='<label for="name" >Nombre</label><input type="text" name="name"></div><div class="form-group"><label for="difficulty" >Dificultad</label><select name="difficulty"><option value="Easy">Facil</option><option value="normal">Normal</option><option value="hard">Dificil</option><option value="VeryHard">Muy dificil</option></select></div>';
        pagina+='<div class="form-group"><label for="category" >Categoria</label><select name="category"><option value="Comida">Comida</option><option value="Limpieza">Limpieza</option>';
        pagina+= '<option value="Tecnologia">Tecnologia</option><option value="Utensilios">Utensilios</option><option value="Herramientas">Herramientas</option><option value="Muebles">Muebles</option><option value="Juguetes">Juguetes</option><option value="Transporte">Transporte</option></select>';
        pagina+='</div><input type="submit" name="bot" class="button"></form ><br><form action="/rekog"><input type="submit" name="bot2" value="Añadir tags a objetos existentes" class="button"></form><br><div><table class="table table-striped"><thead><th>N°</th><th>Nombre</th><th>Dificultad</th><th>Categoria</th></thead><tbody>';
        for (var i =0; i<results.length; i++) {
            pagina+='<tr><td>'+results[i].id_elem+'</td><td>'+results[i].name+'</td><td>'+results[i].difficulty+'</td><td>'+results[i].category+'</td></tr>';
        }
        pagina+='</tbody></table></div></div></body></html>';
        res.send(pagina);
    })
})







app.get("/rekog",(req,res)=>{
    
    sql= "SELECT name,id_elem from elementos";
    con.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Ocurrio el siguiente error"+err);
        }else{
            let pagina="";
            pagina+='<!DOCTYPE html><html><head><title>Prueba recog</title></head><body>';
            pagina+='<form action="AddTagstoElement" encType="multipart/form-data" method="POST"><select name="element">'
            for (var i = 0; i < results.length; i++) {
               pagina+='<option value='+results[i].id_elem+'>'+results[i].name+'</option>';
            }
            
            pagina+='</select><input type="file" name="ImgData"><input type="submit" name="Probar"></form>'
            pagina+='</body></html>';
            res.send(pagina); 
        }
    })
})







app.post("/AWScheck",(req,res)=>{
    
    aws.config.update({
        accessKeyId:'AKIA2RSV6BMUXBONFSVQ',
        secretAccessKey:'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',
        region:'us-east-2'
    })
    let buff = new Buffer(req.body.ImgData, 'base64');
    var params={
        "Image":{
            "Bytes":buff
        },
        "MaxLabels":10,
        "MinConfidence":50
    }
    
    const Rekognition= new aws.Rekognition();
    Rekognition.detectLabels(params,function(err,Tags){
        if(err)res.send("Error");
        else{
            var tagnames=[];
            for (var i=0;i<Tags.Labels.length;i++) {
                tagnames.push({"name":Tags.Labels[i].Name});
            }
            var arr = tagnames.map( function(el) { return el.name; });
            sql="Select name_tag from tag WHERE id_elems="+req.body.element+" AND name_tag IN ("+ con.escape(arr)+")";
            con.query(sql,(err,results)=>{
            if(err){
                console.log("Hubo el siguiente error: "+err);
                res.send("Ocurrio el siguiente error"+err);
            }
            if(results.length<=0) res.send(false);

            else res.send(true);    

            })
        };
    })

})





app.post("/AddTagsToElement",(req,res)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    uploadPath = __dirname + '/uploads/' + req.files.ImgData;
    var elemento=req.body.element;
    req.files.ImgData.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }else{
       var file = base64_encode(uploadPath);
        aws.config.update({
            accessKeyId:'AKIA2RSV6BMUXBONFSVQ',
            secretAccessKey:'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',
            region:'us-east-2'
        })  
        var rekognition = new aws.Rekognition();
        var params = {
          Image: {
          Bytes: file
        },
        };
        rekognition.detectLabels(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {

           let pagina="";
           pagina+='<!DOCTYPE html><html><head><title>Insertar objetos a buscar</title><meta charset="utf-8">'
           pagina+='<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">'
           pagina+='<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>'
           pagina+='</head><body><div class="container"><h1>Tags resultados de elemento</h1><form action="Addlabels" method="POST"><input type="hidden" value="'+req.body.element+'" name="ElementID"><div class="form-group">';
           for(var i=0;i<data.Labels.length;i++){
               pagina+='<label><input type="checkbox" value="'+data.Labels[i].Name+'"name="Label'+i+'">  '+data.Labels[i].Name+'---'+data.Labels[i].Confidence+'</label><br>';
           }
           pagina+='</div><input type="submit" name="bot"  class="button"></form ></div></body></html>';
           res.send(pagina);
          }
        });
    }
})
    
})


app.post("/Addlabels",(req,res)=>{

    var elementoID=req.body.ElementID;
    var bot = req.body.bot;

    for(inp in req.body){
        if(req.body[inp]!=elementoID && req.body[inp]!=bot){

            sql="Insert into tag(id_elems,name_tag) values("+elementoID+",'"+req.body[inp]+"')";
            con.query(sql,(err,results)=>{
            if(err)console.log(err,err.stack);
            
            })
        }
        
    }

    res.redirect("/InsertObjects");
})





// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    let buff = new Buffer(bitmap).toString('base64')

    return new Buffer(buff, 'base64');
}



app.listen(8000);