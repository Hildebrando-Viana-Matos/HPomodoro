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
          <p>Your focus platform for study and work!!</p>
        </div>
      </div>
      <div className="login">
        <div className="content">
          <h2>Welcome</h2>
          <p>
            Welcome to our platform to focus on studies, work and other
            activities using the Pomodoro technique!
          </p>
          <ButtonLogin
            platform="Google"
            color="#6C5CE7"
            text="Login with Google"
          />
          <ButtonLogin
            platform="GitHub"
            color="#171515"
            text="Login with GitHub"
          />
        </div>
      </div>
    </div>
  );
}
