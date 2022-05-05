const express = require("express");
const bodyParser=require("body-parser");
const {aws}= require("./aws-configuration");
const fs = require('fs');
const fileUpload = require("express-fileupload");
const {dbcon} = require("./dbconnection");








const app= express();
app.set('port',  4000);
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,parameterLimit: 100000,
    limit: '10mb'
}));



app.set('views', './views');
app.set('view engine', 'pug');




app.post("/playerlist",(req,res)=>{
    const sql = `Select username, ${mysql.escape(req.body.scoretype)}
                 from players order by ${mysql.escape(req.body.scoretype)} Limit 10 desc`
    dbcon.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error: "+err);
        }
        
        res.json(results);
    })
    
})





//funcion ingresar nuevo usuario
app.post("/newuser",(req,res)=>{
    hash=req.body.playerhash;
    let sql=`Select * from players where username='${mysql.escape(req.body.username)}'`
    
    dbcon.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error"+err);
        }else{
            if(results){
                res.send(false);
            }else{
                sql=`Insert into players(username,playerhash) 
                values('${mysql.escape(req.body.username)}','${mysql.escape(req.body.hash)}')`
                    dbcon.query(sql,(err,results)=>{
                        if(err){
                            console.log("Hubo el siguiente error: "+err);
                            res.send("Error:"+err);
                        }else{
                                res.send(results);
                            }
                        
                    })
            }
        }
    });
    
})





app.post("/UpdateUser",(req,res)=>{
    const hash=req.body.playerhash;
    const username=req.body.username;
    const scoreall=parseFloat(req.body.scoreall);
    const scoremulti=parseFloat(req.body.scorenormal);
    const scoreeasy=parseFloat(req.body.scoreeasy);
    const scorehard=parseFloat(req.body.scorehard);
    const timessolo=parseInt(req.body.TimesPlayed);
    const sql =`Update players SET username='${mysql.escape(username)}',
                playercountsolo=${mysql.escape(timessolo)},
                highscoreeasy=${mysql.escape(scoreeasy)},
                highscoresolo=${mysql.escape(scoreall)},
                highscorenormal=${mysql.escape(scoremulti)},
                highscorehard=${mysql.escape(scorehard)} 
                WHERE playerhash='${mysql.escape(hash)}'`
    
    dbcon.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error:" +err);
        }else{
                res.send(results);
            }
        
    })
})






// buscar usuario en la base de datos
app.post("/login",(req,res)=>{
    const sql = `SELECT * FROM players WHERE playerhash= '${mysql.escape(req.body.hash)}'`
    dbcon.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error:"+err);
        }else if(results.length<=0){
           
            res.send(false); 
        }else{
            res.json(results);
        }
    })
})






app.post("/insertNewObject",(req,res)=>{
    if(!req.body.name||!req.body.category||!req.body.category){
        
        res.redirect("/");
        return null;
    }
   const sql= `Insert INTO elementos(name,difficulty,category)
                values('${req.body.name}','${req.body.difficulty}','${req.body.category}')`
    dbcon.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error");
        }      
        res.redirect("/");
    })
})






app.post("/ToSearch",(req,res)=>{
    const  sql=`Select * from elementos `;
    if(req.body.difficulty=="easy")
        sql+=` where difficulty='Easy'`;
    else if(req.body.difficulty=="normal")
        sql+=` where difficulty='normal'`;
    else if(req.body.difficulty=="hard")
        sql+=` where difficulty= IN ('hard','very hard')`;
    dbcon.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Error");
        }      
        res.json(results);
    })
})






app.get("/",(req,res)=>{
    sql="Select * from elementos";
    dbcon.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Ocurrio el siguiente error"+err);
        }      
        
        res.render('index', { elements:results});
        
    })
})







app.get("/rekog",(req,res)=>{
    
    sql= "SELECT name,id_elem from elementos";
    dbcon.query(sql,(err,results)=>{
        if(err){
            console.log("Hubo el siguiente error: "+err);
            res.send("Ocurrio el siguiente error"+err);
        }else{
            
            res.render('tagSearch',{elements:results})
           
        }
    })
})







app.post("/AWScheck",(req,res)=>{
    
    
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
            const arr =Tags.Labels.map((tag)=>{return tag.name})
            const sql=`Select name_tag from tag WHERE id_elems=${req.body.element} AND name_tag IN (${dbcon.escape(arr)})`
            dbcon.query(sql,(err,results)=>{
            if(err){
                console.log("Hubo el siguiente error: "+err);
                res.send("Ocurrio el siguiente error "+err);
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
    const uploadPath = __dirname + '/uploads/' + req.files.ImgData;
    req.files.ImgData.mv(uploadPath, (err) =>{
        if (err) {
            return res.status(500).send(err);
        }else{
            const file = base64_encode(uploadPath);  
            const rekognition = new aws.Rekognition();
            const params = {
                Image: {
                    Bytes: file
                },
                "MaxLabels":10,
                "MinConfidence":50
            };
            rekognition.detectLabels(params,(err, data) =>{
                if (err) 
                    console.log(err, err.stack); 
                else {
                    
                    res.render('showTags',{elementId:req.body.element,tags:data.Labels})
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
            dbcon.query(sql,(err,results)=>{
            if(err)console.log(err,err.stack);
            
            })
        }
        
    }

    res.redirect("/");
})





// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    let buff = new Buffer(bitmap).toString('base64')

    return new Buffer(buff, 'base64');
}



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});