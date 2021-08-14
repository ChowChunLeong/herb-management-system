const express = require('express');

const router = express.Router();
const adminController = require('../controllers/adminController');


// Routes
router.get('/', adminController.view);
router.post('/login', adminController.login);
router.get('/logout',adminController.logout);

router.get('/dashbroad', adminController.dashbroad);
router.get('/addherb', adminController.form);
router.post('/addherb', adminController.create);
router.patch('/editherb', adminController.edit);
router.delete('/delete/:id', adminController.delete);

router.post('/retrieve_herb_list', adminController.retrieve_herb_list);

module.exports = router;