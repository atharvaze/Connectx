import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {userContext} from '../App'
const NavBar = () => {
    const {state,dispatch} = useContext(userContext)
    const history = useHistory()
    const renderList = ()=>{
        if(state){
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">CreatePost</Link></li>, 
                <li><Link to="/explore">Explore!</Link></li>, 
                <li>
                <button className="btn #d32f2f red darken-2"
                
                onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/signin')
                }}>
                Logout
                
                
    
                </button>
                </li> 
            ]
        }else{
            return [
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>

            ]
        }
    }
    return (
        <nav>
            <div class="nav-wrapper white">
                <Link to={state?"/":"/signin"} class="brand-logo left">Connectx</Link>
                <ul id="nav-mobile" class="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar