const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const ensureAuthenticated = require("../Middlewares/Auth"); // Middleware for authentication

// Get the authenticated user
router.get("/user", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching user data" });
  }
});

// User Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate Input
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        // Check if User Already Exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        // Hash Password and Save User
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
router.post("/login",async (req,res)=>{
  try{
      const {email,password}=req.body
      const user=await User.findOne({email})
      if(!user){
          return res.status(400).json({"message":"User not found"})
      }
      const isMatch= await bcrypt.compare(password,user.password)
      if(!isMatch){
          return res.status(400).json({"message":"Password incorrect"})
      }
      const token=generateToken(user._id)
      res.status(200).json({"message":"login successful",token,role:user.role})
  }
  catch(err){
      console.log("Error from login",err)
      res.status(500).json({"message":"Internal server error from login route"})
  }
})

module.exports = router;
