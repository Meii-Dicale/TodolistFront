import axios from "axios";
function Connexion ( nameUser, passwordUser ) {
    const data = {
        nameUser: nameUser,
        passwordUser: passwordUser,
    };
    return axios.post ('http://localhost:3007/user/loginUser' , data)
}
export default Connexion;