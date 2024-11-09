import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type propsVigilante = { children?:any };

export const Vigilante = ({children}: propsVigilante) => {
    if (localStorage.getItem("token")) {
        const elToken = String(localStorage.getItem("token"))
        try {
            jwtDecode(elToken);
        } catch (error) {
            console.log(error)
            return <Navigate to="/login"/>;
        }
    } else {
        return <Navigate to="/login"/>;
    }

    return children ? children: <Outlet/>;
}