import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import {routes} from "./route/routes";
import Login from "./pages/Login";

function App() {
  return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route index element={<Home />}/>
                        <Route path={routes.PRODUCT_UPLOAD} element={<AddProduct />}/>
                        <Route path={routes.LOGIN} element={<Login />}/>

                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

  );
}

export default App;
