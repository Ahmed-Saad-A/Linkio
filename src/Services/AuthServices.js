import axios from "axios";
import  Cookies  from 'js-cookie';

const baseUrl = 'https://linked-posts.routemisr.com/';

export async function registerApi(formData) {
    
    try {
        const { data } = await axios.post(baseUrl + 'users/signup', formData);

    return data;
    } catch (error) {
        return error.response.data.error;
    }
}

export async function loginApi(formData) {
    
    try {
        const { data } = await axios.post(baseUrl + 'users/signin', formData);

    return data;
    } catch (error) {
        return error.response ?  error.response.data.error : error.message;
    }
}

export async function getUserProfileApi() {
    
    try {
        const { data } = await axios.get(baseUrl + 'users/profile-data', {
            headers: {
                token: Cookies.get('token')
            }
        });

        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message;
    }
}