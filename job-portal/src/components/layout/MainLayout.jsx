import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-[88px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
