import React ,{useState} from 'react'
import Dropzone from 'react-dropzone';
import {Typography,Button,Form,message,Input,Icon} from 'antd'; //CSS를 누군가가 만들어놓은것을 사용


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
                        onDrop
                        multiple
                        maxSize>
                        {({getRootProps,getInputProps})=>(
                            <div style={{width: '300px',height:'240px',border:'1px solid lightgray',display:'flex',
                        alignItems:'center',justifyContent:'center'}}{...getRootProps()}>
                            <input {...getInputProps() }/>
                            <Icon type="plus" style={{fontSize:'3rem'}}/>
                            </div>
                        )}
                      </Dropzone>
                     {/*썸네일 부분*/ }
                     <div>
                         <img src alt />
                     </div>
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
