import { Response } from "express";
import TareaEsquema from "../schemas/TareaEsquema";
import UsuarioEsquema from "../schemas/UsuarioEsquema";

class TareaDao {
  protected static async crearTarea(params: any, res: Response): Promise<any> {
    try {
      delete params._id;
      delete params.estado;
      delete params.prioridad;

      const nuevaTarea = new TareaEsquema(params);
      const tareaGuardada = await nuevaTarea.save();
      return res.status(200).json({
        respuesta: "La tarea fue creada",
        id: tareaGuardada._id,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ respuesta: "Error al crear la tarea", error });
    }
  }

  protected static async obtenerTarea(id: any, res: Response): Promise<any> {
    try {
      const jsonUsuario = { _id: id };
      const usuario = await TareaEsquema.findById(jsonUsuario)
        .populate("codUsuario")
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

  protected static async actualizarTarea( id: any, params: any, res: Response ): Promise<any> {
    try {
      const tareaActualizada = await TareaEsquema.findByIdAndUpdate(
        id,
        params,
        { new: true }
      ).exec();

      if (!tareaActualizada) {
        return res.status(404).json({ respuesta: "Tarea no encontrada" });
      }

      return res.status(200).json({
        respuesta: "Tarea actualizada correctamente",
        tarea: tareaActualizada,
      });

    } catch (error) {
      return res
        .status(400)
        .json({ respuesta: "Error al actualizar la tarea", error });
    }
  }

  protected static async borrarTarea(id: any, res: Response): Promise<any> {
    try {
      const tareaEliminada = await TareaEsquema.findByIdAndDelete(id).exec();

      if (!tareaEliminada) {
        return res.status(404).json({ respuesta: "Tarea no encontrada" });
      }

      return res.status(200).json({
        respuesta: "Tarea eliminada correctamente",
        tarea: tareaEliminada,
      });
    } catch (error) {
        return res.status(400).json({ respuesta: 'Error al eliminar la tarea', error });
    }
  }

  protected static async obtenerTareas(params:any,res: Response): Promise<any> {
    try {
      let codUsuario = params.codUsuario;
      const obtenerUsuario = await UsuarioEsquema.findById(codUsuario).exec()
      console.log(codUsuario)
      const tareas = await TareaEsquema.find({ codUsuario: obtenerUsuario })
        .sort({ _id: -1 })
        .exec();
      console.log(tareas)
      return res.status(200).json(tareas);

    } catch (error) {
        return res.status(400).json({ respuesta: 'Error al obtener las tareas', error });
    }
  }
}

export default TareaDao;
