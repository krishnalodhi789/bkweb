import { NavLink, useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react';
import loginPic from "../images/login_pic.jpg"

import { UserContext} from './Header'

const Login = ()=>{
		const {state, dispatch} = useContext(UserContext)
	const navigate = useNavigate()
	const [loginData, setLoginData] = useState({
		email:"",
		password:""
	})
	const [errorMsg, setErrorMsg ] = useState(false)

	const getLoginData = (event) =>{
		const {name, value} = event.target;
		setLoginData({...loginData, [name]:value})
	}

	const goLogin = async(event)=>{
		event.preventDefault();
		try{
				const res = await fetch("/api/login", {
					method : "POST",
					headers : { "Content-Type" : "application/json"},
					body : JSON.stringify(loginData)
				})
			const data = await res.json();
			if(res.status === 422 || !data){
				setErrorMsg(true)
				setLoginData({...loginData, password:""})
			}
			else{		
			dispatch({type:"USER", payload:true})		
				navigate("/")
			}
		}
		catch(error){
		console.log(error)
	}
	}

	return (
	<>
		<div className="container-fluid my-3"  style={{height:"auto"}}>
			<div className="row justify-content-center align-items-center h-100">
				<div className="col-10 col-lg-8 col-md-9 shadow-lg rounded">
					<div className="row h-100 p-lg-3 p-2 ">
						<div className="col col-sm-5 col-lg-6 col-md-6 text-center d-flex flex-column justify-content-center">
							<img src={loginPic} 
									className="img-fluid h-75" alt="img" />
							<div className="py-3">
								<NavLink to="registretion" className="fw-semibold py-3 text-primary">
									Create An Accound.
								</NavLink>
							</div>
						</div>
						<div className="col-xs-12 col-lg-6 col-sm-7 col-md-6 py-md-4 py-sm-3 py-lg-1">
							<h3 className="mb-3">Sign In</h3>
							{
								errorMsg && <div className="col p-2 border border-danger rounded position-relative">
									<i 
										className="bi bi-x-lg position-absolute top-0 end-0 me-2  p-1"
										onClick={()=>setErrorMsg(!errorMsg)} 
										style={{fontSize:"18px",fontWeight:"bold",cursor:"pointer"}}
									></i>
									<p className="m-0 text-danger fw-semibold" style={{fontSize:"14px"}}>
										Invalid Email or Password <br/>
										Please Check your Email ID and Password
									</p>
								</div>
							}

						{/* Form -------------------------*/}
							<form method="POST" onSubmit={goLogin} className="py-lg-3 py-2">
								<div className="form_field rounded mb-3">
									<label htmlFor="userName"><i className="bi bi-person-fill"></i></label>
									<input 
										type="email"
										placeholder="email Id"
										name="email"
										value={loginData.email}
										onChange={getLoginData}
									/>
								</div>	
								<div className="form_field rounded mb-3">
									<label htmlFor="userName"><i className="bi bi-lock-fill"></i></label>
									<input 
										type="password"
										placeholder="Password "
										name="password"
										value={loginData.password}
										onChange={getLoginData}
									/>
								</div>
								<div >
									<button type="submit" className="login_btn my-3 rounded" >
										Login
									</button>
								</div>	
								<div className="d-flex fs-5 mt-lg-3  m-0 ">
									<p className="fw-semibold me-lg-2 me-1 m-0">Or Login with:</p>
									<i className="bi bi-facebook mx-2" style={{color:"#20a3d9", cursor:"pointer"}}></i>
									<i className="bi bi-twitter mx-2" style={{color:"#20a3d9", cursor:"pointer"}}></i>
									<i className="bi bi-google mx-2" style={{color:"#20a3d9", cursor:"pointer"}}></i>
								</div>					
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
  </>
  )
}
export default Login;