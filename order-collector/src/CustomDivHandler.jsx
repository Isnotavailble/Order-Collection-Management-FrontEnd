import { useState,useEffect } from "react";
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
export default CustomDivHandler;