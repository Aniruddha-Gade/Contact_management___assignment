import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid2';
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

  // handle Submit
  const handleFormSubmit = async () => {
    // edit contact
    if (initialValues) {
      setLoading(true)
      const response = await apiConnector(
        "PUT",
        `${UPDATE_CONTACT_API}/${formValues?.id}`, 
        formValues,
      );

      setLoading(false)
      console.log("UPDATE_CONTACT API RESPONSE............", response)
      if (response?.data?.success) {
        toast.success("Conatact updated Succesfully")
        onClose()
      }
    } else {
      // create new contact
      setLoading(true)
      const response = await apiConnector("POST", CREATE_NEW_CONTACT_API, formValues)
      setLoading(false)
      
      console.log("CREATE_NEW_CONTACT API RESPONSE............", response)
      if (response?.data?.success) {
        toast.success("New Conatact Added Succesfully")
        onClose()
      }
    }
  };

  console.log("initialValues= ", initialValues)
  console.log("formValues = ", formValues)


  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle >{initialValues ? "Edit Contact" : "Add New Contact"}</DialogTitle>

      <DialogContent style={{ padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="First Name"
              name="firstName"
              value={formValues?.firstName || ""}
              onChange={handleFormChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formValues?.lastName || ""}
              onChange={handleFormChange}
              fullWidth
            />
          </Grid>
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
        </Grid>
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
