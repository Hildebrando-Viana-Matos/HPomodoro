// React
import { useContext } from "react";

// Modal
import Modal from "react-modal";

// Styles
import styles from "./NewChallengeModal.module.scss";

// Images
import GokuImage from "../../assets/images/goku.png";

// Icons
import { FiX } from "react-icons/fi";

// Context
import { ThemeContext } from "../../contexts/ThemeContext";

// Hooks
import { useAuth } from "../../hooks/useAuth";

// i18n
import { useTranslation } from "react-i18next";

// Types
type Challenge = {
  language: "ptBr" | "en";
  type: "body" | "eye";
  description: string;
  amount: number;
};

type NewChallengeModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  completeChallenge: () => void;
  content: Challenge | any;
};

export function NewChallengeModal({
  isOpen,
  onRequestClose,
  completeChallenge,
  content,
}: NewChallengeModalProps) {
  const { t } = useTranslation();

  const { user } = useAuth();

  const { globalTheme } = useContext(ThemeContext);

  function handleSoundButtonClick(typeButton: string) {
    if (typeButton === "achieved") {
      new Audio("/sounds/completed.mp3").play();
    } else if (typeButton === "failed") {
      new Audio("/sounds/lose.mp3").play();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      overlayClassName="modalOverlay"
      className="modal"
    >
      <button className="closeModal" onClick={onRequestClose}>
        <FiX />
      </button>
      <img src={GokuImage} alt="Goku Challenge" />
      <h2 className={styles.title}>{t("New Challenge")}</h2>
      <p className={styles[globalTheme]}>
        {t("Worth")} {content.amount}xp
      </p>
      <span className={styles.challengeDescription}>
        {t("Let's go")} {user?.name}!!! {content.description}
      </span>

      <div className={styles.buttonsContainer}>
        <button
          className={styles.failed}
          onClick={() => {
            onRequestClose();
            handleSoundButtonClick("failed");
          }}
        >
          {t("I failed")} :(
        </button>
        <button
          className={styles.achieved}
          onClick={() => {
            completeChallenge();
            handleSoundButtonClick("achieved");
          }}
        >
          {t("I achieved")} :)
        </button>
      </div>
    </Modal>
  );
}
