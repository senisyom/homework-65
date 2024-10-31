import ToolBar from "./ToolBar/ToolBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Pages from "./Pages/Pages";

const App = () => {
  return (
    <>
      <header>
        <ToolBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/admin" element={<Admin />} />
        <Route path="/pages/:pageName" element={<Pages />} />
        <Route path="*" element={<h2>Not found</h2>} />
      </Routes>
    </>
  );
};

export default App;
