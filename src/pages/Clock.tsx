// React
import { useContext, useEffect } from "react";

// Components
import { Header } from "../components/Header";
import { ClockAndProfile } from "../components/ClockAndProfile";
import { ThemeButton } from "../components/ThemeButton";
import { BarXp } from "../components/BarXp";
import { TaskList } from "../components/TaskList";

// Context
import { AuthContext } from "../contexts/AuthContext";
import { CountdownProvider } from "../contexts/CountdownContext";

// React Router Dom
import { useNavigate } from "react-router-dom";

export function Clock() {
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <div className="contentScreens">
      <Header />
      <main>
        <div className="container">
          <BarXp />

          <CountdownProvider>
            <ClockAndProfile />
          </CountdownProvider>

          <ThemeButton />

          <TaskList />
        </div>
      </main>
    </div>
  );
}
