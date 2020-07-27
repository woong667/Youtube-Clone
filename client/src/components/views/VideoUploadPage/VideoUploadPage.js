import React ,{useState,config} from 'react'
import Dropzone from 'react-dropzone';
import {Typography,Button,Form,message,Input,Icon} from 'antd'; //CSS를 누군가가 만들어놓은것을 사용
const Axios=require('axios');


const {TextArea}=Input;
const {Title}=Typography;
const privateOptions=[
    {value:0,label:"private"},
    {value:1,label:"public"}
]
const CategoryOptions=[
    {value:0,label:"Film & Animation"},
    {value:1,label:"Music"},
    {value:2,label:"Review"},
    {value:3,label:"Food & Life"}
]

function VideoUploadPage() {

    const [VideoTitle,setVideoTitle]=useState("");
    const [Description,setDescription]=useState("");
    const [Private,setPrivate]=useState(0);
    const [Category,setCategory]=useState(0);
    const [FilePath,setFilePath]=useState("");
    const [Duration,setDuration]=useState("");
    const [ThumbnailPath,setThumbnailPath]=useState("");


    const onTitleChange=(event)=>{        
        setVideoTitle(event.currentTarget.value);
    }
    const onDescriptionChange=(event)=>{
            setDescription(event.currentTarget.value);
    }
    const onPrivateChange=(event)=>{
        setPrivate(event.currentTarget.value)
    }
    const onCategoryChange=(event)=>{
        setCategory(event.currentTarget.value)
    }


    const onDrop=(files)=>{   //files 파라미터는 올린 파일의 정보에 대해서 들어있다.
       let formData=new FormData();
       const config={
           header:{'content-type':'multipart/form-data'}
       }
        formData.append("file",files[0]) //파일의 첫번째 인자를 가져오기위해..

        Axios.post('/api/video/uploadfiles',formData,config).then(response=>{
            if(response.data.success){
                 let variable= {
                     url:response.data.url,
                     fileName:response.data.fileName
                 }
                 setFilePath(response.data.url);
                 
                 Axios.post('/api/video/thumbnail',variable).then(response=>{
                     if(response.data.success){
                       setDuration(response.data.fileDuration);
                       setThumbnailPath(response.data.url);
                     }
                     else{
                         alert("썸네일 가져오기에 실패했습니다.");
                     }
                 })
            }
            else{
                alert("비디오 업로드를 실패했습니다.")
            }
        })                
    }
       //서버로 파일을 보내고 받으려면 onDrop 함수처럼 헤더를 보내줘야 오류가생기지않음 
    
    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                  <Title level={2}>
                      Upload Video 
                  </Title>
            </div>

            <Form onSubmit>
               <div style={{display:'flex',justifyContent:'space-between'}}>
                     <Dropzone
                        onDrop={onDrop}
                        multiple={false} //파일을 하나만 올릴거니까 false로
                        maxSize={100000000}>
                        {({getRootProps,getInputProps})=>(
                            <div style={{width: '300px',height:'240px',border:'1px solid lightgray',display:'flex',
                        alignItems:'center',justifyContent:'center'}}{...getRootProps()}>
                            <input {...getInputProps() }/>
                            <Icon type="plus" style={{fontSize:'3rem'}}/>
                            </div>
                        )}
                      </Dropzone>
                     {/*썸네일 부분*/ }
 
                      {ThumbnailPath&&        //ThumbnailPath가 있을때에만 이미지가 표시가 되도록 한다.
                     <div>
                         <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                     </div>
                      }            
            </div>

               <br/>
               <br/>
               <label>Title </label>
               <Input onChange={onTitleChange}
                    value={VideoTitle}/>
                <br/>
                <br/>
                <label>Description</label>
                <TextArea onChange={onDescriptionChange }
                          value={Description}/>
                <br/>
                <br/>
                <select onChange={onPrivateChange}>

                    {privateOptions.map((item,index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                {CategoryOptions.map((item,index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
                ))}
                </select>
                <br/>
                <br/>
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form> 
             
        </div>
    )
}

export default VideoUploadPage
