import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faFilter,
  faHospital,
  faLocationDot,
  faExclamationCircle,
  faClock,
  faSpinner,
  faCheckCircle,
  faTools,
  faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';
import AddRoomModal from '../components/AddRoomModal';
import TimeDateDisplay from '../components/TimeDateDisplay';
import './CleaningProcess.css';

const CleaningProcess = () => {
  const [rooms, setRooms] = useState(() => {
    // Initialize rooms from localStorage if available
    const savedRooms = localStorage.getItem('cleaningProcessRooms');
    return savedRooms ? JSON.parse(savedRooms) : [
      {
        id: 'RM001',
        roomNumber: '101',
        floor: '1st Floor',
        wing: 'A-Wing',
        roomType: 'Patient Room',
        priority: 'High',
        status: 'Under Cleaning',
        notes: 'Deep cleaning required',
        addedAt: new Date().toISOString()
      },
      {
        id: 'RM002',
        roomNumber: '202',
        floor: '2nd Floor',
        wing: 'B-Wing',
        roomType: 'Operating Room',
        priority: 'Urgent',
        status: 'Pending',
        notes: 'Immediate attention needed',
        addedAt: new Date().toISOString()
      }
    ];
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Save rooms to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cleaningProcessRooms', JSON.stringify(rooms));
  }, [rooms]);

  const handleAddRoom = (newRoom) => {
    setRooms(prevRooms => [...prevRooms, newRoom]);
  };

  const handleUpdateRoomStatus = (roomId, newStatus) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId ? { ...room, status: newStatus } : room
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#f59e0b'; // Amber
      case 'under cleaning':
        return '#3b82f6'; // Blue
      case 'under maintenance':
        return '#ef4444'; // Red
      case 'completed':
        return '#22c55e'; // Green
      default:
        return '#64748b'; // Gray
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return faClock;
      case 'under cleaning':
        return faSpinner;
      case 'under maintenance':
        return faTools;
      case 'completed':
        return faCheckCircle;
      default:
        return faClock;
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.wing.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || room.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="cleaning-process-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '0.5rem' }}>
        <TimeDateDisplay />
      </div>
      <div className="page-header">
        <div className="header-content">
          <h2>
            <FontAwesomeIcon icon={faClipboardCheck} />
            Cleaning Process
          </h2>
          <p className="header-subtitle">Track and manage room cleaning status</p>
        </div>
        <button className="add-room-button" onClick={() => setShowAddModal(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add New Room
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-filter">
          <FontAwesomeIcon icon={faFilter} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under cleaning">Under Cleaning</option>
            <option value="under maintenance">Under Maintenance</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="rooms-grid">
        {filteredRooms.map(room => (
          <div key={room.id} className="room-card">
            <div className="room-header">
              <div className="room-number">
                <FontAwesomeIcon icon={faHospital} />
                <h3>{room.roomNumber}</h3>
              </div>
              <div 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(room.status) }}
              >
                <FontAwesomeIcon icon={getStatusIcon(room.status)} />
                {room.status}
              </div>
            </div>

            <div className="room-details">
              <div className="detail-item">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{room.floor}, {room.wing}</span>
              </div>
              <div className="detail-item">
                <span className="room-type">{room.roomType}</span>
              </div>
              <div className="detail-item">
                <FontAwesomeIcon icon={faExclamationCircle} />
                <span className={`priority priority-${room.priority.toLowerCase()}`}>
                  {room.priority} Priority
                </span>
              </div>
            </div>

            {room.notes && (
              <div className="room-notes">
                <p>{room.notes}</p>
              </div>
            )}

            <div className="room-actions">
              <select
                value={room.status}
                onChange={(e) => handleUpdateRoomStatus(room.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Under Cleaning">Under Cleaning</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="no-rooms">
          <p>No rooms found. Add a new room to get started.</p>
        </div>
      )}

      <AddRoomModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddRoom={handleAddRoom}
      />
    </div>
  );
};

export default CleaningProcess; 