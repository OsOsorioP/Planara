import { FC, useState } from "react";
import { jwtDecode } from "jwt-decode";
import IniciarSesion from "../models/IniciarSesion";
import { propSesion } from "../models/Interfaces";
import { ContextoUsuario } from "./ContextoUsuario";

const UsuarioSesion: FC<propSesion> = ({ children }) => {
    let usuarioCargado = new IniciarSesion("", "", "","");
    const actualizar = (objUsuario: IniciarSesion) => { setAutenticado(objUsuario) }

    if (localStorage.getItem("token")) {
        const elToken = String(localStorage.getItem("token"));
        try {
            const objJWTRecibido: any = jwtDecode(elToken);
            usuarioCargado = new IniciarSesion(objJWTRecibido.codUsuario, objJWTRecibido.correo, objJWTRecibido.perfil, objJWTRecibido.nombre)
        } catch (error) {
            console.log("Error")
        }
    }
    const [autenticado, setAutenticado] = useState<IniciarSesion>(usuarioCargado)

    return (
        <ContextoUsuario.Provider value={{ autenticado, actualizar }}>
            {children}
        </ContextoUsuario.Provider>
    )
}

export default UsuarioSesion