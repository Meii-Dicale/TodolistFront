import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModuleInscription from "./Component/moduleInscription";
import ModuleConnexion from "./Component/moduleConnexion";
import TaskPage from "./Pages/todolist";


function App() {
  return (
<>
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
    <NavBar></NavBar>
<Routes>
  <Route path="/inscription" element={<ModuleInscription></ModuleInscription>}></Route>
  <Route path="/connexion" element={<ModuleConnexion></ModuleConnexion>}></Route>
  <Route path="/tasks" element={<TaskPage></TaskPage>}></Route>
</Routes>
    </BrowserRouter>
    </>
  ) 
}

export default App;