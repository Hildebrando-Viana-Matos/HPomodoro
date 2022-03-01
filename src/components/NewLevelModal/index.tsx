// Modal
import Modal from "react-modal";

// Styles
import "./styles.scss";

// Level
import { useContext } from "react";

// Context
import { ChallengesContext } from "../../contexts/ChallengesContext";

// Images
import levelBackground from "../../assets/images/level_background.svg";

// Icons
import { FiX } from "react-icons/fi";

// Types
type NewLevelModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function NewLevelModal({ isOpen, onRequestClose }: NewLevelModalProps) {
  const { level } = useContext(ChallengesContext);
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
      <div className="newLevelImage">
        <img src={levelBackground} alt="Level Background" />
        <h2>{level}</h2>
      </div>
      <div className="descriptionLevel">
        <h2>Acredite em seu potencial</h2>
        <p>
          Você chegou finalmente do <b>nível {level}</b>
          <br />
          Ainda tem muito caminho pela frente <br />
          <b>NÃO DESISTA!!</b>
        </p>
      </div>
    </Modal>
  );
}
