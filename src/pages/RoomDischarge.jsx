import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospital,
  faLocationDot,
  faClipboardList,
  faClock,
  faUserNurse,
  faUpload,
  faExclamationCircle,
  faBed,
  faUserInjured,
  faCalendarAlt,
  faRedo,
  faHashtag,
  faCalendarDay,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../components/ConfirmationModal';
import TimeDateDisplay from '../components/TimeDateDisplay';
import './RoomDischarge.css';

// Simulate fetching multiple room details for discharged patients
const dummyRooms = [
  {
    roomNumber: '101',
    floor: '1st Floor',
    wing: 'A-Wing',
    roomType: 'Patient Room',
    priority: 'High',
    status: 'Under Cleaning',
    patientId: 'P12345',
    patientName: 'John Doe',
  },
  {
    roomNumber: '202',
    floor: '2nd Floor',
    wing: 'B-Wing',
    roomType: 'ICU Room',
    priority: 'Urgent',
    status: 'Pending',
    patientId: 'P67890',
    patientName: 'Jane Smith',
  }
];

const RoomDischarge = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    requestId: '',
    dischargeDate: '',
    dischargeTime: '',
    cleaningType: '',
    priority: '',
    assignedTo: '',
    remarks: '',
    attachments: [],
    recurringService: false,
    frequency: 'daily',
    contactPerson: '',
    contactNumber: '',
    isRecurring: 'no',
    occurrenceCount: '',
    startDate: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editableRoom, setEditableRoom] = useState({ ...dummyRooms[0] });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? Array.from(files) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestId = 'RD' + Date.now().toString().slice(-6);
    const submittedRequest = {
      ...formData,
      requestId,
      submittedAt: new Date().toISOString()
    };
    
    setSubmittedData(submittedRequest);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      patientId: '',
      requestId: '',
      dischargeDate: '',
      dischargeTime: '',
      cleaningType: '',
      priority: '',
      assignedTo: '',
      remarks: '',
      attachments: [],
      recurringService: false,
      frequency: 'daily',
      contactPerson: '',
      contactNumber: '',
      isRecurring: 'no',
      occurrenceCount: '',
      startDate: ''
    });
  };

  const handleRoomChange = (e) => {
    const idx = parseInt(e.target.value, 10);
    setSelectedRoomIndex(idx);
    setEditableRoom({ ...dummyRooms[idx] });
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditableRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    dummyRooms[selectedRoomIndex] = { ...editableRoom };
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditableRoom({ ...dummyRooms[selectedRoomIndex] });
    setEditMode(false);
  };

  const fetchedRoomDetails = dummyRooms[selectedRoomIndex];

  return (
    <div className="room-discharge-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '0.5rem' }}>
        <TimeDateDisplay />
      </div>
      <div className="page-header">
        <div className="header-content">
          <h2>
            <FontAwesomeIcon icon={faHospital} />
            Room Discharge
            <FontAwesomeIcon icon={faCaretRight} style={{ color: '#111', marginLeft: 8 }} />
          </h2>
          <p className="header-subtitle">Manage and track room discharge requests</p>
        </div>
      </div>

      {/* Room Details Info Panel */}
      <div className="room-details-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3><FontAwesomeIcon icon={faBed} /> Room Details</h3>
          <div>
            <select value={selectedRoomIndex} onChange={handleRoomChange} style={{ marginRight: 16, padding: '6px 12px', borderRadius: 6 }}>
              {dummyRooms.map((room, idx) => (
                <option key={room.roomNumber} value={idx}>
                  Room {room.roomNumber} - {room.patientName}
                </option>
              ))}
            </select>
            {!editMode && (
              <button className="edit-btn" onClick={handleEditClick} style={{ padding: '6px 18px', borderRadius: 6, background: '#0582ac', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }}>Edit</button>
            )}
          </div>
        </div>
        <div className="room-details-grid">
          {editMode ? (
            <>
              <div><strong>Room Number:</strong> <input name="roomNumber" value={editableRoom.roomNumber} onChange={handleEditInputChange} /></div>
              <div><strong>Floor:</strong> <input name="floor" value={editableRoom.floor} onChange={handleEditInputChange} /></div>
              <div><strong>Wing:</strong> <input name="wing" value={editableRoom.wing} onChange={handleEditInputChange} /></div>
              <div><strong>Room Type:</strong> <input name="roomType" value={editableRoom.roomType} onChange={handleEditInputChange} /></div>
              <div><strong>Priority:</strong> <input name="priority" value={editableRoom.priority} onChange={handleEditInputChange} /></div>
              <div><strong>Status:</strong> <input name="status" value={editableRoom.status} onChange={handleEditInputChange} /></div>
              <div><strong>Patient ID:</strong> <input name="patientId" value={editableRoom.patientId} onChange={handleEditInputChange} /></div>
              <div><strong>Patient Name:</strong> <input name="patientName" value={editableRoom.patientName} onChange={handleEditInputChange} /></div>
            </>
          ) : (
            <>
              <div><strong>Room Number:</strong> {fetchedRoomDetails.roomNumber}</div>
              <div><strong>Floor:</strong> {fetchedRoomDetails.floor}</div>
              <div><strong>Wing:</strong> {fetchedRoomDetails.wing}</div>
              <div><strong>Room Type:</strong> {fetchedRoomDetails.roomType}</div>
              <div><strong>Priority:</strong> {fetchedRoomDetails.priority}</div>
              <div><strong>Status:</strong> {fetchedRoomDetails.status}</div>
              <div><strong>Patient ID:</strong> {fetchedRoomDetails.patientId}</div>
              <div><strong>Patient Name:</strong> {fetchedRoomDetails.patientName}</div>
            </>
          )}
        </div>
        {editMode && (
          <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
            <button className="save-btn" onClick={handleSaveEdit} style={{ padding: '6px 18px', borderRadius: 6, background: '#22c55e', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }}>Save</button>
            <button className="cancel-btn" onClick={handleCancelEdit} style={{ padding: '6px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="room-discharge-form">
        <div className="form-section">
          <h3>
            <FontAwesomeIcon icon={faCalendarAlt} />
            Discharge Details
          </h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="dischargeDate">
                <FontAwesomeIcon icon={faClock} />
                Discharge Date *
              </label>
              <input
                type="date"
                id="dischargeDate"
                name="dischargeDate"
                value={formData.dischargeDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="dischargeTime">Discharge Time *</label>
              <input
                type="time"
                id="dischargeTime"
                name="dischargeTime"
                value={formData.dischargeTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="cleaningType">
                <FontAwesomeIcon icon={faClipboardList} />
                Cleaning Type *
              </label>
              <select
                id="cleaningType"
                name="cleaningType"
                value={formData.cleaningType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Cleaning Type</option>
                <option value="standard">Standard Cleaning</option>
                <option value="deep">Deep Cleaning</option>
                <option value="isolation">Isolation Room Cleaning</option>
                <option value="terminal">Terminal Cleaning</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="priority">
                <FontAwesomeIcon icon={faExclamationCircle} />
                Priority Level *
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>
            <FontAwesomeIcon icon={faUserNurse} />
            Assignment & Additional Information
          </h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="assignedTo">Assign To</label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
              >
                <option value="">Select Staff/Team</option>
                <option value="team-a">Team A</option>
                <option value="team-b">Team B</option>
                <option value="team-c">Team C</option>
              </select>
            </div>

            <div className="input-group required">
              <label htmlFor="contactPerson">Contact Person *</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                placeholder="Name of contact person"
                required
              />
            </div>

            <div className="input-group required">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="Contact number"
                required
              />
            </div>

            <div className="input-group full-width">
              <label htmlFor="remarks">Remarks / Special Instructions</label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Enter any additional notes or special instructions..."
                rows="4"
              />
            </div>

            <div className="input-group">
              <label htmlFor="attachments">
                <FontAwesomeIcon icon={faUpload} />
                Attachments
              </label>
              <input
                type="file"
                id="attachments"
                name="attachments"
                onChange={handleInputChange}
                multiple
                accept="image/*,.pdf"
              />
              <small>Upload photos or documents (optional)</small>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>
            <FontAwesomeIcon icon={faCalendarAlt} /> Recurring Service
          </h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="isRecurring">
                <FontAwesomeIcon icon={faRedo} /> Recurring Service
              </label>
              <select
                id="isRecurring"
                name="isRecurring"
                value={formData.isRecurring}
                onChange={handleInputChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            {formData.isRecurring === "yes" && (
              <>
                <div className="input-group">
                  <label htmlFor="frequency">
                    <FontAwesomeIcon icon={faClock} /> Frequency
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="occurrenceCount">
                    <FontAwesomeIcon icon={faHashtag} /> Number of Times
                  </label>
                  <input
                    type="number"
                    id="occurrenceCount"
                    name="occurrenceCount"
                    min="1"
                    value={formData.occurrenceCount}
                    onChange={handleInputChange}
                    placeholder="Enter number of times"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="startDate">
                    <FontAwesomeIcon icon={faCalendarDay} /> Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            <FontAwesomeIcon icon={faClipboardList} />
            Submit Request
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        requestData={submittedData}
        requestType="roomDischarge"
      />
    </div>
  );
};

export default RoomDischarge;
