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
  faChartLine,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const [indentOpen, setIndentOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isIndentActive = () => {
    return [
      '/indent-request',
      '/room-discharge',
      '/department-request',
      '/public-area'
    ].includes(location.pathname);
  };

  // Highlight parent only if on /indent-request (not subpages)
  const isIndentParentSelected = () => location.pathname === '/indent-request';

  // Sidebar menu structure
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/',
    },
    {
      label: 'Indent Request',
      path: '/indent-request',
    },
    {
      label: 'Room Discharge',
      path: '/room-discharge',
    },
    {
      label: 'Department Req.',
      path: '/department-request',
    },
    {
      label: 'Public Area',
      path: '/public-area',
    },
    {
      label: 'Cleaning Process',
      path: '/cleaning-process',
    },
    {
      label: 'Checklists',
      path: '/checklists',
    },
    {
      label: 'Quality Assessment',
      path: '/quality-assessment',
    },
  ];

  // Filter logic for search
  const filteredMenu = menuItems
    .map(item => {
      if (item.submenus) {
        // Check if parent or any submenu matches
        const parentMatch = item.label.toLowerCase().includes(searchTerm.toLowerCase());
        const filteredSubs = item.submenus.filter(sub => sub.label.toLowerCase().includes(searchTerm.toLowerCase()));
        if (parentMatch) {
          // Show all submenus if parent matches
          return { ...item, show: true, submenus: item.submenus };
        } else if (filteredSubs.length > 0) {
          // Show only matching submenus if any match
          return { ...item, show: true, submenus: filteredSubs };
        } else {
          return { ...item, show: false };
        }
      } else {
        // For non-parent items
        return {
          ...item,
          show: item.label.toLowerCase().includes(searchTerm.toLowerCase()),
        };
      }
    })
    .filter(item => item.show);

  return (
    <div className="sidebar">
      <div className="sidebar-profile-card">
        <div className="sidebar-profile-img-wrapper">
          <img src="/hospital.png" alt="Profile" className="sidebar-profile-img" />
        </div>
        <div className="sidebar-profile-info">
          <div className="sidebar-profile-role">System Admin</div>
          <div className="sidebar-profile-hospital">HODO Hospital,<br/>Kazhakkottam</div>
          <div className="sidebar-profile-role-sub">System Admin</div>
          <div className="sidebar-profile-date">@Anchal 17/06/2025</div>
         
        </div>
      </div>
       <div className="sidebar-profile-search-wrapper" >
            <input
              type="text"
              className="sidebar-search-input"
              placeholder="Search Menu - CTRL + M"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{marginLeft: '20px', marginRight: '20px'}}
            />
          </div>
      <ul className="sidebar-menu">
        {filteredMenu.length === 0 && (
          <li className="no-results">No results</li>
        )}
        {filteredMenu.map(item => {
          if (!item.submenus) {
            return (
              <li key={item.label} className={`menu-item ${isActive(item.path) ? 'selected' : ''}`}>
                <Link to={item.path} className="menu-link">
                  <div className="menu-link-content">
                    <FontAwesomeIcon icon={faCaretRight} className="sidebar-caret" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              </li>
            );
          } else {
            // Parent with submenus
            const parentSelected = isIndentParentSelected() && item.label === 'Indent Request';
            return (
              <li key={item.label} className={`menu-item ${parentSelected ? 'selected' : ''}`}>
                <div className="menu-link" onClick={() => setIndentOpen(!indentOpen)}>
                  <div className="menu-link-content">
                    <FontAwesomeIcon icon={faCaretRight} className={`arrow-icon sidebar-caret${indentOpen ? ' open' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                </div>
                {indentOpen && (
                  <ul className="submenu">
                    {item.submenus.map((sub, subIdx) => (
                      <li key={sub.label} className={`submenu-item ${location.pathname === sub.path ? 'selected' : ''}`}>
                        <Link to={sub.path} className="submenu-link">
                          <FontAwesomeIcon icon={faCaretRight} style={{ color: subIdx % 2 === 0 ? '#fff' : '#111', marginRight: 8 }} />
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
