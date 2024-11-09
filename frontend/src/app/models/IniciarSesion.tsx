class IniciarSesion {
    public codUsuario: string;
    public correo: string;
    public nombrePerfil: string;
    public nombre:string;

    constructor(cod: string, cor:string, per: string,nomb:string){
        this.codUsuario = cod;
        this.correo = cor;
        this.nombrePerfil = per;
        this.nombre = nomb;
    }
}

export default IniciarSesion;