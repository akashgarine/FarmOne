const User = require('../models/User');

exports.addToCart=async(req,res)=>{
    const {userId}=req.params;
    const { toolId, quantity } = req.body; 
    try{
        const user= await User.findById(userId);
    if(!user){
        return res.status(403).json({message:"User not Found"}); 
    }
    const cartItem = user.cart.find(item => item.toolId.toString() === toolId);
    if(cartItem){
        cartItem.quantity += quantity;
    }
    else{
        user.cart.push({ toolId, quantity });
    }
        await user.save();
        res.status(200).json({ message: 'Tool added to cart successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to add tool to cart', error });
    }
}


exports.getCart=async(req,res)=>{
    const {userId}=req.params;
    try{
        const user = await User.findById(userId).populate('cart.toolId'); 
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.cart)
    }
    catch(error){
        res.status(500).json({ message: 'Failed to retrieve cart', error });
    }
}



exports.deleteTool=async(req,res)=>{
    const {userId,toolId}=req.params;
    try{
        const user = await User.findById(userId);   
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Remove the tool from the user's cart
        user.cart = user.cart.filter(item => item.toolId.toString() !== toolId);
        await user.save();
        res.status(200).json({ message: 'Tool removed from cart successfully' });
    }
    catch(error){
        res.status(500).json({message:"Failed to Delete tool "})
    }

}










exports.updateQuantity = async (req, res) => {
    const { userId, toolId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const cartItem = user.cart.find(item => item.toolId.equals(toolId));
        if (!cartItem) return res.status(404).json({ message: 'Tool not found in cart' });

        cartItem.quantity = quantity;
        await user.save();

        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart quantity', error });
    }
};