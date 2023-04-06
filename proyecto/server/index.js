const express = require('express');
const cors = require("cors");
const fs = require('fs');
const app = express();
const readline = require('readline');
const MIDA = 12;
const PORT = 3000;


app.listen (PORT, ()=>{
    console.log("Web Server Running ["+PORT+"]");
});

app.use(cors({ 
    credentials: true,
    origin: function(callback){
        return callback(null, true)
    }
}));

app.use(express.json());

//funcion solo para generar el pwd
app.post("/generatePWD", (res) =>{
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
    res.send(JSON.stringify(password)) 
})

//funcion para encriptar y almacenar en un fichero el pwd
app.post("/savePWD", (req,res) =>{
    let salidaEncriptada = ""
    let saltos = 4
    let password = req.body.password
    let data
    let arrayPassword = [
        ['','','',''],
        ['','','',''],
        ['','','','']
    ];

    //Añade caracter por caracter de la contraseña al array multidimensional
    for(i = 0; i < arrayPassword.length ; i++){        
        for(j = 0; j < saltos ; j++){
            arrayPassword[i][j] = password.charAt(0);
            password = password.substring(1);
        }
    }

    //Encripta la contraseña 
    for(i = 0 ; i < arrayPassword.length + 1; i++){
        for(j = 0 ; j < arrayPassword.length ; j++){
            salidaEncriptada = salidaEncriptada + arrayPassword[j][i];
        }
    }

    if(req.body.clave == ""){
        data = req.body.username + " - " + salidaEncriptada + "\n"
    } else {
        data = req.body.username + " - " + req.body.clave + " - " + salidaEncriptada + "\n"
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
    const readLength = 12;

    const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
    });
    rl.on('line', (line) => {
        const last12Chars = line.slice(-readLength); //Esto obtiene los 12 ultimos caracteres de la linea, lo que hay que desencripitar
        
        if (line.includes(req.body.username)) {
            result.push(line);
        }
        });
    rl.on('close', () => {
        console.log(result)
        res.send(JSON.stringify(result))
    });
})