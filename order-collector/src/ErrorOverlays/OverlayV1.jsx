import "./OverlayV1.css";
import { Navigate, useNavigate } from "react-router-dom";
function OverlayV1({ message, setResponse, resetMessage }) {
    let navigate = useNavigate();
    return (
        <div className="overlay-e">
            <div className="bg">
                <div className="e-container">
                    <b>{message} !</b>
                    <button onClick={e => {
                        if (resetMessage) {
                            console.log("resetMessage called");
                            navigate("/createorders");
                            return;
                        }
                        setResponse("");
                        return;
                    }}>ok</button>
                </div>
            </div>
        </div>);
}
export default OverlayV1;