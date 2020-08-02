const mongoose = require('mongoose');
const Schema=mongoose.Schema;
 //populate는 몽구스의 편리한 기능

const SubscriberSchema = mongoose.Schema({
        userTo:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        userFrom:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    
},{timestamps:true })

const Subscriber=mongoose.model('Subscriber',SubscriberSchema);
module.exports={Subscriber}