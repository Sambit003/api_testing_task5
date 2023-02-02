const express=require('express');

const router=express.Router();

const {getAllEbooks, addNewEbook} = require('../controller/controller');

router.get('/', getAllEbooks);
router.post('/', addNewEbook);

module.exports = router;