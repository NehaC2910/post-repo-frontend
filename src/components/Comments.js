import React, { useState, useEffect } from 'react'
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import {apiURLs}  from './Constants'

function Comments(props) {
    const [postRes, setPostRes] = useState([])
    const [recentComment, setRecentComment] = useState("")
    const [updateComment, setUpdateComment] = useState("")
    const [showHideComments, setshowHideComments] = useState(false)

    const toggleCommentsFn = (id) => {
        console.log("showHideComments",showHideComments)
        setshowHideComments(!showHideComments)
        if(postRes == ""){
            setPostRes(props.elData)
        }
        
    }



    const AllCommentFn = async (id) => {

     try{
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
                    "user": props.userData,
                    "comment": updateComment
                })
            })
            const postResponse = await res.json()
            setPostRes(postResponse)
            console.log("dsadsaxczxc", postResponse)
            setUpdateComment("")
      
     }
     
     catch(err){
        alert("update Comment Function", err)
     }
     
     
    }

    const saveCommentFn = async(postID, cmtId)=>{

           try {
               if(recentComment)
            {
        const res = await fetch(`${apiURLs}/comment/${postID}/${cmtId}`, {
            method: "put",
            headers: {
                //   "access-control-allow-origin" : "*",
                "Content-type": "application/json",
                "Authorization": `Bearer  ${sessionStorage.getItem("jwttoken")}`
            },
            body: JSON.stringify({
                "user": props.userData,
                "comment":  recentComment
            })
        })

        const postResponse = await res.json()
        console.log("saveCommentFn", postResponse)
        setPostRes(postResponse)

      
        }

        else{
            alert("string can not be emtpy")
        }
    }
    catch (err) {
        alert("edit Comment Function", err)
    }
    }


    const editCommentFn = async (postID, cmtId, usercomment) => {
        setRecentComment(usercomment)
        const tempPostResponse = {...postRes}
        const newCmt = tempPostResponse.commentList.map(el => {
            if (el.id == cmtId) {
                el.isEdit = true
                return el
            }
            else {
                return el
            }
        })

        tempPostResponse.commentList = newCmt
        setPostRes(tempPostResponse)
        console.log("tempPostResponse", newCmt)

    }

    const cancelCommentFn = async (postID, cmtId, usercomment) => {
        setRecentComment(usercomment)
        const tempPostResponse = {...postRes}
        const newCmt = tempPostResponse.commentList.map(el => {
            if (el.id == cmtId) {
                el.isEdit = false
                return el
            }
            else {
                return el
            }
        })

        tempPostResponse.commentList = newCmt
        setPostRes(tempPostResponse)
        console.log("tempPostResponse", newCmt)

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
    }
    catch (err) {
        alert("Delet Comment Function", err)
    }
}


return (
    <div>

        <div className="postButtons zoom" onClick={() => toggleCommentsFn(props.postID)} >Comment <MessageIcon /></div> <br />

        {showHideComments &&
            <div className="commentData">
          
                {postRes.commentList && postRes.commentList.map(eld =>
                    postRes.id == props.postID && eld.comment &&
                    <div className="commentDataAndBtn">
                        <div className="fullCommentSection"> <div className="commentfirstname">{eld.user.firstName}</div>: {!eld.isEdit && <div className="allCommentText">{eld.comment}</div>} 
                        {eld.isEdit && <textarea  className="editCommentTextarea"  type="text" value={recentComment} onChange={(e)=>setRecentComment(e.target.value)}/>}
                       <div style={{float: 'right',fontSize:"samll"}}> {eld.postDate} </div>
                         </div>
                      
                    {console.log("!!!!!!!!!!!!!!!!",  eld.user.email  , props.userData.email )}
                        {
                            postRes.id == props.postID && 
                            eld.user.email == props.userData.email &&
                            <div >
                                <div> <button className="btn btn-normal pull-right zoom" onClick={() => DltCommentFn(props.postID, eld.id)} ><DeleteForeverIcon /></button></div>

                                {eld.isEdit ? 
                                <div>
                                <div> <button className="btn btn-normal pull-right zoom" onClick={() => cancelCommentFn(props.postID, eld.id,eld.comment)} > <CancelIcon/></button></div>
                                <div> <button className="btn btn-normal pull-right zoom" onClick={() => saveCommentFn(props.postID, eld.id,eld.comment)} > <SendIcon/></button></div>
                               </div>
                                :
                                <div> <button className="btn btn-normal pull-right zoom" onClick={() => editCommentFn(props.postID, eld.id,eld.comment)} > <EditIcon /></button></div>

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
                            <textarea className="commentTextarea"  type="text" value={updateComment} onChange={(e) => setUpdateComment(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-normal pull-right zoom" onClick={() => AllCommentFn(props.postID)}><SendIcon /></button>
                        </div>

                    </div>
                </div>

            </div>
        }


    </div>
)
}

export default Comments
