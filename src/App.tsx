import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TextOnPhoto from "./pages/TextOnPhoto";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TextOnPhoto />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;