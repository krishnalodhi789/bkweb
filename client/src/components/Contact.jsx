import {useState, useEffect, useMemo} from 'react';
import { useNavigate} from 'react-router-dom';

const Contact = ()=>{
	const navigate = useNavigate()
	const [user, setUser]= useState({
		name:"",
		email:"",
		mobile:"",
		message:"",

	});
	const [messageStatus, setMessageStatus] = useState("") 
	const [userMessage, setUerMessage] = useState("") 

	useEffect (()=>{

	const getUserData = async()=>{
		try{
			const res = await fetch("/api/getData",{
					Method:"GET",
					Headers:{
						Accept:"application/json",
					 "Content-Type" :"application/json"	
					},
					credentials:"include"
				})
			const data =await res.json();
			if(res.status === 401){
				const error = new Error(res.error)
				throw error;
			}	
			const {name, email, mobile} = data; // object Destructuring ---
			setUser({...user, name, email, mobile});
		}
		catch(error){
			navigate("/login")
			console.log(error)
		}
	}
		getUserData();
	},[])



	// Send message data to database -------- 
	const sendMessage = async(e)=>{
		e.preventDefault();
		try{		
			const { message,name, email, password,  } = user;
				const res =await fetch("/api/contactMe",{
				method:"POST",
				headers:{ "Content-Type" : "application/json" },
				body:JSON.stringify({ message, name, email, password })
				})

			const data = await res.json();
			setMessageStatus(()=>data)
			if(res.status === 201){
				setUerMessage(message)
				setUser({...user, message:""})
			}

		}
		catch(error){
			console.log(error)
		}
	}

	return (
	<>	
		{/* Pre-filled Fields -------------- */}
		<div className="container-fluid">
			<div className="row p-4 p-sm-2 justify-content-center">
				<div className="col-11">
					<div className="row bg-body justify-content-center row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-1">
						<div className="col p-2">
							<div className=" p-2 shadow-lg bg-white d-flex rounded ">
								<div className="d-flex align-items-center px-2 text-info fs-5">
									<i className="bi bi-telephone-fill"></i>
								</div>
								<div>
									<h5 className="m-0 p-0">Phone</h5>
									<p className="mt-1 m-0">+19 78988 21103</p>
								</div>
							</div>
						</div>
						<div className="col p-2 ">
							<div className=" p-2 shadow-lg bg-white d-flex rounded ">
								<div className="d-flex align-items-center px-2 text-info fs-5">
									<i className="bi bi-person-plus-fill"></i>
								</div>
								<div>
									<h5 className="m-0 p-0">Email ID</h5>
									<p className="mt-1 m-0">blodhi978@gmail.com</p>
								</div>
							</div>
						</div>
						<div className="col p-2">
							<div className=" p-2 shadow-lg bg-white d-flex rounded ">
								<div className="d-flex align-items-center px-2 text-info fs-5">
									<i className="bi bi-geo-alt-fill"></i>
								</div>
								<div>
									<h5 className="m-0 p-0">City </h5>
									<p className="mt-1 m-0">Maksi in M.P</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


	{/* Get In Touch ----------------------------*/}

		<div className="container-fluid">
			<div className="row py-4 justify-content-center">
				<div className="col-11 col-sm-9 col-md-8 col-lg-8  shadow-lg p-4">
					<h3>Get In Touch</h3>

				{/* Send Message Form ---------*/}
					<form method="POST" onSubmit={sendMessage} className="container-fluid">
						<div className="row bg-body justify-content-center row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-1 p-lg-3 p-lg-3 p-1">
							<div className="col p-2">
								<div className="form-floating">
									<input 
										type="text" 
										className="form-control fw-semibold ps-3" 
										id="userName" 
										placeholder=" Enter Name"
										value={user.name}
										name=""
									/>
									<label htmlFor="userName">Your Name</label>
								</div>
							</div>
							<div className="col p-2">
								<div className="form-floating">
									<input 
										type="email"
										className="form-control fw-semibold ps-3"
										id="email" 
										placeholder=" Enter Email"
										value={user.email}
										name="email"
									/>
									<label htmlFor="email">Your Email</label>
								</div>
							</div>
							<div className="col p-2">
								<div className="form-floating">
									<input 
										type="text" 
										className="form-control fw-semibold ps-3" 
										id="mobile" 
										placeholder=" Enter Mobile No"
										value={user.mobile}
										name="mobile"
									/>
									<label htmlFor="mobile">Your Mobile No.</label>
								</div>
							</div>
						</div>
						<div className="row p-1 p-sm-2 p-md-3 p-lg-3 py-2 ">
							<div className="col-12">
								<div className="form-floating" >
									<textarea  
										className="form-control fw-semibold" 
										id="message" 
										placeholder=" Enter message " 
										style={{height:100}}
										name="message"
										value={user.message}
										onChange={e=>setUser({...user,message:e.target.value})}
									/>
									<label htmlFor="message">Your Message</label>
								</div>
								{
									messageStatus && (
								      <div className="col-12 mt-3 rounded px-2 py-1 border border-success position-relative" style={{fontSize :15}}>
											<p className="mb-0 pb-1" style={messageStatus.status === 201 ? {display :"block"} : {display :"none"}}>
												<em>Message : </em>
												<strong>{userMessage}</strong>
											</p>
											<p className="mb-0 " style={messageStatus.status === 201 ? {color:"green"}:{color:"red"}} >
												{messageStatus.message}
											</p>
												<i className="bi bi-trash position-absolute end-0 top-0 me-2 fs-5" style={{cursor: "pointer"}}></i>

										</div>)
								}
							</div>
						</div>
						<div >
							<button type="submit" className="message_btn my-3 rounded" >Send Message</button>
						</div>
					</form>
				</div>
			</div>
		</div>
  </>
  )
}
export default Contact;