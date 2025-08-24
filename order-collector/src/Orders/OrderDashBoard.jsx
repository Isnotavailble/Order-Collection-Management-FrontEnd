
import "./OrderDashBoard.css"
import SearchBar from "./SearchBar.jsx";
import OrderCardModel from "./OrderCardModel.jsx";
function OrderDashBoard() {
    return (
        <div className="order-dashboard-contianer">
            <h1>Order DashBoard</h1>
            <div className="board-upper-row">
                <SearchBar />
                <button id="default-btn" className="upper-btn">Default</button>
                <button id="pending-btn" className="upper-btn">pending</button>
                <button id="complete-btn" className="upper-btn">complete</button>
                <button id="cancelled-btn" className="upper-btn">cancelled</button>
            </div>
            <div className="order-cards-list">
                <OrderCardModel />
            </div>


        </div>
    );
}
export default OrderDashBoard;