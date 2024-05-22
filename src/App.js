import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { StrictMode, useEffect, useState } from "react";
import { ScheduleContext } from "./context/ScheduleContext";
import GlobalScheduleStore from "./stores/globalScheduleStore";
import { spy } from "mobx";

// отладка экшенов mobX
// spy((ev) => {
//   if (ev.type === "action") console.log(ev);
// });

function App() {
  // состояние режима отображения редактора расписания
  const [viewMode, setViewMode] = useState("");
  // состояние формируемого расписания
  const [scheduleParams, setScheduleParams] = useState({});
  const { findScheduleByGroup } = GlobalScheduleStore;

  useEffect(() => {
    console.log(scheduleParams);
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
        <BrowserRouter>
          {/* ДЛЯ ОТЛАДКИ */}
          <div className="view_mode">{viewMode} mode</div>
          <NavBar />
          <AppRouter />
        </BrowserRouter>
      </ScheduleContext.Provider>
    </div>
  );
}

export default App;
