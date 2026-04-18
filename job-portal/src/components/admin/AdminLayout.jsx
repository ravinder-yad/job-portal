import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { IconButton, Badge, Avatar, Drawer } from '@mui/material';
import { FiMenu, FiSearch, FiBell, FiSearch as FiSearchIcon } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/useAuth';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  
  const avatarLetter = user?.name?.[0].toUpperCase() || 'A';

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block h-full transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { p: 0, border: 'none', background: 'transparent' }
        }}
        className="lg:hidden"
      >
        <AdminSidebar collapsed={false} mobile={true} onClose={() => setMobileOpen(false)} />
      </Drawer>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Topbar */}
        <header className="h-20 bg-white px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <IconButton onClick={() => setMobileOpen(true)} className="lg:!hidden !text-slate-600">
              <FiMenu />
            </IconButton>
            
            <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
              <FiSearch className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search system logs, users, or jobs..." 
                className="bg-transparent border-none outline-none text-sm font-bold w-64 text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex flex-col items-right text-right mr-2 hidden sm:block">
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{user?.role || 'System Admin'}</span>
                <span className="text-xs font-black text-slate-900">{user?.name || 'Admin'}</span>
             </div>
             
             <IconButton className="!bg-slate-50 !text-slate-500 hover:!bg-indigo-50 hover:!text-indigo-600 transition-colors">
                <Badge badgeContent={4} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 800, fontSize: '10px' } }}>
                   <FiBell />
                </Badge>
             </IconButton>
             
             <div className="h-10 w-10 p-[2px] rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-200">
                <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center">
                    <Avatar 
                       sx={{ 
                         width: 32, 
                         height: 32, 
                         bgcolor: 'transparent', 
                         color: '#4f46e5', 
                         fontWeight: 900,
                         fontSize: '14px'
                       }}
                    >
                       {avatarLetter}
                    </Avatar>
                </div>
             </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-0 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
