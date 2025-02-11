const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//Creating API methods, require labels associated

//@desc: Get all contacts
//@route: GET /api/contacts
//@access: private  //will be made private when adding authentication :)
const getContacts = asyncHandler(async (request, response) => {
    const contacts = await Contact.find({ user_id: request.user.id});
    response.status(200).json(contacts);
});

//@desc: Create contact
//@route: POST /api/contacts
//@access: private
const createContact = asyncHandler(async (request, response) => {
    console.log("The request body is: ",request.body);
    const {name, email, phone} = request.body;
    if(!name || !email || !phone) {
        response.status(400);
        throw new Error ("All fields are mandatory");
    }

    //if all fields are present, create contact:
    const contact = await Contact.create({name, email, phone, user_id:request.user.id}); 
    response.status(201).json(contact);
});

//@desc: Modify contact
//@route: PUT /api/contacts/:id
//@access: private
const modifyContact = asyncHandler(async (request, response) => {
    //first finding contact:
    const contact = await Contact.findById(request.params.id);
    if(!contact){
        response.status(400);
        throw new Error ("Contact not found");
    }

    if(contact.user_id.toString() != request.user.id){
        //different user is trying to update another user's conact
        response.status(403);
        throw new Error ("User doesn't have permission to update other user's contacts");
    }

    //modifying contact:
    const modifiedContact = await Contact.findByIdAndUpdate(
        request.params.id, 
        request.body, 
        {new: true});
    response.status(200).json(modifiedContact);
});

//@desc: Delete contact
//@route: DELETE /api/contacts/:id
//@access: private
const deleteContact = asyncHandler(async (request, response) => { 
    //finding contact:
    const contact = await Contact.findById(request.params.id);
    if(!contact){
        response.status(400);
        throw new Error ("Contact not found");
    }

    if(contact.user_id.toString() != request.user.id){
        //different user is trying to delete another user's conact
        response.status(403);
        throw new Error ("User doesn't have permission to update other user's contacts");
    }

    await Contact.deleteOne({_id: request.params.id});
    response.status(200).json(contact);
});

//@desc: Get contact
//@route: GET /api/contacts/:id
//@access: private
const getContact = asyncHandler(async (request, response) => {
    const contact = await Contact.findById(request.params.id);
    //if no contact found: throw error:
    if(!contact){
        response.status(400);
        throw new Error ("Contact not found");
    }
    response.status(200).json(contact);
});


module.exports  = { 
    getContacts,
    createContact,
    modifyContact,
    deleteContact,
    getContact
};