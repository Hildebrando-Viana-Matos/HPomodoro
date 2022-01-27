// React
import { useContext } from "react";

//Context
import { ThemeContext } from "../../contexts/ThemeContext";

// Images
import levelImg from "../../assets/images/up.svg";

// Styles
import styles from "./CardUser.module.scss";

// Types
interface CardUserProps {
  position: number;
  user: {
    avatar: string;
    name: string;
    level: number;
    challengesCompleted: number;
    xp: number;
  };
}

export function CardUser({ position, user }: CardUserProps) {
  const { globalTheme } = useContext(ThemeContext);
  return (
    <tr className={styles.card}>
      <td className={styles.position}>{position}</td>
      <td className={styles.profile}>
        <div className={styles.contentProfileTable}>
          <img
            className={styles.imgProfile}
            src={user.avatar}
            alt={`Foto de perfil ${user.name}`}
          />
          <div className={styles.profileUser}>
            <h2>Hildebrando Viana Matos</h2>
            <div className={styles.contentLevel}>
              <img className={styles.up} src={levelImg} alt="Level Icon" />
              <span>Level {user.level}</span>
            </div>
          </div>
        </div>
      </td>
      <td className={styles.challenges}>
        <b className={styles[globalTheme]}>{user.challengesCompleted}</b>{" "}
        completados
      </td>
      <td className={styles.xp}>
        <b className={styles[globalTheme]}>{user.xp}</b> xp
      </td>
    </tr>
  );
}
