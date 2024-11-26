import axios from "axios";

function SupprimerUtilisateur (idUser) {
    const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur connecté.
    const data = {
        idUser: idUser,
    };
    return axios.post ('http://localhost:3007/user/deleteUser' , data,  {
        headers: {
            'Authorization': `Bearer ${token}`, // Inclure le token
        }
    } )
}


export default SupprimerUtilisateur;