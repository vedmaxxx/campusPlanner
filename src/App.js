import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { useEffect } from "react";
import { ScheduleContext } from "./context/ScheduleContext";

function App() {
  // состояние параметров расписания
  const scheduleParams = JSON.parse(localStorage.getItem("scheduleParams"));

  console.log(scheduleParams.mode);

  // Вывод в консоль текущих глобальных параметров расписания
  useEffect(() => {
    console.log("ScheduleParams: ", scheduleParams);
  }, [scheduleParams]);

  return (
    <div className="App">
      {/* предоставление доступа к состояниям режима и расписания с помощью контекста */}
      <ScheduleContext.Provider
        value={{
          scheduleParams,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <AppRouter />
        </BrowserRouter>
      </ScheduleContext.Provider>
    </div>
  );
}

export default App;
