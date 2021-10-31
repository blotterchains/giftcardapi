const express = require('express');
const router = express.Router();
// import giftcard apis
const {
    createGift,
    deleteGift,
    getAllGifts,
    getGift,
    updateGift
} = require('../controllers/giftcard');
// make route for giftcard create and get all data
router.route('/')
    .get(getAllGifts)
    .post(createGift);
// make route for giftcard get one and remove and update with id 
router.route('/:id')
    .get(getGift)
    .delete(deleteGift)
    .put(updateGift);


module.exports = router;