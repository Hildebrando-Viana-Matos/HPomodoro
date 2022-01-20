// React
import { useState } from "react";

// Images
import levelImg from "../assets/images/up.svg";

// Components
import { Header } from "../components/Header";
import { TaskList } from "../components/TaskList";

// Icons
import { FiCheck, FiPlay, FiTrash } from "react-icons/fi";

// Styles
import "../styles/clock.scss";

export function Clock() {
  const [stateTime, setStateTime] = useState("");

  function handleChangeTimeState(stateName: string) {
    if (stateName === "pomodoro") {
      setStateTime("pomodoro");
    } else if (stateName === "shortBreak") {
      setStateTime("shortBreak");
    } else if (stateName === "longBreak") {
      setStateTime("longBreak");
    } else {
      return;
    }
  }
  return (
    <div className="contentScreens">
      <Header />
      <main>
        <div className="container">
          <div className="barXP">
            <span>0 xp</span>
            <div className="bar">
              <div style={{ width: "50%" }} className="ocupBar"></div>
            </div>
            <span>600 xp</span>
          </div>

          <div className="mainClock">
            <div className="contentClock">
              <div className="clock">
                <h1>25:00</h1>
              </div>
            </div>

            <div className="actions">
              <div className="profile">
                <img
                  src="https://github.com/Hildebrando-Viana-Matos.png"
                  alt="Foto de Perfil de Hildebrando Viana Matos"
                />
                <div className="descriptionAndLevel">
                  <h2>Hildebrando Viana Matos</h2>
                  <div className="contentLevel">
                    <img className="up" src={levelImg} alt="Level Icon" />
                    <span>Level 1</span>
                  </div>
                </div>
              </div>

              <div className="desafios">
                <h2>
                  Desafios Completados: <span>08</span>
                </h2>
              </div>

              <button className="start">
                <span>Começar</span>
                <FiPlay size={30} />
              </button>
            </div>
          </div>

          <div className="changeClockState">
            <button
              onClick={() => handleChangeTimeState("pomodoro")}
              className={stateTime === "pomodoro" ? "selectedPomodoro" : ""}
            >
              Pomodoro
            </button>
            <button
              onClick={() => handleChangeTimeState("shortBreak")}
              className={stateTime === "shortBreak" ? "selectedShortBreak" : ""}
            >
              Short Break
            </button>
            <button
              onClick={() => handleChangeTimeState("longBreak")}
              className={stateTime === "longBreak" ? "selectedLongBreak" : ""}
            >
              Long Break
            </button>
          </div>

          <TaskList />
        </div>
      </main>
    </div>
  );
}
