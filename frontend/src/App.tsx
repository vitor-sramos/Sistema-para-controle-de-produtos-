import { ProdutoPage } from "./pages/ProdutoPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProdutoPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
