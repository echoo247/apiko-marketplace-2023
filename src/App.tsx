import React, {useEffect} from 'react';
import './App.css';
import { Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import {routes} from "./route/routes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import {ProtectedRoute} from "./route/ProtectedRoute";
import {useCheckIsAuthQuery} from "./store/userAPI";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
    const navigation = useNavigate()
    const userId = window.localStorage.getItem('userId') || '';

    const {status} = useCheckIsAuthQuery(Number(userId))

    useEffect(() => {
        if(status === 'rejected') {
            navigation('/login')
        }
    }, [status])

  return (
        <div className="wrapper">
            <Routes>
                <Route path='/'>
                    <Route index element={<Home />}/>
                    {/*<ProtectedRoute path={routes.PRODUCT_UPLOAD} element={<AddProduct />}/>*/}
                    <Route path={routes.PRODUCT_UPLOAD} element={<ProtectedRoute><AddProduct /></ProtectedRoute>}/>
                    <Route path={routes.PROFILE} element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
                    <Route path={routes.PROFILE_EDIT} element={<ProtectedRoute><EditProfile /></ProtectedRoute>}/>
                    <Route path={routes.LOGIN} element={<Login />}/>
                    <Route path={routes.REGISTER} element={<Register />}/>
                    <Route path={routes.PRODUCT} element={<ProductPage />}/>
                </Route>
            </Routes>
        </div>

  );
}

export default App;
