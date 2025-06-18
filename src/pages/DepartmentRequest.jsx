import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faLocationDot,
  faClipboardList,
  faClock,
  faUserNurse,
  faUpload,
  faExclamationCircle,
  faCalendarAlt,
  faNotesMedical,
  faSync,
  faHashtag,
  faCalendarDay,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../components/ConfirmationModal';
import TimeDateDisplay from '../components/TimeDateDisplay';
import './DepartmentRequest.css';

const DepartmentRequest = () => {
  const [formData, setFormData] = useState({
    department: '',
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
    contactNumber: '',
    isRecurring: 'no',
    occurrenceCount: '',
    startDate: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const departments = [
    'Emergency Department',
    'Operating Theater',
    'Intensive Care Unit',
    'Radiology',
    'Laboratory',
    'Pharmacy',
    'Cafeteria',
    'Administration'
  ];

  const serviceTypes = [
    'Regular Cleaning',
    'Deep Cleaning',
    'Waste Management',
    'Floor Maintenance',
    'Window Cleaning',
    'Equipment Cleaning',
    'Pest Control'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const staffMembers = ['Team A', 'Team B', 'Team C', 'John Doe', 'Jane Smith'];
  const frequencies = ['daily', 'weekly', 'bi-weekly', 'monthly'];

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
    
    const requestId = 'DR' + Date.now().toString().slice(-6);
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
      department: '',
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
      contactNumber: '',
      isRecurring: 'no',
      occurrenceCount: '',
      startDate: ''
    });
  };

  return (
    <div className="department-request-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '0.5rem' }}>
        <TimeDateDisplay />
      </div>
      <div className="page-header">
        <div className="header-content">
          <h2>
            <FontAwesomeIcon icon={faBuilding} />
            Department Service Request
            <FontAwesomeIcon icon={faCaretRight} style={{ color: '#111', marginLeft: 8 }} />
          </h2>
          <p className="header-subtitle">Submit and manage cleaning requests for hospital departments</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="department-form">
        <div className="form-section">
          <h3>
            <FontAwesomeIcon icon={faBuilding} />
            Department Information
          </h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="department">
                <FontAwesomeIcon icon={faBuilding} />
                Department 
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="location">
                <FontAwesomeIcon icon={faLocationDot} />
                Specific Location 
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Room 302, West Wing"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="contactPerson">Contact Person</label>
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
              <label htmlFor="contactNumber">Contact Number </label>
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
                Service Type 
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
                Priority Level 
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Priority</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority.toLowerCase()}> {priority} </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="scheduledDate">
                <FontAwesomeIcon icon={faClock} />
                Scheduled Date 
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
              <label htmlFor="scheduledTime">Scheduled Time </label>
              <input
                type="time"
                id="scheduledTime"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="isRecurring" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#0d92ae', fontSize: 20 }} />
                Recurring Service
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

        <div className="form-section">
          <h3>
            <FontAwesomeIcon icon={faNotesMedical} />
            Assignment & Additional Information
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
                {staffMembers.map(staff => (
                  <option key={staff} value={staff}>{staff}</option>
                ))}
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
        requestType="department"
      />
    </div>
  );
};

export default DepartmentRequest;

