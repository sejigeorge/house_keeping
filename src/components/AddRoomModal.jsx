import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospital,
  faTimes,
  faExclamationCircle,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import './AddRoomModal.css';

const AddRoomModal = ({ isOpen, onClose, onAddRoom }) => {
  const [roomData, setRoomData] = useState({
    roomNumber: '',
    floor: '',
    wing: '',
    roomType: '',
    priority: 'Medium',
    status: 'Pending',
    notes: ''
  });

  const wings = ['A-Wing', 'B-Wing', 'C-Wing', 'D-Wing'];
  const floors = ['1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor'];
  const roomTypes = ['Patient Room', 'Operating Room', 'ICU Room', 'Emergency Room', 'Examination Room'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRoom({
      ...roomData,
      id: 'RM' + Date.now().toString().slice(-6),
      addedAt: new Date().toISOString()
    });
    setRoomData({
      roomNumber: '',
      floor: '',
      wing: '',
      roomType: '',
      priority: 'Medium',
      status: 'Pending',
      notes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2><FontAwesomeIcon icon={faHospital} /> Add New Room</h2>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-room-form">
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="roomNumber">
                <FontAwesomeIcon icon={faHospital} /> Room Number *
              </label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                value={roomData.roomNumber}
                onChange={handleInputChange}
                placeholder="Enter room number"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="floor">
                <FontAwesomeIcon icon={faLocationDot} /> Floor *
              </label>
              <select
                id="floor"
                name="floor"
                value={roomData.floor}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Floor</option>
                {floors.map(floor => (
                  <option key={floor} value={floor}>{floor}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="wing">Wing *</label>
              <select
                id="wing"
                name="wing"
                value={roomData.wing}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Wing</option>
                {wings.map(wing => (
                  <option key={wing} value={wing}>{wing}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="roomType">Room Type *</label>
              <select
                id="roomType"
                name="roomType"
                value={roomData.roomType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Room Type</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="priority">
                <FontAwesomeIcon icon={faExclamationCircle} /> Priority Level *
              </label>
              <select
                id="priority"
                name="priority"
                value={roomData.priority}
                onChange={handleInputChange}
                required
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            <div className="input-group full-width">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={roomData.notes}
                onChange={handleInputChange}
                placeholder="Enter any additional notes or special instructions..."
                rows="3"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal; 