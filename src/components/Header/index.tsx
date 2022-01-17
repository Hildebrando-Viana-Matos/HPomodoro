// React Router Dom
import { Link } from "react-router-dom";

// Icons
import { FiAward, FiClock, FiHome, FiLogOut } from "react-icons/fi";

import "./styles.scss";

export function Header() {
  return (
    <header>
      <FiClock size={30} />

      <div className="menu">
        <Link to="/pomodoro">
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
