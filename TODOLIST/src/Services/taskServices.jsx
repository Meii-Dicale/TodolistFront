import axios from "axios";

function createTask (idUser, libelleTask) {
    const data = {
        libelleTask: libelleTask,
        idUser: idUser,
    
    };
    return axios.post ('http://localhost:3007/task/createTask' , data)
}

function getTasks (idUser) {
    const data = {
        idUser: idUser,
    };
    return axios.post ('http://localhost:3007/task/tasksToDo' , data)
}

function getTaskDone (idUser) {
    const data = {
        idUser: idUser,
    };
    return axios.post ('http://localhost:3007/task/tasksFinished' , data)
}

function getTaskDoing (idUser) {
    const data = {
        idUser: idUser,
    };
    return axios.post ('http://localhost:3007/task/tasksInProgress' , data)
}

function getAllTasks(idUser) {
    const data = {
        idUser: idUser,
    };
    return axios.post ('http://localhost:3007/task/allTasks' , data)
}




export default  createTask; 
export { getTasks, getTaskDone, getTaskDoing};
export { getAllTasks };
