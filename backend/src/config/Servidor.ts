import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import db from "./db";
import apiUsuarioRuta from "../routes/UsuarioRuta";
import seguridad from "../middleware/Seguridad";
import apiPerfilRuta from "../routes/PerfilRuta";
import apiUsuarioPrivadoRuta from "../routes/UsuarioPrivadoRuta";
import apiTareaPrivadoRuta from "../routes/TareaPrivadoRuta";

class Servidor {
  public app: express.Application;

  constructor() {
    dotenv.config({ path: ".env" });
    db();
    this.app = express();
    this.iniciarConfiguracion();
    this.iniciarRutas();
  }

  public iniciarConfiguracion() {
    this.app.set("PORT", process.env.PORT);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50MB" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  public iniciarRutas() {
    this.app.use("/api/publica/usuario", apiUsuarioRuta);

    this.app.use(
      "/api/privada/usuario",
      seguridad.analizarToken,
      apiUsuarioPrivadoRuta
    );

    this.app.use("/api/privada/perfil", seguridad.analizarToken, apiPerfilRuta);

    this.app.use("/api/privada/tarea", seguridad.analizarToken, apiTareaPrivadoRuta);
  }

  public iniciarServidor() {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("Servidor funcionando en el puerto: ", this.app.get("PORT"));
    });
  }
}

export default Servidor;
