import React from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner';

const PrivaterRoute = ({children}) => {
    const {user,loading}=use(AuthContext)
    const location = useLocation();
    if(loading){
        return <LoadingSpinner/>
    }

    if(!user){
       return    <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children
};

export default PrivaterRoute;