import { MenuLateral } from "./MenuLateral";
import { MenuSuperior2 } from "./MenuSuperior2";
import { RuteoTablero } from "../utils/routers/RuteoTablero";

export const TableroPrincipal = () => {
    return (
        <>
            <MenuSuperior2 />
            <MenuLateral />
            <RuteoTablero />
        </>
    )
}