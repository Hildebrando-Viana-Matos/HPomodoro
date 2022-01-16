import { FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

import "./styles.scss";

type ButtonLoginProps = {
  plataform: "GitHub" | "Google";
  color: string;
};

export function ButtonLogin(props: ButtonLoginProps) {
  return (
    <button style={{ color: props.color }}>
      {props.plataform === "GitHub" && <FiGithub size={30} />}
      {props.plataform === "Google" && <FaGoogle size={30} />}
      <span>Fazer login com {props.plataform}</span>
    </button>
  );
}
