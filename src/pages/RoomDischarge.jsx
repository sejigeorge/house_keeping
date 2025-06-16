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
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import ConfirmationModal from '../components/ConfirmationModal';
import './RoomDischarge.css';

const RoomDischarge = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: '',
    wing: '',
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
    contactNumber: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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
      roomNumber: '',
      floor: '',
      wing: '',
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
      contactNumber: ''
    });
  };

  return (
    <div className="room-discharge-container">
      <div className="page-header">
        <div className="header-content">
          <h2>
            <FontAwesomeIcon icon={faHospital} />
            Room Discharge Request
          </h2>
          <p className="header-subtitle">Submit and manage room cleaning requests after patient discharge</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="room-discharge-form">
        <div className="form-section">
          <h3>
            <FontAwesomeIcon icon={faBed} />
            Room Information
          </h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="roomNumber">
                <FontAwesomeIcon icon={faLocationDot} />
                Room Number *
              </label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter room number"
              />
            </div>

            <div className="input-group">
              <label htmlFor="floor">Floor *</label>
              <input
                type="text"
                id="floor"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                required
                placeholder="Enter floor number"
              />
            </div>

            <div className="input-group">
              <label htmlFor="wing">Wing</label>
          <input
                type="text"
                id="wing"
                name="wing"
                value={formData.wing}
                onChange={handleInputChange}
                placeholder="Enter wing name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="patientId">
                <FontAwesomeIcon icon={faUserInjured} />
                Patient ID *
        </label>
            <input
                type="text"
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                required
                placeholder="Enter patient ID"
              />
            </div>
          </div>
        </div>

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

            <div className="input-group">
              <label htmlFor="contactPerson">Contact Person *</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
                placeholder="Enter contact person name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter contact number"
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
      <Footer />
    </div>
  );
};

export default RoomDischarge;
