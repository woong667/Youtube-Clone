import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import responsiveObserve from 'antd/lib/_util/responsiveObserve'
function Subscribe(props) {

   
   const [SubscribeNumber, setSubscribeNumber] = useState(0)
   const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {  
       let variable={userTo:props.userTo} //Subscribe.js로 올때 props로 담아왔구낭.
       console.log(variable.userTo);
       Axios.post('/api/subscribe/subscribeNumber',variable)
       .then(response=>{
           if(response.data.success)
           {
               setSubscribeNumber(response.data.subscribeNumber);
        
            
           }
           else{
               alert("구독자가 몇명인지 불러오지 못했습니다.");
           }
       })

       const subscribedVariable={userTo:props.userTo,userFrom:localStorage.getItem('userId')} 
        //console.log(subscribedVariable.userTo); //이 동영상 올린사람
        //console.log(subscribedVariable.userFrom); //지금 로그인되어있는사람
       Axios.post('/api/subscribe/subscribed',subscribedVariable)
       .then(response=>{
            if(response.data.success)
            {
                setSubscribed(response.data.subscribed) 

            }
            else{
                  alert('정보를 받아오지 못했습니다');
            }
       })

    }, [])

    const onSubscribe=()=>{

        let subscribedVariable={
            userTo:props.userTo,
            userFrom:props.userFrom 
        }
        //이미 구독중이라면
        console.log(subscribedVariable.userTo);
        console.log(subscribedVariable.userFrom);
        console.log(Subscribed)
        console.log(SubscribeNumber)
        //구독버튼 누르면 여기까지 정보는 옴.

        if(Subscribed){
             Axios.post('/api/subscribe/unSubscribe',subscribedVariable)
             .then(response=>{
                 if(response.data.success){
                    setSubscribeNumber(SubscribeNumber-1);
                    setSubscribed(!Subscribed);
                 }
                 else{
                     alert('구독 취소 실패하였습니다.');
                 }
             })
        }
        else{
            Axios.post('/api/subscribe/subscribe',subscribedVariable)
             .then(response=>{
                 if(response.data.success){
                    setSubscribeNumber(SubscribeNumber+1);
                    setSubscribed(!Subscribed);
                 }
                 else{
                     alert('구독 실패하였습니다.');
                 }
             })
        }
    }
    return (
       <div>
           <button style={{backgroundColor:`${Subscribed?'#AAAAAA':'#CC0000'}`,borderRadius:'4px',
                color:'white',padding:'10px 16px',
                fontWeight:'400',fontSize:'1rem',textTransform:'uppercase'}}
                onClick={onSubscribe}>
            {SubscribeNumber} {Subscribed?'Subcribed':'Subscribe'}
           </button>
       </div>
    )
}

export default Subscribe
