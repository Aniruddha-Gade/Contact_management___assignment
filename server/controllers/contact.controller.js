

import ContactModel from '../models/contact.model.js';





// ========================= CREATE A NEW CONTACT ========================= 
export const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body

        // validate data
        if (!firstName || !lastName || !email || !phoneNumber || !company || !jobTitle) {
            return res.status(400).json({
                succes: false,
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
            succes: true,
            message: "New Contact created successfully",
            contact
        });
    } catch (error) {
        console.log("Error while creating new contact => ", error)
        res.status(400).json({
            succes: false,
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
            succes: true,
            message: "All Contacts fetched successfully",
            contacts
        });
    } catch (error) {
        console.log("Error while fetching all contacts => ", error)
        res.status(500).json({
            succes: false,
            message: 'Error while fetching all contacts',
            error: error.message
        });
    }
};




// ========================= UPDATE CONTACT WITH ID ========================= 
export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        // validate data
        if (!id) {
            return res.status(400).json({
                message: "conatct ID is required to update contact",
            });
        }

        const updatedData = req.body;

        const contact = await ContactModel.findByIdAndUpdate(id,
            updatedData,
            { new: true }
        );

        if (!contact) return res.status(404).json({
            succes: true,
            message: 'Contact not found by ID',
        });

        res.status(200).json({
            succes:true,
            message:"Conatct updated successfully",
            contact
        });
    } catch (error) {
        console.log("Error while updating contact by Id => ", error)
        res.status(500).json({
            succes: false,
            message: 'Error while updating contact by Id',
            error: error.message
        });
    }
};