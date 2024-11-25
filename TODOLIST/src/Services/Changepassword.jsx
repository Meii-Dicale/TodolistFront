import axios from "axios";

function ModifyPassword(idUser, newPassword) {
    const data = {
        idUser: idUser,
        passwordUser: newPassword, 
    };
    return axios.post ('http://localhost:3007/user/changePassword' , data )
}

export default ModifyPassword;