import { useState, useEffect} from 'react';

const Home = ()=>{
 const [user, setUser ] = useState("");

	const getUserData = async()=>{
		try{
			const res = await fetch("/api/getData",{
						Method:"GET",
						Headers:{							
						 "Content-Type" :"application/json"	
						},
				})
			const data =await res.json();
			if(! res.status === 200){
				const error = new Error(res.error)
				throw error;
			}
			setUser(data.name);
		}
		catch(error){
		}
	}

	useEffect (()=>{
		getUserData();
	},[])
	return (
	<>
		<div className="container-fluit home_sect" style={{height:"85vh"}}>
			<div className="d-flex flex-column h-100 
					justify-content-center align-items-center">
				<h5 style={{color:"#1f8dbb",letterSpacing:"3px"}}>WELCOME</h5>
				<h1>{user || "We Are The MERN Developer."}</h1>
				<h4>{user && "Heppy, to see you back"}</h4>
			</div>
		</div>
  </>
  )
}
export default Home;