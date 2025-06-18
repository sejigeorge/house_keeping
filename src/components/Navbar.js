import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faCog, faUser, faPlus, faClipboardList, faClipboardCheck, faHandPointRight, faHandPointLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const navigate = useNavigate();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleAddAsset = () => {
    navigate('/asset-management?addAsset=true');
  };

  const handleNewChecklist = () => {
    navigate('/checklists?newChecklist=true');
  };

  const handleNewAssessment = () => {
    navigate('/quality-assessment?newAssessment=true');
  };

  const handleActionClick = () => {
    setShowEmergencyModal(true);
  };

  const closeEmergencyModal = () => {
    setShowEmergencyModal(false);
  };

  const handleHandClick = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/hodo.png" alt="Logo" className="logo" style={{ height: '36px', marginRight: '18px' }} />
            <div className="main-nav-menu">
  <NavLink to="/">Dashboard</NavLink>
  <NavLink to="/indent-request">Indent Request</NavLink>
  <NavLink to="/cleaning-process">Cleaning Process</NavLink>
  <div className="dropdown">
    <span className="dropdown-toggle">More &#9662;</span>
    <div className="dropdown-menu">
      <NavLink to="/settings">Settings</NavLink>
      <NavLink to="/help">Help</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </div>
  </div>

</div>
          </div>
          <div className="navbar-right">
            {/* <TimeDateDisplay /> */}
            <div className="search-container">
              <input 
                type="text" 
                className="search-input"
                placeholder="Search..." 
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <div className="nav-icons">
              <button className="icon-button add-checklist" onClick={handleNewChecklist}>
                <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
                <span className="button-text">New Checklist</span>
              </button>
              <button className="icon-button add-assessment action-red" onClick={handleActionClick}>
                <span className="button-text">Action</span>
              </button>
              <button className="icon-button add-assessment" onClick={handleNewAssessment}>
                <FontAwesomeIcon icon={faPlus} className="nav-icon" />
                <span className="button-text"> New Assessment</span>
              </button>
              <button className="icon-button">
                <FontAwesomeIcon icon={faBell} className="nav-icon" />
              </button>
              <button className="icon-button">
                <FontAwesomeIcon icon={faCog} className="nav-icon" />
              </button>
              <button className="icon-button">
                <FontAwesomeIcon icon={faUser} className="nav-icon" />
              </button>
            </div>
          </div>
        </div>
        {/* Emergency Modal */}
        {showEmergencyModal && (
          <div className="emergency-modal-overlay" onClick={closeEmergencyModal}>
            <div className="emergency-modal" onClick={e => e.stopPropagation()}>
              <h2 style={{ color: '#d9534f', marginBottom: 24 }}>Emergency Actions</h2>
              <button className="emergency-btn" style={{ background: '#d9534f' }}>Call Security</button>
              <button className="emergency-btn" style={{ background: '#f39c12' }}>Report Fire</button>
              <button className="emergency-btn" style={{ background: '#c0392b' }}>Medical Emergency</button>
              <button className="emergency-btn" style={{ background: '#2980b9' }}>Evacuation Protocol</button>
              <button className="emergency-close-btn" onClick={closeEmergencyModal}>Close</button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;