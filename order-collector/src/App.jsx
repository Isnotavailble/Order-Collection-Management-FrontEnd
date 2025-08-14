import { useContext, useEffect } from 'react';
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
function App() {
  let { user } = useContext(WebContext);
  let userLocation = useLocation();
  useEffect(() => {
    console.log("user at : ", userLocation);
  }, [userLocation.pathname]);
  return (
    <>
      <CustomDivHandler pathName={userLocation.pathname}>
        <ProfileRow />
        <NavBar />
      </CustomDivHandler>

      <div className='context'>
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
          element={<CreateOrder/>}/>

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
