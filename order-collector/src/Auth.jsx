import { createContext } from "react";

export let WebContext = createContext(null);
//provider function 
//this is main for data in and out to WebContext 
function WebContextProvider({children}){
    let user = {role : "Guest"};
    return (
        <WebContext.Provider value={user}>
            {children}
        </WebContext.Provider>
    );
}
export default WebContextProvider;
