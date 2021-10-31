
const express = require('express');
const router = express.Router();
// import gift code api
const { addNewGiftCode, getAllGiftCodes, updateGiftCode, DeleteGiftCode ,getGiftCode} = require('../controllers/giftcode');
/*
    this apis is for admin page
    and must keep looking to safe the data of code here
*/
// make route for create and get all gift cards
router
    .route('/')
    .post(addNewGiftCode)
    .get(getAllGiftCodes)
// make route for get one and remove and update with id
router
    .route('/:id')
    .delete(DeleteGiftCode)
    .put(updateGiftCode)
    .get(getGiftCode)
module.exports = router;