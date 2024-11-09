import { Request, Response } from "express";
import TareaDao from "../dao/TareaPrivadoDao";

class TareaControlador extends TareaDao {
  public crearTarea(req: Request, res: Response) {
    TareaControlador.crearTarea(req.body, res);
  }

  public obtenerTarea(req: Request, res: Response) {
    TareaControlador.obtenerTarea(req.params.id, res);
  }

  public actualizarTarea(req: Request, res: Response) {
    TareaControlador.actualizarTarea(req.params.id, req.body, res);
  }

  public borrarTarea(req: Request, res: Response) {
    TareaControlador.borrarTarea(req.params.id, res);
  }

  public obtenerTareas(req: Request, res: Response) {
    TareaControlador.obtenerTareas(req.body,res);
  }
}

const tareaControlador = new TareaControlador();
export default tareaControlador;
