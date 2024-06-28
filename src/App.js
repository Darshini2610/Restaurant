import React from "react";
import {Route, Routes, BrowserRouter } from 'react-router-dom'
import Landing_page from "./Landing_Page";
import Restaurant from './Restaurant';
import Navbar from "./Navbar";
import Menubar from "./Menubar";
import Cart from "./cart";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = '/' Component={Landing_page} />
        <Route path = '/Restaurant' Component={Restaurant} />
        <Route path = '/Navbar' Component={Navbar} />
        <Route path = '/Menubar' Component={Menubar} />
        <Route path = '/Cart' Component={Cart} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
