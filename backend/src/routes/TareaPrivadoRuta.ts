import { Router } from "express";
import tareaControlador from "../controllers/TareaPrivadoControlador";

class TareaRuta {
  public rutaApi: Router;
  constructor() {
    this.rutaApi = Router();
    this.configuracionRuta();
  }
  public configuracionRuta() {
    this.rutaApi.post("/crear", tareaControlador.crearTarea);
    this.rutaApi.post("/todos", tareaControlador.obtenerTareas);
    this.rutaApi.get("/uno/:id", tareaControlador.obtenerTarea);
    this.rutaApi.delete("/eliminar/:id", tareaControlador.borrarTarea);
    this.rutaApi.put("/actualizar/:id", tareaControlador.actualizarTarea);
  }
}

const tareaRuta = new TareaRuta();
export default tareaRuta.rutaApi;