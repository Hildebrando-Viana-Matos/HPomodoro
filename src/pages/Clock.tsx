// Components
import { Header } from "../components/Header";
import { ClockAndProfile } from "../components/ClockAndProfile";
import { ThemeButton } from "../components/ThemeButton";
import { BarXp } from "../components/BarXp";
import { TaskList } from "../components/TaskList";

export function Clock() {
  return (
    <div className="contentScreens">
      <Header />
      <main>
        <div className="container">
          <BarXp />

          <ClockAndProfile />

          <ThemeButton />

          <TaskList />
        </div>
      </main>
    </div>
  );
}
