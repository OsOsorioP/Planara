import Perfil from "./Perfil";

class Usuario {
    public _id: string;
    public nombreUsuario: string;
    public correoUsuario: string;
    public claveUsuario: string;
    public fecha: Date;
    public nombreImagenUsuario: string;
    public avatarUsuario: string;
    public codPerfil: Perfil;

    constructor(id: string, nomu: string, corr: string, clav: string, fech: Date, nomi: string, avat: string, codp: Perfil) {
        this._id = id;
        this.nombreUsuario = nomu;
        this.correoUsuario = corr;
        this.claveUsuario = clav;
        this.fecha = fech;
        this.nombreImagenUsuario = nomi;
        this.avatarUsuario = avat;
        this.codPerfil = codp;
    }
}

export default Usuario;