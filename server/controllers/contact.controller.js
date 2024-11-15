

import ContactModel from "../models/contact.model"





// ========================= CREATE A NEW CONTACT ========================= 
export const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body

        // validate data
        if (!firstName || !lastName || !email || !phoneNumber || !company || !jobTitle) {
            res.status(400).json({
                message: "firstName, lastName, email, phoneNumber, company, jobTitle all fields are required",
            });
        }

        // save in DB
        const contact = await ContactModel.create({
            firstName, lastName, email, phoneNumber, 
            company, jobTitle, createdAt: Date.now()
        });

        // return success message
        res.status(201).json({
            message: "New Contact created successfully",
            contact
        });
    } catch (error) {
        console.log("Error while creating new contact => ", error)
        res.status(400).json({
            message: 'Error while creating new contact',
            error: error.message
        });
    }
};