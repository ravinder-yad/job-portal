import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import Companies from './pages/Companies';
import About from './pages/About';
import Contact from './pages/Contact';
import { Toaster } from 'react-hot-toast';

// Placeholder Components for new routes
const PostJob = () => <div className="p-20 text-center font-black text-4xl text-slate-300">Employer Post Job Flow...</div>;

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-job" element={<PostJob />} />
          
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-vh-50 text-center py-20 px-4">
              <h1 className="text-8xl font-black text-brand-violet mb-4 tracking-tighter opacity-20">404</h1>
              <p className="text-slate-400 font-bold mb-8">Oops! This page logic is still being built.</p>
              <button 
                onClick={() => window.history.back()} 
                className="gradient-btn-signup px-10 py-3 font-black shadow-xl"
              >
                Go Back
              </button>
            </div>
          } />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;