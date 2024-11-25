import axios from "axios";

function updateStateTask(idTask , idState) {
    const data = {
        idTask: idTask,
        idState: idState,
    };
    return axios.post(`http://localhost:3007/task/updateStateTask/${idTask}`, data);
}

export default updateStateTask;

