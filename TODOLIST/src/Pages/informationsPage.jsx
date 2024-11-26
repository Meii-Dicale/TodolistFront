import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import React from "react";
import InfoUser from "../Services/infoUser";
import ModifyPassword from "../Services/changepassword";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import SupprimerUtilisateur from "../Services/DeleteUser";
import { useNavigate } from "react-router-dom";

const InfoPage = () => {
    const token = localStorage.getItem("token");
    const { decodedToken, isExpired } = useJwt(token);
    const [idUser, setIdUser] = useState("");
    const [userInfo, setUserInfo] = useState([]);
    const [changePassword, setChangePassword] = useState(false);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (decodedToken && !isExpired) {
            setIdUser(decodedToken.id);
            console.log("ID Utilisateur :", decodedToken.id);
        }
    }, [decodedToken, isExpired]);

    const getAllUserInfo = async () => {
        
        if (!idUser) return;
        try {
            const response = await InfoUser(idUser);
            console.log(response);
            setUserInfo(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteAccount = async () => {
        try {
            // Appel à la fonction SupprimerUtilisateur pour supprimer l'utilisateur
            SupprimerUtilisateur(idUser);
            localStorage.removeItem("token"); // Supprime le token de localStorage
            navigate("/"); // Redirige vers la page de connexion
        } catch (err) {
            console.error(err);
        }
    };

    const modifyMyPassword = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        setError(""); // Réinitialise l'erreur
        setSuccessMessage("");

        if (password1 !== password2) {
            setError("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            await ModifyPassword(idUser, password1); // Appel au service pour modifier le mot de passe
            setSuccessMessage("Votre mot de passe a été modifié avec succès !");
            setChangePassword(false); // Ferme le formulaire
        } catch (err) {
            console.error(err);
            setError("Une erreur est survenue lors de la modification du mot de passe.");
        }
    };

    useEffect(() => {
        getAllUserInfo();
    }, [idUser]);

    return (
        <Container className="d-flex align-items-center flex-column gap-5">
            <h1>Informations Utilisateur</h1>
            {userInfo.length > 0 && (
                <p>Nom : {userInfo[0].nameUser}</p>
            )}
            {!changePassword ? (
                <button onClick={() => setChangePassword(true)}>
                    Modifier mon mot de passe
                </button>
            ) : (
                <form className="d-flex flex-column gap-3" onSubmit={modifyMyPassword}>
                    <input
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                        type="password"
                        placeholder="Nouveau mot de passe"
                    />
                    <input
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                        type="password"
                        placeholder="Confirmez le nouveau mot de passe"
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                    <button type="submit">Modifier mon mot de passe</button>
                </form>
            )}
            {<form onSubmit={deleteAccount} >
                <Button variant="danger" type="submit" className="btn-warning">
                    Supprimer mon compte
                </Button>
            </form>}
        </Container>
    );
};

export default InfoPage;
