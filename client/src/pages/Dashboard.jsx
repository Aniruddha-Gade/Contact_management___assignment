import { useEffect, useState } from "react"
import { ContactEndpoints } from "../services/api"
import { apiConnector } from "../services/apiConnector"
import DataTable from "../components/DataTable"



const Dashboard = () => {

    const { GET_ALL_CONTACTS_API, } = ContactEndpoints
    const [allContacts, setAllContacts] = useState([])
    const [loading, setLoading] = useState(false)


    const headCells = [
        { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
        { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'phoneNumber', numeric: true, disablePadding: false, label: 'phoneNumber' },
        { id: 'company', numeric: false, disablePadding: false, label: 'company' },
        { id: 'jobTitle', numeric: false, disablePadding: false, label: 'jobTitle' },
    ];


    const rows = allContacts?.map((contact) => ({
        id: contact._id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        company: contact.company,
        jobTitle: contact.jobTitle,
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
        <div className="w-full h-full p-5">
            {
                loading ?
                    <div className='text-5xl text-green-600'>
                        loading
                    </div>
                    :
                    <DataTable rows={rows} headCells={headCells} />
            }

        </div>
    )
}

export default Dashboard