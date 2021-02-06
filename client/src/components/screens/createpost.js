import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Createpost = () => {
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
        fetch('/createpost',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")

            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#d32f2f red darken-2" })
            }
            else{
                M.toast({html:"Posted Successfully!",classes:"#388e3c green darken-2"})
                //console.log(data)
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }




    },[url])

    const postDetails = ()=>{
        
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
    return (
        <div className="card input-field"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"

        }}
        >

            <input type="text" placeholder="title" 
            value={title} 
            onChange = {(e)=> setTitle(e.target.value)}
            />
            <input type="text" placeholder="body" 
            value={body} 
            onChange = {(e)=> setBody(e.target.value)}            
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
            onClick = {()=> postDetails()}
            >Submit Post
    
            </button>

        </div>
    )
}

export default Createpost