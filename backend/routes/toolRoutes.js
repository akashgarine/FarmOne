const express = require('express');
const router = express.Router();
const toolController=require('../controllers/toolController.js');

router.delete('/tools/:id',toolController.deleteTool);
router.post('/tools',toolController.addTool);
router.get('/tools',toolController.getTools);


module.exports=router;







