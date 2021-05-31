import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { PanelScreen } from "pages/Panel";
import { TaskScreen } from "pages/Task";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>Project Screen</h1>
      <Link to={"panel"}>Panel</Link>
      <Link to={"task"}>Task</Link>

      <Routes>
        <Route path={"/panel"} element={<PanelScreen />}></Route>
        <Route path={"/task"} element={<TaskScreen />}></Route>
        <Navigate to={window.location.pathname + "/panel"} />
      </Routes>
    </div>
  );
};
