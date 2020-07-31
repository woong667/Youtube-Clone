import React,{useEffect,useState} from 'react'
import Axios from 'axios'
function Subscribe(props) {

   const variable={userTo:props.userTo} //Subscribe.js로 올때 props로 담아왔구낭.
   const [SubscribeNumber, setSubscribeNumber] = useState(0)
   const [Subscribed, setSubscribed] = useState(false)
    useEffect(() => {
       Axios.post('api/subscribe/subscribeNumber',variable)
       .then(response=>{
           if(response.data.success)
           {
               setSubscribeNumber(response.data.SubscribeNumber);
               console.log(Subscribed);
           }
           else{
               alert("구독자가 몇명인지 불러오지 못했습니다.");
           }
       })

       const subscribedVariable={userTo:props.userTo,userFrom:localStorage.getItem('userId')} 

       Axios.post('/api/subscribe/subscribed',subscribedVariable).then(response=>{
            if(response.data.success)
            {
                setSubscribed(response.body.subscribed)
            }
            else{
                  alert('정보를 받아오지 못했습니다');
            }
       })

    }, [])


    return (
       <div>
           <button style={{backgroundColor:`${Subscribed?'#AAAAAA':'#CC0000'}`,borderRadius:'4px',
                color:'white',padding:'10px 16px',
                fontWeight:'400',fontSize:'1rem',textTransform:'uppercase'}}
                onClick>
            {SubscribeNumber} {Subscribed?'Subcribed':'Subscribe'}
           </button>
       </div>
    )
}

export default Subscribe
