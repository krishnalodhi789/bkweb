import React, { useState,useMemo, useContext } from 'react'
import {NavLink } from 'react-router-dom';

import { UserContext} from './Header'
const NavBar = () => {
  const [userLogined, setUserLogined] = useState(false)
  const {state, dispatch} = useContext(UserContext)

  const menuRender =useMemo(()=>{
    if(state){
      return(
            <li className="nav-item">
               <NavLink className="nav-link" to="logout"><i className="pe-1 bi bi-people"></i>Logout</NavLink>
            </li>
      )
    }
    else{
      return(<>
       <li className="nav-item">
               <NavLink className="nav-link" to="login"><i className="pe-1 bi bi-people"></i>Login</NavLink>
              </li>
              <li className="nav-item btn btn-outline-danger  btn-sm py-0">
                 <NavLink className="nav-link  fw-bold fs-6" to="registretion">Registretion<i className="bi bi-arrow-bar-right fw-bold"></i></NavLink>
              </li>
              </>
      )
    }
  })
  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-expand-md shadow-sm  p-1">
       <NavLink className="navbar-brand fw-bold ps-4" to="/">
        <i className="bi bi-send-fill text-dark "></i>
         <span className="text-dark ps-1">BK</span>
         <span className="text-info">WEB</span>
       </NavLink>
       <button className="navbar-toggler me-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ms-auto pe-2 ps-3 py-1">
           <li className="nav-item">
             <NavLink className="nav-link" to="/"> <i className="pe-1 bi bi-house me-1 fw-bold " ></i>Home </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="contact"><i className="pe-1 bi bi-telephone"></i>Contact</NavLink>
           </li>
           
           {menuRender }
         </ul>  
       </div>
     </nav>

    </>
  )
}

export default NavBar