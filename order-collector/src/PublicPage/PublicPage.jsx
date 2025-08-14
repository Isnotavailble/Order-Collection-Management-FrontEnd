import { Link } from "react-router-dom";
import "./PublicPage.css";
function PublicPage() {
    return (
        <div className="publicConext">
            <div className="leftSide">
                <div className="textBox">
                    <h1>FlashCollect</h1>
                    <p style={{ fontSize: "34px", color: "#c71585", fontWeight: "bold", marginTop: "-30px" }}>Welcome to FlashCollect!</p>
                    <p>
                        Your all in one order collection management system,
                        mainly aimed for entrepreneurs and small business owners.
                        <br></br>
                        Struggling to keep daily orders organized?
                        No worries, we’re here to simplify your business operations and help you save time.
                    </p>

                    <p>
                        <b>New here?</b>, please register to use our system.<br></br>
                        <b>For registered users</b>, please login to your existing account.
                    </p>
                </div>
            </div>
            <div className="rightSide">
                <h1>Getting Started</h1>
                <br></br>
                <p>
                    Register or login to start using our system....
                </p>
                <Link to={"/register"}>Register</Link>
                <Link to={"/login"}>Login</Link>
            </div>
        </div >);



}
export default PublicPage;