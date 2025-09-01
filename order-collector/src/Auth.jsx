import { createContext,useState,useRef, useEffect } from "react";

export let WebContext = createContext(null);
//provider function 
//this is main for data in and out to WebContext 
function WebContextProvider({children}){
    let [user,setUser]= useState({
        user_name : "Guest",
        user_id : 0,
        id : 0,
        email : "",
        role : "Guest"});
    let menu = useRef({}); 
    return (
        <WebContext.Provider value={{user,setUser,menu}}>
            {children}
        </WebContext.Provider>
    );
}
export default WebContextProvider;
