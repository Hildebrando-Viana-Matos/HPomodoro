// React
import { createContext, useState, ReactNode, useEffect } from "react";

// i18n
import { useTranslation } from "react-i18next";

// Modals
import { NewChallengeModal } from "../components/NewChallengeModal";
import { NewLevelModal } from "../components/NewLevelModal";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

// Firebase
import { database } from "../services/firebase";

type Challenge = {
  language: "ptBr" | "enUs";
  type: "body" | "eye";
  description: string;
  amount: number;
};

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge | undefined;
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

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const { user } = useAuth();
  const { userData, setUserData } = useUser();

  const { t } = useTranslation();

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

  const [activeChallenge, setActiveChallenge] = useState<Challenge>();
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
    if (navigator.language === "pt-BR") {
      fetch("./json/challenges_ptBr.json", {
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => setChallenges(res as Challenge[]));
    } else {
      fetch("./json/challenges_enUs.json", {
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => setChallenges(res as Challenge[]));
    }
  }, []);

  useEffect(() => {
    if (challengeWasCompleted) {
      handleRegisterNewLevel();
    }
  }, [challengeWasCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
    new Audio("/sounds/newLevel.mp3").play();
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

    setActiveChallenge(challenge as Challenge);
    console.log(activeChallenge, challenge);

    new Audio("/sounds/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification(`${t("New Challenge")} 🤘😉`, {
        body: `${t("Worth")} ${challenge.amount}XP!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(undefined);
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
