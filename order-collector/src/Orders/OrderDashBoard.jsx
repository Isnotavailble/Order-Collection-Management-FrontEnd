
import "./OrderDashBoard.css"
import SearchBar from "./SearchBar.jsx";
function OrderDashBoard() {
    return (
        <div className="order-dashboard-contianer">
            <h1>Order DashBoard</h1>
            <div className="board-upper-row">
                <SearchBar />

                <button id="default-btn" >Default</button>
                <button id="pending-btn">pending</button>
                <button id="complete-btn">complete</button>
                <button id="cancelled-btn">cancelled</button>

            </div>
        </div>
    );
}
export default OrderDashBoard;