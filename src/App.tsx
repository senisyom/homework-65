import ToolBar from "./ToolBar/ToolBar";
import { Route, Routes } from "react-router-dom";
import Pages from "./Pages/Pages";

const App = () => {
  return (
    <>
      <header>
        <ToolBar />
      </header>
      <Routes>
        <Route path="/pages/*" element={<Pages />} />
        <Route path="/pages/admin" element={<Edit />} />
      </Routes>
    </>
  );
};

export default App;
