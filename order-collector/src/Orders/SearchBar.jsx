import "./SearchBar.css";
import { useEffect, useRef, useState } from "react";
const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
</svg>
function SearchBar({ setData, filterOrder }) {
    let refObj = useRef({});
    let [input, setInput] = useState("");
    let [selected, setSelected] = useState("");
    let options = [
        "Order ID",
        "Customer",
        "Address",
        "Phone Number",
        "Ordered Date",
        "Due Date",
        "Product Name"];
    let handle_search = () => {
        let searchBy = String(selected).replace(/\s+/g, "").toLowerCase();
        if (searchBy === "Due Date" || searchBy === "Ordered Date") {

        }
        console.log("In : " + searchBy);
        filterOrder(searchBy, input.trim(), 2);
    }
    let input_type = () => {
        if (selected.includes("Date")) {
            return "date";
        }
        else if (selected.includes("Number") || selected === "Order ID")
            return "number";
        return "text";
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
                    <button id="search-btn"
                        onClick={e => {
                            setInput(prev => input_type() === "date" ? "mm/dd/yy" : "");
                            handle_search();
                        }
                        }>{searchIcon}</button>
                    <input type={input_type()} placeholder="search order by ..."
                        value={input}
                        onChange={e => {
                            setInput(e.target.value);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                setInput(input_type() !== "date" ? "" : "mm/dd/yy");
                                handle_search();

                            }
                        }}
                    />
                    <button onClick={() => { handle_options(); }}>{selected ? selected : "options"}</button>

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