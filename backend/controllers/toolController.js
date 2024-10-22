const Tool=require("../models/Tool.js");
exports.addTool= async(req,res)=>{
    const{name,email,description,price,discountPrice,image}=req.body;
    try {
        if(email!=="admin@gmail.com")
            return res.status(403).json({message:"Unauthorized"});
        const newTool =new Tool({
            name,
            description,
            price,
            discountPrice,
            image
        })
        await newTool.save();
        res.status(201).json(newTool);
    }catch (error) {
        res.status(500).json({ message: 'Error in adding Tools', error });
    }
}

exports.getTools=async(req,res)=>{
    try{
        const tools=await Tool.find();
        if(tools.length==0)
            return res.status(200).json({message:"No Tools available"});
        res.status(200).json(tools);
    }
    catch(error){
        res.status(500).json({ message: 'Error in getting Tools', error });
    }
}

exports.deleteTool=async(req,res)=>{
    try{
        const {id}=req.params;
        const deletetool= await Tool.findByIdAndDelete(id);
        if(!deletetool){
            return res.status(404).json({message:'Tools not found'});
        }
        res.status(200).json({message:"Tool Deleted Successfully"});    
    }
    catch(error){
        res.status(500).json({ message: 'Error in delete Tools', error });
    }
}