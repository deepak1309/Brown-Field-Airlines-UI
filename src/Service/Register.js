import axios from 'axios';

const url='http://localhost:8080/api/users/register';
const register=(user)=>{
    return axios.post(url, user)
}

export{
    register
}