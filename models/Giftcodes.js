const mongoose = require('mongoose');
const crypto = require('crypto');
const giftCodeSchema = mongoose.Schema({
    // gift code serial
    code: {
        type: String,
        required: 'You must enter a gift code',
        trim: true,
    },
    // submit time of serial
    time: {type:Date,default:Date.now},
    // a type for gift codes seo and show to admin
    type: {
        type: String,
        required: 'You must select type of gift code',
        enum: [
            'Steam',
            'Apple',
            'Amazon',
            'Google'
        ],
    },
    // price of gift code
    price:{
        type:Number,
        required:[true,'You must enter a price for gift code']
    },
    // status for gift codes after buying this will change to 0 
    status:{type:Number, default:1}
    
})
module.exports=mongoose.model('giftcodes',giftCodeSchema);