import { WebContext } from "../Auth.jsx";
import "./OrderDashBoard.css"
import SearchBar from "./SearchBar.jsx";
import OrderCardModel from "./OrderCardModel.jsx";
import { useEffect, useContext, useState } from "react";
import OverlayV1 from "../ErrorOverlays/OverlayV1.jsx";
function OrderDashBoard() {
    let [orders, setOrders] = useState([]);//all orders of the user
    let [responseMessage, setResponseMessage] = useState("");//response message from the server
    let [deletedOrder, setDeletedOrder] = useState({});
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
    //filter 
    function filterOrder(searchBy, searchValue, userId) {
        let url = searchValue === null ?
            "http://localhost:8080/api/auth/filterOrders?search=" + searchBy.trim() + "&userId=" + userId :
            "http://localhost:8080/api/auth/filterOrders?search=" + searchBy.trim() + "&userId=" + userId + "&searchValue=" + searchValue;
        console.log(url);
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => { throw new Error(e.message || "Unknown Error"); });
                }
                return res.json()
            })
            .then(data => {
                setOrders(data);
                console.log("Filter : ", data)

            })
            .catch(error => {
                if (String(error.message).toLowerCase().includes("fetch")) {
                    setResponseMessage("Please check your internet connection!");
                    return;
                }
                setResponseMessage(error.message);
                console.log("Error : ", error.message);
            })
    }
    //delete orde
    //delete order
    function deleteAnOrder(orderID) {
        fetch("http://localhost:8080/api/auth/deleteOrder?deleteRequestID=" + orderID, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => { throw new Error(error.message || "Unknown Error") });
                return res.json();
            })
            .then(data => {
                setResponseMessage(data.message);
                console.log("Response : ", data.message);
            })
            .catch(error => {
                if (String(error.message).toLowerCase().includes("fetch")) {
                    setResponseMessage("Please check your internet connection!");
                    return;
                }
                setResponseMessage("Somthing was wrong");
                console.log("Error" + error.message);
            });

    }
    //delete handle 
    useEffect(() => {
        if (Object.keys(deletedOrder).length > 0) {
            console.log("Deleted order : ", deletedOrder);
            setOrders(prev => prev.filter((order, index) => order.orderID !== deletedOrder.orderID));
            deleteAnOrder(deletedOrder.orderID);
            setDeletedOrder({});
            return () => { }
        }
        console.log("deleted order ", deletedOrder);
        return () => { }
    }, [deletedOrder])
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
                    <SearchBar filterOrder={filterOrder} setData={setOrders} />
                    <button id="default-btn" className="upper-btn" onClick={e => { getOrders(2); }}>Default</button>
                    <button id="pending-btn" className="upper-btn" onClick={e => { filterOrder("pending", null, 2); }}>Pending</button>
                    <button id="complete-btn" className="upper-btn" onClick={e => { filterOrder("completed", null, 2); }}>Completed</button>
                    <button id="cancelled-btn" className="upper-btn" onClick={e => { filterOrder("cancelled", null, 2); }}>Cancelled</button>
                </div>
                <div className="order-cards-list">
                    {orders.map((order, index) => <div key={`orderCard-` + index + "ID-" + order.orderID}><OrderCardModel data={order} setDeletedOrder={setDeletedOrder} /></div>)}

                </div>


            </div>
        </div>
    );
}
export default OrderDashBoard;