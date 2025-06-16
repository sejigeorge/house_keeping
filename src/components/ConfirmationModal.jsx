import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, requestData, requestType }) => {
  if (!isOpen) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderRequestDetails = () => {
    switch (requestType) {
      case 'roomDischarge':
        return (
          <>
            <div className="detail-row">
              <span>Room Number:</span>
              <span>{requestData.roomNumber}</span>
            </div>
            <div className="detail-row">
              <span>Floor:</span>
              <span>{requestData.floor}</span>
            </div>
            <div className="detail-row">
              <span>Priority:</span>
              <span className={`priority-tag ${requestData.priority.toLowerCase()}`}>
                {requestData.priority}
              </span>
            </div>
            <div className="detail-row">
              <span>Scheduled Time:</span>
              <span>{formatDate(requestData.scheduledTime)}</span>
            </div>
            {requestData.notes && (
              <div className="detail-row">
                <span>Additional Notes:</span>
                <span>{requestData.notes}</span>
              </div>
            )}
          </>
        );

      case 'department':
        return (
          <>
            <div className="detail-row">
              <span>Department:</span>
              <span>{requestData.department}</span>
            </div>
            <div className="detail-row">
              <span>Area Type:</span>
              <span>{requestData.areaType}</span>
            </div>
            <div className="detail-row">
              <span>Service Type:</span>
              <span>{requestData.serviceType}</span>
            </div>
            <div className="detail-row">
              <span>Priority:</span>
              <span className={`priority-tag ${requestData.priority.toLowerCase()}`}>
                {requestData.priority}
              </span>
            </div>
            <div className="detail-row">
              <span>Scheduled Time:</span>
              <span>{formatDate(requestData.scheduledTime)}</span>
            </div>
            {requestData.recurring && (
              <div className="detail-row">
                <span>Recurring Schedule:</span>
                <span>{requestData.recurringSchedule}</span>
              </div>
            )}
            {requestData.notes && (
              <div className="detail-row">
                <span>Additional Notes:</span>
                <span>{requestData.notes}</span>
              </div>
            )}
          </>
        );

      case 'publicArea':
        return (
          <>
            <div className="detail-row">
              <span>Area Name:</span>
              <span>{requestData.areaName}</span>
            </div>
            <div className="detail-row">
              <span>Location:</span>
              <span>{requestData.location}</span>
            </div>
            <div className="detail-row">
              <span>Service Type:</span>
              <span>{requestData.serviceType}</span>
            </div>
            <div className="detail-row">
              <span>Priority:</span>
              <span className={`priority-tag ${requestData.priority.toLowerCase()}`}>
                {requestData.priority}
              </span>
            </div>
            <div className="detail-row">
              <span>Scheduled Time:</span>
              <span>{formatDate(requestData.scheduledTime)}</span>
            </div>
            {requestData.recurring && (
              <div className="detail-row">
                <span>Recurring Schedule:</span>
                <span>{requestData.recurringSchedule}</span>
              </div>
            )}
            {requestData.notes && (
              <div className="detail-row">
                <span>Additional Notes:</span>
                <span>{requestData.notes}</span>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="success-icon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <h2>Request Submitted Successfully!</h2>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="request-details">
            <h3>Request Details</h3>
            <div className="details-container">
              {renderRequestDetails()}
            </div>
          </div>
          
          <div className="request-id">
            <span>Request ID:</span>
            <span>{requestData.requestId}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="primary-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 