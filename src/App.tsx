// Context
import { ChallengesProvider } from "./contexts/ChallengesContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import ThemeContextParent from "./contexts/ThemeContext";

// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { Clock } from "./pages/Clock";
import { Login } from "./pages/Login";

import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <ThemeContextParent>
      <HelmetProvider>
        <BrowserRouter>
          <AuthContextProvider>
            <ChallengesProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/pomodoro" element={<Clock />} />
              </Routes>
            </ChallengesProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeContextParent>
  );
}

export default App;
