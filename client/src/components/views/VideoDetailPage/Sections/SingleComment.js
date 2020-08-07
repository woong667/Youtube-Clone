import React,{useState} from 'react'
import {Comment,Avatar ,Button,Input} from 'antd';
import {useSelector} from 'react-redux';
import Axios from 'axios'

const {TextArea}=Input;
function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false);
    const user =useSelector(state=>state.user); 
    const [CommentValue, setCommentValue] = useState("")
    const onClickReply=()=>{
        setOpenReply(!OpenReply);
    }

    const onHandleChange=(event)=>{
        setCommentValue(event.currentTarget.value);
    }

   const onSubmit=(event)=>{
      event.preventDefault();  //이건 계속 나왔던 button을 submit을 해도 페이지 로딩이 되지않게 막아주는 코드 중요중요


      const variables={
        content:CommentValue,
        writer:user.userData._id, //리덕스에서 userId가져오기.
        postId:props.postId,
        responseTo:props.comment._id
         }  


      Axios.post('/api/comment/saveComment',variables)
     .then(response=>{
         if(response.data.success){
             console.log(response.data);
             setCommentValue("")
             setOpenReply(false);
             props.refreshFunction(response.data.result)
         }
         else{
              alert('정보를 받아오지 못했습니다.')
         }
     })
    }

    const actions=[   //Reply to 가 뜨도록 하는 코드
        <span onClick={onClickReply} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                  actions={actions}
                  author={props.comment.writer.name}
                  avatar={<Avatar src={props.comment.writer.image} alt/>} //avartar가 프사같은거였구만
                  content={<p>{props.comment.content}</p>}
                />
             {OpenReply&&     //openReply가 참일때만 아래 reply form이 보이게 해준다.
              <form style={{display:'flex'}} onSubmit={onSubmit}>
              <textarea 
               style={{width:'100%' ,borderRadius:'5px'}}
               onChange={onHandleChange}      //여기와 위에 handleClick 함수가 전형적인 입력을 받을때 사용하는 코드
               value={CommentValue}
               placeholder='댓글을 작성해 주세요(욕설,비방,광고 금지)'
               />
               <br />
               <button style={{width:'20%',height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>}
        </div>
    )
}
export default SingleComment