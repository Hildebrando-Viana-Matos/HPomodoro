// Icons
import { FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

// Styles
import "./styles.scss";

// Hooks
import { useAuth } from "../../hooks/useAuth";

type ButtonLoginProps = {
  plataform?: "GitHub" | "Google";
  color: string;
  text: string;
};

export function ButtonLogin(props: ButtonLoginProps) {
  // Importando valores de um contexto
  const { user, signInWithGoogle } = useAuth();

  async function handleLogin(plataform: any) {
    if (plataform === "Google") {
      if (!user) {
        await signInWithGoogle();
      }
    }
  }

  return (
    <button
      className="authButton"
      style={{ color: props.color }}
      onClick={() => handleLogin(props.plataform)}
    >
      {props.plataform === "GitHub" && <FiGithub size={30} />}
      {props.plataform === "Google" && <FaGoogle size={30} />}
      <span>{props.text}</span>
    </button>
  );
}
