import React,{useState,useEffect} from 'react'
import './Home.css'
import { NavLink } from 'react-router-dom'
import PostAddIcon from '@mui/icons-material/PostAdd';
import AllPosts from './AllPosts'
import {apiURLs} from './Constants'

function Post() {
    const userData = JSON.parse(sessionStorage.getItem("user"))
    const userdata = {
        email: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName
    }

    const [postedData, setPostedData] = useState("")
    


    const postedBoxFn = async () => {

        try {
            if(postedData && userdata){
            await fetch(`${apiURLs}/savePost`, {
                method: "post",
                headers: {
                    //   "access-control-allow-origin" : "*",
                    "Content-type": "application/json",
                    "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
                },
                body: JSON.stringify({
                    "user": userdata,
                    "postDetails": postedData,
                })
            })
        }
        else{
            alert("Blank Post Not Allowed")
        }
        }
        catch (err) {
            alert("getAllPost", err)
            // console.log("postBoxFn", usedata, postData)
        }
            

    }

    return (
        <div>
            <div className="comment_post" style={{ display: 'grid', justifyContent: 'center' }}>

                <div>
                    <NavLink className="logoutButton" to="/">  LogOut </NavLink>

                </div>
                <section className="content-item" id="comments">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <form>
                                    <h3 className="pull-left">Create a post</h3>

                                    <fieldset>
                                        <div className="row">
                                            <div className="col-sm-3 col-lg-2 hidden-xs">
                                                <img className="img-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                                <textarea className="form-control" id="message" placeholder="Start a post" required="" onChange={(e) => setPostedData(e.target.value)}></textarea>
                                            </div>
                                            <div>
                                                <button className="btn btn-normal pull-right" disabled={!postedData} onClick={(e) => postedBoxFn()}>POST <PostAddIcon /></button>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>

                                <AllPosts userdata={userdata}/>


                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Post
