import Usuario from "./Usuario";

class Tarea {
    public _id: string
    public titulo: string;
    public descripcion: string;
    public fechaCreacion: Date;
    public fechaVencimiento: Date;
    public estado: number;
    public prioridad: number;
    public color: string;
    public codUsuario: Usuario;

    constructor(
        id:string,
        titulo: string,
        descripcion: string,
        fechaCreacion: Date,
        fechaVencimiento: Date,
        estado: number,
        prioridad: number,
        color:string,
        codUsuario:Usuario
      ) {
        this._id = id
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.fechaVencimiento = fechaVencimiento;
        this.estado = estado;
        this.prioridad = prioridad;
        this.color = color;
        this.codUsuario = codUsuario;
      }
}

export default Tarea;