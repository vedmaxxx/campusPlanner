import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { ScheduleContext } from "./context/ScheduleContext";
import GlobalScheduleStore from "./stores/globalScheduleStore";

function App() {
  // состояние режима отображения редактора расписания
  const [viewMode, setViewMode] = useState("");
  // состояние параметров расписания
  const [scheduleParams, setScheduleParams] = useState({
    mode: "",
    current: "",
  });
  const { findScheduleByGroup } = GlobalScheduleStore;

  // Вывод в консоль текущих глобальных параметров расписания
  useEffect(() => {
    console.log("ScheduleParams: ", scheduleParams);
  }, [scheduleParams]);

  return (
    <div className="App">
      {/* предоставление доступа к состояниям режима и расписания с помощью контекста */}
      <ScheduleContext.Provider
        value={{
          viewMode,
          scheduleParams,
          setViewMode,
          setScheduleParams,
          findScheduleByGroup,
        }}
      >
        {/* Проводник возможных путей веб-сайта */}
        <BrowserRouter>
          {/* ДЛЯ ОТЛАДКИ */}
          {/* <div className="view_mode">{viewMode} mode</div> */}
          <NavBar />
          <AppRouter />
        </BrowserRouter>
      </ScheduleContext.Provider>
    </div>
  );
}

export default App;
a;
