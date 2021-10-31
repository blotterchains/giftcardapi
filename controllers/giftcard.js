const errorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middlewares/async');
const Giftcard = require('../models/Giftcard');
//@desc         get all gift card types with prices
//@url          GET /
//@access       public
exports.getAllGifts = async (req, res) => {
    const _retAllGifts = await Giftcard.find()
    res.status(200).json({ status: true, data: _retAllGifts });
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