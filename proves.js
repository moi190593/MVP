let password=""
const MIDA = 12
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
console.log("password: "+password)
console.log(password.length)

//let password = "123abg789zxc"//req.body.password
let salidaEncriptada = ""
let saltos = 4
let fila = password.length/saltos

let arrayPassword = [
    ['','','',''],
    ['','','',''],
    ['','','','']
];

//Añade caracter por caracter de la contraseña al array multidimensional
for(i = 0; i < arrayPassword.length ; i++){        
    for(j = 0; j < saltos ; j++){
        //if(password.length()==0) break;
        arrayPassword[i][j] = password.charAt(0);
        password = password.substring(1);
    }
}

console.log(arrayPassword)

//Encripta la contraseña 
for(i = 0 ; i < arrayPassword.length + 1; i++){
    for(j = 0 ; j < arrayPassword.length ; j++){
        salidaEncriptada = salidaEncriptada + arrayPassword[j][i];
    }
}

password = salidaEncriptada
console.log("Password encriptado: "+password)
console.log(password.length)
