const express = require("express");
const router = express.Router();
const {getContact, createContact, deleteContact, modifyContact, getContacts} = require("../controllers/contactController");

//configuring routes on our router 'router'
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(modifyContact).delete(deleteContact);

module.exports = router;