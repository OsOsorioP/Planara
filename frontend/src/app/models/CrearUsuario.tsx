class CrearUsuario {
    public nombreUsuario: string;
    public correoUsuario: string;
    public claveUsuario: string;

    // n = name, e = email, p = password
    constructor(n: string, e: string, p: string) {
        this.nombreUsuario = n;
        this.correoUsuario = e;
        this.claveUsuario = p;
    }
}

export default CrearUsuario;