import "./OverlayV1.css";
function OverlayV1({ message,setResponse }) {
    return (
        <div className="overlay-e">
            <div className="bg">
                <div className="e-container">
                    <b>{message} !</b>
                    <button onClick={e => setResponse("")}>ok</button>
                </div>
            </div>
        </div>);
}
export default OverlayV1;