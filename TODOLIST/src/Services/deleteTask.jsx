import axios from "axios"
function deleteTasks (idTask) {
    return axios.get (`http://localhost:3007/task/deleteTask/${idTask}`)
}

export default deleteTasks;