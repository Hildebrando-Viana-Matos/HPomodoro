// Images
import levelImg from "../assets/images/up.svg";

// Components
import { FiPlay } from "react-icons/fi";
import { Header } from "../components/Header";

// Styles
import "../styles/clock.scss";

export function Clock() {
  return (
    <div className="contentScreens">
      <Header />
      <main>
        <div className="container">
          <div className="barXP">
            <span>0 xp</span>
            <div className="bar">
              <div className="ocupBar"></div>
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

          <div className="toDoList">
            <h1>To Do List</h1>
            <form>
              <input type="text" placeholder="Digite uma nova Task" />
              <button type="submit">
                <span>Começar</span>
                <FiPlay size={30} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
