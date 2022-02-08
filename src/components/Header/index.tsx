// React
import { useContext } from "react";

// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// Icons
import { FiAward, FiClock, FiHome, FiLogOut } from "react-icons/fi";

// Styles
import styles from "./Header.module.scss";

// Context
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {
  const { globalTheme } = useContext(ThemeContext);
  const { user, signOut } = useContext(AuthContext);

  let navigate = useNavigate();

  async function handleSignOut() {
    if (user) {
      await signOut();

      navigate("", { replace: true });
    }
  }

  return (
    <header className={`${styles.header} ${styles[globalTheme]}`}>
      <FiClock size={30} />

      <div className={styles.menu}>
        <Link to="/pomodoro">
          <FiHome size={30} />
        </Link>
        <Link to="/ranking">
          <FiAward size={30} />
        </Link>
      </div>

      <FiLogOut className={styles.signOut} onClick={handleSignOut} size={30} />
    </header>
  );
}
