import "./OrderCardModel.css";
import { useEffect, useRef, useState } from "react";
const delete_icon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
</svg>
export const update_icon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
</svg>
function OrderCardModel({ data, setDeletedOrder }) {
    let [status, setStatus] = useState( data.orderStatus.toLowerCase());//selected status
    let refObj = useRef({});//DOM references
    let status_options = ["pending", "completed", "cancelled"];//can't change cause this is data flow 
    let [stateFlag, setStateFlag] = useState(false);
    let [dataCard, setDataCard] = useState({});
    //let [deleteFlag,setDeleteFlag] = useState(false);
    useEffect(() => {
        setDataCard({
            "orderType": data.orderType ? data.orderType : "Order Type",
            "orderId": data.orderID ? data.orderID : "101",
            "date": data.dueDate ? data.dueDate : "YY/MM/DD",
            "createdAt": data.orderDate ? data.orderDate : "YY/MM/DD",
            "customerName": data.customer.name ? data.customer.name : "Customer Name",
            "customerAddress": data.customer.address ? data.customer.address : "Customer Address",
            "phoneNumber": data.customer.phone_number ? data.customer.phone_number : "+95-XXXXXXXXXX",
            "orderItems": data.orderItem ? data.orderItem : [
                { "product_name": "product name", "product_price": 0, "quantity": 0 },
                { "product_name": "prodcut name", "product_price": 0, "quantity": 0 },
                { "product_name": "product name", "product_price": 0, "quantity": 0 },
            ],
            "totalPrice": data.orderItem ? data.orderItem.reduce((sum, item) => sum + (item.product_price * item.quantity), 0) : 0
        });
        return () => { };
    }, [data]);

    //animation drop-down
    let handle_status_options = () => {
        if (refObj.current["status-options"]) {
            refObj.current["status-options"].style.maxHeight = refObj.current["status-options"].style.maxHeight !== "0px" ? "0px" : "100px";
            refObj.current["status-options"].style.paddingTop = refObj.current["status-options"].style.paddingTop !== "0px" ? "0px" : "10px";
            refObj.current["status-options"].style.paddingBottom = refObj.current["status-options"].style.paddingBottom !== "0px" ? "0px" : "10px";
        }
    }
    //reset drop-down on mount (page load)
    useEffect(() => {
        if (refObj.current["status-options"]) {
            refObj.current["status-options"].style.maxHeight = "0px";
            refObj.current["status-options"].style.paddingTop = "0px";
            refObj.current["status-options"].style.paddingBottom = "0px";
        }
    }, []);
    //update status option
    function updateStatus(orderId, status) {
        fetch("http://localhost:8080/api/auth/updateOrderStatus/" + orderId + "?newStatus=" + status, {
            method: "PUT"
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => { throw new Error(error.message || "Unknown Error") });
                return res.json();
            })
            .then(data => {
                console.log("Response : ", data.message);
            })
            .catch(error => {
                console.log("Error" + error.message);
            });
    }
    useEffect(() => {
        console.log("Status : ", data);
        if (stateFlag === true) {
            data.orderStatus = status.toLowerCase();
            updateStatus(data.orderID, status);
            console.log("Status changed to : ", status);
        }
        setStateFlag(true);
        return () => { }
    }, [status]);

    return (
        <div className="order-card-model-container">
            <h1>{dataCard["orderType"]}</h1>
            <div className="order-card-model-content">
                <div className="card-row">
                    <div>
                        <h3>Order Id</h3>
                        <p>{dataCard["orderId"]}</p>
                    </div>
                    <div>
                        <h3>Date</h3>
                        <p>{dataCard["date"]}</p>
                    </div>
                    <div>
                        <h3>Created At</h3>
                        <p>{dataCard["createdAt"]}</p>
                    </div>
                </div>
                <div className="card-row middle-row">
                    <div className="customer-details">
                        <div className="dd">
                            <h3>Customer</h3>
                            <p>{dataCard["customerName"]}</p>
                        </div>
                        <div className="dd">
                            <h3>Address</h3>
                            <p>{dataCard["customerAddress"]}</p>
                        </div>
                        <div className="dd">
                            <h3>Phone Number</h3>
                            <p>{dataCard["phoneNumber"]}</p>
                        </div>
                    </div>
                    <div>
                        <div className="products-table">
                            <div className="table-header">
                                <h3>Product Name</h3>
                                <h3>Price</h3>
                                <h3>Quantity</h3>
                                <h3>Total</h3>
                            </div>
                            <div className="table-body">
                                {dataCard["orderItems"] && dataCard["orderItems"].map((el, index) =>
                                    <div className="table-row" key={index}>
                                        <p>{el.product_name}</p>
                                        <p>{el.product_price}</p>
                                        <p>{el.quantity}</p>
                                        <p>{el.quantity * el.product_price}Ks</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="total-price">
                            <h3>Total Price</h3>
                            <p>{dataCard["totalPrice"]}Ks</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="status-row">
                <div className="status-display">
                    <h3>Status :</h3>
                    <p className="pending-btn" id={`${status}-btn1`}>{status}</p>
                </div>
                <button className="update-order-btn" onClick={() => { console.log("Deleted : ", data); setDeletedOrder(data); }}> {delete_icon} Delete Order</button>
                <div className="update-status-gp">
                    <button className="update-order-btn" onClick={() => handle_status_options()}>{update_icon} Update Status</button>
                    <div className="status-options" ref={(el) => { if (el) refObj.current["status-options"] = el }}>
                        {
                            status_options.map((el, index) => <button key={index} onClick={() => setStatus(el)} >{el}</button>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderCardModel;