import axios from 'axios'
const instance = axios.create({
    baseURL : 'https://char-93c7a.firebaseio.com/'
})
instance.defaults.headers.common['Authorization'] = 'AUTH TOKE FROM INSTANCE';

export default instance