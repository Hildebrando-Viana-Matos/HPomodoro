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

// Types
type NewChallengeModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function NewChallengeModal({
  isOpen,
  onRequestClose,
}: NewChallengeModalProps) {
  const { globalTheme } = useContext(ThemeContext);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modalOverlay"
      className="modal"
    >
      <button className={styles.closeModal} onClick={onRequestClose}>
        <FiX />
      </button>
      <img src={GokuImage} alt="Goku Image Challenge" />
      <h2 className={styles.title}>Novo Desafio</h2>
      <p className={styles[globalTheme]}>Valendo 400px</p>
      <span className={styles.challengeDescription}>
        É agora Diegão, bora lá meu parça. Caminhe por 3 minutos e estique suas
        pernas pra você ficar saudável.
      </span>

      <div className={styles.buttonsContainer}>
        <button className={styles.failed}>Falhei :(</button>
        <button className={styles.achieved}>Consegui</button>
      </div>
    </Modal>
  );
}
