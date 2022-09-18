import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const CreatePass = (props)=>{
	const navigate = useNavigate();
	const [userPass, setUserPass] = useState('')
	const [conformPass, setConformPass] = useState('')
	const goSubmit = async(event)=>{
		event.preventDefault()
		const {name, email, dob, mobile, city } = props.userData
		if(userPass != conformPass ){
			window.alert("Password and Conform Password are not Match.")
		}
		else{
			const password = userPass
			try{
					const res =await fetch("/api/registretion",{
					method:"POST",
					headers:{ "Content-Type" : "application/json" },
					body:JSON.stringify({name, email, dob, mobile, city, password})
				})
				if(res.status === 201){
					navigate('/login')
				}
				else{
					throw Error("Registration Failed")
				}
			}
			catch(err){
				console.log(err)
			}
		}
	}
	return(
<div className="container">
	  	<div className="row justify-content-center mt-3">
	  		<div className="col-9 col-sm-8 col-md-5 col-lg-4 p-3 shadow-sm ">
	  			<form method="POST" onSubmit={goSubmit} className="container-fluid">
						<div className="row bg-body justify-content-center row-cols-1 ">
							<div className="col p-2">
								<div className="form-floating">
									<input 
										type="email" 
										className="form-control fw-semibold ps-3" 
										id="userEmail" 
										placeholder=" Enter Name"
										value={props.userData.email}
									/>
									<label htmlFor="userEmail">Your Email</label>
								</div>
							</div>
							<div className="col p-2">
								<div className="form-floating">
									<input 
										type="password"
										className="form-control fw-semibold ps-3"
										id="Password" 
										placeholder=" Enter Password"
										value={userPass}
										onChange ={(e)=>setUserPass(e.target.value)}
									/>
									<label htmlFor="Password">Create Password</label>
								</div>
							</div>
							<div className="col p-2">
								<div className="form-floating">
									<input 
										type="password" 
										className="form-control fw-semibold ps-3" 
										id="conformPass" 
										placeholder=" Enter conform Passwid"
										value={conformPass}
										onChange ={(e)=>setConformPass(e.target.value)}

									/>
									<label htmlFor="conformPass">Conform Password</label>
								</div>
								<div >
										<button type="submit" className="submit_btn my-3 rounded" >
											Submit
										</button>
									</div>
							</div>
						</div>
					</form>	
	  		</div>
	  	</div>
	  </div>
 )
}

export default CreatePass;