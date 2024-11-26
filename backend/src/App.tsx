import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
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
  // Später können wir hier einen echten Auth-Status verwenden
  //const isAuthenticated = false;
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="shift-blocks" element={<ShiftBlocksPage />} />
          <Route path="shift-planner" element={<ShiftPlannerPage />} />
          <Route path="shift-types" element={<ShiftTypesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
