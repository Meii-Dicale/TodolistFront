import axios from "axios";

function createTask ( libelleTask) {
    const data = {
        libelleTask: libelleTask
    };
    return axios.post ('http://localhost:3007/task/createTask' , data)
}

function getTasks () {
    return axios.get ('http://localhost:3007/task/tasksToDo')
}




export default  createTask; 
export { getTasks };

