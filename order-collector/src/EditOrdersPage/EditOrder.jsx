
import "./EditOrder.css";
import "../CreateOrderPage/CreateOrderStyleWrapper.jsx";
import TrashPic from "../assets/trash.svg";
import PlusPic from "../assets/plus.svg";
import { useEffect, useRef, useState } from "react";
import OverlayV1 from "../ErrorOverlays/OverlayV1.jsx";
import CreateOrderStyleWrapper from "../CreateOrderPage/CreateOrderStyleWrapper.jsx";
const SendOrderPic = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
</svg>
const MenuBtn = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-menu-button-fill" viewBox="0 0 16 16">
    <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h8A1.5 1.5 0 0 0 11 3.5v-2A1.5 1.5 0 0 0 9.5 0zm5.927 2.427A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
</svg>

function EditOrders(props) {
    //data from api
    let [order_data, setOrderData] = useState(null);

    //search bar
    let [requestOrderId, setRequestOrderId] = useState(0);
    //for prodcut rows
    let [row, setRow] = useState([
        { "id": Date.now(), "productName": "", "price": "", "quantity": "" }]);
    //customer data and order date data
    let [rightSideData, setRightSideData] = useState({
        "customer": {
            "name": "",
            "address": "",
            "phone_number": ""
        },
        "order": {
            "order_id" : "",
            "order_status": "pending",
            "start_date": "",
            "end_date": ""
        }
    });
    //for orderType
    let orderType = ["Delivery", "PickUp"];
    //DOM
    let refObj = useRef({});
    //selected order type 
    let [selectedOrderType, setSelectedOrderType] = useState("Delivery");
    //response status 
    let [response, setResponse] = useState("");
    //product table rows generator

    function generateRow(r) {
        if (r) {
            return (
                r.map((el) =>
                    <div className="row" key={el.id}>
                        <input type="text" placeholder="Type here" value={el.productName}
                            onChange={e => inputHandle(e, el.id, "productName")} />
                        <input type="text" placeholder="Type here" value={el.price}
                            onChange={e => inputHandle(e, el.id, "price")}
                        />
                        <input type="number" placeholder="1" min="1" value={el.quantity}
                            onChange={e => inputHandle(e, el.id, "quantity")}
                        />
                        <button onClick={() => deleteRow(el.id)}><img id="trash-pic" src={TrashPic} /></button>
                    </div>));
        }
        return null;
    }

    //product table add and remove items
    function deleteRow(idToRemoveRow) {
        setRow(p => p.filter((el, id) => el.id !== idToRemoveRow));
        console.log("Deleted : ", idToRemoveRow);
    }
    function addRow() {
        setRow(p => [...p, { "id": Date.now(), "productName": "", "price": "", "quantity": 0 }]);
        console.log("Data added");
    }
    //animations
    function showAndHideHandler(element) {
        element.style.maxHeight = element.style.maxHeight !== "0px" ? "0px" : "150px";
    }
    useEffect(() => {
        refObj.current["status-btn-gp"].style.maxHeight = "0px";
    }, []);

    //input handlers
    // input handle for product table
    function inputHandle(e, mapID, fieldName) {
        console.log(fieldName);
        setRow(prev =>
            prev.map(item => item.id === mapID ? { ...item, [fieldName]: e.target.value } : item))
        //console.log("Data input : ", e.target.value);
    }
    //input handle for customer and order date 
    function inputHandle_V1(e, objName, fieldName) {
        //console.log("obj : " + objName + "\nfieldName : " + fieldName);
        setRightSideData(prev => ({
            ...prev,
            [objName]: {
                ...prev[objName],
                [fieldName]: e.target.value
            }
        }));
    }
    //input handler for input bar and its button

    //debuggers
    useEffect(() => {
        console.log("rows : ", row);
    }, [row]);
    useEffect(() => {
        console.log("customer and order", rightSideData);
    }, [rightSideData]);
    useEffect(() => {
        console.log("req id : " + requestOrderId);
    }, [requestOrderId]);
    //data transfer to state varibles
    useEffect(() => {
        if (order_data != null) {
            setRow(prev => order_data.orderItem.map((item, index) => { return { "id": Date.now() + index, "productName": item.product_name, "price": item.product_price, "quantity": item.quantity } }
            ));

            setRightSideData(prev => ({
                ...prev,
                "customer": {
                    "name": order_data.customer.name,
                    "address": order_data.customer.address,
                    "phone_number": order_data.customer.phone_number
                },
                "order": {
                    "order_id" : order_data.orderID,
                    "order_status": order_data.orderStatus,
                    "start_date": order_data.orderDate,
                    "end_date": order_data.dueDate,
                }
            }));

            setSelectedOrderType(order_data.orderType);
        }

        console.log("data json : ", order_data);
    }, [order_data]);
    //fetching data
    // findByOrderId
    function getOrderById(id) {
        console.log("input id  : ", id);
        fetch("http://localhost:8080/api/auth/getOrderById?requestId=" + id)
            .then(response => {
                if (!response.ok)
                    return response.json().then(r => { throw new Error(r.message || "Unknown Error") });
                return response.json();
            })
            .then(data => {
                setOrderData(data);
                console.log("order : ", data);
            })
            .catch(error => {
                if (error.message.includes("Fetch" || "fetch")) {
                    setResponse("Unable to find order");
                }
                setResponse(error.message);
                console.log("Error", error.message);
            });
    }

    return (<>
        {response.toLocaleLowerCase().includes("not found")? <OverlayV1 message={response} setResponse={setResponse}/> : null}
        <CreateOrderStyleWrapper>
            <div className="create-order-content">
                <h1>Edit Order</h1>
                <input className="input-bar" type="number" placeholder="enter order ID" min="1"
                    ref={el => { if (el) refObj.current["input-bar"] = el }}
                    onChange={e => {
                        if (e.target.value > 0)
                            setRequestOrderId(e.target.value);
                        else {
                            e.target.value = null;
                            setRequestOrderId(null);
                        }
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            e.target.value = null;
                            getOrderById(requestOrderId);
                        }
                    }}
                /> <button className="search-btn" onClick={() => { refObj.current["input-bar"].value = null; getOrderById(requestOrderId); }}>Search</button>
                <div className="create-card">
                    <div className="form">
                        <h1>Order ID {rightSideData["order"].order_id}</h1>
                        <div className="form-overlay">
                            <div className="form-left-side">
                                <b>Customer Name</b>
                                <input type="text" placeholder="Type here" value={rightSideData["customer"].name} onChange={e => inputHandle_V1(e, "customer", "name")} />
                                <b>Customer's Address</b>
                                <input type="text" placeholder="Type here" value={rightSideData["customer"].address} onChange={e => inputHandle_V1(e, "customer", "address")} />
                                <b>Customer's PhoneNumber</b>
                                <input type="text" placeholder="Type here" value={rightSideData["customer"].phone_number} onChange={e => inputHandle_V1(e, "customer", "phone_number")} />
                                <b>Order Date</b>
                                <input type="date" placeholder="Type here" value={rightSideData["order"].start_date} onChange={e => inputHandle_V1(e, "order", "start_date")} />
                                <b>Delivery/PickUp Date </b>
                                <input type="date" placeholder="Type here" value={rightSideData["order"].end_date} onChange={e => inputHandle_V1(e, "order", "end_date")} />
                            </div>
                            <div className="form-right-side">
                                <div className="product-table">
                                    <div className="row rowHeader">
                                        <b>Product Name</b>
                                        <b>Price</b>
                                        <b>Quantity</b>
                                    </div>
                                    {generateRow(row)}
                                    <button id="add-product-btn" onClick={() => { addRow(); }}><img id="add-icon" src={PlusPic} /> Add a product</button>
                                </div>
                            </div>
                        </div>
                        <div className="btn-row">
                            <button id="sendBtn"> {SendOrderPic} <b> Confirm Update </b></button>
                            <div className="status-btn-container">
                                <button id="sendBtn" onClick={() => showAndHideHandler(refObj.current["status-btn-gp"])}>
                                    {MenuBtn} <b> OrderType : {selectedOrderType} </b>
                                </button>
                                <div className="status-btn-gp" ref={(el) => { if (el) refObj.current["status-btn-gp"] = el; }}>
                                    {orderType.map((el, index) =>
                                        <button key={index} onClick={() => { setSelectedOrderType(el); }}>{el} </button>)}
                                </div>
                            </div>
                            <b id="status-ms" >Error status</b>
                        </div>
                    </div>
                </div>
            </div>
        </CreateOrderStyleWrapper>
    </>);
}
export default EditOrders;