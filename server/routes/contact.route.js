

import { Router } from "express";
import {
    createContact,
    getAllContacts,

} from '../controllers/contact.controller.js';


const contactRouter = Router();

// create new contact
contactRouter.post('/contacts', createContact);

// 
contactRouter.get('/contacts', getAllContacts);



export default contactRouter;
