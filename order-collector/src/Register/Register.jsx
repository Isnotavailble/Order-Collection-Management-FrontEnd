import { useState } from "react"
function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const submitForm = () => {

        fetch("http://localhost:8080/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        }).then(response => {
            if (!response.ok)
                return response.json().then (e => {throw new Error (e.message || "Unkown Error")})
            return response.json();
        }).then(data => console.log("data :", data))
            .catch(e => console.log("error : ", e.message));
    
    }
    
    return (<div>
        <h1>Register</h1>
        <form onSubmit={(e) => {
            e.preventDefault();
            submitForm();
        }}>
            <div>
                <label>UserName</label>
                <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>);
}
export default Register;