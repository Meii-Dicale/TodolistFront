import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "../App.css";
import createTask, { getAllTasks } from "../Services/taskServices";
import deleteTasks from "../Services/deleteTask";
import updateTasks from "../Services/Updatetask"
import updateStateTask from "../Services/doneTask";
import React from "react";
import { useJwt } from "react-jwt";






const TaskPage = () => {
    const [newTask, setNewTask] = useState("");
    const [idTask, setIdTask] = useState("");
    const [upTask, setUpTask] = useState("");
    const [isCheckedDoing, setIsCheckedDoing] = useState(false);
    const [isCheckedDone, setIsCheckedDone] = useState(false);
    const [isCheckedTodo, setIsCheckedTodo] = useState(false);
    const [searchTask, setSearchTask] = useState("");
    const [idUser, setIdUser] = useState("");
    const token = localStorage.getItem("token");
    const { decodedToken, isExpired } = useJwt(token);
    const [allTasks, setAllTasks] = useState();


    ////////////////////////////////////////////////////////////////
    // récupérer le token et récupérer l'id en traduisant le token avec jwt


    // Fonction pour récupérer l'ID de l'utilisateur à partir du token


    useEffect(() => {
        if (decodedToken && !isExpired) {
            setIdUser(decodedToken.id); // Enregistre l'ID de l'utilisateur
            console.log("ID Utilisateur :", decodedToken);

        }

    }, [decodedToken, isExpired]);

    const ALLTASKS = async () => {
        try {
            const response = await getAllTasks(idUser);
            setAllTasks(response.data);
            console.log("Toutes les tâches : ", response.data);


        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        ALLTASKS()
    }, [idUser])

    ////////////////////////////////////////////////////////////////
    // Fonction pour mettre à jour une tâche
    const update = () => {
        try {
            updateTasks(idTask, upTask);
            console.log(idTask)
            setUpTask("");
            setIdTask("");
            ALLTASKS();



        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche :", error);
        }
    };

    // Fonction pour ajouter une tâche
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return; // Éviter les requêtes vides
        try {
            createTask(idUser, newTask);

            ALLTASKS();
            setNewTask("");

        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche :", error);
        }
    };
    // Fonction pour supprimer une tâche
    const removeTask = (idTask) => {
        try {
            deleteTasks(idTask);
            ALLTASKS();
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche :", error);
        }
    };
    // Fonction passer une tâche "terminée"
    const getDone = async (idTask) => {
        try {
            await updateStateTask(idTask, 3);
            ALLTASKS();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche :", error);
        }
    };
    //Fonction pour passer une tâche "en cours"
    const getDoing = async (idTask) => {
        try {
            await updateStateTask(idTask, 2);
            ALLTASKS();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche :", error);
        }
    };
    //Fonction pour passer une tâche "à faire"
    const getTodo = async (idTask) => {
        try {
            await updateStateTask(idTask, 1);
            ALLTASKS();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche :", error);
        }
    };
    return (
        <>
            <Container>
                <div className="d-flex flex-row gap-5 mt-5">
                    <div className="selectors d-flex w-25 flex-column">
                        <div onClick={() => setIsCheckedDoing(!isCheckedDoing)}>
                            <input type="checkbox" checked={isCheckedDoing} onChange={() => setIsCheckedDoing(!isCheckedDoing)} />
                            Masquer tâches en cours
                        </div>
                        <div onClick={() => setIsCheckedTodo(!isCheckedTodo)}>
                            <input type="checkbox" checked={isCheckedTodo} onChange={() => setIsCheckedTodo(!isCheckedTodo)} />
                            Masquer tâches à faire
                        </div>

                        <div onClick={() => setIsCheckedDone(!isCheckedDone)}>
                            <input type="checkbox" checked={isCheckedDone} onChange={() => setIsCheckedDone(!isCheckedDone)} />
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

                            {allTasks && isCheckedTodo == false &&
                                allTasks
                                    .filter((task) => task.idState === 1)
                                    .map((task) => (
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
                                                <button className="selected" onClick={() => getTodo(task.idTask)}>A faire</button>
                                                <button onClick={() => getDoing(task.idTask)}>En cours</button>
                                                <button onClick={() => getDone(task.idTask)}>Terminé</button>
                                            </div>
                                        </div>
                                    ))}

                            {allTasks && isCheckedDoing == false &&
                                allTasks
                                    .filter((task) => task.idState === 2)
                                    .map((task) => (
                                        <div className="libelletaskDoing" key={task.idTask}>
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
                                                <button onClick={() => removeTask(task.idTask)}> Supprimer</button>
                                                <button onClick={() => getTodo(task.idTask)}>A faire</button>
                                                <button className="selected" onClick={() => getDoing(task.idTask)}>En cours</button>
                                                <button onClick={() => getDone(task.idTask)}>Terminé</button>

                                            </div>
                                        </div>
                                    ))}

                            {allTasks && isCheckedDone == false &&
                                allTasks
                                    .filter((task) => task.idState === 3)
                                    .map((task) => (
                                        <div className="libelletaskDone" key={task.idTask}>
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

                                                <button onClick={() => getTodo(task.idTask)}>A faire</button>
                                                <button onClick={() => getDoing(task.idTask)}>En cours</button>
                                                <button className="selected" onClick={() => getDone(task.idTask)}>Terminé</button>
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
