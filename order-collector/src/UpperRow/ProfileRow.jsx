import "./ProfileRow.css";
import MenuButtom from "../assets/CustomButton/MenuButton";
import { WebContext } from "../Auth";
import { useContext, useEffect, useState } from "react";
let profile_filled = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
</svg>

let profile = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
</svg>

function ProfileRow() {
    let { user, setUser } = useContext(WebContext);
    let [click, setClick] = useState(false);
    let [response, setResponse] = useState(null);
    let [input, setInput] = useState({
        "username": user.user_name, "email": user.email, "password": "", "confirm_password": ""
    });
    let [valid, setValid] = useState(false);

    useEffect(() => {
        let profile_slide = document.getElementById("profile-slide");
        if (click === true) {
            profile_slide.style.maxWidth = "250px";
            return;
        }
        profile_slide.style.maxWidth = "0px";
    }, [click]);
    const Logout_handler = () => {
        fetch("http://localhost:8080/api/auth/logout", {
            method: "POST", credentials: "include"
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => { throw new Error(e.message || "Unkown error") })
                }
                return res.json();
            })
            .then(
                data => {
                    setUser({
                        user_name: "Guest",
                        user_id: 0,
                        id: 0,
                        email: "",
                        role: "Guest"
                    });
                    console.log("Logout : ", data.message)
                }
            )
            .catch(error => {
                console.log("Error : ", error.message);
            })
    }
    const check_user = () => {
        fetch("http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email: input.email,
                password: input.password
            }),
            credentials: "include"
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(e => { throw new Error(e.message || 'Login failed'); });

                }

                return response.json();
            })
            .then(data => {
                setValid(true);
                confirm_handler();
                console.log("Update", data);

            })
            .catch(error => {
                setValid(false);
                console.log("Login error: ", error.message);
            });
    }
    const confirm_handler = () => {


        fetch("http://localhost:8080/api/auth/editProfile", {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": input.username
            })

        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => { throw new Error(e.message || "Unkown error") })
                }
                return res.json();
            })
            .then(
                data => {
                    setUser(p => ({
                        ...p, email: input.email,
                        user_name: input.username
                    }));
                    setResponse(data.message)
                    console.log("update  : ", data);

                }
            )
            .catch(error => {
                setResponse(error.message);
                console.log("Error : ", error.message);
            })
    }
    return (
        <div className="profileRow">
            <MenuButtom />
            <h1>FlashCollect</h1>
            <b>{user && user.user_name !== "Guest" ? user.user_name : "Guest"}</b>
            <div className="pf" onClick={() => setClick(prev => !prev)}>{click ? profile_filled : profile}</div>
            <div className="edit-slide" id="profile-slide">
                <h3 id="header-profile">Profile</h3>
                <div>
                    <h3>Username</h3>
                    <input type="text" placeholder="Enter new username.." value={input.username}
                        onChange={(e) => { setInput(p => ({ ...p, "username": e.target.value })); }}
                    />
                </div>

                <div className="change-pwd">
                    <h3>Password</h3>
                    <input placeholder="enter password.." type="password" minLength={8}
                        onChange={(e) => { setInput(prev => ({ ...prev, "password": e.target.value })) }} /><br></br>
                </div>
                <button onClick={() => { check_user(); console.log("Up : ", input); }}>Confirm</button>
                <button onClick={() => { Logout_handler(); }}>Logout</button>
                <p id="error-ms">{response ? response : null}</p>
            </div>
        </div>
    );
}
export default ProfileRow