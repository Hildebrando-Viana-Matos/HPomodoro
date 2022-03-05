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

// i18n
import { useTranslation } from "react-i18next";

// Types
type NewLevelModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function NewLevelModal({ isOpen, onRequestClose }: NewLevelModalProps) {
  const { t } = useTranslation();

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
        <h2>{t("Believe in your potential")}</h2>
        <p>
          {t("You finally reached")}{" "}
          <b>
            {t("Level")} {level}!!
          </b>
          <br />
          {t("There's still a long way to go")} <br />
          <b>{t("DON'T GIVE UP")}!!</b>
        </p>
      </div>
    </Modal>
  );
}
