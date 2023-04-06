const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');
const app = express();
const readline = require('readline');
const MIDA = 12;
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

app.use(express.json());

//funcion solo para generar el pwd
app.post("/generatePWD", (req,res) =>{
    console.log("Entro al server")
    let password=""
    for (i=0; i < MIDA; i++){
        let numAscii
        let caracterPassword 
        if(i < 3){
            //letras mayusculas
            numAscii = Math.floor(Math.random() * (90 - 65)+ 65);
        }else if(i>=3 && i<6){          
            //letras minusculas
            numAscii = Math.floor(Math.random() * (122 - 97)+ 97);
        }else if(i>=6 && i<9){          
            //numeros
            numAscii = Math.floor(Math.random() * (57 - 48)+ 48);
        }else{
            //caracter raro
            numAscii = Math.floor(Math.random() * (47 - 33)+ 33);
        }
        caracterPassword= String.fromCharCode(numAscii)
        password = password + caracterPassword
    }
    console.log(password)
    res.send(JSON.stringify(password)) 
})

//funcion para encriptar y almacenar en un fichero el pwd
app.post("/savePWD", (req,res) =>{
    let data
    if(req.body.clave == ""){
        data = req.body.username + " - " + req.body.password + "\n"
    } else {
        data = req.body.username + " - " + req.body.clave + " - " + req.body.password + "\n"
    }
    
    fs.writeFile("passwords.txt", data, { flag: 'a' },(err) => {
        if (err){
          console.log(err);
          res.send("0")
        }
        else {
          res.send("1")
        }
    });
})

//funcion para listar todos los pwd de un usuario
app.post("/listPWD", (req,res) =>{
    result =[]
    
    const fileStream = fs.createReadStream('passwords.txt');

    const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
    });
    rl.on('line', (line) => {
        if (line.includes(req.body.username)) {
            result.push(line);
        }
        });
    rl.on('close', () => {
        console.log(result)
        res.send(JSON.stringify(result))
    });
})