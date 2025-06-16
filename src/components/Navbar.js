import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faCog, faUser, faPlus, faClipboardList, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleAddAsset = () => {
    navigate('/asset-management?addAsset=true');
  };

  const handleNewChecklist = () => {
    navigate('/checklists?newChecklist=true');
  };

  const handleNewAssessment = () => {
    navigate('/quality-assessment?newAssessment=true');
  };

  return (
<nav className="navbar">
  <div className="navbar-content">
        <div className="navbar-right">
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
            <button className="icon-button add-assessment" onClick={handleNewAssessment}>
              <FontAwesomeIcon icon={faClipboardCheck} className="nav-icon" />
              <span className="button-text">New Assessment</span>
            </button>
            <button className="icon-button add-asset" onClick={handleAddAsset}>
              <FontAwesomeIcon icon={faPlus} className="nav-icon" />
              <span className="button-text">Add New Asset</span>
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
</nav>
  );
};

export default Navbar;