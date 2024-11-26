import axios from "axios"
function deleteTasks (idTask) {
    const token = localStorage.getItem('token');

    return axios.get (`http://localhost:3007/task/deleteTask/${idTask}` ,
        {
       headers: {
           'Authorization': `Bearer ${token}`, // Inclure le token
       }
   } )
}

export default deleteTasks;