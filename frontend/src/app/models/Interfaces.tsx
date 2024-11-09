import IniciarSesion from "./IniciarSesion";

export interface propSesion { children: React.ReactNode }

export type propUsuario = { autenticado: IniciarSesion; actualizar: (usu: IniciarSesion) => void }