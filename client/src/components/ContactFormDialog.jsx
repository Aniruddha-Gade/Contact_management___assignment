import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid2 } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { apiConnector } from "../services/apiConnector";
import { ContactEndpoints } from "../services/api";
import { toast } from "sonner";


const ContactFormDialog = ({ open, onClose, initialValues = null }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const { CREATE_NEW_CONTACT_API, UPDATE_CONTACT_API } = ContactEndpoints
  const [loading, setLoading] = useState(false)


  // handle form Change
  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };


  // validate Form Details
  const validateFormDetails = () => {
    const requiredFields = [
      { field: "firstName", message: "First name is required" },
      { field: "lastName", message: "Last name is required" },
      { field: "email", message: "Email is required" },
      { field: "phoneNumber", message: "Phone Number is required" },
      { field: "company", message: "Company name is required" },
      { field: "jobTitle", message: "Job Title is required" },
    ];

    for (const { field, message } of requiredFields) {
      if (!formValues[field]) {
        toast.error(message);
        return false;
      }
    }

    return true;
  }

  // check whether user has changed contact info 
  const hasFormChanged = () => {
    return Object.keys(initialValues || {}).some(
      (key) => formValues[key] !== initialValues[key]
    );
  };

  // handle Form Submit
  const handleFormSubmit = async () => {
    if (!validateFormDetails()) return;

    const isEdit = Boolean(initialValues);

    if (isEdit && !hasFormChanged()) {
      toast.error("No changes detected. Please update the information before saving.");
      return;
    }

    const apiEndpoint = isEdit
      ? `${UPDATE_CONTACT_API}/${formValues?.id}` : CREATE_NEW_CONTACT_API;
    const apiMethod = isEdit ? "PUT" : "POST";
    const successMessage = isEdit
      ? "Contact updated successfully"
      : "New contact added successfully";

    try {
      setLoading(true);
      const response = await apiConnector(apiMethod, apiEndpoint, formValues);
      setLoading(false);

      if (response?.data?.success) {
        toast.success(successMessage);
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error = ", error)
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
    onClose();
  };


  // console.log("initialValues= ", initialValues)
  // console.log("formValues = ", formValues)


  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle >{initialValues ? "Edit Contact" : "Add New Contact"}</DialogTitle>

      <DialogContent style={{ padding: "20px" }}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6}>
            <TextField
              required
              label="First Name"
              name="firstName"
              value={formValues?.firstName || ""}
              onChange={handleFormChange}
              fullWidth
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formValues?.lastName || ""}
              onChange={handleFormChange}
              fullWidth
            />
          </Grid2>
          <TextField
            label="Email"
            name="email"
            value={formValues?.email || ""}
            onChange={handleFormChange}
            fullWidth
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formValues?.phoneNumber || ""}
            onChange={handleFormChange}
            fullWidth
          />

          <TextField
            label="Company"
            name="company"
            value={formValues?.company || ""}
            onChange={handleFormChange}
            fullWidth
          />

          <TextField
            label="Job Title"
            name="jobTitle"
            value={formValues?.jobTitle || ""}
            onChange={handleFormChange}
            fullWidth
          />
        </Grid2>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleFormSubmit}
          disabled={loading}
          variant="contained" color="primary" endIcon={<SendIcon />}
        >
          {loading ? 'Submitting' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactFormDialog;
