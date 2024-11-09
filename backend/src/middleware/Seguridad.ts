import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Seguridad {
  public analizarToken(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        try {
            const llave = String(process.env.SECRET_KEY);
            const token = req.headers.authorization?.split(" ")[1] as string;
            const infoUsuario = jwt.verify(token,llave);
            req.body.datosUsuarios = infoUsuario;
            next();
        } catch (error) {
            res.status(401).json({
                respuesta: "El Token no es correcto.",
              });
        }
    } else {
      res.status(401).json({
        respuesta: "No posee un Token.",
      });
    }
  }
}

const seguridad = new Seguridad();
export default seguridad;
