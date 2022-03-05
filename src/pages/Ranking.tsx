// Components
import { Header } from "../components/Header";
import { Table } from "../components/Table";

// i18n
import { useTranslation } from "react-i18next";

//Styles
import "../styles/ranking.scss";

export function Ranking() {
  const { t } = useTranslation();

  return (
    <div className="contentScreens">
      <Header />
      <main>
        <div className="container">
          <h2>{t("Focused Ranking")}</h2>

          <Table />
        </div>
      </main>
    </div>
  );
}
