import { WebContext } from "../Auth.jsx";
import "./OrderDashBoard.css"
import SearchBar from "./SearchBar.jsx";
import OrderCardModel from "./OrderCardModel.jsx";
import { useEffect, useContext, useState } from "react";
import OverlayV1 from "../ErrorOverlays/OverlayV1.jsx";
function OrderDashBoard() {
    let [orders, setOrders] = useState([]);//all orders of the user
    let [responseMessage, setResponseMessage] = useState("");//response message from the server
    function getOrders(userId) {
        fetch("http://localhost:8080/api/auth/getAllOrders?userId=" + userId)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(e => {
                        throw new Error(e.message || "Unknown Error");
                    }
                    );
                }
                return response.json();
            })
            .then(data => {
                setOrders(data);
                console.log("Orders : ", data);
            })
            .catch(error => {
                if (String(error.message).toLowerCase().includes("fetch")) {
                    setResponseMessage("Please check your internet connection!");
                    return;
                }
                setResponseMessage(error.message);
                console.log("Error : ", error.message);
            });
    }
    //load all orders of the user 
    useEffect(() => {
        getOrders(2);
    }, []);
    return (
        <div>
            {responseMessage && <OverlayV1 resetMessage={responseMessage.includes("find orders")} 
            message={responseMessage}
            setResponse={setResponseMessage}
            />}
            <div className="order-dashboard-contianer">
                <h1>Order DashBoard</h1>
                <div className="board-upper-row">
                    <SearchBar />
                    <button id="default-btn" className="upper-btn">Default</button>
                    <button id="pending-btn" className="upper-btn">Pending</button>
                    <button id="complete-btn" className="upper-btn">Completed</button>
                    <button id="cancelled-btn" className="upper-btn">Cancelled</button>
                </div>
                <div className="order-cards-list">
                    {orders.map((order, index) => <div key={`orderCard-` + index}><OrderCardModel data={order} /></div>)}

                </div>


            </div>
        </div>
    );
}
export default OrderDashBoard;