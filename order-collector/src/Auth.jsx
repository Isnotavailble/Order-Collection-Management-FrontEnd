import { createContext,useState,useRef, useEffect } from "react";

export let WebContext = createContext(null);
//provider function 
//this is main for data in and out to WebContext 
function WebContextProvider({children}){
    let [user,setUser]= useState({
        user_name : "Guest",
        user_id : 0,
        role : "Guest"});
    let menu = useRef({}); 
    
    useEffect(() => {
            fetch("http://localhost:8080/api/auth/me", {
      credentials: "include",
      method: "GET"
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => { throw new Error(e.message || "Unknow Erro") });
        return res.json()
      })
      .then(data => {
        setUser(prev => ({ ...prev, user_name: data.username, id: data.id, role: "User" }));
        console.log("data : ", data);
      })
      .catch(error => {
        console.log("Error : ", error.message);
      });
    },[]);
    return (
        <WebContext.Provider value={{user,setUser,menu}}>
            {children}
        </WebContext.Provider>
    );
}
export default WebContextProvider;
