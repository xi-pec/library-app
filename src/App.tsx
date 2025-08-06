import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import HomePage from "@/pages/home";
import InformationPage from "./pages/information";
import WelcomePage from "./pages/welcome";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<WelcomePage />} path="/welcome" />
      <Route element={<InformationPage />} path="/information" />
    </Routes>
  );
}

export default App;
