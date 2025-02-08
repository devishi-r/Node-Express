//Creating API methods, require labels associated

//@desc: Get all contacts
//@route: GET /api/contacts
//@access: public  //will be made private when adding authentication :)
const getContacts = (request, response) => {
    response.status(200).json({message: "Get all contacts" });
};

//@desc: Create contact
//@route: POST /api/contacts
//@access: public
const createContact = (request, response) => {
    response.status(200).json({message: "Create contact" });
};

//@desc: Modify contact
//@route: PUT /api/contacts/:id
//@access: public 
const modifyContact = (request, response) => {
    response.status(200).json({message: `Modify contact: ${request.params.id}` });
};

//@desc: Delete contact
//@route: DELETE /api/contacts/:id
//@access: public  
const deleteContact = (request, response) => {
    response.status(200).json({message: `Delete contact: ${request.params.id}` });
};

//@desc: Get contact
//@route: GET /api/contacts/:id
//@access: public  
const getContact = (request, response) => {
    response.status(200).json({message: `Fetch contact: ${request.params.id}`});
};


module.exports  = { 
    getContacts,
    createContact,
    modifyContact,
    deleteContact,
    getContact
};