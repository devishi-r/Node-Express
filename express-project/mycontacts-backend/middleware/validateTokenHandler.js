const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler( async(request, response, next) => {
    let token;
    //when user sends a request, token is sent in the header section
    let authHeader = request.headers.Authorization || request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                console.log(err);
                return response.status(401).json({ message: "User is not authorised" })
            }
            request.user = decoded.user; //appended decoded information to request.user property
            next();
        });

        if(!token){
            return response.status(400).json({message: "User is not authorised or token is missing" });
        }
    }
});

module.exports = validateToken;