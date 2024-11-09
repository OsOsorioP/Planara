import { Response } from "express";
import UsuarioEsquema from "../schemas/UsuarioEsquema";
import bcryptjs from "bcryptjs";
import { Types } from "mongoose";

class UsuarioPrivateDao {
  protected static async cantidadUsuariosEnPerfil(
    id: any,
    res: Response
  ): Promise<any> {
    if (Types.ObjectId.isValid(id)) {
      const llave = { _id: id };
      const cantidad = await UsuarioEsquema.countDocuments({
        codPerfil: llave,
      });
      res.status(200).json({ respuesta: cantidad });
    } else {
      res.status(400).json({ respuesta: "Identificador incorrecto" });
    }
  }

  protected static async encontrarUsuario(res: Response): Promise<any> {
    try {
      const data = await UsuarioEsquema.find()
        .sort({ _id: -1 })
        .populate("codPerfil")
        .exec();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: "Error al obtener los usuarios" });
    }
  }

  protected static async obtenerUnUsuario(
    id: any,
    res: Response
  ): Promise<any> {
    try {
      const jsonUsuario = { _id: id };
      const usuario = await UsuarioEsquema.findById(jsonUsuario)
        .populate("codPerfil")
        .exec();

      if (!usuario) {
        return res
          .status(404)
          .json({ respuesta: "El usuario no existe con ese id" });
      }
      return res.status(200).json(usuario);
    } catch (error) {
      return res
        .status(500)
        .json({ respuesta: "Error al obtener el perfil", error: error });
    }
  }

  protected static async obtenerUsuariosPerfil(
    id: any,
    res: Response
  ): Promise<any> {
    try {
      const usuarios = await UsuarioEsquema.find({ codPerfil: id })
        .sort({ _id: -1 })
        .populate({ path: "codPerfil", select: "nombrePerfil" })
        .exec();

      if (!usuarios) {
        return res.status(404).json({respuesta: "Error, usuarios no encontrados"});
      }

      return res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ respuesta: "Error en la consulta",Error:error });
    }
  }

  protected static async crearUsuario(
    correo: any,
    param: any,
    res: Response
  ): Promise<any> {
    try {
      const nom = param.nombreImagenUsuario;
      delete param._id;
      delete param.datosUsuario;
      param.nombreImagenUsuario = nom.substring(nom.lastIndexOf("\\") + 1);

      const existe = await UsuarioEsquema.findOne(correo).exec();

      if (existe) {
        return res.status(400).json({ respuesta: "El correo ya existe" });
      } else {
        param.claveUsuario = bcryptjs.hashSync(param.claveUsuario, 10);
        const objUsuario = new UsuarioEsquema(param);
        const miObjeto = await objUsuario.save();
        return res.status(200).json({
          respuesta: "El usuario fue creado",
          id: miObjeto._id,
        });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ respuesta: "Error al crear el usuario", error: error });
    }
  }

  protected static async eliminarUsuario(id: any, res: Response): Promise<any> {
    try {
      const existe = await UsuarioEsquema.findById(id).exec();
      if (existe) {
        const miObjeto = await UsuarioEsquema.findByIdAndDelete(id).exec();
        res.status(200).json({
          respuesta: "Usuario eliminado correctamente",
          eliminado: miObjeto,
        });
      } else {
        res.status(400).json({
          respuesta: "No se puede eliminar el Usuario porque no existe",
        });
      }
    } catch (miError) {
      res.status(400).json({
        respuesta: "No se puede eliminar el Usuario...",
        error: miError,
      });
    }
  }

  protected static async actualizarUsuario(
    id: any,
    param: any,
    res: Response
  ): Promise<any> {
    try {
      console.log(param)
      const existe = await UsuarioEsquema.findById(id).exec();
      if (existe) {
        const miObjeto = await UsuarioEsquema.findByIdAndUpdate(
          { _id: id },
          { $set: param }
        ).exec();
        res.status(200).json({
          respuesta: "Usuario actualizado correctamente",
          antes: existe,
          despues: miObjeto,
        });
      } else {
        res.status(400).json({
          respuesta: "No se puede actualizar el Usuario porque no existe",
        });
      }
    } catch (miError) {
      res.status(500).json({
        respuesta: "No se puede actualizar el Usuario...",
        error: miError,
      });
    }
  }
}

export default UsuarioPrivateDao;
