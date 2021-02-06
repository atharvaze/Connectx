
import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../App';

const Profile = () => {
    const [mypics, setPics] = useState([])
    const { state,dispatch } = useContext(userContext)
    const [image, setImage] = useState("")

    useEffect(() => {
        fetch('/profile', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setPics(result.mypost)
            })
    }, [])
    useEffect(() => {
        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "connectx")
            data.append("cloud_name", "atharvaconnectx")
            fetch("https://api.cloudinary.com/v1_1/atharvaconnectx/image/upload", {
                method: "post",
                body: data

            })
                .then(res => res.json())
                .then(data => {


                    //console.log(data)
                    //localStorage.setItem("user",JSON.stringify({...state,photo:data.url}))
                    
                    fetch('/updatepic',{
                        method:"PUT",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        },
                        body:JSON.stringify({
                            photo: data.url
                        })
                    }).then(res=>res.json())
                    .then(result=>{
                        //console.log(result)
                        localStorage.setItem("user",JSON.stringify({...state,photo:result.photo}))
                        dispatch({type:"UPDATEPIC",payload:result.photo})
                    })
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }, [image])
    const updatePhoto = (file) => {
        setImage(file)

    }
    return (
        <div style={{
            maxWidth: "550px",
            margin: "0px auto"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src={state ? state.photo : "loading"}
                    />
            <div class="file-field input-field " style={{margin:"10px"}}>
                <div class="btn #42a5f5 red darken-1">
                    <span>update Photo</span>
                    <input type="file" 
                    onChange = {(e)=>updatePhoto(e.target.files[0])}
                    />
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                </div>
            </div>

                </div>
                <div>
                    <h4>{state ? state.name : "loading"}</h4>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "108%"
                    }}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state.followers!=undefined ? state.followers.length : "0"} followers</h6>
                        <h6>{state.following!=undefined ? state.following.length : "0"} following</h6>
                    </div>
                    <div>
                    </div>

                </div>
            </div>

            <div className="gallery">
                {
                    mypics.map(item => {
                        return (
                            <img className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Profile