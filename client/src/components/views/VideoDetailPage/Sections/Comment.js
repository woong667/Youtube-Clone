import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    const user =useSelector(state=>state.user); //redux-hook을 사용하여(useSelector)를 사용.. Storidge 써도 되지만 이렇게 로그인한 user정보 가져오자
    const [commentValue, setcommentValue] = useState("")
    const handleClick=(event)=>{
          setcommentValue(event.currentTarget.value);
    }

    const Variable={
        content:commentValue,
        writer:user.userData._id, //리덕스에서 userId가져오기.
        postId:props.postId
    }

    const onSubmit=(event)=>{
         event.preventDefault();  //이건 계속 나왔던 button을 submit을 해도 페이지 로딩이 되지않게 막아주는 코드 중요중요
         Axios.post('/api/comment/saveComment',Variable)
         .then(response=>{
             if(response.data.success){
                 console.log(response.data);
                 setcommentValue("");
                 props.refreshFunction(response.data.result);
             }
             else{
                  alert('정보를 받아오지 못했습니다.')
             }
         })
        }
    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* comment Lists */}
            {props.CommentLists&&props.CommentLists.map((comment,index)=>(
                (!comment.responseTo&&
                <React.Fragment>
                <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId}/> 
                <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={props.postId} CommentLists={props.CommentLists}/>
                </React.Fragment>
                 )
                   
            ))}
        

            <form style={{display:'flex'}} onSubmit={onSubmit}>
              <textarea 
               style={{width:'100%' ,borderRadius:'5px'}}
               onChange={handleClick}       //여기와 위에 handleClick 함수가 전형적인 입력을 받을때 사용하는 코드
               value={commentValue}
               placeholder='댓글을 작성해 주세요(욕설,비방,광고 금지)'
               />
               <br />
               <button style={{width:'20%',height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment