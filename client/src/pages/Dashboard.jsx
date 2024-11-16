import { useEffect, useState } from "react"
import { ContactEndpoints } from "../services/api"
import { apiConnector } from "../services/apiConnector"
import DataTable from "../components/DataTable"
import SkeletonTable from "../components/loader/SkeletonTable"
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import ContactFormDialog from "../components/ContactFormDialog"


const Dashboard = () => {

    const { GET_ALL_CONTACTS_API, } = ContactEndpoints
    const [allContacts, setAllContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogOpen = () => setIsDialogOpen(true);
    const handleDialogClose = () => setIsDialogOpen(false);

  



    const headCells = [
        { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
        { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'phoneNumber', numeric: true, disablePadding: false, label: 'Phone Number' },
        { id: 'company', numeric: false, disablePadding: false, label: 'Company' },
        { id: 'jobTitle', numeric: false, disablePadding: false, label: 'Job Title' },
    ];


    const rows = allContacts?.map((contact) => ({
        id: contact?._id,
        firstName: contact?.firstName,
        lastName: contact?.lastName,
        email: contact?.email,
        phoneNumber: contact?.phoneNumber,
        company: contact?.company,
        jobTitle: contact?.jobTitle,
    }));


    // fetch All contacts by API
    useEffect(() => {
        const fecthAllContacts = async () => {
            try {
                setLoading(true)
                const response = await apiConnector("GET", GET_ALL_CONTACTS_API, {}, {
                })
                console.log("GET_ALL_CONTACTS API RESPONSE............", response)
                if (!response?.data?.success) {
                    console.log("Could Not create new category")
                }
                setAllContacts(response?.data?.contacts)
                setLoading(false)

            } catch (error) {
                console.log("GET_ALL_CONTACTS API ERROR............", error)
            }
        }

        fecthAllContacts()
    }, [GET_ALL_CONTACTS_API])


    return (
        <div className="w-full h-full p-5 flex flex-col gap-5 ">
          <h1 className="text-5xl text-center sm:text-left font-bold text-green-600 font-Boogaloo">
            Manage Contacts
          </h1>
            <div className="flex justify-end">
                <Button variant="contained" size="large"
                    startIcon={<AddIcon />}
                    style={{ backgroundColor: 'green' }}
                    onClick={handleDialogOpen}
                >
                    New Contact
                </Button>
            </div>

            {
                loading ? (
                    <SkeletonTable headCells={headCells} />
                ) : allContacts.length === 0 ? (
                    <div className="flex-center flex-col h-full text-4xl font-bold">
                        No Contacts Data Found...!
                    </div>
                ) : (
                    <DataTable rows={rows} headCells={headCells} />
                )
            }


            {/* Contact Form Dialog */}
            {
                isDialogOpen &&
                <ContactFormDialog
                    open={isDialogOpen}
                    onClose={handleDialogClose}
                />
            }
        </div>
    )
}

export default Dashboard