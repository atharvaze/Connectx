import React, { useState, useEffect,useContext } from 'react';
import {userContext} from '../../App';
import {Link} from 'react-router-dom';
const Home = () => {
    const [data, setData] = useState([])
    const {state,dispatch} = useContext(userContext)
    useEffect(() => {
        fetch('/allposts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            const newData = data.map(item=>{
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        })
    }
    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            const newData = data.map(item=>{
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:postId,
                text:text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(
        console.log("hey"))
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card">
                            <h5 style={{padding:"6px"}}><Link to={item.postedBy._id !== state._id?`/userprofile/${item.postedBy._id}`:'/profile' }>{item.postedBy.name}</Link> {item.postedBy._id == state._id
                            && <i className="material-icons"
                            onClick={()=>{deletePost(item._id)}} 
                            style={{float:"right"}}>delete</i>
                             }</h5>
                            <div className="card-image">
                                <img src={item.photo} />
                            </div>
                            <div className="card-content">
                                
                                {item.likes.includes(state._id)
                                ?<i className="material-icons" style={{ color: "red" }}
                                onClick={()=>{unlikePost(item._id)}}>favorite</i>:
                                <i className="material-icons"
                                onClick={()=>{likePost(item._id)}}>favorite_border</i>}


                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                            <h6><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>&nbsp;{record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)

                                }}>
                                <input type="text" placeholder="add a comment" />
                                <button type="submit" style={{ background: "none" ,padding: "0px" ,border: "none"}}>
                                <i className="material-icons">send</i>
                                </button>
                                </form>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Home