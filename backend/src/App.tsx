import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import ShiftBlocksPage from './pages/ShiftBlocksPage';
import ShiftPlannerPage from './pages/ShiftPlannerPage';
import ShiftTypesPage from './pages/ShiftTypesPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="shift-blocks" element={<ShiftBlocksPage />} />
          <Route path="shift-planner" element={<ShiftPlannerPage />} />
          <Route path="shift-types" element={<ShiftTypesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
