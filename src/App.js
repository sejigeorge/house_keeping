import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Dashboard from './components/Dashboard';
import Indentrequest from './pages/Indentrequest'; // ✅ Your Indent Request Page
import RoomDischarge from './pages/RoomDischarge'; // Added import
import DepartmentRequest from './pages/DepartmentRequest';
import PublicAreaRequest from './pages/PublicAreaRequest';
import CleaningProcess from './pages/CleaningProcess';
import Checklists from './pages/Checklists';
import AssetManagement from './pages/AssetManagement';
import QualityAssessment from './pages/QualityAssessment';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/indent-request" element={<Indentrequest />} />
              <Route path="/room-discharge" element={<RoomDischarge />} />
              <Route path="/department-request" element={<DepartmentRequest />} />
              <Route path="/public-area" element={<PublicAreaRequest />} />
              <Route path="/cleaning-process" element={<CleaningProcess />} />
              <Route path="/checklists" element={<Checklists />} />
              <Route path="/asset-management" element={<AssetManagement />} />
              <Route path="/quality-assessment" element={<QualityAssessment />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
