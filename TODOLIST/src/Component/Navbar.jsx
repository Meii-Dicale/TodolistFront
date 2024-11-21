import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    const [userLogged, setUserLogged] = useState(null);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">TO DO LIST </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="ms-auto ">

            {userLogged !== null && (
                <NavDropdown title="Mon Compte" id="basic-nav-dropdown">
                <NavDropdown.Item >Mes informations</NavDropdown.Item>
                <NavDropdown.Item >Mes tâches</NavDropdown.Item>
              </NavDropdown>
)} 
{userLogged == null && (
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