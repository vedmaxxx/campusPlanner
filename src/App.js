import "./styles/App.css";
import ScheduleByGroup from "./pages/ScheduleByGroup";

function App() {
  return (
    <div className="App">
      {/* режим составления расписания ДЛЯ ГРУППЫ */}
      <ScheduleByGroup />
    </div>
  );
}

export default App;
