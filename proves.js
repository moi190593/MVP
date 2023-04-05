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
console.log(password)
