import axios from "axios";
function InfoUser (idUser) {
    const data = {
        idUser: idUser,
    };
    return axios.post ('http://localhost:3007/user/personnalInfo' , data)
}



export default InfoUser ;