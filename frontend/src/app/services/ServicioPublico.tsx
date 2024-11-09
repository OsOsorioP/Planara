import Api from "../utils/domains/Api";

class ServicioPublico {
    public static async crearUsuario(miObjetoJson: any) {
        const datosEnvio = {
            method: "POST",
            body: JSON.stringify(miObjetoJson),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        };
        const urlBackend = Api.URL + Api.CREAR_USUARIO;

        console.log(urlBackend, datosEnvio)

        const Respuesta = fetch(urlBackend, datosEnvio)
            .then((respuesta) => respuesta.json())
            .then((misDatos) => { return misDatos; })
            .catch((miError) => { return {respuesta:"ggg",error:miError}; });

        return Respuesta;
    };

    public static async iniciarSesion(miObjetoJson: any) {
        const datosEnvio = {
            method: "POST",
            body: JSON.stringify(miObjetoJson),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        };
        const urlBackend = Api.URL + Api.INICIAR_SESION;

        const Respuesta = fetch(urlBackend, datosEnvio)
            .then((respuesta) => respuesta.json())
            .then((misDatos) => { return misDatos; })
            .catch((miError) => { return miError; });

        return Respuesta;
    }
}

export default ServicioPublico;