import { Request, Response } from "express";
import UsuarioPrivateDao from "../dao/UsuarioPrivadoDao";

class UsuarioPrivadoControlador extends UsuarioPrivateDao {
  public cantidadEnPerfil(req: Request, res: Response){
    UsuarioPrivadoControlador.cantidadUsuariosEnPerfil(req.params.codPerfil, res);
  }

  public consultarUnUsuario(req: Request, res: Response){
    UsuarioPrivadoControlador.obtenerUnUsuario(req.params.id,res)
  }

  public encontrar(req: Request, res: Response) {
    UsuarioPrivadoControlador.encontrarUsuario(res);
  }

  public crear(req: Request, res: Response) {
    const correoUsuario={correoUsuario:req.body.correoUsuario}
    UsuarioPrivadoControlador.crearUsuario(correoUsuario,req.body, res);
  }

  public eliminar(req: Request, res: Response) {
    UsuarioPrivadoControlador.eliminarUsuario(req.params.id, res);
  }

  public actualizar(req: Request, res: Response) {
    UsuarioPrivadoControlador.actualizarUsuario(req.params.id,req.body, res);
  }
}

const usuarioPrivadoControlador = new UsuarioPrivadoControlador();
export default usuarioPrivadoControlador;
