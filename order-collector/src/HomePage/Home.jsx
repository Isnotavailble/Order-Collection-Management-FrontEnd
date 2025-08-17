import { WebContext } from "../Auth";
import { useContext } from "react";
import TableDemo from "../CardModels/TableDemo";
import ProfileRow from "../UpperRow/ProfileRow";
import "./Home.css";
function HomePage() {
    const { user, setUser } = useContext(WebContext);
    return (
        <div className="homeContainer">
            <div className="homeContext">
                <h1>Welcome,User</h1>
                <div id="line"></div>
                <p style={{
                    fontSize: "24px",
                    color: "#c71585",
                    fontWeight: "bold",
                    marginTop: "-30px"
                }}>
                    Keep managing your business data.</p>
                <div className="text-box">
                    <p>Your all in one order collection management system,
                        mainly aimed for entrepreneurs and small business owners.
                    </p>
                </div>
            </div>
        </div>);
}
export default HomePage ;