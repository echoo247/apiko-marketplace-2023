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
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import SavedProduct from "./pages/SavedProduct";
import {useAppDispatch, useAppSelector} from "./features/redux-hooks";
import { auth } from './firebase-config/firebase';
import { onAuthStateChanged } from "firebase/auth";
import {removeUser, setUser} from "./features/authSlice";


function App() {
    const navigation = useNavigate()
    const dispatch = useAppDispatch()
    const {isAuth} = useAppSelector(state => state.auth)

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const userId = user.uid;
                dispatch(setUser({id: userId}))
                // ...
            } else {
                dispatch(removeUser())
                navigation('/login', { replace: true })
                console.log("user is logged out")
            }
        });

    }, [isAuth])
  return (
        <div className="wrapper">
            <Routes>
                <Route path='/'>
                    <Route index element={<Home />}/>
                    <Route path={routes.PRODUCT_UPLOAD} element={<ProtectedRoute isAuth={isAuth}><AddProduct /></ProtectedRoute>}/>
                    <Route path={routes.PROFILE} element={<ProtectedRoute isAuth={isAuth}><Profile /></ProtectedRoute>}/>
                    <Route path={routes.PROFILE_EDIT} element={<ProtectedRoute isAuth={isAuth}><EditProfile /></ProtectedRoute>}/>
                    <Route path={routes.LOGIN} element={<Login />}/>
                    <Route path={routes.SAVED} element={<SavedProduct />}/>
                    <Route path={routes.REGISTER} element={<Register />}/>
                    <Route path={routes.PRODUCT} element={<ProductPage />}/>
                </Route>
            </Routes>
        </div>

  );
}

export default App;
