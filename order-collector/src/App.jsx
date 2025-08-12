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

function App() {
  let { user } = useContext(WebContext);
  let userLocation = useLocation();
  useEffect(() => {
    console.log("user at : " , userLocation);
  },[]);
  return (
    <>
      {userLocation.pathname !== "/login" || userLocation.pathname !== "/register" ? null : <NavBar/> }
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/public" element={<PublicPage />} />

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
    </>
  );
}

export default App;
