import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocation,
  faLocationDot,
  faClipboardList,
  faClock,
  faUserNurse,
  faUpload,
  faExclamationCircle,
  faCity,
  faCalendarAlt,
  faNotesMedical
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import ConfirmationModal from '../components/ConfirmationModal';
import './PublicAreaRequest.css';

const PublicAreaRequest = () => {
  const [formData, setFormData] = useState({
    areaType: '',
    location: '',
    serviceType: '',
    cleaningType: '',
    priority: '',
    scheduledDate: '',
    scheduledTime: '',
    assignedTo: '',
    attachments: [],
    remarks: '',
    recurringService: false,
    frequency: 'daily',
    contactPerson: '',
    contactNumber: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const areaTypes = [
    'Main Lobby',
    'Waiting Area',
    'Corridors',
    'Restrooms',
    'Cafeteria',
    'Parking Area',
    'Garden',
    'Reception'
  ];

  const serviceTypes = [
    'Regular Cleaning',
    'Deep Cleaning',
    'Waste Management',
    'Floor Maintenance',
    'Window Cleaning',
    'Furniture Cleaning',
    'Sanitization'
  ];

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
    
    const requestId = 'PR' + Date.now().toString().slice(-6);
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
      areaType: '',
      location: '',
      serviceType: '',
      cleaningType: '',
      priority: '',
      scheduledDate: '',
      scheduledTime: '',
      assignedTo: '',
      attachments: [],
      remarks: '',
      recurringService: false,
      frequency: 'daily',
      contactPerson: '',
      contactNumber: ''
    });
  };

  return (
    <div className="public-area-request-container">
      <div className="page-header">
        <div className="header-content">
          <h2>
            <FontAwesomeIcon icon={faCity} />
            Public Area Service Request
          </h2>
          <p className="header-subtitle">Submit and manage cleaning requests for public areas and common spaces</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="public-area-form">
        <div className="form-section">
          <h3>
            <FontAwesomeIcon icon={faMapLocation} />
            Area Information
          </h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="areaType">
                <FontAwesomeIcon icon={faCity} />
                Area Type *
              </label>
              <select
                id="areaType"
                name="areaType"
                value={formData.areaType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Area Type</option>
                {areaTypes.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="location">
                <FontAwesomeIcon icon={faLocationDot} />
                Specific Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Ground Floor, East Wing"
                required
              />
            </div>

            <div className="input-group">
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

            <div className="input-group">
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
          </div>
        </div>

        <div className="form-section">
          <h3>
            <FontAwesomeIcon icon={faCalendarAlt} />
            Service Details
          </h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="serviceType">
                <FontAwesomeIcon icon={faClipboardList} />
                Service Type *
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Service Type</option>
                {serviceTypes.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
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

            <div className="input-group">
              <label htmlFor="scheduledDate">
                <FontAwesomeIcon icon={faClock} />
                Scheduled Date *
              </label>
              <input
                type="date"
                id="scheduledDate"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="scheduledTime">Scheduled Time *</label>
              <input
                type="time"
                id="scheduledTime"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>
            <FontAwesomeIcon icon={faNotesMedical} />
            Additional Information
          </h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="assignedTo">
                <FontAwesomeIcon icon={faUserNurse} />
                Assign To
              </label>
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

            <div className="input-group full-width">
              <label htmlFor="remarks">Special Instructions / Remarks</label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Add any special instructions or additional information..."
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
        requestType="publicArea"
      />
      <Footer />
    </div>
  );
};

export default PublicAreaRequest;
