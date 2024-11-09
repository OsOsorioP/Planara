import { createContext } from "react";
import { propUsuario } from "../models/Interfaces";

export const ContextoUsuario = createContext<propUsuario | null>(null);