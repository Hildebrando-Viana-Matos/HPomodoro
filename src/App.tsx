import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { Clock } from "./pages/Clock";
import { Login } from "./pages/Login";
import { Ranking } from "./pages/Ranking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Clock />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
