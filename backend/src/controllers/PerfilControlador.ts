import { Request, Response } from "express";
import PerfilDao from "../dao/PerfilDao";

class PerfilControlador extends PerfilDao {
  public consulta(req: Request, res: Response): void {
    PerfilControlador.obtenerPerfiles(res);
  }

  public crear(req: Request, res: Response): void {
    PerfilControlador.crearPerfil(req.body, res);
  }

  public eliminar(req: Request, res: Response): void {
    PerfilControlador.eliminarPerfil(req.params.id, res);
  }

  public actualizar(req: Request, res: Response): void {
    PerfilControlador.actualizarPerfil(req.params.id, req.body, res);
  }

  public consultarUno(req: Request, res: Response): void {
    PerfilControlador.obtenerUnPerfil(req.params.id, res);
  }
}

const perfilControlador = new PerfilControlador();
export default perfilControlador;
