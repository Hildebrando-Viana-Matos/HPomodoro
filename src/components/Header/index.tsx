// React
import { useContext } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// Icons
import { FiAward, FiClock, FiHome, FiLogOut } from "react-icons/fi";

// Styles
import styles from "./Header.module.scss";

// Context
import { ThemeContext } from "../../contexts/ThemeContext";

export function Header() {
  const { globalTheme } = useContext(ThemeContext);
  return (
    <header className={`${styles.header} ${styles[globalTheme]}`}>
      <FiClock size={30} />

      <div className={styles.menu}>
        <Link to="/">
          <FiHome size={30} />
        </Link>
        <Link to="/ranking">
          <FiAward size={30} />
        </Link>
      </div>

      <FiLogOut size={30} />
    </header>
  );
}
