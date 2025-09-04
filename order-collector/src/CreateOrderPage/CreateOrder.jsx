import "./CreateOrder.css";
import TrashPic from "../assets/trash.svg";
import PlusPic from "../assets/plus.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { WebContext } from "../Auth";
import OverlayV1 from "../ErrorOverlays/OverlayV1";
const SendOrderPic = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
</svg>
const MenuBtn = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-menu-button-fill" viewBox="0 0 16 16">
    <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h8A1.5 1.5 0 0 0 11 3.5v-2A1.5 1.5 0 0 0 9.5 0zm5.927 2.427A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
</svg>

function CreateOrder() {
    let { user } = useContext(WebContext);
    //status like 404 or somthing like that
    let [responseStatus, setResponseStatus] = useState("");
    // product rows' data 
    //Date.now() just generate non-repeat number so I used it as id
    let [row, setRow] = useState([{
        "id": Date.now(),
        "productName": "",
        "quantity": 0,
        "price": 0
    }]);
    //seletected type 
    let [orderType, setOrderType] = useState("Delivery");

    //customer data and order date data
    let [rightSideData, setRightSideData] = useState({
        "customer": {
            "name": "",
            "address": "",
            "phone_number": ""
        },
        "order": {
            "order_status": "pending",
            "start_date": "",
            "end_date": ""
        }
    });
    let TodayInForrmat = new Date().toISOString().split("T")[0];
    //orderType for btn
    //update : the className should be orderType so keep that in mind !     
    let orderStatus = ["Delivery", "PickUp"];
    let buttonsGroup = useRef({});//DOM obj for buttons or the whole page assume like a VRDom 
    //make default if enter this page again
    useEffect(() => {
        if (buttonsGroup.current["status-btn-gp"]) {
            buttonsGroup.current["status-btn-gp"].style.maxHeight = "0px";
        }
    }, []);
    //product table rows generator
    function generateRow(r) {
        if (r) {
            return (
                r.map((el) =>
                    <div className="row" key={el.id}>
                        <input type="text" placeholder="Type here"
                            onChange={e => inputHandle(e, el.id, "productName")} />
                        <input type="number" placeholder="Type here" value={el.price}
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
    // input handle for product table
    // in json obj,to change the key dynamically : use [key] : value what the fuck is even this fuck js
    function inputHandle(e, mapID, fieldName) {
        //console.log(fieldName);
        if (fieldName === "price" || fieldName === "quantity") {
            e.target.value = parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : 0;
        }
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
    //to see rightside data update 
    useEffect(() => {
        console.log("right Data : ", rightSideData);
    }, [rightSideData]);
    //to see product row data
    useEffect(() => {
        console.log("Data in state : ", row);
    }, [row]);
    //to see selected order type
    useEffect(() => {
        console.log("Order type : ", orderType);
    }, [orderType]);
    function deleteRow(idToRemoveRow) {
        setRow(p => p.filter((el, id) => el.id !== idToRemoveRow));
        console.log("Deleted : ", idToRemoveRow);
    }
    function addRow() {
        setRow(p => [...p, { "id": Date.now(), "productName": "", "price": 0 }]);
        console.log("Data added");
    }
    const checkNull = (obj, fieldName) => {
        if (obj[fieldName] === "" || obj[fieldName] === null || obj[fieldName] === undefined) {
            return true;
        }
        return false;
    }
    //Time handling
    useEffect(() => {
        if (rightSideData["order"].start_date || rightSideData["order"].end_date) {
            let in_date = new Date(rightSideData["order"].start_date);//order date
            let in_end_date = new Date(rightSideData["order"].end_date);//due date
            let today = new Date();
            in_date.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            in_end_date.setHours(0, 0, 0, 0);
            
            //check the due date
            if (in_end_date < in_date) {
                setResponseStatus("Due date can't be from the past")
                setRightSideData(prev => ({ ...prev, order: { ...prev["order"], end_date: "" } }));
            }

        }

        return () => { }
    }, [rightSideData["order"].start_date, rightSideData["order"].end_date])
    //because of spring security,have to enter the generated password from spring api 
    //send request the data to api
    function postData(url) {
        let request = {
            "orderStatus": rightSideData["order"].order_status.trim().toLowerCase(),
            "orderDate": rightSideData["order"].start_date,
            "dueDate": rightSideData["order"].end_date,
            "orderType": orderType,
            "userID": user.id ? user.id : "",//Test
            "customer": checkNull(rightSideData["customer"], "name") || checkNull(rightSideData["customer"], "phone_number") || checkNull(rightSideData["customer"], "address") ? "" : {
                "customerName": rightSideData["customer"].name.trim(),
                "phoneNumber": rightSideData["customer"].phone_number.trim(),
                "customerAddress": rightSideData["customer"].address.trim()
            },
            "orderItems": row.filter((item, index) =>
                item.price < 1 || item.quantity < 1 || item.productName === null || item.productName === ""
            ).length > 0 || row.length === 0 ? ""
                :
                row.map((el, index) => (
                    {
                        "quantity": el.quantity,
                        "priceAt": el.price,
                        "product": {
                            "productName": el.productName.trim(),
                            "productCategory": "Not Yet",
                            "price": el.price
                        }
                    }
                ))
        }

        console.log("request : ", request);
        let HasNull = Object.values(request).filter((p, index) => p === null || p === "" || p === undefined).length > 0 ? true : false;
        if (HasNull) {
            setResponseStatus("Please Check your Field");
            console.log("Data contain null value");
            return;
        }
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw new Error(error.message || "Unkown Error") });
                }
                return response.json();
            })
            .then(data => {
                setResponseStatus(data.message);
                console.log("Response fro api : ", data);
            })
            .catch(error => {
                setResponseStatus(String(error.message).includes("Fail") ? "unable to create order" : error.message);
                console.log("Error : " + error.message);
            });
    }
    // Animations
    //for orderstatus drop down 
    function showAndHideHandler(element) {
        element.style.maxHeight = element.style.maxHeight !== "0px" ? "0px" : "150px";
    }
    //for status message animation ("order created successfully or .. etc")
    useEffect(() => {
        if (buttonsGroup.current["status-ms"]) {
            buttonsGroup.current["status-ms"].style.maxWidth = "0px";
            buttonsGroup.current["status-ms"].style.padding = "0px";
        }
        return () => { }
    }, []);
    useEffect(() => {
        if (responseStatus && buttonsGroup.current['status-ms']) {
            buttonsGroup.current["status-ms"].style.maxWidth = "500px";
            buttonsGroup.current["status-ms"].style.padding = "10px";
        }
        return () => { }
    }, [responseStatus]);
    return (
        <div>
            {responseStatus ? <OverlayV1 message={responseStatus} setResponse={setResponseStatus} /> : null}

            <div className="create-order-content">
                <h1>Create Order</h1>
                <div className="create-card">
                    <div className="form">
                        <div className="form-overlay">
                            <div className="form-left-side">
                                <b>Customer Name</b>
                                <input type="text" placeholder="Type here" onChange={e => inputHandle_V1(e, "customer", "name")} />
                                <b>Customer's Address</b>
                                <input type="text" placeholder="Type here" onChange={e => inputHandle_V1(e, "customer", "address")} />
                                <b>Customer's PhoneNumber</b>
                                <input type="text" placeholder="Type here" onChange={e => inputHandle_V1(e, "customer", "phone_number")} />
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
                                    <button id="add-product-btn" onClick={() => { addRow(); console.log("add"); }}><img id="add-icon" src={PlusPic} /> Add a product</button>
                                </div>
                            </div>
                        </div>
                        <div className="btn-row">
                            <button id="sendBtn" onClick={e => postData("http://localhost:8080/api/auth/uploadOrder")}> {SendOrderPic} <b> Create Order </b></button>
                            <div className="status-btn-container">
                                <button id="sendBtn" onClick={() => showAndHideHandler(buttonsGroup.current["status-btn-gp"])}> {MenuBtn} <b>Order Type {orderType ? " : " + orderType : null}</b> </button>
                                <div className="status-btn-gp" ref={el => { if (el) buttonsGroup.current["status-btn-gp"] = el }}>
                                    {orderStatus.map((el, index) =>
                                        <button key={index} onClick={() => setOrderType(el)}>{el} </button>)}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateOrder;