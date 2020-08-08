import React,{useEffect,useState} from 'react'
import {Tooltip,Icon} from 'antd'; 
import Axios from 'axios'

function LikeDisLike(props) {

    let variable={};

    const [likes, setlikes] = useState(0)
    const [dislikes, setdislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)
    if(props.video){      //전달받은 내용에 videoId가 있으면 비디오에 대한 좋아요 싫어요
        variable={videoId:props.videoId ,userId: props.userId}
    }else{ // videoId가 없으면 comment에 대한 좋아요 싫어요.
      variable={  commentId:props.commentId, userId:props.userId}
    }
    
    useEffect(() => {

        ////////////////////좋아요 갯수 가져오기/////////////////////
       Axios.post('/api/like/getLikes',variable).then(response=>{
           if(response.data.success)
           {
                //얼마나 많은 싫어요를 받았는지.
                setlikes(response.data.likes.length);

                // 내가 이미 그 싫어요를 눌럿는지.
                response.data.likes.map(like=>{
                         if(like.userId===props.userId){
                             setLikeAction('liked');
                         }
                })
           }else{
               alert('좋아요 정보를 가져오지 못했습니다.')
           }
       })



      ////////////////////////싫어요 갯수 가져요기////////////////
       Axios.post('/api/like/getDisLikes',variable).then(response=>{
        if(response.data.success)
        {
             //얼마나 많은 좋아요를 받았는지.
             setdislikes(response.data.dislikes.length);

             // 내가 이미 그 좋아요를 눌럿는지.
             response.data.dislikes.map(dislike=>{
                      if(dislike.userId===props.userId){
                          setDisLikeAction('disliked');
                      }
             })
        }else{
            alert('싫어요 정보를 가져오지 못했습니다.')
        }
    })
    }, [])

    //////////////////////좋아요를 눌렀을때 function//////////////////////////////
    const onLike=()=>{

  
        if(LikeAction===null){     //아직 좋아요 버튼이 클릭이 안되어잇을때
         
            Axios.post('/api/like/upLike',variable)
            .then(response=>{
                if(response.data.success)
                {
                    setlikes(likes+1)   //axios post성공하면 likes를 하나 올려준다.
                    setLikeAction('liked');
                    //만약 싫어요가 눌러져있으면
                    if(DisLikeAction!==null){

                        setDisLikeAction(null); //비활성화시킨다.
                        setdislikes(dislikes-1)
                    }
                }else{
                    alert('처리 실패');
                }
            }) //Axios 끝
        }
        else{      // 좋아요가 눌러져 있을때

            Axios.post('/api/like/unLike',variable)
            .then(response=>{
                if(response.data.success)
                {
                   setlikes(likes-1);
                   setLikeAction(null);
                }else{
                    alert('처리 실패');
                }
            }) //Axios 끝

        }
    }
    ///////////////////////////좋아요 function 끝////////////////////////////////

    //////////////////////싫어를 눌렀을때 function//////////////////////////////
    const onDislike=()=>{

        if(DisLikeAction===null){     //아직 좋아요 버튼이 클릭이 안되어잇을때
            Axios.post('/api/like/upDisLike',variable)
            .then(response=>{
                if(response.data.success)
                {
                    setdislikes(dislikes+1)   //axios post성공하면 likes를 하나 올려준다.
                    setDisLikeAction('disliked');
                    //만약 좋아가 눌러져있으면
                    if(LikeAction!==null){

                        setLikeAction(null); //비활성화시킨다.
                        setlikes(likes-1)
                    }
                }else{
                    alert('처리 실패');
                }
            }) //Axios 끝
        }
        else{      // 싫어가 눌러져 있을때

            Axios.post('/api/like/unDisLike',variable)
            .then(response=>{
                if(response.data.success)
                {
                   setdislikes(dislikes-1);
                   setDisLikeAction(null);
                }else{
                    alert('처리 실패');
                }
            }) //Axios 끝

        }
    }
    ///////////////////////////좋아요 function 끝////////////////////////////////
    



    return (
        <div>
             <span key="comment-basic-like">
               <Tooltip title="like"> 
                    <Icon type="like"
                          theme={LikeAction==='liked'?'filled':'outlined'}
                          onClick={onLike}
                          />
               </Tooltip>
         <span style={{paddingLeft:'6px',cursor:'auto'}}>{likes}</span>
               </span>&nbsp;&nbsp;
               <span key="comment-basic-dislike">
               <Tooltip title="Dislike"> 
                    <Icon type="dislike"
                          theme={DisLikeAction==='disliked'?'filled':'outlined'}
                          onClick={onDislike}
                          />
               </Tooltip>
               <span style={{paddingLeft:'6px',cursor:'auto'}}>{dislikes}</span>
               </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDisLike
