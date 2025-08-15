import { useState,useEffect } from "react";
function CustomDivHandler({ pathName,children,contentSize }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (pathName.toLowerCase() === "/login" || pathName.toLowerCase() === "/register" || pathName.toLowerCase() === "/") {
            setVisible(false);
            if (contentSize){
                contentSize.style.marginTop = "0px";
            }
            return () => { }
        }
        setVisible(true);
        console.log("side or upper rendered!");
        return () => { }
    }, [pathName]);
    return (visible ? children : null);

}
export default CustomDivHandler;