// React
import { useState } from "react";

// Components
import { Header } from "../components/Header";
import { ClockAndProfile } from "../components/ClockAndProfile";
import { ThemeButton } from "../components/ThemeButton";
import { BarXp } from "../components/BarXp";
import { TaskList } from "../components/TaskList";
import { NewChallengeModal } from "../components/NewChallengeModal";
import { NewLevelModal } from "../components/NewLevelModal";

export function Clock() {
  const [isNewChallengeOpen, setIsNewChallengeOpen] = useState(false);

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
