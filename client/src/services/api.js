const BASE_URL = import.meta.env.VITE_APP_BASE_URL;



// CONTACTS ENDPOINTS
export const endpoints = {
    CREATE_NEW_CONTACT_API: BASE_URL + "/contact/contacts",
    GET_ALL_CONTACTS_API: BASE_URL + "/contact/contacts",
    UPDATE_CONTACT_API: BASE_URL + "/contact/contacts",
    DELETE_CONTACT_API: BASE_URL + "/contact/contacts",
}
