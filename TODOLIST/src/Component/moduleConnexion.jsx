import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Connexion from '../Services/ConnexionService';

function ModuleConnexion() {
  const [nameUser, setNameUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clickSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    setErrorMessage(''); // Réinitialise les erreurs
    Connexion(nameUser, passwordUser)
      .then((response) => {
      
        setNameUser('');
        setPasswordUser('');
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Échec de la connexion. Vérifiez vos identifiants.");
      });
  };

  return (
    <Container className="mt-5 col-3 text-center">
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
