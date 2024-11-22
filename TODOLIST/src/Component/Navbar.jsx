import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    const [userLogged, setUserLogged] = useState();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >Ask-a-Task </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="ms-auto ">

            {userLogged !== false && (
              <NavDropdown title="Mon Compte" id="basic-nav-dropdown">
                <NavDropdown.Item >Mes informations</NavDropdown.Item>
                <NavDropdown.Item href='/tasks'>Mes tâches</NavDropdown.Item>
                <NavDropdown.Item >Déconnexion</NavDropdown.Item>
              </NavDropdown>
            )} 

{userLogged == false && (
    <>
<Nav.Link href="/inscription">Inscription</Nav.Link>
<Nav.Link href="/connexion">Connexion</Nav.Link>
</>
)} 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;