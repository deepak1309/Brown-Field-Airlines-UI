import axios from 'axios';

const lid=`http://localhost:8080/api/auth/login`
let login=(loginId,password)=>{
    return axios.post(lid,loginId,password)
}

export {
    login
}
