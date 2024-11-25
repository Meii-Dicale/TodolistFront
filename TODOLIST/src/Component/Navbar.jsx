import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const [userLogged, setUserLogged] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Si le token est présent dans localStorage, l'utilisateur est connecté
    useEffect(() => {
       
        if (token != null) {
            setUserLogged(true);
        }
    }, [token]);

    // Supprime le token de localStorage lors de la déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserLogged(false);
        navigate('/connexion');
    };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href='/' >Ask-a-Task </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="ms-auto ">

            {userLogged !== false && (
              <NavDropdown title="Mon Compte" id="basic-nav-dropdown">
                <NavDropdown.Item href='/myAccount'>Mes informations</NavDropdown.Item>
                <NavDropdown.Item href='/tasks'>Mes tâches</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Déconnexion</NavDropdown.Item>
              </NavDropdown>
            )} 

            {userLogged === false && (
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
