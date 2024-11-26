import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Calendar,
  Settings,
  Building2
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">ShiftPlanner</h1>
      </div>
      <nav className="mt-4">
        <NavLink to="/">
          <Button variant="ghost" className="w-full justify-start p-4">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </NavLink>
        <NavLink to="/employees">
          <Button variant="ghost" className="w-full justify-start p-4">
            <Users className="mr-2 h-4 w-4" />
            Mitarbeiter
          </Button>
        </NavLink>
        <NavLink to="/departments">
          <Button variant="ghost" className="w-full justify-start p-4">
            <Building2 className="mr-2 h-4 w-4" />
            Abteilungen
          </Button>
        </NavLink>
        <NavLink to="/shift-planner">
          <Button variant="ghost" className="w-full justify-start p-4">
            <Calendar className="mr-2 h-4 w-4" />
            Schichtplan
          </Button>
        </NavLink>
        <NavLink to="/settings">
          <Button variant="ghost" className="w-full justify-start p-4">
            <Settings className="mr-2 h-4 w-4" />
            Einstellungen
          </Button>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
