const express = require('express');
const router = express.Router();
const {Like}=require('../models/Like');
const {DisLike}=require('../models/DisLike');


//=====================================
//          Like  DisLike
//=====================================

router.post('/getLikes',(req,res)=>{

    let variable={};
    if(req.body.videoId){
        variable={videoId:req.body.videoId}
    }
    else{
        variable={commentId:req.body.commentId}
    }
    Like.find(variable).exec((err,likes)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true,likes});
    })
});

router.post('/getLikes',(req,res)=>{

    let variable={};
    if(req.body.videoId){
        variable={videoId:req.body.videoId}
    }
    else{
        variable={commentId:req.body.commentId}
    }
    Like.find(variable).exec((err,likes)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true,likes});
    })
});

router.post('/getDisLikes',(req,res)=>{
    
    let variable={};
    if(req.body.videoId){
        variable={videoId:req.body.videoId}
    }
    else{
        variable={commentId:req.body.commentId}
    }
    DisLike.find(variable)
    .exec((err,dislikes)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true,dislikes});
    })
   
});

router.post('/upLike',(req,res)=>{
    let variable={}
    if(req.body.videoId){
        variable={videoId:req.body.videoId ,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
    //like mongoDB 데이터베이스에 저장을 해야함
    const like=new Like(variable)

    like.save((err,likeResult)=>{
        //에러나면 success: false
        if(err) return res.json({success:false,err})
         
        //성공하면
        //만약 dislike이 클릭이 되어잇으면 dislike을 1 줄여줌
           DisLike.findOneAndDelete(variable)   
           .exec((err,disLikeResult)=>{
               if(err) return res.status(400).json({success:false,err});
               res.status(200).json({success:true});
           })
         //dislike이 없으면 like을 하나 올려줌
    })
   
});

router.post('/unLike',(req,res)=>{
    
    let variable={};
    if(req.body.videoId){
        variable={videoId:req.body.videoId ,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
    Like.findOneAndDelete(variable)
    .exec((err,result)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true}); //삭제만 하면 되니깐
    })
   
});


router.post('/upDisLike',(req,res)=>{
    let variable={}
    if(req.body.videoId){
        variable={videoId:req.body.videoId ,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }

    //like mongoDB 데이터베이스에 저장을 해야함
    const Dislike=new DisLike(variable)

    Dislike.save((err,dislikeResult)=>{
        //에러나면 success: false
        if(err) return res.json({success:false,err})
         
        //성공하면
        //만약 like이 클릭이 되어잇으면 like을 1 줄여줌
           Like.findOneAndDelete(variable)   
           .exec((err,LikeResult)=>{
               if(err) return res.status(400).json({success:false,err});
               res.status(200).json({success:true});
           })
         //dislike이 없으면 like을 하나 올려줌
    })
   
});

router.post('/unDisLike',(req,res)=>{
    
    let variable={};
    if(req.body.videoId){
        variable={videoId:req.body.videoId ,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
    DisLike.findOneAndDelete(variable)
    .exec((err,result)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true}); //삭제만 하면 되니깐
    })
   
});




module.exports=router;