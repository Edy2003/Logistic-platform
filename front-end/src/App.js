import './App.css';
import Home from './components/home/Home';
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/header";
import Info from "./components/info/info";
import Orders from "./components/orders/orders";
import GetOrder from "./components/get order/getOrder";
import CreateOrder from "./components/create-order/createOrder";
import React from "react";

function App() {
  return (
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/home/info' element={<Info />} />
                  <Route path='/home/orders' element={<Orders />} />
                  <Route path='/home/get-order' element={<GetOrder />} />
                  <Route path='/home/create-order' element={<CreateOrder />} />
              </Routes>
          </BrowserRouter>
  );
}

export default App;
