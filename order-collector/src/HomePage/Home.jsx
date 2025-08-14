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
                <p>Keep managing your business data.</p>
                <div className="text-box">
                <p>An Order Collection Management System is a web-based platform designed to help businesses efficiently manage customer orders from start to finish.
                    The system simplifies order tracking, improves accuracy, and reduces manual work.
                </p>
                </div>
            </div>
        </div>);
}
export default HomePage;