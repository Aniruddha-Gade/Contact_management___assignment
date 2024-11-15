

import { Router } from "express";
import {
    createContact,
    getAllContacts,
    updateContact,
} from '../controllers/contact.controller.js';


const contactRouter = Router();

// create new contact
contactRouter.post('/contacts', createContact);

// get all contacts
contactRouter.get('/contacts', getAllContacts);

// update contact by ID
contactRouter.put('/contacts/:id', updateContact);



export default contactRouter;
