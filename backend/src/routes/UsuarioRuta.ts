import { Router } from "express";
import usuarioControlador from "../controllers/UsuarioControlador";

class UsuarioRuta {
  public rutaApi: Router;
  constructor() {
    this.rutaApi = Router();
    this.configuracionRuta();
  }
  public configuracionRuta() {

    this.rutaApi.post("/crear", usuarioControlador.crear);
    this.rutaApi.post("/iniciar", usuarioControlador.iniciar);

  }
}

const usuarioRuta = new UsuarioRuta();
export default usuarioRuta.rutaApi;
