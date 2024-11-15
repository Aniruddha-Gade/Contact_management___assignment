
import mongoose from 'mongoose'


const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email"
        },
    },
    phoneNumber: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    jobTitle: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updateddAt: {
        type: Date
    }
}, { timestamps: true });



const ContactModel = mongoose.model('Contact', contactSchema);
export default ContactModel;