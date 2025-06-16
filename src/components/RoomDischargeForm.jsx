import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from './ConfirmationModal';
import './RoomDischargeForm.css';

const RoomDischargeForm = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: '',
    priority: 'Medium',
    scheduledTime: '',
    notes: '',
    attachments: []
  });

  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique request ID
    const requestId = 'RD' + Date.now().toString().slice(-6);
    
    // Prepare the submitted data
    const submittedRequest = {
      ...formData,
      requestId,
      submittedAt: new Date().toISOString()
    };

    // In a real application, you would send this data to your backend
    console.log('Submitted Request:', submittedRequest);
    
    // Store the submitted data and show the modal
    setSubmittedData(submittedRequest);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form after closing modal
    setFormData({
      roomNumber: '',
      floor: '',
      priority: 'Medium',
      scheduledTime: '',
      notes: '',
      attachments: []
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="room-discharge-form">
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number *</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="floor">Floor *</label>
          <input
            type="text"
            id="floor"
            name="floor"
            value={formData.floor}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority Level *</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="scheduledTime">Scheduled Time *</label>
          <input
            type="datetime-local"
            id="scheduledTime"
            name="scheduledTime"
            value={formData.scheduledTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="attachments">
            <div className="file-upload-button">
              <FontAwesomeIcon icon={faUpload} />
              <span>Upload Attachments</span>
            </div>
          </label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            onChange={handleFileChange}
            multiple
            style={{ display: 'none' }}
          />
          {formData.attachments.length > 0 && (
            <div className="file-list">
              {formData.attachments.map((file, index) => (
                <div key={index} className="file-item">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>

      <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        requestData={submittedData}
        requestType="roomDischarge"
      />
    </>
  );
};

export default RoomDischargeForm; 