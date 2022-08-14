import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function SecureRoute() {
  const getAuth = ()=>{
    let token = localStorage.getItem('token');
    return token;
  }
  let auth = getAuth();
  return (
    <>
        {auth ?  <Outlet /> :  <Navigate to="/login" /> }
    </>
  )
}

export default SecureRoute