import UsuarioEntidad from "./UsuarioEntidad";

class TareaEntidad {
  public titulo: string;
  public descripcion: string;
  public fechaCreacion: Date;
  public fechaVencimiento: Date;
  public estado: number;
  public prioridad: number;
  public color: string;
  public codUsuario: UsuarioEntidad

  constructor(
    titulo: string,
    descripcion: string,
    fechaCreacion: Date,
    fechaVencimiento: Date,
    estado: number,
    prioridad: number,
    color:string,
    codUsuario:UsuarioEntidad
  ) {
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

export default TareaEntidad;
