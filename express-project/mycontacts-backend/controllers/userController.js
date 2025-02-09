const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc: Register a user
//@route: POST /api/users/register
//@access: public
const registerUser = asyncHandler(async (request, response) => {
    const {username, email, password} = request.body;
    if(!username || !email || !password){
        response.status(400);
        throw new Error("All fields are mandatory");
    }

    //making sure usernamer is not associated with an existing email:
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        response.status(400);
        throw new Error("User already registered");
    }

    //if no user found, create new user:
    const hashedPassword = await bcrypt.hash(password, 10); //10: number of salt rounds
    console.log("Hashed password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`User created: ${user}`);
    //Displaying successful creation of user:
    if (user){
        response.status(201).json({_id: user.id, email: user.email });
    }else{
        response.status(400);
        throw new Error("Invalid user data");
    }

    response.json({message: "Register the user"});
});

//@desc:  Login a user
//@route: POST /api/users/login
//@access: public
const loginUser = asyncHandler( async(request, response) => {
    response.json({message: "Login the user"});
});


//@desc: Display current active user information
//@route: POST /api/users/current
//@access: private 
const currentUser = asyncHandler(async(request, response) => {
    response.json({message: "Current user information"});
});

module.exports = {registerUser, loginUser, currentUser};