import { Request, Response } from "express";
import UsuarioDao from "../dao/UsuarioDao";

class UsuarioControlador extends UsuarioDao {

  public iniciar(req: Request, res: Response){
    UsuarioControlador.iniciarSesion(req.body,res);
  }

  public crear(req: Request, res: Response) {
    const correoUsuario={correoUsuario:req.body.correoUsuario}
    UsuarioControlador.crearUsuario(correoUsuario,req.body, res);
  }

}

const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;
