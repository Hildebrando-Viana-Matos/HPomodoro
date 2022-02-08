// React
import { useContext, useEffect } from "react";

// Context
import { AuthContext } from "../contexts/AuthContext";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Styles
import "../styles/login.scss";

// Images
import logoHPomodoro from "../assets/images/logo.svg";

// Components
import { ButtonLogin } from "../components/ButtonLogin";

export function Login() {
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("pomodoro", { replace: true });
    }
  }, [user]);

  return (
    <div className="contentLogin">
      <div className="banner">
        <div className="contentImgGrade">
          <img src={logoHPomodoro} alt="Logo HPomodoro" />
          <p>Sua plataforma de foco para estudo, trabalho, etc!!</p>
        </div>
      </div>
      <div className="login">
        <div className="content">
          <h2>Bem-Vindo(a)</h2>
          <p>
            Seja bem-vindo(a) a nossa plataforma de foco em estudos, trabalho e
            entre outras atividades usando a técnica de Pomodoro!
          </p>
          <ButtonLogin
            plataform="Google"
            color="#6C5CE7"
            text="Fazer Login com o Google"
          />
          <ButtonLogin
            plataform="GitHub"
            color="#171515"
            text="Fazer Login com o GitHub"
          />
        </div>
      </div>
    </div>
  );
}
