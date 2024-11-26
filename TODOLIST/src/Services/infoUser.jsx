import axios from "axios";
function InfoUser (idUser) {
     const token = localStorage.getItem('token');
    const data = {
        idUser: idUser,
    };
    return axios.post ('http://localhost:3007/user/personnalInfo' , data,
         {
        headers: {
            'Authorization': `Bearer ${token}`, // Inclure le token
        }
    } 
)
}



export default InfoUser ;