 const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
//const {Video}=require("../models/Video")
const { auth } = require("../middleware/auth");
const multer=require('multer');
var ffmpeg=require('fluent-ffmpeg');

//========================STORAGE MULTER CONFIG===========================//
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");   //목적지는 uploads폴더
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`); //저장을 할때 어떠한 파일이름으로 저장을 할지 (지금날짜+파일이름 )
    },
    fileFilter:(req,file,cb)=>{   //동영상만 받기위한 파일필터
        const ext=path.extname(file.originalname)
        if(ext!=='.mp4'){ //mp4파일이 아니면.
            return cb(res.status(400).end('only jpg,png,mp4 is allowed'),false); //status(400)은 오류
        }
        cb(null,true) //
    }
});
//==========================================================================================


const upload=multer({storage:storage}).single("file"); //multer에 storage 변수 넣어주고 파일은 하나이기 때문에 single('file')
//=================================
//             Video
//=================================
router.post('/uploadfiles',(req,res)=>{
    //클라이언트에서 받은 비디오를 서버에 저장한다.
    upload(req,res,err=>{
        if(err){  //전형적인 에러문장
            return res.json({success:false,err});
        }
        return res.json({success:true,url:res.req.file.path,fileName:res.req.file.filename})
    })
})


router.post('/thumbnail',(req,res)=>{
   
    let filePath="";
    let fileDuration="";
   
    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url,function(err,metadata){//ffprobe는 ffmpeg의 기능
        console.dir(metadata); //ffprobe가 metadata 데려온다.
        console.log(metadata.format.duration)
        fileDuration=metadata.format.duration
    });
   
    //===========썸네일을 생성===================////
    ffmpeg(req.body.url)
    .on('filenames',function(filenames){ //비디오의 썸네일 파일이름을 설정
        console.log('Will generate'+filenames.join(','));
        console.log(filenames);

        filePath="uploads/thumbnails/"+filenames[0];
    })
    .on('end',function(){ //썸네일이 다 생성된 뒤 function
        console.log('Screenshots taken');
        return res.json({success:true,url:filePath,fileDuration:fileDuration})
    })
    .on('error',function(err){ //에러시에..
        console.error(err);
        return res.json({success:false,err});
    })
    .screenshot({ //옵션을 줄 수 있음
        count:3, //3장의 스크린샷을 찍을 수 있고
        folder:'uploads/thumbnails', //스크린샷이 저장될 위치.
        size:'320x240', //사진의 사이즈
        filename:'thumnail-%b.png' //사진의 이름
    })
})

module.exports=router;