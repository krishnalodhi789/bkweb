import { useState, useEffect} from 'react'
import CreatePass from './CreatePass'

const UserVerification = (props)=>{
	const [userOTP, setUserOTP] = useState('');
	const [userVerified, setUserVerified] = useState(false)
	useEffect(()=>{
		setTimeout(()=>{
			props.otp = ''
		},60*1000)
	})

	const goSubmit = async(event)=>{
		event.preventDefault()
		if(userOTP != props.otp){
			window.alert("Wrong OTP")
		}
		else{
			setUserVerified(true)
		}
	}
	return(
	  <>
	 { 
	 	(userVerified)? <CreatePass 
	 							userData = {props.userData}
	 						/>
	 						:
	<div className="container-fluid p-5">
		<div className="row justify-content-center">
			<div className="col-lg-4 col-md-5 col-sm-8 col-10 shadow-lg p-4">
				<h2 className="text-center">OTP Verification</h2>
				<div className=" p-2 rounded my-3 " style={{backgroundColor:"#83ddb3"}}>
					<p className="m-0 fw-semibold text-center"style={{fontSize:14}}>
						We've sent a verification code to your 
						Email - bklodhi901@gmail.com 
					</p>
				</div>
				<form onSubmit={goSubmit} >
					<input 
						type="text" 
						className="form-control  fw-semibold text-dark" 
						placeholder="Enter Verification code"
						value = {userOTP}
	 	  				onChange ={(e)=>setUserOTP(e.target.value)}
					/>
					<button
						type="submit" 
						className="btn btn-outline-secondary  p-2 text-center w-100 fw-bold my-2 text-white" 
						>
						Submit
					</button>
				</form>
				<button
						className="btn btn-outline-secondary p-2 text-center w-100 fw-bold my-2 text-white" 
						>
						Submit
					</button>
			</div>
		</div>
	</div>
	}
	  </>
	)
}
export default UserVerification