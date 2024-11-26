import axios from "axios";

function updateStateTask(idTask , idState) {
    const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur connecté.
    const data = {
        idTask: idTask,
        idState: idState,
    };
    return axios.post(`http://localhost:3007/task/updateStateTask/${idTask}`, data, 
        {
       headers: {
        'Authorization': `Bearer ${token}`, // Inclure le token
       }
    }
    );
}

export default updateStateTask;

