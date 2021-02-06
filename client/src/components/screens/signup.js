import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage]= useState("")
    const [url,setUrl] = useState(undefined)

    //to make network request
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: "Invalid Email!", classes:"#d32f2f red darken-2" })
        }
        fetch('/signup',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            password,
            email,
            pic:url
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: data.error, classes:"#d32f2f red darken-2" })
        }
        else{
            M.toast({html:data.message,classes:"#388e3c green darken-2"})
            history.push('/signin')
        }
    })
    }
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadpic = ()=>{
        
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","connectx")
        data.append("cloud_name","atharvaconnectx")
        fetch("https://api.cloudinary.com/v1_1/atharvaconnectx/image/upload",{
            method:"post",
            body:data
    
        })
        .then(res=>res.json())
        .then(data=>{
            
            setUrl(data.url)
            
        })
        .catch(err=>{
            console.log(err)
        })
    
    }
    const postData = ()=>{
        if(image){
            uploadpic()
        }
        else{
            uploadFields()
        }
        

    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Connectx</h2>
                <input type="text" placeholder="Name" 
                value={name} 
                onChange = {(e)=> setName(e.target.value)}
                />
                <input type="text" placeholder="email" 
                value={email} 
                onChange = {(e)=> setEmail(e.target.value)}
                />
                <input type="password" placeholder="password" 
                value={password} 
                onChange = {(e)=> setPassword(e.target.value)}
                />
            <div class="file-field input-field">
                <div class="btn #42a5f5 blue lighten-1">
                    <span>upload image</span>
                    <input type="file" 
                    onChange = {(e)=>setImage(e.target.files[0])}
                    />
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                </div>
            </div>
                <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" type="submit" name="action"
                onClick={()=>postData()}
                >Sign-in
    
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>


            </div>
        </div>
    )
}

export default Signup 