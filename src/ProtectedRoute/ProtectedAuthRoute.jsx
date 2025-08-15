import React, { useContext } from 'react'
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { authContext } from '../Context/authContext';

const ProtectedAuthRoute = ( {children} ) => {
    const {isLoggedIn} = useContext(authContext);
  return !isLoggedIn ? children : <Navigate to = {'/'} />;
}

export default ProtectedAuthRoute