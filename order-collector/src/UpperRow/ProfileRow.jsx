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
    let [response,setResponse] = useState(null);
    let [input, setInput] = useState({
        "username": user.user_name, "email": user.email, "password": "", "confirm_password": ""
    });


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
    const confirm_handler = () => {
        if (input.confirm_password !== input.password) {
            setResponse("Password doesn't match!");
            alert("Password doesn't match");
            return;
        }
        fetch("http://localhost:8080/api/auth/editProfile", {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": input.email,
                "username": input.username,
                "password": input.confirm_password
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
                <div>
                    <h3>Email</h3>
                    <input type="email" placeholder="Enter new email address.." value={input.email}
                        onChange={(e) => { setInput(prev => ({ ...prev, "email": e.target.value })) }} />
                </div>
                <div className="change-pwd">
                    <h3>Change Password</h3>
                    <input placeholder="old password.." type="password" minLength={8}
                        onChange={(e) => { setInput(prev => ({ ...prev, "password": e.target.value })) }} /><br></br>
                    <input placeholder="new password.." type="password" minLength={8}
                        onChange={(e) => { setInput(prev => ({ ...prev, "confirm_password": e.target.value })) }} />

                </div>
                <button onClick={() => { confirm_handler(); console.log("Up : ", input); }}>Confirm</button>
                <button onClick={() => { Logout_handler(); }}>Logout</button>
                <p id="error-ms">{response? response : null}</p>
            </div>
            
        </div>
    );
}
export default ProfileRow