import express from 'express';
import { Google, User } from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: "Get by router",
    success: true
  });
});

router.post('/api/v1/register', async(req,res)=>{
    const {name, email, password} = req.body;
    const findEmail = await User.findOne({email: email});
    if(findEmail){
        return res.status(400).json({message:"User email already available please sign in", success:false})
    }else{
        const userData = new User({name:name, email: email, password: password});
        const resp = await userData.save();
        if(resp){
            return res.status(200).json({message:"Welcome to linkedIn.",success:true})
        }else{
            return res.status(503).json({message:"Error while register",success: false})
        }
    }
})
router.post('/api/v1/googleregister',async(req,res)=>{
    const {email, photo} = req.body;
    const isEmail = await Google.findOne({email: email})
    if(isEmail){
        return res.status(200).json({message:" Welcome to linkedIn.",success:true,wholeData: isEmail})
    }else{
        const googleUser = new Google({email:email, photo: photo});
        const resp = await googleUser.save();
        if(resp){
            return res.status(200).json({message:" Welcome to linkedIn.",success:true,wholeData: isEmail})
        }else{
            return res.status(400).json({message:"Error"})
        }
    }
   
})

router.post('/api/v1/signin', async(req,res)=>{
    const {email, password} = req.body;
    const findEmail = await User.findOne({email: email})
    if(findEmail){
        const isMatch = await bcrypt.compare(password, findEmail.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid password",success:false})
        }else{
            return res.status(200).json({message:"User logged in ( Welcome to LinkedIn )",success:true,userData: findEmail})
        }
    }else{
        return res.status(400).json({message:"Email not registered please register",success:false})
    }
})

router.post('/api/v1/createpost', async (req, res) => {
    const { email, message } = req.body;

    try {
        const findEmail = await Google.findOne({ email: email });
        const mFindEmail = await User.findOne({ email: email });

        if (findEmail) {
            // Create a new post
            const newPost = { msg: message };

            // Update the message array in GoogleSchema
            findEmail.message.push(newPost);
            await findEmail.save();
        }

        if (mFindEmail) {
            // Create a new post
            const newPost = { msg: message };

            // Update the message array in mongouser schema
            mFindEmail.message.push(newPost);
            await mFindEmail.save();
        }

        if (findEmail || mFindEmail) {
            return res.status(200).json({ message: "Post created", success: true ,data: findEmail || mFindEmail });
        } else {
            return res.status(400).json({ message: "Email not found!", success: false });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error while creating post", success: false });
    }
});

router.get('/api/v1/getpost', async (req, res) => {
    const { email } = req.query; 
    const googleUser = await Google.findOne({email: email});
    const mongoUser = await User.findOne({email: email});
    if(googleUser || mongoUser){
      return  res.status(200).json({message:googleUser || mongoUser,success:true})
    }else{
        return res.status(404).json({message:"User not found",success: false})
    }
});


export default router;






