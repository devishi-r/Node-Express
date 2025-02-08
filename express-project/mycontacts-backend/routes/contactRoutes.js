const express = require("express");
const router = express.Router();

//configuring routes on our router 'router'
router.route('/').get((request, response) => {
    response.status(200).json({message: "Get all contacts" });
})

//specifying PUT, POST, DELETE: 
router.route('/').post((request, response) => {
    response.status(200).json({message: "Create contact" });
})

router.route('/:id').put((request, response) => {
    response.status(200).json({message: `Modify contact: ${request.params.id}` });
})

router.route('/:id').delete((request, response) => {
    response.status(200).json({message: `Delete contact: ${request.params.id}` });
})

//get individual contact
router.route('/:id').get((request, response) => {
    response.status(200).json({message: `Fetch contact: ${request.params.id}` });
})


module.exports = router;