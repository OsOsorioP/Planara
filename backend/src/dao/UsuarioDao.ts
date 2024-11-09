import { Response } from "express";
import UsuarioEsquema from "../schemas/UsuarioEsquema";
import cifrar from "bcryptjs";
import jwt from "jsonwebtoken";
import PerfilEsquema from "../schemas/PerfilEsquema";

class UsuarioDao {
  protected static async iniciarSesion(
    param: any,
    res: Response
  ): Promise<any> {
    try {
      const { correoUsuario, claveUsuario } = param;

      const usuario = await UsuarioEsquema.findOne({ correoUsuario })
        .populate({ path: "codPerfil", select: "nombrePerfil" })
        .populate({ path: "nombreUsuario"})
        .exec();

      if (!usuario) {
        return res.status(400).json({ respuesta: "Credenciales incorrectas" });
      }

      const claveCorrecta = cifrar.compareSync(
        claveUsuario,
        usuario.claveUsuario
      );

      if (!claveCorrecta) {
        return res.status(400).json({ respuesta: "Credenciales incorrectas" });
      }

      const datosVisibles = {
        codUsuario: usuario._id,
        correo: correoUsuario,
        perfil: usuario.codPerfil.nombrePerfil,
        nombre: usuario.nombreUsuario
      };

      const llavePrivada = String(process.env.SECRET_KEY);
      const token = jwt.sign(datosVisibles, llavePrivada, {
        expiresIn: 86400,
      });

      return res
        .status(200)
        .json({ token: token, avatar: usuario.avatarUsuario });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return res.status(500).json({ respuesta: "Error interno del servidor" });
    }
  }

  protected static async crearUsuario(
    correo: any,
    param: any,
    res: Response
  ): Promise<any> {
    try {
      const nombrePerfilPorDefecto = String(process.env.PERFIL_USUARIO_EXTERNO);
      const jsonPerfil = { nombrePerfil: nombrePerfilPorDefecto };
      const existePerfil = await PerfilEsquema.findOne(jsonPerfil).exec();
      if (existePerfil) {
        param.codPerfil = existePerfil._id;
      } else {
        const objPerfil = new PerfilEsquema(jsonPerfil);
        objPerfil.save();
        param.codPerfil = objPerfil._id;
      }

      const existe = await UsuarioEsquema.findOne(correo).exec();
      if (existe) {
        res.status(400).json({ respuesta: "El correo ya existe" });
      } else {
        param.claveUsuario = cifrar.hashSync(param.claveUsuario, 10);
        const objUsuario = new UsuarioEsquema(param);
        const miObjeto = await objUsuario.save();
        const data = {
          id: miObjeto._id,
          correo: param.correoUsuario,
          perfil: nombrePerfilPorDefecto,
        };
        const key = String(process.env.SECRET_KEY);
        const token = jwt.sign(data, key, { expiresIn: 86400 });
        res.status(200).json({
          respuesta: "El usuario fue creado",
          codigo: miObjeto._id,
          token: token,
        });
      }
    } catch (miError) {
      res
        .status(400)
        .json({ respuesta: "El usuario no se pudo crear", error: miError });
    }
  }
}

export default UsuarioDao;
