import { Link } from "react-router-dom";
import { useRef,useContext } from "react";
import { WebContext } from "../Auth";
import "./Nav.css"
function NavBar() {
    //this will go global dom 
    const {menu} = useContext(WebContext);
    return (
        <>
            <div className="nav-container" ref={ (el) => {if (el) menu.current["menu"] = el}}>
                <div className="nav-links">
                <Link to={"/home"}>Home</Link>
                <Link to={"/createorders"}>Create Order</Link>
                <Link to={"/editorders"}>Edit Orders</Link>
                <Link to={"/ordersdashboard"}>Orders</Link>
                </div>
            </div>

        </>);
}
export default NavBar;