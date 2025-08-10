import { useState, useContext } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { WebContext } from './Auth'
import NavBar from './Nav/Nav'
import HomePage from './HomePage/Home'
import PublicPage from "./PublicPage/PublicPage.jsx"
import AdminDashBoard from './AdminDashBoard/AdminDashBoard'
import RouteGuard from './RouteGuard'
function App() {
  let user = useContext(WebContext);
  //rendering
  return (
    <>
      <div>
        <h1>hello world</h1>
        <NavBar />
        <h1>{user.role}</h1>
        <RouteGuard>
          <Routes>
            <Route path='/Home' element={HomePage}></Route>
            <Route path='/Admin' element={AdminDashBoard}></Route>
            <Route path="/publicPage" element={PublicPage}></Route>
          </Routes>
        </RouteGuard>
      </div>
    </>
  )
}

export default App
