import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { WebContext } from './Auth';
import NavBar from './Nav/Nav';
import HomePage from './HomePage/Home';
import PublicPage from "./PublicPage/PublicPage.jsx";
import AdminDashBoard from './AdminDashBoard/AdminDashBoard';
import RouteGuard from './RouteGuard';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import ProfileRow from './UpperRow/ProfileRow.jsx';
import CustomDivHandler from './CustomDivHandler.jsx';
import CreateOrder from './CreateOrderPage/CreateOrder.jsx';
import EditOrders from './EditOrdersPage/EditOrder.jsx';
import OrderDashBoard from './Orders/OrderDashBoard.jsx';
function App() {
  let { user, menu } = useContext(WebContext);
  let [contentHeight,setContentHeight] = useState(0);
  let userLocation = useLocation();
  let resizeOberver = new ResizeObserver((entries) => {
    let { height } = entries[0].contentRect;
    setContentHeight(height);
    //menu.current["menu-clone"].style.height = height + "px";
  });
  useEffect(() => {
    resizeOberver.observe(document.getElementById("page-content"));
    return () => resizeOberver.disconnect;
  }, []);
  useEffect(() => {
    if (menu.current["menu-clone"])
    menu.current["menu-clone"].style.height = contentHeight + "px";
    console.log("Height : " + contentHeight + "px");
  },[contentHeight]);
  
  useEffect(() => {
    console.log("user at : ", userLocation);
    if(userLocation.pathname === "/" || userLocation.pathname.toLowerCase() === "/login" || userLocation.pathname.toLowerCase() === "/register"){
      document.getElementById("page-content").style.marginTop = "0px";
      return;
    }
    //updated : handle redirecting from login and register page
    //load the style before CSS file is load.(Safest way)
    document.getElementById("page-content").style.marginTop = "130px";
    return () => {}
  }, [userLocation.pathname]);

  return (
    <>
      <CustomDivHandler pathName={userLocation.pathname}>
        <ProfileRow />
        <NavBar />
        <div className='cloneNav' ref={element => { if (element) menu.current["menu-clone"] = element }}> </div>
      </CustomDivHandler>
      <div className='context' id="page-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/public" element={<PublicPage />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <HomePage />
            }
          />

          <Route
            path='/createorders'
            element={<CreateOrder />} />

          <Route path="/editorders" element={<EditOrders/>}/>
            <Route path="/ordersdashboard" element={<OrderDashBoard/>}/>
          <Route
            path="/admin"
            element={
              <RouteGuard>
                <AdminDashBoard />
              </RouteGuard>
            }
          />

          {/* Redirect unknown routes */}
          <Route
            path="*"
            element={<Navigate to={user.role === 'Guest' ? "/login" : "/home"} replace />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
