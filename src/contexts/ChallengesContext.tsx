import { createContext, useState, ReactNode, useEffect } from "react";
import { NewChallengeModal } from "../components/NewChallengeModal";
import { NewLevelModal } from "../components/NewLevelModal";

type Challenge = {
  language: "ptBr" | "en";
  type: "body" | "eye";
  description: string;
  amount: number;
};

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: any;
  levelUp: () => void;
  closeLevelUpModal: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const [level, setLevel] = useState<number>(0);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isNewChallengeOpen, setIsNewChallengeOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  // Solicitando permissão para notification
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  // Cathing json data
  useEffect(() => {
    fetch("./challenges.json", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setChallenges(res as Challenge[]));
  }, []);

  useEffect(() => {}, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function handleOpenNewChallenge() {
    setIsNewChallengeOpen(true);
  }

  function handleCloseNewChallenge() {
    setIsNewChallengeOpen(false);
  }

  function startNewChallenge() {
    handleOpenNewChallenge();
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge as any);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🔥", {
        body: `Valendo ${challenge.amount}XP!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
    handleCloseNewChallenge();
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        activeChallenge,
        levelUp,
        closeLevelUpModal,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
      {isLevelUpModalOpen && (
        <NewLevelModal
          isOpen={isLevelUpModalOpen}
          onRequestClose={closeLevelUpModal}
        />
      )}
      {isNewChallengeOpen && (
        <NewChallengeModal
          isOpen={isNewChallengeOpen}
          onRequestClose={handleCloseNewChallenge}
          content={activeChallenge}
        />
      )}
    </ChallengesContext.Provider>
  );
}
