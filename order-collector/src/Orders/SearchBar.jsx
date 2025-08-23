import "./SearchBar.css";
import { useEffect, useRef, useState } from "react";

function SearchBar() {
    let refObj = useRef({});
    let [selected, setSelected] = useState("");
    let options = [
        "Order ID",
        "Customer",
        "Address",
        "Phone Number",
        "Date",
        "Product Name",
        "pending",
        "complete",
        "cancelled"];
    let handle_input = () => {
    }
    let selectAnOptions = () => {

    }
    let handle_options = () => {
        if (refObj.current["options"]) {
            refObj.current["options"].style.maxHeight = refObj.current["options"].style.maxHeight !== "0px" ? "0px" : "100px";
            refObj.current["options"].style.paddingTop = refObj.current["options"].style.paddingTop !== "0px" ? "0px" : "5px";
            refObj.current["options"].style.paddingBottom = refObj.current["options"].style.paddingBottom !== "0px" ? "0px" : "5px";

        }
    }
    //init for drop-down
    useEffect(() => {
        refObj.current["options"].style.maxHeight = "0px";
        refObj.current["options"].style.paddingTop = "0px";
        refObj.current["options"].style.paddingBottom = "0px";

    }, []);
    return (
        <div className="search-bar-content">
            <div className="orders-search-bar-container">
                <div className="orders-search-bar-row">
                    <input type="text" placeholder="search order by ..." /> <button onClick={() => { handle_options(); }}>{selected ? selected : "options"}</button>
                </div>
                <div className="search-by-options" ref={(el) => { if (el) refObj.current["options"] = el }}>
                    {
                        options.map((el, index) => <button key={index} onClick={() => { setSelected(el) }}>{el}</button>)
                    }
                </div>
            </div>
        </div>);
}
export default SearchBar;