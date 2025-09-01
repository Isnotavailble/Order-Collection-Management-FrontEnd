import { useState, useContext, useEffect } from "react";
import { WebContext } from "../Auth";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";

function Login() {
    const { user, setUser } = useContext(WebContext);
    const [in_email, setInEmail] = useState("");
    const [in_password, setInPassword] = useState("");
    const [error, setError] = useState("");
    const formSubmit = (e) => {
        e.preventDefault();
        console.log("active fetching");
        fetch("http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email: in_email,
                password: in_password
            }),
            credentials: "include"
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(e => { throw new Error(e.message || 'Login failed'); });

                }
                setError("");

                return response.json();
            })
            .then(data => {
                setUser(p => ({ ...p, user_name: data.username, id: data.id, role: "user" }));
                console.log("Login success: ", data);

            })
            .catch(error => {
                setError(error.message);
                console.log("Login error: ", error.message);
            });
    };



    return (
        <div className="loginContext">
            {user.role !== "Guest" ? <Navigate to="/home" replace /> : null}
            <form onSubmit={formSubmit}>
                <h1>LOGIN</h1>
                <div className="in-row">
                    <span>Email address</span>
                    <input
                        type="email"
                        placeholder=" Enter email address .."
                        value={in_email}
                        onChange={e => setInEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="in-row">
                    <span>Password</span>
                    <input
                        type="password"
                        placeholder="Enter password .."
                        value={in_password}
                        onChange={e => setInPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" >Login</button>
                <b>Don't have an account ? <Link to={"/register"}>Register</Link></b>
                {error !== "" ? <b>{error}</b> : null}

            </form>
        </div>
    );
}

export default Login;
