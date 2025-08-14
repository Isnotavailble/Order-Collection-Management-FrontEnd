//this is component is for redirecting user dependent on the user role
import { useContext, useEffect } from "react";
import { WebContext } from "./Auth";
import { Navigate } from "react-router-dom";
import { useState } from "react";
function RouteGuard({ children }) {
    let { user } = useContext(WebContext);
    if (user.role === "Guest") {
        return (<Navigate to={"/Login"} replace />);
    }

    return (children);
}

function CustomDivHandler({ pathName,children }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (pathName.toLowerCase() === "/login" || pathName.toLowerCase() === "/register") {
            setVisible(false);
            return () => { }
        }
        setVisible(true);
        console.log("side or upper rendered!");
        return () => { }
    }, [pathName]);
    return (visible ? children : null);

}
export default RouteGuard;
