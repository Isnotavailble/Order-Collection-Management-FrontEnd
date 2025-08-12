import { useState, useContext, useEffect } from "react";
import { WebContext } from "../Auth";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
function Login() {
    const { user, setUser } = useContext(WebContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const formSubmit = (e) => {
        e.preventDefault();
        console.log("active fetching");
        fetch("http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(e => { throw new Error(e.message || 'Login failed'); });

                }
                setError("");

                return response.json();
            })
            .then(data => {
                setUser(p => ({ ...p, user_name: data.username, role: "user" }));
                console.log("Login success:", data);

            })
            .catch(error => {
                setError("Invalid Email or Password");
                console.log("Login error:", error.message);
            });
    };



    return (
        <div className="loginContext">

            <form onSubmit={formSubmit}>
                <h1>LOGIN</h1>
                <div className="in-row">
                    <span>Email address</span>
                    <input
                        type="email"
                        placeholder=" Enter email address .."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="in-row">
                    <span>Password</span>
                    <input
                        type="password"
                        placeholder="Enter password .."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" >Login</button>
                <b>Don't have a account ? <Link to={"/register"}>register</Link></b>
                {error === "Invalid Email or Password" ? <b>{error}</b> : null}
                {user.role !== "Guest" ? <Navigate to="/HomePage" replace /> : null}
            </form>
        </div>
    );
}

export default Login;
