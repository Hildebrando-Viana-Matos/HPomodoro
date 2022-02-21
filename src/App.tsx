// Context
import { AuthContextProvider } from "./contexts/AuthContext";
import ThemeContextParent from "./contexts/ThemeContext";

// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { Clock } from "./pages/Clock";
import { Login } from "./pages/Login";
import { Ranking } from "./pages/Ranking";

function App() {
  return (
    <ThemeContextParent>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/pomodoro" element={<Clock />} />
            <Route path="/ranking" element={<Ranking />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeContextParent>
  );
}

export default App;
