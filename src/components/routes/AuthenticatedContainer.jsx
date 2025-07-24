import React from 'react'
import Navbar from '../Navbars/MainNavbar'
import {
  Outlet,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthenticatedContainer() {
  const { topFive } = useSelector((state) => state.pharmacy)
  return (
    <> 
    <div className="" style={{ height: '100vh' }}>
     <Navbar />
     {/* <div style={{ height: 52 }} /> */}
     <div style={{marginTop: topFive.length ? '105px' : '75px'}}>
     <Outlet />
     </div>
   </div>
    </>
    
  )
}

export default AuthenticatedContainer
