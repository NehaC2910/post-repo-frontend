import React, { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { apiURLs } from './Constants'
import MessageIcon from '@mui/icons-material/Message';

function AllPost(props) {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const userdata = {
        email: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    }
    const [allPostData, setAllPostData] = useState([])
	const [showCommentMap, setShowCommentMap] = useState([])
    const [editPostValue, setEditPostValue] = useState("")
    const [editPost, setEditPost] = useState(false)
    const [postDataID, setPostDataID] = useState("")
	const [prevPostDataID, setPrevPostDataID] = useState("")
    ////////comment//////////
    const [postRes, setPostRes] = useState([])
    const [recentComment, setRecentComment] = useState("")
    const [updateComment, setUpdateComment] = useState("")
    const [showHideComments, setShowHideComments] = useState(false)
    const [activeCmtID, setActiveCmtID] = useState("")


    const AllPostsFn = async () => {
        try {
            const res = await fetch(`${apiURLs}/getAllPosts`, {
                method: "GET",
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json",
                    "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
                },
            })
            const data = await res.json()
			
            setAllPostData(data)
			const cloneShowCommentArr = []
			data.map(el=>cloneShowCommentArr.push(el.id: false))
			
			
			cloneShowCommentArr.map(eld=>cloneShowCommentArr[eld] = false)
			
			setShowCommentMap([...cloneShowCommentArr])
			
			console.log("showCOmmentMap", showCommentMap)
			
			console.log("showCOmmentMap1", cloneShowCommentArr)
						
			
            console.log("allpost", data)
        }
        catch (err) {
            //alert("getAllPost", err)
        }
    }


    const deletePostFn = async (id) => {
        try {
            console.log("delete Function id", id)
            await fetch(`${apiURLs}/${id}`, {

                method: "delete",
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json",
                    "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
                }
            })
            AllPostsFn()
        }
        catch (err) {
            alert("deleteBtnFn", err)
        }
    }

    const updatePostFn = async (postId, postDetails) => {
        setEditPost(!editPost)
        setPostDataID(postId)
        setEditPostValue(postDetails)
        setShowHideComments(false)
		
    }


    const CancelupdatePostFn = () => {
        setEditPost(false)

    }

    const SubmitupdatePostFn = async (id) => {

        await fetch(`${apiURLs}/${id}`, {
            method: "put",
            headers: {
                "access-control-allow-origin": "*",
                "Access-Control-Allow-Origin": "https",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Content-type": "application/json",
                "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
            },
            body: JSON.stringify({
                // "user": usedata,
                "postDetails": editPostValue,
            })
        })

        AllPostsFn()
        setEditPost(false)
        setEditPostValue("")

    }


    useEffect(() => {
        AllPostsFn()
    }, [])


    ////////////////////////////////////////////////////////////////

    const toggleCommentsFn = (el) => {
		setPrevPostDataID(postDataID)
	    setPostDataID(el.id)
        setPostRes(el)
		const value = showCommentMap[el.id]
        allPostData.map(elf=>setShowCommentMap({...showCommentMap, [elf.id]: false}))
		
        if(postRes){
			//alert(showCommentMap[el.id]);
			const cloneShowCommentArr = showCommentMap	
			//setShowCommentMap({...showCommentMap, [prevPostDataID]: false})
			if(value == 'undefined' || value == false){					
				
				setShowCommentMap({...showCommentMap, [el.id]: true})
			}
			else {				
				
				setShowCommentMap({...showCommentMap, [el.id]: !value})	
				
			}
            setEditPost(false)
            
        }
    }



    const AllCommentFn = async (id) => {

        try {
            console.log("delete Function id", id)
            const res = await fetch(`${apiURLs}/addComment/${id}`, {
                method: "put",
                headers: {
                    "access-control-allow-origin": "*",
                    "Access-Control-Allow-Origin": "https",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Content-type": "application/json",
                    "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
                },
                body: JSON.stringify({
                    "user": userdata,
                    "comment": updateComment
                })
            })
            const postResponse = await res.json()
            setPostRes(postResponse)
            console.log("dsadsaxczxc", postResponse)
            setUpdateComment("")

        }

        catch (err) {
            alert("update Comment Function", err)
        }


    }

    const saveCommentFn = async (postID, cmtId) => {

        try {
            const res = await fetch(`${apiURLs}/comment/${postID}/${cmtId}`, {
                method: "put",
                headers: {
                    //   "access-control-allow-origin" : "*",
                    "Content-type": "application/json",
                    "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
                },
                body: JSON.stringify({
                    "user": userdata,
                    "comment": recentComment
                })
            })

            const postResponse = await res.json()
            console.log("saveCommentFn", postResponse)
            setPostRes(postResponse)
            setActiveCmtID("")
			setShowCommentMap({...showCommentMap, [postID]: true})
			

        }
        catch (err) {
            alert("edit Comment Function", err)
        }
    }


    const editCommentFn = async (postID, cmtId, usercomment) => {
        setActiveCmtID(cmtId)
        setRecentComment(usercomment)
		const cloneShowCommentArr = []
		setShowCommentMap({...showCommentMap, [postID]: true})

    }

    const cancelCommentFn = async (postID, cmtId, usercomment) => {
        setActiveCmtID("")

    }




    const DltCommentFn = async (postID, cmtID) => {
        console.log("#@#@#@#", postID, cmtID)
        try {
            const res = await fetch(`${apiURLs}/${postID}/${cmtID}`, {
                method: "delete",
                headers: {
                    //   "access-control-allow-origin" : "*",
                    "Content-type": "application/json",
                    "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
                },

            })
            const postResponse = await res.json()
            console.log("%^^^^^^", postResponse)
            setPostRes(postResponse)
			const cloneShowCommentArr = []
			setShowCommentMap({...showCommentMap, [postID]: true})
        }
        catch (err) {
            alert("Delet Comment Function", err)
        }
    }

    return (
        <div>
            <h3>All Post</h3>
            {allPostData && allPostData.map(el =>
                <div className="media">
                    <a className="pull-left" ><img className="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
                    <div className="media-body">
                        <div className="post_heading">
                            <div> <h4 className="media-heading">{el.user && el.user.firstName}</h4></div>
                            <div className="postDate"> {el.postDate}</div>
                        </div>
                    </div>


                    <div>
                        {
                            userdata.email === el.user.email &&
                            <div className="postEditButtons">
                                {editPost && userdata.email === el.user.email && postDataID == el.id ?
                                    <div>
                                        <button className="btn btn-normal pull-right zoom" disabled={!editPostValue} type="text" onClick={(e) => SubmitupdatePostFn(el.id)}><SendIcon /></button>
                                        <button className="btn btn-normal pull-right zoom" onClick={(e) => CancelupdatePostFn()}><CancelIcon /></button>
                                    </div>
                                    :
                                    <button className="zoom" onClick={() => updatePostFn(el.id, el.postDetails)}> <EditIcon /></button>
                                }

                                <button className="zoom" onClick={() => deletePostFn(el.id)}><DeleteForeverIcon /></button>
                            </div>
                        }
                    </div>


                    {
                        editPost && userdata.email === el.user.email && postDataID == el.id ?
                            <div>
                                <textarea className="postSectionInput" onChange={(e) => setEditPostValue(e.target.value)} value={editPostValue} />
                            </div>
                            :
                            <div className="postSection">  {el.postDetails}</div>

                    }




                    <div className="postButtons zoom" onClick={() => toggleCommentsFn(el)} >Comment <MessageIcon /></div> <br />
						{console.log("CURRENT VAL",showCommentMap[el.id])}
                    {showCommentMap[el.id] && postDataID == el.id &&
                        <div className="commentData">

                            
                            {postRes.commentList && postRes.commentList.map(eld =>
                                eld.comment &&
                                <div className="commentDataAndBtn">
                                   
                                    <div className="fullCommentSection">
                                        <div className="commentfirstname">{eld.user.firstName}</div>: {eld.id != activeCmtID && <div className="allCommentText">{eld.comment}</div>}
                                        {eld.id == activeCmtID && <textarea className="editCommentTextarea" type="text" value={recentComment} onChange={(e) => setRecentComment(e.target.value)} />}
                                        <div style={{ float: 'right', fontSize: "samll" }}> {eld.postDate} </div>
                                    </div>

                                    {console.log("!!!!!!!!!!!!!!!!", eld.user.email, userdata.email)}
                                    {

                                        eld.user.email == userdata.email &&
                                        <div >
                                            <div> <button className="btn btn-normal pull-right zoom" onClick={() => DltCommentFn(postRes.id, eld.id)} ><DeleteForeverIcon /></button></div>

                                            {eld.id == activeCmtID ?
                                                <div>
                                                    <div> <button className="btn btn-normal pull-right zoom" disabled={!recentComment} onClick={() => saveCommentFn(postRes.id, eld.id, eld.comment)} > <SendIcon /></button></div>
                                                    <div> <button className="btn btn-normal pull-right zoom" onClick={() => cancelCommentFn(postRes.id, eld.id, eld.comment)} > <CancelIcon /></button></div>
                                                </div>
                                                :
                                                <div> <button className="btn btn-normal pull-right zoom" onClick={() => editCommentFn(postRes.id, eld.id, eld.comment)} > <EditIcon /></button></div>

                                            }
                                        </div>
                                    }
                                </div>
                            )}


                            <div className='commentSection'>
                                <div className="row " >
                                    <div className="col-sm-3 col-lg-2 hidden-xs">
                                        <img className="commentImg-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                    </div>
                                    <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                        {/* <textarea className="form-control" id="message" placeholder="write a Comment" required="" onChange={(e) => setRecentComment(e.target.value)}></textarea> */}
                                        <textarea className="commentTextarea" type="text" value={updateComment} onChange={(e) => setUpdateComment(e.target.value)} />
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-normal pull-right zoom" disabled={!updateComment} onClick={() => AllCommentFn(postRes.id)}><SendIcon /></button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    }
                </div>
            )}

        </div>
    )
}

export default AllPost
