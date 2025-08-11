import { createContext,useState } from "react";

export let WebContext = createContext(null);
//provider function 
//this is main for data in and out to WebContext 
function WebContextProvider({children}){
    let [user,setUser]= useState({
        username : "Guest",
        role : "Guest"});
    return (
        <WebContext.Provider value={{user,setUser}}>
            {children}
        </WebContext.Provider>
    );
}
export default WebContextProvider;
