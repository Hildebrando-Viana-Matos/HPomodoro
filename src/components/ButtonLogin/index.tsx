// Icons
import { FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

// Styles
import "./styles.scss";

// Hooks
import { useAuth } from "../../hooks/useAuth";

type ButtonLoginProps = {
  platform?: "GitHub" | "Google";
  color: string;
  text: any;
};

export function ButtonLogin(props: ButtonLoginProps) {
  // Importando valores de um contexto
  const { user, signInWithGoogle, signInWithGitHub } = useAuth();

  async function handleLogin(platform: any) {
    if (platform === "Google") {
      if (!user) {
        await signInWithGoogle();
      }
    } else if (platform === "GitHub") {
      await signInWithGitHub();
    }
  }

  return (
    <button
      className="authButton"
      style={{ color: props.color }}
      onClick={() => handleLogin(props.platform)}
    >
      {props.platform === "GitHub" && <FiGithub size={30} />}
      {props.platform === "Google" && <FaGoogle size={30} />}
      <span>{props.text}</span>
    </button>
  );
}
