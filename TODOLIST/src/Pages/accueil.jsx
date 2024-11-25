import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AccueilPage = () => {

    return (
        <>
        <Container className="d-flex align-items-center flex-column gap-5">
            <h1>Bienvenue sur Ask-a-Task</h1>
            <p>Cette application vous permet de gérer votre liste de tâches en ligne.</p>
            <img className="imgac" src="./img/bloc.jpg"></img>
        </Container>
        </>
    )
}

export default AccueilPage;