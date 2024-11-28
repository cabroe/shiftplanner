import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Calendar,
  Settings,
  Building2,
  Clock,
  Layers,
  FolderCog
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">ShiftPlanner</h1>
      </div>
      
      <nav className="mt-4 flex flex-col h-[calc(100vh-5rem)]">
        {/* Hauptnavigation */}
        <div className="space-y-1">
          <NavLink to="/">
            <Button variant="ghost" className="w-full justify-start p-4">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </NavLink>
          
          <NavLink to="/shift-planner">
            <Button variant="ghost" className="w-full justify-start p-4">
              <Calendar className="mr-2 h-4 w-4" />
              Schichtplan
            </Button>
          </NavLink>
        </div>

        {/* Verwaltung */}
        <div className="mt-8">
          <div className="px-4 py-2 text-sm font-semibold text-gray-600">
            <FolderCog className="inline-block mr-2 h-4 w-4" />
            Verwaltung
          </div>
          
          <div className="space-y-1">
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

            <NavLink to="/shift-types">
              <Button variant="ghost" className="w-full justify-start p-4">
                <Layers className="mr-2 h-4 w-4" />
                Schichttypen
              </Button>
            </NavLink>

            <NavLink to="/shift-templates">
              <Button variant="ghost" className="w-full justify-start p-4">
                <Clock className="mr-2 h-4 w-4" />
                Schichtvorlagen
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Einstellungen */}
        <div className="mt-auto mb-4">
          <NavLink to="/settings">
            <Button variant="ghost" className="w-full justify-start p-4">
              <Settings className="mr-2 h-4 w-4" />
              Einstellungen
            </Button>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
