import { Router } from "express";
import usuarioPrivadoControlador from "../controllers/UsuarioPrivadoControlador";

class UsuarioRoute {
  public rutaApi: Router;
  constructor() {
    this.rutaApi = Router();
    this.configuracionRuta();
  }
  public configuracionRuta() {
    this.rutaApi.get(
      "/cantxperfiles/:codPerfil",
      usuarioPrivadoControlador.cantidadEnPerfil
    );
    this.rutaApi.post("/crear", usuarioPrivadoControlador.crear);
    this.rutaApi.delete("/eliminar/:id", usuarioPrivadoControlador.eliminar);
    this.rutaApi.put("/actualizar/:id", usuarioPrivadoControlador.actualizar);
    this.rutaApi.get("/todos", usuarioPrivadoControlador.encontrar);
    this.rutaApi.get("/uno/:id",usuarioPrivadoControlador.consultarUnUsuario);
  }
}

const usuarioRoute = new UsuarioRoute();
export default usuarioRoute.rutaApi;
