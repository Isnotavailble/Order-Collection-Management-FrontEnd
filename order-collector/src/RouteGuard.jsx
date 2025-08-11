//this is component is for redirecting user dependent on the user role
import { useContext } from "react";
import { WebContext } from "./Auth";
import { Navigate } from "react-router-dom";
function RouteGuard({ children }) {
    let { user } = useContext(WebContext);
    if (user.role === "Guest") {
       return  (<Navigate to={"/Login"} replace />);
    }



    return (children);
}
export default RouteGuard;