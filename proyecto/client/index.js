const app = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data: {
        pwd: "",
        passwords: "",
        key: "",
        user: "",
        message: "",
        snackbar: false,
        pantalla1: true,
        pantalla2: false
    },
    methods: {
        generatePWD: function() {
            fetch("http://localhost:3000/generatePWD", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify({})
            }).then(
                (response) =>
                response.json()
            ).then((data) => {
                console.log("DATA: " + data)
                this.pwd = data
            }).catch((error) => {
                console.log(error)
            });
        },
        savePWD: function() {
            if(this.user !="" && this.pwd !=""){
                info = {
                    password: this.pwd,
                    clave: this.key,
                    username: this.user
                }
                fetch("http://localhost:3000/savePWD", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    mode: 'cors',
                    cache: 'default',
                    body: JSON.stringify(info)
                }).then(
                    (response) =>
                    response.json()
                ).then((data) => {
                    console.log("DATA: " + data)
                    if(data == "0"){
                        this.snackbar = true
                        this.message = "La contraseña no ha podido guardarse correctamente"
                    }else if(data == "1"){
                        this.snackbar = true
                        this.message = "Contraseña guardada correctamente!"
                    }
                }).catch((error) => {
                    console.log(error)
                });
            }else{
                if(this.user == ""){
                    this.snackbar = true;
                    this.message = "Necesitamos saber su nombre para vincular la contraseña con usted!"
                }else{
                    this.snackbar = true;
                    this.message = "Necesita crear una contraseña!"
                }      
            }
        },listPWD: function() {
            if(this.user != ""){
                fetch("http://localhost:3000/listPWD", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    mode: 'cors',
                    cache: 'default',
                    body: JSON.stringify({username: this.user})
                }).then(
                    (response) =>
                    response.json()
                ).then((data) => {
                    console.log("DATA: " + data)
                    if(data == "0"){
                        this.snackbar = true
                        this.message = "El nombre no existe en la base de datos"
                    }else{
                        this.pantalla1 = false
                        this.pantalla2 = true
                        this.passwords = data
                    }

                }).catch((error) => {
                    console.log(error)
                });
            }else{
                this.snackbar = true;
                this.message = "Necesitamos saber su nombre para buscar SUS contraseñas!"
            }
            
        }, changeScreen: function(){
            this.pantalla1 = true
            this.pantalla2 = false
        }

    }
});