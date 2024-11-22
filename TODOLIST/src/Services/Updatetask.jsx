import axios from "axios";

function updateTasks (idTask, libelleTask) {
    const data = {
        libelleTask : libelleTask,
        idTask : idTask
    };
    return axios.post (`http://localhost:3007/task/updateTask/${idTask}`, data)
}

export default updateTasks;