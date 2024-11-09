import { model, Schema, Types } from "mongoose";
import UsuarioEntidad from "../entity/UsuarioEntidad";

const UsuarioEsquema = new Schema<UsuarioEntidad>(
  {
    nombreUsuario: { type: String, required: true, trim: true },
    correoUsuario: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    claveUsuario: { type: String, required: true },
    fecha: { type: Date, default: Date.now() },
    nombreImagenUsuario: { type: String, default: "defaultAvatar.png" },
    avatarUsuario: { type: String, default: "defaultAvatar" },
    codPerfil: { type: Types.ObjectId, ref: "Perfil", required: true },
  },
  { versionKey: false }
);

export default model("Usuario", UsuarioEsquema, "Usuario");
