import { model, Schema, Types } from "mongoose";
import TareaEntidad from "../entity/TareaEntidad";

// Definición del esquema de la tarea
const TareaEsquema = new Schema<TareaEntidad>(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaVencimiento: { type: Date, required: true },
    estado: { type: Number, enum: [1, 2, 3], default: 1 },
    prioridad: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    codUsuario: { type: Types.ObjectId, ref: "Usuario", required: true },
  },
  { versionKey: false }
);

export default model("Tarea", TareaEsquema, "Tarea");
