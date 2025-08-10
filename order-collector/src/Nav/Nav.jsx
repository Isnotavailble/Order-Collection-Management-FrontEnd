import { Link } from "react-router-dom";

function NavBar(){
    return (
    <div>
        <h1>Nav Bar</h1>
        <Link to={"/Home"}>Home</Link>
    </div>)
}
export default NavBar;