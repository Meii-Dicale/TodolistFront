import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Subscription from '../Services/userServices';
import { useNavigate } from 'react-router-dom';

function ModuleInscription() {
  const [nameUser, setNameUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const navigate = useNavigate();

  const clickSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
    try {
      const response = await Subscription(nameUser, passwordUser);
      if (response.data === "Nom déjà utilisé"
      ){
      alert('Nom déjà utilisé');
      console.log(response);

      setNameUser('');
      setPasswordUser('');
      }if (response.data != "Nom déjà utilisé"
      ) {
        console.log(response);
        setNameUser('');
        setPasswordUser('');
        
        navigate('/connexion')
        alert('Inscription réussie !');

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="mt-5 col-3 text-center module">
        <Form onSubmit={clickSubmit}>
          <h1>Inscription</h1>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              placeholder="Choisissez un nom d'utilisateur"
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Choisissez un mot de passe"
              value={passwordUser}
              onChange={(e) => setPasswordUser(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Inscris-moi !
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ModuleInscription;
