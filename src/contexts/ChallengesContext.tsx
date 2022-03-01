// React
import { createContext, useState, ReactNode, useEffect } from "react";

// Modals
import { NewChallengeModal } from "../components/NewChallengeModal";
import { NewLevelModal } from "../components/NewLevelModal";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

// Firebase
import { database } from "../services/firebase";

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
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const { user } = useAuth();
  const { userData, setUserData } = useUser();

  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const [level, setLevel] = useState(
    userData?.levelUser === undefined ? 0 : userData?.levelUser
  );
  const [currentExperience, setCurrentExperience] = useState(
    userData?.currentExperienceUser === undefined
      ? 0
      : userData.currentExperienceUser
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    userData?.challengesCompletedUser === undefined
      ? 0
      : userData?.challengesCompletedUser
  );

  // Updating new values
  useEffect(() => {
    setLevel(userData?.levelUser === undefined ? 0 : userData?.levelUser);
    setCurrentExperience(
      userData?.currentExperienceUser === undefined
        ? 0
        : userData.currentExperienceUser
    );
    setChallengesCompleted(
      userData?.challengesCompletedUser === undefined
        ? 0
        : userData?.challengesCompletedUser
    );
  }, [
    userData?.levelUser,
    userData?.currentExperienceUser,
    userData?.challengesCompletedUser,
  ]);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isNewChallengeOpen, setIsNewChallengeOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [challengeWasCompleted, setChallengeWasCompleted] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 6, 2);

  // Requesting permission for use notification
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  // Catching json data
  useEffect(() => {
    fetch("./challenges.json", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setChallenges(res as Challenge[]));
  }, []);

  useEffect(() => {
    handleRegisterNewLevel();
  }, [challengeWasCompleted]);

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
    setChallengeWasCompleted(false);
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

  async function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setChallengeWasCompleted(true);
    handleCloseNewChallenge();
  }

  async function handleRegisterNewLevel() {
    if (userData?.id) {
      const newLevelUser = {
        id: user?.id,
        name: user?.name,
        avatar: user?.avatar,
        levelUser: level,
        currentExperienceUser: currentExperience,
        challengesCompletedUser: challengesCompleted,
      };

      await database.ref(`users/${user?.id}/`).update(newLevelUser);

      setUserData(newLevelUser as any);
    } else if (!userData?.id) {
      // Registering new user data
      const newLevelUser = {
        id: user?.id,
        name: user?.name,
        avatar: user?.avatar,
        levelUser: level,
        currentExperienceUser: currentExperience,
        challengesCompletedUser: challengesCompleted,
      };

      await database.ref(`users/${user?.id}/`).update(newLevelUser);
    }
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
          completeChallenge={completeChallenge}
          content={activeChallenge}
        />
      )}
    </ChallengesContext.Provider>
  );
}
