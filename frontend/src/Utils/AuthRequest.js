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

export async function LoginRequest(user){
    const res = await API.post('/getToken',user,config)
    return res.data
}

export async function CreateUser(data) {
    const res = API.post('/users/register', data, configJson)
    return res
}