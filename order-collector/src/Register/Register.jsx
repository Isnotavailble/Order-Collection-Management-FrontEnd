import { useContext, useState } from "react"
import { Link,Navigate } from "react-router-dom";
import { WebContext } from "../Auth";
function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error ,setError] = useState("");
    const {user,setUser} = useContext(WebContext);//global varibales in Auth.jsx
    const submitForm = () => {

        fetch("http://localhost:8080/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        }).then(response => {
            if (!response.ok)
                return response.json().then(e => { throw new Error(e.message || "Unkown Error") })
            return response.json();
        })
        .then(data => {
            console.log("data :", data);
            setError("");
            setUser(p => ({ ...p, user_name: data.username, role: "user" }));

        })
        .catch(e => {
            setError(e.message);
            console.log("error : ", e.message);});

    }

    return (<div className="loginContext">

        <form onSubmit={(e) => {
            e.preventDefault();
            submitForm();
        }} style={{paddingBottom:"70px"}}
        ><h1 style={{top:"40px"}}>Register</h1>
            <div className="in-row">
                <span>Username</span>
                <input type="text" placeholder=" Enter username .." onChange={e => setUserName(e.target.value)} required />
            </div>
            <div className="in-row">
                <span>Email address</span>
                <input type="email" placeholder="Enter email .." onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="in-row">
                <span>Password</span>
                <input type="password" placeholder="Enter password .." onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
            <b>Already have an account? <Link to={"/Login"}>Login</Link> </b>
            {error === "Already exist"? <b>{error}</b> : null}
            {user.role !== "Guest" ? <Navigate to="/HomePage" replace /> : null}
        </form>
    </div>);
}
export default Register;