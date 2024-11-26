import axios from "axios";

function createTask (idUser, libelleTask) {
    const token = localStorage.getItem('token');

    const data = {
        libelleTask: libelleTask,
        idUser: idUser,
    
    };
    return axios.post ('http://localhost:3007/task/createTask' , data,
        {
       headers: {
           'Authorization': `Bearer ${token}`, // Inclure le token
       }
   } )
}


function getAllTasks(idUser) {
    const token = localStorage.getItem('token');
    const data = {
        idUser: idUser,
    };
    return axios.post ('http://localhost:3007/task/allTasks' , data,
    {
   headers: {
       'Authorization': `Bearer ${token}`, // Inclure le token
   }
} )
}




export default  createTask; 
export { getAllTasks };
