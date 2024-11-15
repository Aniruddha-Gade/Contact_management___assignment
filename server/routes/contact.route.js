

import { Router } from "express";
import {
    createContact,

} from '../controllers/contact.controller.js';


const contactRouter = Router();

// create new contact
contactRouter.post('/contacts', createContact);




export default contactRouter;
