import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import {Card,Icon,Avatar,Col,Typography,Row} from 'antd';
import moment from 'moment';
const {Title}=Typography;
const {Meta}=Card;

function SubscriptionPage() {
    const [Video, setVideo] = useState([])        //useState를 할때 배열에 담고싶으면 useState 안에 [] 를 넣어준다.

    const subscriptionVariable={
         userFrom:localStorage.getItem('userId')
    }

    useEffect(() => {             //DOM이 한번 뜰때마다 무엇을 할지를 결정하는 메소드이다.
        Axios.post('/api/video/getSubscriptionVideos',subscriptionVariable)
        .then(response=>{
            if(response.data.success)
            {
             setVideo(response.data.videos)
            }
            else{
                alert('비디오 가져오기를 실패했습니다.')
            }
        })
    }, []) //[]칸이 없으면 useEffect() 가 계속 반복하지만 [] 가 잇으면 dom이 업데이트될때마다 한번만 실행한다.

 

    const renderCards=Video.map((video,index)=>{

       var minutes=Math.floor(video.duration/60);
       var seconds=Math.floor((video.duration-minutes*60));

         return <Col lg={6} md={8} xs={24}>    
         <a href={`/video/${video._id}`}>
            <div style={{position:'relative'}}>
                <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
                 <div className='duration'>
                       <span>{minutes}:{seconds}</span>
                 </div>
            </div>
        </a>
        <br />
       <Meta
          avatar={
              <Avatar src={video.writer.image}/>
          }
          title={video.title}
          description=""
       />
     <span>{video.writer.name}</span><br />
     <span style={{marginLeft:'3rem'}}>{video.views} views</span>-<span>{moment(video.createAt).format("MMM Do YY")}</span>
      </Col>
         
    })

 return (
     <div style={{width:'85%', margin:'3rem auto'}}>
         <Title level={2}>Recommanded</Title>
         <hr/>
         <Row gutter={[32,16]}>
          {renderCards}
         </Row>

     </div>
 )
}

export default SubscriptionPage
