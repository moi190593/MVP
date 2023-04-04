const express = require('express');
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const app = express();

const MIDA = 10;
const PORT = 3000;

app.listen (PORT, ()=>{
    console.log("Web Server Running ["+PORT+"]");
});

app.use(cors({ 
    credentials: true,
    origin: function(origin, callback){
        return callback(null, true)
    }
}));

app.post("/generatePWD", (req,res) =>{
    req.body.nombredelavariable
    console.log("Entro al server")
    let password = null;
    console.log(String.fromCharCode(65,66,67,105))
   /* for (i=0; i < MIDA; i++){
        if(i < MIDA/2){
            numRandom = Math.floor(Math.random() * 9);

            password = password + numRandom
        }else{          
            letrarandom
            password
        }
    }*/
    password = "AbC123+-"
    res.send(JSON.stringify(password)) 
})