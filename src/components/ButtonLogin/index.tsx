import { FiGithub, FiUserX } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

import "./styles.scss";

type ButtonLoginProps = {
  plataform?: "GitHub" | "Google" | undefined;
  color: string;
  text: string;
};

export function ButtonLogin(props: ButtonLoginProps) {
  return (
    <button className="login" style={{ color: props.color }}>
      {props.plataform === "GitHub" && <FiGithub size={30} />}
      {props.plataform === "Google" && <FaGoogle size={30} />}
      {props.plataform === undefined && <FiUserX size={30} />}
      <span>{props.text}</span>
    </button>
  );
}
