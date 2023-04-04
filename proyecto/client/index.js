const app = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data: {
        pwd: ""
    },
    methods: {
        generatePWD: function() {
            console.log("Entro al client")
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
                console.log("Recibo respuesta del server")
                console.log("DATA: " + data)
                this.pwd = data
            }).catch((error) => {
                console.log(error)
            });
        }
    }
});