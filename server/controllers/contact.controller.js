

import ContactModel from '../models/contact.model.js';





// ========================= CREATE A NEW CONTACT ========================= 
export const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body

        // validate data
        if (!firstName || !lastName || !email || !phoneNumber || !company || !jobTitle) {
            return res.status(400).json({
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



// ========================= GET ALL CONTACTS ========================= 
export const getAllContacts = async (req, res) => {
    try {
        // find all contacts
        const contacts = await ContactModel.find({
        }).sort({ createdAt: -1 })

        // return success message
        res.status(201).json({
            message: "All Contacts fetched successfully",
            contacts
        });
    } catch (error) {
        console.log("Error while fetching all contacts => ", error)
        res.status(500).json({
            message: 'Error while fetching all contacts',
            error: error.message
        });
    }
};