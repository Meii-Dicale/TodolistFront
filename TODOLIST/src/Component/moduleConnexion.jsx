import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Connexion from '../Services/ConnexionService';
import { useNavigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";


function ModuleConnexion() {
  const [nameUser, setNameUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token = ""




  const clickSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    setErrorMessage(''); // Réinitialise les erreurs

    try {
        // Appel à la fonction Connexion pour authentifier l'utilisateur
        const response = await Connexion(nameUser, passwordUser);
        
        // Vérifie si la réponse contient un token
        if (response && response.data && response.data.token) {

            // Stocke le token dans localStorage
            localStorage.setItem('token', response.data.token);

            console.log("Token stocké en localStorage:", localStorage.getItem('token'));
            //rediriger vers la page task

            navigate('/tasks');

            
        } else {
            // Si le token n'est pas présent dans la réponse
            throw new Error("Token manquant");
        }
    } catch (error) {
        console.error("Erreur de connexion:", error);
        setErrorMessage("Échec de la connexion. Vérifiez vos identifiants.");
    }
};




  return (
    <Container className="mt-5 col-3 text-center module">
      <Form onSubmit={clickSubmit}>
        <h1>Connexion</h1>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom d'utilisateur"
            value={nameUser}
            onChange={(e) => setNameUser(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Connexion
        </Button>
      </Form>
      <br />
      <a href="/inscription">Je n'ai pas encore de compte</a>
    </Container>
  );
}

export default ModuleConnexion;
