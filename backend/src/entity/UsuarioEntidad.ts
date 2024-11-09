import PerfilEntidad from "./PerfilEntidad";

class UsuarioEntidad {
  public nombreUsuario: string;
  public correoUsuario: string;
  public claveUsuario: string;
  public fecha: Date;
  public nombreImagenUsuario: string;
  public avatarUsuario: string;
  public codPerfil: PerfilEntidad;

  constructor( nomu: string, coru: string, clau: string, fech: Date, imgu: string, avtu: string, cper: PerfilEntidad ) {
    this.nombreUsuario = nomu;
    this.correoUsuario = coru;
    this.claveUsuario = clau;
    this.fecha = fech;
    this.nombreImagenUsuario = imgu;
    this.avatarUsuario = avtu;
    this.codPerfil = cper;
  }
}

export default UsuarioEntidad;
