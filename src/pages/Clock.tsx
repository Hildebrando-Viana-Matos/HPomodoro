// React
import { useContext, useEffect, useState } from "react";

// Components
import { Header } from "../components/Header";
import { ClockAndProfile } from "../components/ClockAndProfile";
import { ThemeButton } from "../components/ThemeButton";
import { BarXp } from "../components/BarXp";
import { TaskList } from "../components/TaskList";
import { NewChallengeModal } from "../components/NewChallengeModal";
import { NewLevelModal } from "../components/NewLevelModal";

// Context
import { AuthContext } from "../contexts/AuthContext";

// React Router Dom
import { useNavigate } from "react-router-dom";

export function Clock() {
  const [isNewChallengeOpen, setIsNewChallengeOpen] = useState(false);
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  function handleOpenNewChallenge() {
    setIsNewChallengeOpen(true);
  }

  function handleCloseNewChallenge() {
    setIsNewChallengeOpen(false);
  }

  return (
    <div className="contentScreens">
      <Header />
      <main>
        <div className="container">
          <BarXp />

          <ClockAndProfile />

          <ThemeButton />

          <TaskList />

          <NewChallengeModal
            isOpen={isNewChallengeOpen}
            onRequestClose={handleCloseNewChallenge}
          />
          <NewLevelModal
            isOpen={isNewChallengeOpen}
            onRequestClose={handleCloseNewChallenge}
          />
        </div>
      </main>
    </div>
  );
}
