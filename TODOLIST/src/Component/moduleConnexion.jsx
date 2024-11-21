import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';

function ModuleConnexion () {



    return(
        <>
<Container className='mt-5 col-3 text-center'>
  <Form>
    <h1>
    Connexion
  </h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">

        <Form.Label>Nom d'utilisateur</Form.Label>
        <Form.Control type="nameUser" placeholder="Nom d'utilisateur" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Connexion
      </Button>
    </Form>

    </Container>



        </>
    )

}
export default ModuleConnexion;