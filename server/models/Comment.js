const mongoose = require('mongoose');
const Schema=mongoose.Schema;
 //populate는 몽구스의 편리한 기능

const commentSchema = mongoose.Schema({

   writer:{
          type:Schema.Types.ObjectId,
          ref:'User'
   },
   postId:{
       type:Schema.Types.ObjectId,
       ref:'Video'
   },
   responseTo:{
          type:Schema.Types.ObjectId,
          ref:'User'
   },
   content:{
       type:String
   }

    
},{timestamps:true })

const Comment=mongoose.model('Comment',commentSchema);
module.exports={Comment}