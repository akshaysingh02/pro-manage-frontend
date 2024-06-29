import { Routes,Route,BrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage"
import TaskShare from "./components/TaskShare/TaskShare";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/share/:uniqueLink" element={<TaskShare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
