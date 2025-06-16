import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faTools,
  faCheckCircle,
  faSearch,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import './CleaningProgress.css';

const CleaningProgress = () => {
  const [rooms, setRooms] = useState([
    { id: 'R101', number: '101', floor: '1st Floor', wing: 'A-Wing', status: 'Under Cleaning', lastUpdated: '2024-03-20 09:30' },
    { id: 'R102', number: '102', floor: '1st Floor', wing: 'A-Wing', status: 'Under Maintenance', lastUpdated: '2024-03-20 10:15' },
    { id: 'R201', number: '201', floor: '2nd Floor', wing: 'B-Wing', status: 'Completed', lastUpdated: '2024-03-20 08:45' },
    { id: 'R202', number: '202', floor: '2nd Floor', wing: 'B-Wing', status: 'Under Cleaning', lastUpdated: '2024-03-20 11:00' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleStatusUpdate = (roomId, newStatus) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          status: newStatus,
          lastUpdated: new Date().toLocaleString()
        };
      }
      return room;
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Under Cleaning':
        return <FontAwesomeIcon icon={faSpinner} className="status-icon cleaning" spin />;
      case 'Under Maintenance':
        return <FontAwesomeIcon icon={faTools} className="status-icon maintenance" />;
      case 'Completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon completed" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Under Cleaning':
        return 'status-cleaning';
      case 'Under Maintenance':
        return 'status-maintenance';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.wing.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || room.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="cleaning-progress-container">
      <h2>Cleaning Progress</h2>

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Under Cleaning">Under Cleaning</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="rooms-grid">
        {filteredRooms.map(room => (
          <div key={room.id} className="room-card">
            <div className="room-header">
              <h3>Room {room.number}</h3>
              <span className={`status-badge ${getStatusClass(room.status)}`}>
                {getStatusIcon(room.status)} {room.status}
              </span>
            </div>

            <div className="room-details">
              <p><strong>Floor:</strong> {room.floor}</p>
              <p><strong>Wing:</strong> {room.wing}</p>
              <p><strong>Last Updated:</strong> {room.lastUpdated}</p>
            </div>

            <div className="status-actions">
              <button
                className={`status-btn cleaning ${room.status === 'Under Cleaning' ? 'active' : ''}`}
                onClick={() => handleStatusUpdate(room.id, 'Under Cleaning')}
              >
                <FontAwesomeIcon icon={faSpinner} /> Under Cleaning
              </button>
              <button
                className={`status-btn maintenance ${room.status === 'Under Maintenance' ? 'active' : ''}`}
                onClick={() => handleStatusUpdate(room.id, 'Under Maintenance')}
              >
                <FontAwesomeIcon icon={faTools} /> Under Maintenance
              </button>
              <button
                className={`status-btn completed ${room.status === 'Completed' ? 'active' : ''}`}
                onClick={() => handleStatusUpdate(room.id, 'Completed')}
              >
                <FontAwesomeIcon icon={faCheckCircle} /> Completed
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CleaningProgress; 