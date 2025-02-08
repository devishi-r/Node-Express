const express = require("express"); //require: similar to import
const dotenv = require("dotenv").config(); //config(): creates process.env: global parameter storing envt variables
const app = express();
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 5000;


//this is great, but we're not going to configure all our routes in server.js
//hence -> new folder to handle all our routes: routes :)
// app.get('/api/contacts', (request, response) => {
//     response.status(200).json({message: "Get all contacts" });
// });

app.use(express.json()); //to parse data stream receieved from client on server side    
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});