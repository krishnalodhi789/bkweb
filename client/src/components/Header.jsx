import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'
import {createContext,useReducer } from 'react'
import {reducer, initialState} from '../Reducer/UseReducer'

export const UserContext = createContext();
const Header = ()=>{
  const [state,dispatch] = useReducer(reducer , initialState)
	return (
	<>
	<UserContext.Provider value={{state, dispatch}} >
		<div className="d-flex flex-column" style={{height:"100%"}}>
			<div><NavBar /></div>
			<div className="h-auto"><Outlet /></div>
			<div className="mt-auto p-0 mt-3"><Footer /></div>		
		</div>
	</UserContext.Provider>
  </>
  )
}
export default Header;