import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search,
  LayoutDashboard, 
  Users, 
  Calendar,
  Settings,
  LogOut,
  User,
  Building2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            {/* Search */}
            <div className="flex items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Suchen..."
                  className="pl-8 w-[300px]"
                />
              </div>
            </div>

            {/* Account Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Mein Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Einstellungen</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/logout')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Abmelden</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
