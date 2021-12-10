var express = require('express');
var router = express.Router();
// req controllers
const hotelController = require('../controllers/hotelController');

/* GET home page. */
router.get('/', hotelController.homePageFilters);
router.get('/all',hotelController.listOfHotels);
router.get('/all/:hotel',hotelController.hotelDetail);
router.get('/all/:id',hotelController.listOfHotels);
router.get('/sign-up',hotelController.signUp,hotelController.logIn);
router.get('/login', hotelController.logIn);
router.get('/countries', hotelController.listAllCountries);

// ADIMN routes
router.get('/admin',hotelController.adminPage);
router.get('/admin/add',hotelController.createHotelGet);
router.get('/admin/edit-remove',hotelController.editRemoveHotelGet);
router.get('/admin/:hotelId/update',hotelController.hotelUpdateGet);
router.get('/admin/:hotelId/delete',hotelController.hotelDeleteGet);




// ADMIN POST routes
router.post('/admin/add',hotelController.createHotelPost);
router.post('/admin/edit-remove',hotelController.editRemoveHotelPost);
router.post('/admin/:hotelId/update',hotelController.hotelUpdatePost);
router.post('/admin/:hotelId/delete',hotelController.hotelDeletePost);




module.exports = router;