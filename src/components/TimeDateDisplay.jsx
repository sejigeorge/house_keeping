import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import './TimeDateDisplay.css';

const TimeDateDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="time-date-display">
      <div className="time">
        <FontAwesomeIcon icon={faClock} />
        <span>{formatTime(currentTime)}</span>
      </div>
      <div className="date">
        <FontAwesomeIcon icon={faCalendar} />
        <span>{formatDate(currentTime)}</span>
      </div>
    </div>
  );
};

export default TimeDateDisplay; 
