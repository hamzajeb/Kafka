import API from "./BaseURL";


const config = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
}

const configJson = {
    headers: {
        'content-type': 'application/json'
    }
}



export async function CreateCustomer(data) {
    const res = API.post('/items/items/', data, configJson)
    return res
}