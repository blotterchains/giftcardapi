const giftCode=require('../models/Giftcodes');
const errorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middlewares/async');

//@desc         create new gitf card
//@url          Post /
//@access       Private
exports.addNewGiftCode = asyncHandler(async (req, res,next) => {

        const _retCreatedGiftCode=await giftCode.create(req.body)
        res.status(201).json({ status: true,data:_retCreatedGiftCode });

})
//@desc         get all gift codes
//@url          Get /
//@access       Private
exports.getAllGiftCodes=asyncHandler(async(req,res,next)=>{
        let query;
        let queryStr={... req.query};
        let removeFields=['select','sort'];
        removeFields.forEach(item=>delete queryStr[item]);
        let bodysigns=JSON.stringify(queryStr);
        bodysigns=bodysigns.replace(/\b(gt|lt|lte|gte|in)\b/g,match=> `$${match}` );
        query=giftCode.find(JSON.parse(bodysigns));
        if(req.query.select){
                query.select(req.query.select.split(',').join(' '));
        }
        if(req.query.sort){
                query.sort(req.query.sort.split(',').join(' '));
        }
        const _retAllGiftCode=await query;
        res.status(200).json({ status: true,data:_retAllGiftCode });

})
//@desc         get a gift code
//@url          Get /:id
//@access       Private
exports.getGiftCode=asyncHandler(async(req,res,next)=>{
        const _retGiftCode=await giftCode.findById(req.params.id);
        if(!_retGiftCode){
            next(new errorResponse(`cant find any data about gift code id of ${req.params.id}`,404));
            // return ;
        }else{res.status(200).json({ status: true,data:_retGiftCode });}

});
//@desc         update gift code
//@url          Update /:id
//@access       Private
exports.updateGiftCode=asyncHandler(async(req,res)=>{
        const _retUpdateGiftCode=await giftCode.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({status:true,data:_retUpdateGiftCode});

});
//@desc         update gift code
//@url          Delete /
//@access       Private
exports.DeleteGiftCode=asyncHandler(async(req,res)=>{
        const _retDeleteGiftCode=await giftCode.findByIdAndDelete(req.params.id);
        res.status(200).json({status:true,data:_retDeleteGiftCode});
})