const express=require("express");
const router=express.Router();
const cartController =require("../controllers/cartController.js");


router.put('/cart/:userId/:toolId', cartController.updateQuantity)
router.delete('/cart/:userId/:toolId',cartController.deleteTool);
router.post('/cart/:userId',cartController.addToCart);
router.get('/cart/:userId',cartController.getCart);

module.exports = router;