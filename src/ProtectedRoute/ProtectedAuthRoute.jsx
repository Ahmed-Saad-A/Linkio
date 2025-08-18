import React, { useContext } from 'react'
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../Context/authContext';

const ProtectedAuthRoute = ( {children} ) => {
    const {isLoggedIn} = useContext(AuthContext);
  return !isLoggedIn ? children : <Navigate to = {'/'} />;
}

export default ProtectedAuthRoute