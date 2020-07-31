const express = require('express');
const router = express.Router();

const {Subscriber}=require('../models/Subscriber');
const Video = require('../models/Video');


//=====================================
//             Subscribe
//=====================================
router.post('/subscriberNumber',(req,res)=>{
    
    Subscriber.findOne({'userTo':req.body.userTo}).exec((err,subscribe)=>{
          if(err) return res.status(400).send(err);
          return res.status(200).json({success:true,subscribeNumber:subscribe.length})
    })
});

router.post('/subscribed',(req,res)=>{
    
    Subscriber.findOne({'userTo':req.body.userTo,'userFrom':req.body.userFrom})
    .exec((err,subscribe)=>{
        if(err) return res.status(400).send(err);
        let result=false;    //하나라도 있으면 구독하는거
        if(subscribe.length!=0)
        {
            result=true;
        }
        res.status(200).json({success:true,subscribed:result});
    })
});


module.exports=router;