import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospital,
  faBuilding,
  faCity,
  faClipboardCheck,
  faChartLine,
  faBoxes,
  faClipboardList,
  faCalendarAlt,
  faCheckCircle,
  faExclamationTriangle,
  faClock,
  faUserNurse,
  faMapMarkerAlt,
  faTools
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import TimeDateDisplay from './TimeDateDisplay';

const Dashboard = () => {
  const [period, setPeriod] = useState('today');

  // Get data from localStorage
  const getStorageData = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const roomChecklists = getStorageData('roomChecklists', []);
  const qualityAssessments = getStorageData('qualityAssessments', []);
  const assets = getStorageData('assets', []);
  const indentRequests = getStorageData('indentRequests', []);
  const departmentRequests = getStorageData('departmentRequests', []);
  const publicAreaRequests = getStorageData('publicAreaRequests', []);

  // Calculate time-based filters
  const isInPeriod = (date, period) => {
    const itemDate = new Date(date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    switch (period) {
      case 'today':
        return itemDate >= today;
      case 'week':
        return itemDate >= weekAgo;
      case 'month':
        return itemDate >= monthAgo;
      default:
        return true;
    }
  };

  // Calculate statistics for the current period
  const calculateStats = () => {
    const periodChecklists = roomChecklists.filter(item => isInPeriod(item.date, period));
    const periodAssessments = qualityAssessments.filter(item => isInPeriod(item.date, period));
    const periodRequests = [
      ...indentRequests.filter(item => isInPeriod(item.date, period)),
      ...departmentRequests.filter(item => isInPeriod(item.date, period)),
      ...publicAreaRequests.filter(item => isInPeriod(item.date, period))
    ];

    // Calculate total requests
    const totalRequests = periodRequests.length;

    // Calculate completed and pending tasks
    const completedTasks = periodChecklists.filter(item => item.completed).length +
                          periodAssessments.filter(item => item.status === 'Completed').length;
    const pendingTasks = periodChecklists.filter(item => !item.completed).length +
                        periodAssessments.filter(item => item.status === 'Pending').length;

    // Calculate quality score
    const qualityScores = periodAssessments.map(assessment => {
      const totalPoints = assessment.areas.reduce((total, area) => 
        total + area.checkpoints.filter(cp => cp.status !== null).length, 0);
      const earnedPoints = assessment.areas.reduce((total, area) => 
        total + area.checkpoints.filter(cp => cp.status === true).length, 0);
      return totalPoints === 0 ? 0 : Math.round((earnedPoints / totalPoints) * 100);
    });
    const qualityScore = qualityScores.length > 0 
      ? Math.round(qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length)
      : 0;

    // Calculate rooms cleaned
    const roomsCleaned = periodChecklists.filter(item => item.completed).length;

    // Calculate areas serviced
    const areasServiced = periodRequests.filter(req => req.status === 'Completed').length;

    return {
      totalRequests,
      completedTasks,
      pendingTasks,
      qualityScore,
      roomsCleaned,
      areasServiced
    };
  };

  const currentStats = calculateStats();

  const quickActions = [
    {
      title: 'Room Discharge',
      icon: faHospital,
      path: '/room-discharge',
      color: '#80def7',
      description: 'Create new room discharge request'
    },
    {
      title: 'Department Request',
      icon: faBuilding,
      path: '/department-request',
      color: '#7dd3fc',
      description: 'Submit department cleaning request'
    },
    {
      title: 'Public Area',
      icon: faCity,
      path: '/public-area',
      color: '#93c5fd',
      description: 'Request public area cleaning'
    }
  ];

  const features = [
    {
      title: 'Cleaning Process',
      icon: faClipboardCheck,
      path: '/cleaning-process',
      stats: `${currentStats.completedTasks} completed`,
      color: '#86efac'
    },
    {
      title: 'Quality Assessment',
      icon: faChartLine,
      path: '/quality-assessment',
      stats: `${currentStats.qualityScore}% score`,
      color: '#fde047'
    },
    {
      title: 'Asset Management',
      icon: faBoxes,
      path: '/asset-management',
      stats: `${assets.length} items tracked`,
      color: '#fdba74'
    }
  ];

  // Get recent activity from various sources
  const getRecentActivity = () => {
    const allActivities = [
      ...roomChecklists.map(item => ({
        id: item.id,
        type: 'room',
        room: item.roomNumber,
        status: item.completed ? 'Completed' : 'Pending',
        time: item.date,
        timestamp: new Date(item.date).getTime()
      })),
      ...departmentRequests.map(item => ({
        id: item.id,
        type: 'department',
        department: item.department,
        status: item.status,
        time: item.date,
        timestamp: new Date(item.date).getTime()
      })),
      ...publicAreaRequests.map(item => ({
        id: item.id,
        type: 'public',
        area: item.area,
        status: item.status,
        time: item.date,
        timestamp: new Date(item.date).getTime()
      }))
    ];

    // Sort by timestamp and get the most recent 3
    return allActivities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 3)
      .map(activity => ({
        ...activity,
        time: formatTimeAgo(activity.timestamp)
      }));
  };

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const recentActivity = getRecentActivity();

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '0.5rem' }}>
        <TimeDateDisplay />
      </div>
      <div className="page-header">
        <div className="header-content">
          <h2>
            <FontAwesomeIcon icon={faClipboardList} />
            Housekeeping Dashboard
          </h2>
          <p className="header-subtitle">Overview of all housekeeping operations</p>
        </div>
        <div className="period-selector">
          <button 
            className={period === 'today' ? 'active' : ''} 
            onClick={() => setPeriod('today')}
          >
            Today
          </button>
          <button 
            className={period === 'week' ? 'active' : ''} 
            onClick={() => setPeriod('week')}
          >
            This Week
          </button>
          <button 
            className={period === 'month' ? 'active' : ''} 
            onClick={() => setPeriod('month')}
          >
            This Month
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card total-requests">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faClipboardList} />
          </div>
          <div className="stat-content">
            <h3>Total Requests</h3>
            <p className="stat-value">{currentStats.totalRequests}</p>
            <p className="stat-label">New requests</p>
          </div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p className="stat-value">{currentStats.completedTasks}</p>
            <p className="stat-label">Tasks completed</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="stat-content">
            <h3>Pending</h3>
            <p className="stat-value">{currentStats.pendingTasks}</p>
            <p className="stat-label">Tasks pending</p>
          </div>
        </div>
        <div className="stat-card quality">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div className="stat-content">
            <h3>Quality Score</h3>
            <p className="stat-value">{currentStats.qualityScore}%</p>
            <p className="stat-label">Average rating</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map(action => (
              <Link to={action.path} key={action.title} className="quick-action-card">
                <div className="action-icon" style={{ backgroundColor: action.color }}>
                  <FontAwesomeIcon icon={action.icon} />
                </div>
                <div className="action-content">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="features-section">
          <h3>Features Overview</h3>
          <div className="features-grid">
            {features.map(feature => (
              <Link to={feature.path} key={feature.title} className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.stats}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="recent-activity-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-card">
                <div className="activity-icon">
                  <FontAwesomeIcon 
                    icon={
                      activity.type === 'room' 
                        ? faHospital 
                        : activity.type === 'department' 
                        ? faBuilding 
                        : faCity
                    } 
                  />
                </div>
                <div className="activity-content">
                  <h4>
                    {activity.type === 'room' 
                      ? `Room ${activity.room}` 
                      : activity.type === 'department' 
                      ? activity.department 
                      : activity.area}
                  </h4>
                  <p className={`status status-${activity.status.toLowerCase()}`}>
                    {activity.status}
                  </p>
                  <p className="time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
