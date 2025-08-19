
import "./EditOrder.css";
import "../CreateOrderPage/CreateOrderStyleWrapper.jsx";
import TrashPic from "../assets/trash.svg";
import PlusPic from "../assets/plus.svg";
import { useEffect, useRef, useState } from "react";
import CreateOrderStyleWrapper from "../CreateOrderPage/CreateOrderStyleWrapper.jsx";
const SendOrderPic = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
</svg>
const MenuBtn = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-menu-button-fill" viewBox="0 0 16 16">
    <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h8A1.5 1.5 0 0 0 11 3.5v-2A1.5 1.5 0 0 0 9.5 0zm5.927 2.427A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
</svg>

function EditOrders(props) {
    //for prodcut rows
    let [row, setRow] = useState([{ "id": Date.now(), "productName" : "", "price": "", "quantity": "" }]);
    //for orderType
    let orderType = ["Delivery", "PickUp"];
    //DOM
    let refObj = useRef({});
    //product table rows generator
    function generateRow(r) {
        if (r) {
            return (
                r.map((el) =>
                    <div className="row" key={el.id}>
                        <input type="text" placeholder="Type here"
                        />
                        <input type="text" placeholder="Type here"

                        />
                        <input type="number" placeholder="1" min="1"

                        />
                        <button ><img id="trash-pic" src={TrashPic}  onClick={() => {deleteRow(el.id);}}/></button>
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
        setRow(p => [...p, { "id": Date.now(), "productName": "", "price": 0 }]);
        console.log("Data added");
    }
    //animations
    function showAndHideHandler(element) {
        element.style.maxHeight = element.style.maxHeight !== "0px" ? "0px" : "150px";
    }
    useEffect(() => {
        refObj.current["status-btn-gp"].style.maxHeight = "0px";
    },[]);



    return (
        <CreateOrderStyleWrapper>
            <div className="create-order-content">
                <h1>Edit Order</h1>
                <input className="input-bar" type="number" placeholder="enter order ID"/> <button className="search-btn" onClick={() => {}}>Search</button>
                <div className="create-card">
                    <div className="form">
                        <div className="form-overlay">
                            <div className="form-left-side">
                                <b>Customer Name</b>
                                <input type="text" placeholder="Type here" />
                                <b>Customer's Address</b>
                                <input type="text" placeholder="Type here" />
                                <b>Customer's PhoneNumber</b>
                                <input type="text" placeholder="Type here" />
                                <b>Order Date</b>
                                <input type="date" placeholder="Type here" />
                                <b>Delivery/PickUp Date </b>
                                <input type="date" placeholder="Type here" />
                            </div>
                            <div className="form-right-side">
                                <div className="product-table">
                                    <div className="row rowHeader">
                                        <b>Product Name</b>
                                        <b>Price</b>
                                        <b>Quantity</b>
                                    </div>
                                    {generateRow(row)}
                                    <button id="add-product-btn" onClick={() => {addRow();}}><img id="add-icon" src={PlusPic} /> Add a product</button>
                                </div>
                            </div>
                        </div>
                        <div className="btn-row">
                            <button id="sendBtn"> {SendOrderPic} <b> Confirm Update </b></button>
                            <div className="status-btn-container">
                                <button id="sendBtn" onClick={() => showAndHideHandler(refObj.current["status-btn-gp"])}> {MenuBtn} <b> OrderType </b> </button>
                                <div className="status-btn-gp" ref={(el) => {if (el) refObj.current["status-btn-gp"] = el;}}>
                                    {orderType.map((el, index) =>
                                        <button key={index}>{el} </button>)}
                                </div>
                            </div>
                            <b id="status-ms" >Error status</b>
                        </div>
                    </div>
                </div>
            </div>
        </CreateOrderStyleWrapper>
    );
}
export default EditOrders;