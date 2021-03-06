// React
import { useContext } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// Icons
import { FiAward, FiHome, FiLogOut } from "react-icons/fi";

// Styles
import styles from "./Header.module.scss";

// Context
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";

// Images
import logoIcon from "../../assets/images/favicon.svg";

export function Header() {
  const { globalTheme } = useContext(ThemeContext);
  const { user, signOut } = useContext(AuthContext);

  async function handleSignOut() {
    if (user) {
      await signOut();
    }
  }

  return (
    <header className={`${styles.header} ${styles[globalTheme]}`}>
      <img src={logoIcon} alt="Logo Hpomodoro Icon" />

      <div className={styles.menu}>
        <Link to="/pomodoro">
          <FiHome size={30} />
        </Link>
      </div>

      <FiLogOut className={styles.signOut} onClick={handleSignOut} size={30} />
    </header>
  );
}
