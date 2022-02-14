// Components
import { Header } from "../components/Header";
import { Table } from "../components/Table";

//Styles
import "../styles/ranking.scss";

export function Ranking() {
  return (
    <div className="contentScreens">
      <Header />
      <main>
        <div className="container">
          <h2>Focused Ranking</h2>

          <Table />
        </div>
      </main>
    </div>
  );
}
