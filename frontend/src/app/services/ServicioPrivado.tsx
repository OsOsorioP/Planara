import Api from "../utils/domains/Api";

class ServicioPrivado {
    public static async peticionGET(urlServicio: string) {
        const bearer = "Bearer " + String(localStorage.getItem("token"));

        const datosEnviar = {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                authorization: bearer,
            }
        };

        const urlBackend = Api.URL + urlServicio;
        const Respuesta = fetch(urlBackend, datosEnviar)
            .then((respuesta) => respuesta.json())
            .then((misDatos) => { return misDatos; })
            .catch((miError) => { return miError; });

        return Respuesta;
    };

    public static async peticionPOST(urlServicio: string, miObjetoJson: any) {
        const bearer = "Bearer " + String(localStorage.getItem("token"));

        const datosEnviar = {
            method: "POST",
            body: JSON.stringify(miObjetoJson),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                authorization: bearer,
            }
        };

        const urlBackend = Api.URL + urlServicio;
        try {
            const respuesta = await fetch(urlBackend, datosEnviar);
            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            }
            const misDatos = await respuesta.json();
            return misDatos;
        } catch (error) {
            return { error: error || "Error desconocido" };
        }
    };

    public static async peticionDELETE(urlServicio: string) {
        const bearer = "Bearer " + String(localStorage.getItem("token"));

        const datosEnviar = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                authorization: bearer,
            }
        };

        const urlBackend = Api.URL + urlServicio;
        const Respuesta = fetch(urlBackend, datosEnviar)
            .then((respuesta) => respuesta.json())
            .then((misDatos) => { return misDatos; })
            .catch((miError) => { return miError; });

        return Respuesta;
    };

    public static async peticionPUT(urlServicio: string, miObjetoJson: any) {
        const bearer = "Bearer " + String(localStorage.getItem("token"));

        const datosEnviar = {
            method: "PUT",
            body: JSON.stringify(miObjetoJson),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                authorization: bearer,
            }
        };

        const urlBackend = Api.URL + urlServicio;
        console.log(urlBackend)
        const Respuesta = fetch(urlBackend, datosEnviar)
            .then((respuesta) => respuesta.json())
            .then((misDatos) => { return misDatos; })
            .catch((miError) => { return miError; });

        return Respuesta;
    };
}

export default ServicioPrivado;