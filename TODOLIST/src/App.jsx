import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModuleInscription from "./Component/moduleInscription";
import ModuleConnexion from "./Component/moduleConnexion";
import TaskPage from "./Pages/todolist";
import InfoPage from "./Pages/informationsPage";
import AccueilPage from "./Pages/accueil";


function App() {
  return (
<>
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
    <NavBar></NavBar>
<Routes>
  <Route path="/" element={<AccueilPage></AccueilPage>}></Route>
  <Route path="/inscription" element={<ModuleInscription></ModuleInscription>}></Route>
  <Route path="/connexion" element={<ModuleConnexion></ModuleConnexion>}></Route>
  <Route path="/tasks" element={<TaskPage></TaskPage>}></Route>
  <Route path="/myAccount" element={<InfoPage></InfoPage>}></Route>
</Routes>
    </BrowserRouter>
    </>
  ) 
}

export default App;