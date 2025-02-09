const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc: Register a user
//@route: POST /api/users/register
//@access: public
const registerUser = asyncHandler(async (request, response) => {
    const {username, email, password} = request.body;
    if(!username || !email || !password){
        return response.status(400).json({
            success: false,
            message: "All fields are mandatory"
        });
    }

    //making sure usernamer is not associated with an existing email:
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        return response.status(400).json({
            success: false,
            message: "User already registered"
        });
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
});

//@desc:  Login a user
//@route: POST /api/users/login
//@access: public
const loginUser = asyncHandler( async(request, response) => {
    const {email, password} = request.body;
    if(!email || !password){
        return response.status(400).json({
            success: false,
            message: "All fields are mandatory"
        })
    }
    const user = await User.findOne( {email });
    //compare password with hashed password :)
    console.log("Comparing password and hashed password");
    if (user && (await bcrypt.compare(password, user.password))){
        console.log("user login succeessful, generating token");
        //success - providing access token:
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            } //payload
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "1m" }); //jwt.sign() parameters: payload, secret, expiration time of token
        response.json( {accessToken});
        console.log("Access token: ", accessToken);
    }
    else {
        return response.status(401).json({
            success: false,
            message: "Invalid password"
        });
    }
});

//@desc: Display current active user information
//@route: GET /api/users/current
//@access: private 
const currentUser = asyncHandler(async(request, response) => {
    response.json(request.user);
});

module.exports = {registerUser, loginUser, currentUser};