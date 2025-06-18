import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ScrollButtons from './components/ScrollButtons';
import Footer from './components/Footer';

import Dashboard from './components/Dashboard';
import Indentrequest from './pages/Indentrequest'; // ✅ Your Indent Request Page
import RoomDischarge from './pages/RoomDischarge'; // Added import
import DepartmentRequest from './pages/DepartmentRequest';
import PublicAreaRequest from './pages/PublicAreaRequest';
import CleaningProcess from './pages/CleaningProcess';
import Checklists from './pages/Checklists';
import QualityAssessment from './pages/QualityAssessment';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className={`main-container${!sidebarVisible ? ' sidebar-hidden' : ''}`}>
          {sidebarVisible && <Sidebar />}
          <div className="main-content">
            {sidebarVisible ? (
              <img
                src="/lefthand.png"
                alt="Left Hand Icon"
                className="main-hand-img"
                onClick={() => setSidebarVisible(false)}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <img
                src="/righthand.png"
                alt="Right Hand Icon"
                className="main-hand-img"
                onClick={() => setSidebarVisible(true)}
                style={{ cursor: 'pointer' }}
              />
            )}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/indent-request" element={<Indentrequest />} />
              <Route path="/room-discharge" element={<RoomDischarge />} />
              <Route path="/department-request" element={<DepartmentRequest />} />
              <Route path="/public-area" element={<PublicAreaRequest />} />
              <Route path="/cleaning-process" element={<CleaningProcess />} />
              <Route path="/checklists" element={<Checklists />} />
              <Route path="/quality-assessment" element={<QualityAssessment />} />
            </Routes>
            <ScrollButtons />
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
