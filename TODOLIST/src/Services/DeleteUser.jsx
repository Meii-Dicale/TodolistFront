import axios from "axios";

function SupprimerUtilisateur (idUser) {
    const data = {
        idUser: idUser,
    };
    return axios.post ('http://localhost:3007/user/deleteUser' , data)
}


export default SupprimerUtilisateur;