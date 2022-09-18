import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState} from 'react';
import registerPic from '../images/register_pic.jpg'
import UserVerification from './UserVerification'

const Registretion = ()=>{
	const navigate = useNavigate();
	const [detail, SetDetail] = useState({
		name:"",
		email:"",
		mobile:"",
		dob:"",
		city:""
	});
	const [ OTP ,setOTP] = useState('')
	const [ userVerify ,setUserVerify] = useState(false)

	const getData = (event)=>{
		const { name, value } = event.target;
		SetDetail({...detail, [name]:value})
	}

	const register =async (event)=>{
		event.preventDefault();
		const { email} = detail;
		try{
				const res =await fetch("/api/emailVerify",{
				method:"POST",
				headers:{ "Content-Type" : "application/json" },
				body:JSON.stringify({email})
			})
			const data = await res.json();
			console.log(res.status)
			if(res.status === 200){
				setOTP(data.otp)
				setUserVerify(true)
			}
			else{
					window.alert(data.msg);
			}
		}catch(error){
			console.log(error)
		}
	}

	return (
	<>{
		(userVerify)?<UserVerification 
							userData = {detail}
							otp ={OTP}
						/> :
			<div className="container-fluid h-100  my-3">
				<div className="row justify-content-center align-items-center h-100">
					<div className="col-10 col-lg-8 col-md-9 shadow-lg mb-3 rounded">
						<div className="row h-100 p-lg-3 p-2 ">
							<div className="col col-sm-5 col-lg-5 col-md-5 text-center d-flex flex-column justify-content-center">
								<img src={registerPic} 
										className="img-fluid h-75 w-100" alt="img" />
								<div className="py-3">
									<NavLink to="/login" className="fw-semibold py-3 text-primary">
										Login Now.
									</NavLink>
								</div>
							</div>
							<div className="col-xs-12 col-lg-6 col-sm-7 col-md-6 py-md-4 py-sm-3 py-lg-1">
								<h3 className="mb-3 text-center ">Sign Up</h3>
							{/* Form ----------*/}
								<form method="POST" onSubmit={register} className="py-lg-3">
									<div className="form_field rounded mb-3">
										<label htmlFor="name">
											<i className="bi bi-person-fill"></i>
										</label>
										<input 
											type="text"
											placeholder="Your Name" 
											id="name"
											name="name"
											value={detail.name}
											onChange={getData}
										/>
									</div>	
									<div className="form_field rounded mb-3">
										<label htmlFor="email">
											<i className="bi bi-person-plus-fill"></i>
										</label>
										<input 
											type="text"
											placeholder="Email Address" 
											id="email" 
											name="email"
											value={detail.email}
											onChange={getData}
										/>
									</div>
									<div className="form_field rounded mb-3">
										<label htmlFor="mobile">
											<i className="bi bi-telephone-forward-fill"></i>
										</label>
										<input 
											type="text"
											placeholder="Mobile No." 
											id="mobile" 
											name="mobile"
											value={detail.mobile}
											onChange={getData}
										/>
									</div>
									<div className="form_field rounded mb-3">
										<label htmlFor="dob">
											<i className="bi bi-calendar-date-fill"></i>
										</label>
										<input 
											type="date"
											placeholder="Date Of Birth" 
											id="dob" 
											name="dob"
											value={detail.dob}
											onChange={getData}
										/>
									</div>
									<div className="form_field rounded mb-3">
										<label htmlFor="city">
											<i className="bi bi-geo-alt-fill"></i>
										</label>
										<input 
											type="text"
											placeholder="City " 
											id="city" 
											name="city"
											value={detail.city}
											onChange={getData}
										/>
									</div>
									<div >
										<button type="submit" className="submit_btn my-3 rounded" >
											Submit
										</button>
									</div>	
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		}
  </>
  )
}
export default Registretion;