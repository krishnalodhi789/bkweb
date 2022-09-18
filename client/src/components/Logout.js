import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from './Header'


const Logout = ()=>{
	const {state, dispatch} = useContext(UserContext)
	const navigate = useNavigate()
	const logout = async()=>{
	const res = await fetch("/api/logout",{
						Method:"GET",
						Headers:{							
						 "Content-Type" :"application/json"	
						},
				credentials : "include"
			})
		dispatch({type:"USER",payload:false})
		navigate("/login")

	}

	useEffect(()=>{
		logout()
	})
	return(
	       <h1 className="text-center my-5 text-light">Loading.........</h1>
	       )
}

export default Logout