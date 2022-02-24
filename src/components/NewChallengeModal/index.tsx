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
  content: Challenge | any;
};

export function NewChallengeModal({
  isOpen,
  onRequestClose,
  content,
}: NewChallengeModalProps) {
  const { user } = useAuth();
  const { globalTheme } = useContext(ThemeContext);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modalOverlay"
      className="modal"
    >
      <button className="closeModal" onClick={onRequestClose}>
        <FiX />
      </button>
      <img src={GokuImage} alt="Goku Challenge" />
      <h2 className={styles.title}>Novo Desafio</h2>
      <p className={styles[globalTheme]}>Valendo {content.amount}px</p>
      <span className={styles.challengeDescription}>
        Vamos {user?.name}!!! {content.description}
      </span>

      <div className={styles.buttonsContainer}>
        <button className={styles.failed} onClick={onRequestClose}>
          Falhei :(
        </button>
        <button className={styles.achieved}>Consegui</button>
      </div>
    </Modal>
  );
}
