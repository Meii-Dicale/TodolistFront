import axios from "axios";

function updateTasks (idTask, libelleTask) {
    const token = localStorage.getItem('token');
    const data = {
        libelleTask : libelleTask,
        idTask : idTask
    };
    return axios.post (`http://localhost:3007/task/updateTask/${idTask}`, data,
        {
       headers: { 
        'Authorization': `Bearer ${token}`, // Inclure le token
       }
    }
    )
}

export default updateTasks;