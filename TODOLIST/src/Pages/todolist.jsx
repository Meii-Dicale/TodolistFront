import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "../App.css";
import createTask from "../Services/taskServices";
import { getTasks } from "../Services/taskServices";
import deleteTasks from "../Services/deleteTask";
import updateTasks from "../Services/Updatetask"

const TaskPage = () => {
    const [tasksToDo, setTasksToDo] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [idTask, setIdTask] = useState("");
    const [upTask, setUpTask] = useState("");

    // Fonction pour récupérer les tâches
    const getTaskToDo = async () => {
        try {
            const response = await getTasks();
            setTasksToDo(response.data);
            
        } catch (error) {
            console.error("Erreur lors de la récupération des tâches :", error);
        }
    };

    // Fonction pour mettre à jour une tâche
    const update = async () => {
        try {
            await updateTasks(idTask, upTask);
            setUpTask("");
            setIdTask(""); // Réinitialiser l'ID après mise à jour
            await getTaskToDo();
            
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche :", error);
        }
       
    };

    // Fonction pour ajouter une tâche
    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return; // Éviter les requêtes vides
        try {
            await createTask(newTask);
            setNewTask(""); // Réinitialiser le champ de saisie
            await getTaskToDo(); // Recharger les tâches
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche :", error);
        }
    };
    // Fonction pour supprimer une tâche
    const removeTask = async (idTask) => {
        try {
            await deleteTasks(idTask);
            await getTaskToDo();
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche :", error);
        }
    };

    useEffect(() => {
        getTaskToDo();
    }, [tasksToDo]);

    return (
        <>
            <Container>
                <div className="d-flex flex-row gap-5 mt-5">
                    <div className="selectors d-flex w-25 flex-column">
                        <div>
                            <input type="checkbox" />
                            Masquer tâches en cours
                        </div>
                        <div>
                            <input type="checkbox" />
                            Masquer tâches à faire
                        </div>
                        <div>
                            <input type="checkbox" />
                            Masquer tâches terminées
                        </div>
                        <div>
                            <input type="search" />
                        </div>
                    </div>
                    <div className="taskzone w-75">
                        <div className="formadd">
                            <h1>Mes tâches</h1>
                            <form onSubmit={addTask} className="d-flex gap-2">
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Nouvelle tâche..."
                                />
                                <button type="submit">Ajouter</button>
                            </form>
                        </div>

                        <div className="tasks">
                            {tasksToDo.map((task) => (
                                <div className="libelletask" key={task.idTask}>
                                    {/*id task est vide par défaut, si idtask = id de la task, alors j'affiche un champ de modification, je transforme le bouton modifier en confirmer */}
                                    {idTask === task.idTask ? (
                                        <input
                                            type="text"
                                            value={upTask}
                                            onChange={(e) => setUpTask(e.target.value)}
                                            placeholder="Modifier la tâche..."
                                        />
                                    ) : (
                                        <span>{task.libelleTask}</span>
                                    )}

                                    <div className="rightButtons">
                         
                                        {idTask === task.idTask ? (
                                            <button onClick={update}>Confirmer</button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setIdTask(task.idTask);
                                                    setUpTask(task.libelleTask);
                                                }}
                                            >
                                                Modifier
                                            </button>
                                        )}
                                                       <button onClick={() => removeTask(task.idTask)}>
                                            Supprimer
                                        </button>
                                        <button>A faire</button>
                                        <button>Terminé</button>
                                        <button>En cours</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default TaskPage;
