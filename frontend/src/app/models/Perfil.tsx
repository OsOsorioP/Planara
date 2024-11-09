class Perfil {
    public _id: string;
    public nombrePerfil: string;
    public cantUsuario?: number;

    constructor(id: string, nom: string) {
        this._id = id;
        this.nombrePerfil = nom;
    }
}

export default Perfil;