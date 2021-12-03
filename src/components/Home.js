import React, { useState, useEffect } from 'react'
import './Home.css'
import { NavLink } from 'react-router-dom'


function Home() {
    const [commentBox, setCommentBox] = useState(false)
    const [allPost, setAllPost] = useState([])
    const [postData, setPostData] = useState("")
    const [usedata, setUsedata] = useState({})

    const commentBoxFn = () => {
        setCommentBox(!commentBox)
    }

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("user"))
        console.log("hiiii", userData)
        const userdata = {
            email: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName
        }
        setUsedata(userdata)
        getAllPost()
    }, [])


    const getAllPost = async () => {

        const res = await fetch('http://3.138.93.70:8081/api/getAllPost', {

            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
            },
        })

        const data = await res.json()
        setAllPost(data)
        console.log("allpost", data)

    }


    const postBoxFn = async () => {
        console.log("postBoxFn", usedata)
        await fetch('http://3.138.93.70:8081/api/savePost', {

            method: "post",
            headers: {
                //   "access-control-allow-origin" : "*",
                "Content-type": "application/json",
                "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
            },
            body: JSON.stringify({
                "user": usedata,
                "postDetails": postData
            })

        })

        //       const data =await res.json()
        //       setAllPost(data)
        //   console.log("allpost",data)

    }

    return (
        <div className="comment_post">

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
                                            <textarea className="form-control" id="message" placeholder="Start a post" required="" onChange={(e) => setPostData(e.target.value)}></textarea>
                                        </div>
                                        <div>
                                            <button className="btn btn-normal pull-right" onClick={(e) => postBoxFn()}>Post</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>

                            <h3>All Post</h3>
                            {allPost.map(el => 
                            <div className="media">
                                <a className="pull-left" href="#"><img className="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
                                <div className="media-body">
                                    <h4 className="media-heading">{el.user.firstName}</h4>
                                    <p>{el.postDetails}</p>
                                    <ul className="list-unstyled list-inline media-detail pull-left">
                                        <li><i className="fa fa-calendar"></i>{el.postDate}</li>
                                        {/* <li><i className="fa fa-thumbs-up"></i>13</li> */}
                                    </ul>
                                    <ul className="list-unstyled list-inline media-detail pull-right">
                                        {/* <li className=""><a href="">Like</a></li> */}
                                        <li className="" onClick={() => commentBoxFn()}>Comment</li>

                                    </ul>
                                    {commentBox &&
                                        <fieldset>
                                            <div className="row">
                                                <div className="col-sm-3 col-lg-2 hidden-xs">
                                                    <img className="img-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                </div>
                                                <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                                    <textarea className="form-control" id="message" placeholder="write a Comment" required=""></textarea>
                                                </div>
                                                <div>
                                                    <button type="submit" className="btn btn-normal pull-right">Comment</button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    }
                                </div>
                            </div>
                            )}

                           
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
