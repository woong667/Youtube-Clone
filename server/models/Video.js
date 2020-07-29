const mongoose = require('mongoose');
const Schema=mongoose.Schema;


const videoSchema = mongoose.Schema({

    writer:{
        type: Schema.Types.ObjectId, //id만 넣어도 User.js에 있는 user모델을 다 가져올수있다.
        ref:'User'
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String
    },
    privacy:{
        type:Number
    },
    filePath:{
        type:String
    },
    category:{
        type:String
    },
    views:{
        type:Number,
        default:0  //views가 처음부터 0부터 시작하기때문에
    },
    duration:{
        type:String
    },
    thumbnail:{
        type:String
    }
},{timestamps:true })

const Video=mongoose.model('Video',videoSchema);
module.exports={Video}