import { Router } from "express";
import perfilControlador from "../controllers/PerfilControlador";

class PerfilRuta {
  public rutaApi: Router;
  constructor() {
    this.rutaApi = Router();
    this.configuracionRuta();
  }
  public configuracionRuta() {
    this.rutaApi.post("/crear", perfilControlador.crear);
    this.rutaApi.get("/todos", perfilControlador.consulta);
    this.rutaApi.get("/uno/:id", perfilControlador.consultarUno);
    this.rutaApi.delete("/eliminar/:id", perfilControlador.eliminar);
    this.rutaApi.put("/actualizar/:id", perfilControlador.actualizar);
  }
}

const perfilRuta = new PerfilRuta();
export default perfilRuta.rutaApi;
