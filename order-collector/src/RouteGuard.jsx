//this is component is for redirecting user dependent on the user role
import { useContext, useEffect } from "react";
import { WebContext } from "./Auth";
import { Navigate } from "react-router-dom";
import { useState } from "react";
function RouteGuard({ children,refresh }) {
    let { user } = useContext(WebContext);
    if (user.role === "Guest" || user.user_name === "Guest") {
        return (<Navigate to={"/"} replace />);
    }
    if(refresh === true && user.id !== 0){
        return (<Navigate to={"/home"} replace />);
    }


    return (children);
}
export default RouteGuard;
