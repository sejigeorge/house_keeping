import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendar,
  faCog,
  faSearch,
  faClipboardList,
  faBoxes,
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const [indentOpen, setIndentOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isIndentActive = () => {
    return ['/room-discharge', '/department-request', '/public-area'].includes(location.pathname);
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="/hodo.png" alt="Hodo Logo" className="sidebar-logo" />
      </div>
      
      <ul className="sidebar-menu">
        <li className={`menu-item ${isActive('/') ? 'selected' : ''}`}>
          <Link to="/" className="menu-link">
            <div className="menu-link-content">
              <FontAwesomeIcon icon={faHome} className="menu-icon" />
              <span>Dashboard</span>
            </div>
          </Link>
        </li>

        <li className={`menu-item ${isIndentActive() ? 'selected' : ''}`}>
          <div className="menu-link" onClick={() => setIndentOpen(!indentOpen)}>
            <div className="menu-link-content">
              <FontAwesomeIcon icon={faCalendar} className="menu-icon" />
              <span>Indent Request</span>
            </div>
            <FontAwesomeIcon 
              icon={indentOpen ? faChevronUp : faChevronDown} 
              className="chevron-icon"
            />
          </div>
        {indentOpen && (
          <ul className="submenu">
              <li className={`submenu-item ${isActive('/room-discharge') ? 'selected' : ''}`}>
                <Link to="/room-discharge" className="submenu-link">
                  • Room Discharge
                </Link>
              </li>
              <li className={`submenu-item ${isActive('/department-request') ? 'selected' : ''}`}>
                <Link to="/department-request" className="submenu-link">
                  • Department Req.
                </Link>
              </li>
              <li className={`submenu-item ${isActive('/public-area') ? 'selected' : ''}`}>
                <Link to="/public-area" className="submenu-link">
                  • Public Area
                </Link>
              </li>
          </ul>
        )}
        </li>

        <li className={`menu-item ${isActive('/cleaning-process') ? 'selected' : ''}`}>
          <Link to="/cleaning-process" className="menu-link">
            <div className="menu-link-content">
              <FontAwesomeIcon icon={faCheckCircle} className="menu-icon" />
              <span>Cleaning Process</span>
            </div>
          </Link>
        </li>

        <li className={`menu-item ${isActive('/checklists') ? 'selected' : ''}`}>
          <Link to="/checklists" className="menu-link">
            <div className="menu-link-content">
              <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />
              <span>Checklists</span>
            </div>
          </Link>
        </li>

        <li className={`menu-item ${isActive('/asset-management') ? 'selected' : ''}`}>
          <Link to="/asset-management" className="menu-link">
            <div className="menu-link-content">
              <FontAwesomeIcon icon={faBoxes} className="menu-icon" />
              <span>Asset Management</span>
            </div>
          </Link>
        </li>

        <li className={`menu-item ${isActive('/quality-assessment') ? 'selected' : ''}`}>
          <Link to="/quality-assessment" className="menu-link">
            <div className="menu-link-content">
              <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
              <span>Quality Assessment</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
