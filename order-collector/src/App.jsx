import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
  let { user, menu, setUser } = useContext(WebContext);
  let [loading, setLoading] = useState(true);
  let [contentHeight, setContentHeight] = useState(0);
  let userLocation = useLocation();
  let resizeOberver = new ResizeObserver((entries) => {
    //let navigator = useNavigate(); 
    let { height } = entries[0].contentRect;
    setContentHeight(height);
    //menu.current["menu-clone"].style.height = height + "px";
  });

  //on the app load for all pages 
  //check the session if exist auto auto redirect to home page
  //no need to login and register
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/auth/me", {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => { throw new Error(e.message || "Unknow Erro") });
        return res.json()
      })
      .then(data => {
        setUser(prev => ({ ...prev, user_name: data.username, id: data.id, role: "User", email: data.email }));
        setLoading(false);
        console.log("data of me : ", data);
      })
      .catch(error => {
        console.log("Error : ", error.message);
        setLoading(false);
      });
    if (document.getElementById("page-content"))
      resizeOberver.observe(document.getElementById("page-content"));
    return () => resizeOberver.disconnect;
  }, []);
  useEffect(() => {
    console.log("User : ", user);
    return () => { }
  }, [user]);
  useEffect(() => {
    if (menu.current["menu-clone"])
      menu.current["menu-clone"].style.height = contentHeight + "px";
    console.log("Height : " + contentHeight + "px");
  }, [contentHeight]);

  useEffect(() => {
    //reset the scroll 
    window.scrollTo(0, 0);
    console.log("user at : ", userLocation);
    if (userLocation.pathname === "/" || userLocation.pathname.toLowerCase() === "/login" || userLocation.pathname.toLowerCase() === "/register") {
      document.getElementById("page-content").style.marginTop = "0px";
      return;
    }

    //updated : handle redirecting from login and register page
    //load the style before CSS file is load.(Safest way)
    document.getElementById("page-content").style.marginTop = "130px";
    return () => { }
  }, [userLocation.pathname]);

  //loading debug
  useEffect(() => {
    console.log("loading.... : ", loading);
  }, [loading])

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
          {user.id === 0 && loading === false ? <Route path="/" element={<PublicPage />} /> : null}
          {user.id === 0 && loading === false ? <Route path="/login" element={<Login />} /> : null}
          {user.id === 0 && loading === false ? <Route path="/register" element={<Register />} /> : null}
          {/* Protected routes */}

          <Route
            path="/home"
            element={
              <RouteGuard>
                <HomePage />
              </RouteGuard>
            }
          />

          <Route
            path='/createorders'
            element={
              <RouteGuard>
                <CreateOrder />
              </RouteGuard>
            } />

          <Route path="/editorders" element={<RouteGuard><EditOrders /></RouteGuard>} />
          <Route path="/ordersdashboard" element={<RouteGuard><OrderDashBoard /></RouteGuard>} />
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
