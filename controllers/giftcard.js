const errorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middlewares/async');
const Giftcard = require('../models/Giftcard');
//@desc         get all gift card types with prices
//@url          GET /
//@access       public
exports.getAllGifts = async (req, res) => {
    // blank query for async query
    let query;
    // copy the query for filtering works
    let queryStr={... req.query};
    // a variable for filtering fields to remove from copy of query
    const removeFields=['select','sort','page','limit'];
    // remove fields from query copy
    removeFields.forEach(item=>delete queryStr[item]);
    let bodysigns=JSON.stringify(queryStr);
    bodysigns=bodysigns.replace(/\b(gt|lt|lte|gte|in)\b/g,match=> `$${match}` );
    query=Giftcard.find(JSON.parse(bodysigns));
    // Select
    if(req.query.select){
        query.select(req.query.select.split(',').join(" "));
    }
    // Sort
    if(req.query.sort){
        query.sort(req.query.sort.split(',').join(" "));
    }
    // pagination variable and calculation
    const page=parseInt(req.query.page ,10)||1;
    const limit=parseInt(req.query.limit , 10)||3;
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    query=query.skip(startIndex).limit(limit);
    const counter=await Giftcard.countDocuments();
    let pagination={};
    // Pagination 
    if (startIndex>0){
        pagination.perv=page-1;
    }
    if(endIndex<counter){
        pagination.next=page+1;
    }
    // Execute query
    const _retAllGifts = await query;
    res.status(200).json({ status: true, count:_retAllGifts.length,pagination, data: _retAllGifts });
}
//@desc         create new gift card with types and prices
//@url          POST /
//@access       private
exports.createGift = asyncHandler(async (req, res, next) => {
        const _retCreatedGift = await Giftcard.create(req.body);
        res.status(201).json({
            status: true
            , data: _retCreatedGift
        });


});
//@desc         get a gift card with id
//@url          POST /:id
//@access       public
exports.getGift = asyncHandler(async (req, res, next) => {
        const _retGift = await Giftcard.findById(req.params.id);
        
        if(!_retGift){
            next(new errorResponse(`cant find any data about giftcard id of ${req.params.id}`,404));
            // return;
        }else{
            res.status(200).json({
                status: true
                , data: _retGift
            });
        }

});
//@desc         update existing gift card
//@url          POST /:id
//@access       private
exports.updateGift = asyncHandler(async (req, res, next) => {
        const _retUpdatedGift = await Giftcard.findByIdAndUpdate(req.params.id, req.body);
       
        res.status(201).json({
            status: true
            , data: _retUpdatedGift
        });

});
//@desc         remove a gift card with types and prices
//@url          POST /:id
//@access       private
exports.deleteGift = asyncHandler(async (req, res, next) => {
        const _retDeletedGift = await Giftcard.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: true
            , data: _retDeletedGift
        });

});