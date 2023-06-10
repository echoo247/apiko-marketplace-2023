import React from 'react';
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    isAuth: boolean, children: any
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuth, children }) => {

    if (!isAuth) {
        return <Navigate to="/login" replace></Navigate>
    }

    return children;


};

