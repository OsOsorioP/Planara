import { Response } from "express";
import PerfilEsquema from "../schemas/PerfilEsquema";
import UsuarioEsquema from "../schemas/UsuarioEsquema";

class PerfilDao {
  protected static async obtenerUnPerfil(id: any, res: Response): Promise<any> {
    try {
      const jsonPerfil = { _id: id };
      const perfil = await PerfilEsquema.findById(jsonPerfil).exec();

      if (!perfil) {
        return res
          .status(404)
          .json({ respuesta: "El perfil no existe con ese id" });
      }
      return res.status(200).json(perfil);
    } catch (error) {
      return res
        .status(500)
        .json({ respuesta: "Error al obtener el perfil", error: error });
    }
  }

  protected static async obtenerPerfiles(res: Response): Promise<any> {
    try {
      const datos = await PerfilEsquema.aggregate([
        {
          $lookup: {
            from: "Usuario",  // Nombre de la colección en minúsculas y plural
            localField: "_id",
            foreignField: "codPerfil",
            as: "usuarios",  // Nombre consistente para el arreglo resultante
          },
        },
        { 
          $addFields: { cantUsuario: { $size: "$usuarios" } }  // Usando el nombre correcto del campo resultante
        },
      ]).sort({ _id: 1 });
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
  

  protected static async crearPerfil(param: any, res: Response): Promise<any> {
    try {
      delete param._id;
      delete param.datosUsuario;

      const existe = await PerfilEsquema.findOne(param).exec();

      if (existe) {
        return res.status(400).json({ respuesta: "El perfil ya existe" });
      }

      const objPerfil = new PerfilEsquema(param);
      await objPerfil.save();

      return res
        .status(201)
        .json({ respuesta: "El perfil fue creado", id: objPerfil._id });
    } catch (error) {
      return res
        .status(500)
        .json({ respuesta: "Error al crear el Perfil", error: error });
    }
  }

  protected static async eliminarPerfil(
    param: any,
    res: Response
  ): Promise<any> {
    try {
      const llave = { _id: param };
      const cantidad = await UsuarioEsquema.countDocuments({ codPerfil: llave });

      if (cantidad > 0) {
        return res
          .status(400)
          .json({ respuesta: "Error, el perfil tiene usuarios relacionados" });
      }

      const existe = await PerfilEsquema.findById(param).exec();

      if (!existe) {
        return res.status(400).json({ respuesta: "El perfil no existe" });
      }

      const result = await PerfilEsquema.deleteOne({ _id: param }).exec();

      return res.status(200).json({ eliminado: result });
    } catch (error) {
      return res
        .status(500)
        .json({ respuesta: "Error al eliminar Perfil", error: error });
    }
  }

  protected static async actualizarPerfil(
    codigo: any,
    param: any,
    res: Response
  ): Promise<any> {
    try {
      const existe = await PerfilEsquema.findById(codigo).exec();

      if (!existe) {
        console.log("no existe");
        return res.status(400).json({ respuesta: "El perfil no existe" });
      }

      const objetoActualizado = await PerfilEsquema.findByIdAndUpdate(
        { _id: codigo },
        { $set: param }
      ).exec();
      console.log(objetoActualizado);
      return res
        .status(200)
        .json({ antiguo: existe, nuevo: objetoActualizado });
    } catch (error) {
      console.log("no existe 2");
      return res
        .status(500)
        .json({ respuesta: "Error al actualizar el Perfil", error: error });
    }
  }
}

export default PerfilDao;
