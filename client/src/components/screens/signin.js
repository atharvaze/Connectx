import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {userContext} from '../../App';
import M from 'materialize-css';
const Signin = () => {
    const {state,dispatch} = useContext(userContext)
    const history = useHistory()
    
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

    const postData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: "Invalid Email!", classes:"#d32f2f red darken-2" })
        }
        fetch('/signin',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password,
        
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: data.error, classes:"#d32f2f red darken-2" })
        }
        else{
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html:"Signed in Successfully!",classes:"#388e3c green darken-2"})
            //console.log(data)


            history.push('/')
        }
    })
    }
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Connectx</h2>
                <input type="text" placeholder="email" 
                value={email} 
                onChange = {(e)=> setEmail(e.target.value)}
                />
                <input type="password" placeholder="password" 
                value={password} 
                onChange = {(e)=> setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" type="submit" name="action"
                onClick={()=>postData()}
                >Sign-in
    
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>

            </div>
        </div>
    )
}

export default Signin 