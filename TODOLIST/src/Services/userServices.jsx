import axios from "axios";

function Subscription ( nameUser, passwordUser) {
    const data = {
        nameUser: nameUser,
        passwordUser: passwordUser,
    };
    return axios.post ('http://localhost:3007/user/createUser' , data)
}




export default  Subscription ;  
