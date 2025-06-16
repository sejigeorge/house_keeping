import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faHospital,
  faBuilding,
  faCity,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import RoomDischarge from './RoomDischarge';
import DepartmentRequest from './DepartmentRequest';
import PublicAreaRequest from './PublicAreaRequest';
import './Indentrequest.css';

const IndentRequest = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  return (
    <div className="indent-container">
      {!selectedOption ? (
        <>
          <div className="page-header">
            <div className="header-content">
              <h2>
                <FontAwesomeIcon icon={faClipboardList} />
                Indent Management Dashboard
              </h2>
              <p className="header-subtitle">Manage and track cleaning service requests</p>
            </div>
          </div>

          <div className="indent-menu">
            <button className="menu-btn" onClick={() => handleSelect('room')}>
              <FontAwesomeIcon icon={faHospital} className="menu-btn-icon" />
              <h3 className="menu-btn-title">Room Discharge Requests</h3>
              <p className="menu-btn-description">
                Manage cleaning requests for discharged patient rooms and ensure proper sanitization
              </p>
            </button>

            <button className="menu-btn" onClick={() => handleSelect('department')}>
              <FontAwesomeIcon icon={faBuilding} className="menu-btn-icon" />
              <h3 className="menu-btn-title">Department Service Requests</h3>
              <p className="menu-btn-description">
                Handle cleaning and maintenance requests from various hospital departments
              </p>
            </button>

            <button className="menu-btn" onClick={() => handleSelect('public')}>
              <FontAwesomeIcon icon={faCity} className="menu-btn-icon" />
              <h3 className="menu-btn-title">Public Area Requests</h3>
              <p className="menu-btn-description">
                Coordinate cleaning services for common areas, lobbies, and public spaces
              </p>
            </button>
          </div>
        </>
      ) : (
        <>
          <button className="back-btn" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Indent Management
          </button>

          {selectedOption === 'room' && <RoomDischarge />}
          {selectedOption === 'department' && <DepartmentRequest />}
          {selectedOption === 'public' && <PublicAreaRequest />}
        </>
      )}
    </div>
  );
};

export default IndentRequest;
