import axios from "axios";

function ModifyPassword(idUser, newPassword) {
    const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur connecté.
    console.log(token);
    const data = {
        idUser: idUser,
        passwordUser: newPassword, 
    };
    return axios.post ('http://localhost:3007/user/changePassword' , data,  {
        headers: {
            'Authorization': `Bearer ${token}`, // Inclure le token
        }
    }  )
}

export default ModifyPassword;