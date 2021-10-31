const mongoose=require("mongoose");
const giftcardSchema=mongoose.Schema({
    // title of giftcard
    name:{
        type: String,
        required:[true,"you must enter your name"],
        maxLength:[50,"you cant enter more than 50 character"],
        unique:true,
        trim:true
    },
    slug:String,
    // direct slug link for giftcard
    description:{
        type:String,
        required:[true,"you must enter description"],
        maxLength:[500,"you cant enter more than 500 character"],
    },
    // price of goods
    price:{
        type:Number,
        required:[true,"you must enter description"]
    },
    // a tag array for showing and seo
    tags:{
        type:[String],
        required:true,
        enum:[
            'Steam',
            'Apple',
            'Amazon',
            'Google'
        ]
    }
})
module.exports=mongoose.model('giftcard',giftcardSchema);