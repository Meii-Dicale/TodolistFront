import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModuleInscription from "./Component/moduleInscription";
import ModuleConnexion from "./Component/moduleConnexion";

function App() {
  return (
<>
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
    <NavBar></NavBar>
<Routes>
  <Route path="/inscription" element={<ModuleInscription></ModuleInscription>}></Route>
  <Route path="/connexion" element={<ModuleConnexion></ModuleConnexion>}></Route>
</Routes>
    </BrowserRouter>
    </>
  )
}

export default App;