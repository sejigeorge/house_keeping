import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faStar,
  faClipboardCheck,
  faCamera,
  faComments,
  faExclamationTriangle,
  faCheckCircle,
  faHistory,
  faChartLine,
  faBed,
  faToilet,
  faTrashAlt,
  faTools,
  faClipboardList,
  faPlus,
  faPencilAlt,
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import TimeDateDisplay from '../components/TimeDateDisplay';
import './QualityAssessment.css';

const QualityAssessment = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [commentText, setCommentText] = useState('');

  const checklistAreas = [
    {
      id: 'area1',
      name: 'Patient Room',
      icon: faBed,
      checkpoints: [
        { id: 'pr1', text: 'No dust', status: null },
        { id: 'pr2', text: 'Bed clean', status: null },
        { id: 'pr3', text: 'No stains', status: null }
      ]
    },
    {
      id: 'area2',
      name: 'Bathroom',
      icon: faToilet,
      checkpoints: [
        { id: 'br1', text: 'Floor dry', status: null },
        { id: 'br2', text: 'No odor', status: null },
        { id: 'br3', text: 'Toilet disinfected', status: null }
      ]
    },
    {
      id: 'area3',
      name: 'Waste Disposal',
      icon: faTrashAlt,
      checkpoints: [
        { id: 'wd1', text: 'Trash emptied', status: null },
        { id: 'wd2', text: 'Bags replaced', status: null }
      ]
    },
    {
      id: 'area4',
      name: 'Equipment',
      icon: faTools,
      checkpoints: [
        { id: 'eq1', text: 'Cleaning tools properly stored', status: null }
      ]
    },
    {
      id: 'area5',
      name: 'Checklists',
      icon: faClipboardList,
      checkpoints: [
        { id: 'cl1', text: 'All cleaning steps were marked completed', status: null }
      ]
    }
  ];

  const [assessments, setAssessments] = useState(() => {
    const savedAssessments = localStorage.getItem('qualityAssessments');
    if (savedAssessments) {
      return JSON.parse(savedAssessments);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('qualityAssessments', JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('newAssessment') === 'true') {
      setShowAddModal(true);
      window.history.replaceState({}, '', location.pathname);
    }
  }, [location]);

  const handleAddAssessment = (formData) => {
    const newAssessment = {
      id: 'QA' + Date.now(),
      roomNumber: formData.roomNumber,
      date: formData.date || new Date().toISOString().split('T')[0],
      inspector: formData.inspector,
      status: 'Pending',
      areas: checklistAreas.map(area => ({
        ...area,
        checkpoints: area.checkpoints.map(cp => ({
          ...cp,
          status: null
        }))
      })),
      images: [],
      comments: [],
      issues: [],
      followUp: null
    };
    setAssessments(prev => [newAssessment, ...prev]);
    setShowAddModal(false);
    setSelectedAssessment(newAssessment.id);
  };

  const handleDeleteAssessment = (assessmentId) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      setAssessments(prev => prev.filter(a => a.id !== assessmentId));
      if (selectedAssessment === assessmentId) {
        setSelectedAssessment(null);
      }
    }
  };

  const handleUpdateCheckpoint = (assessmentId, areaId, checkpointId, status) => {
    setAssessments(prev => prev.map(assessment => {
      if (assessment.id === assessmentId) {
        const updatedAreas = assessment.areas.map(area => {
          if (area.id === areaId) {
            const updatedCheckpoints = area.checkpoints.map(cp => {
              if (cp.id === checkpointId) {
                return { ...cp, status };
              }
              return cp;
            });
            return { ...area, checkpoints: updatedCheckpoints };
          }
          return area;
        });
        
        const allCompleted = updatedAreas.every(area => 
          area.checkpoints.every(cp => cp.status !== null)
        );
        
        const hasFailedCheckpoints = updatedAreas.some(area =>
          area.checkpoints.some(cp => cp.status === false)
        );

        const newStatus = allCompleted 
          ? (hasFailedCheckpoints ? 'Needs Improvement' : 'Completed') 
          : 'In Progress';

        const statusComment = {
          text: `Status changed to ${newStatus}`,
          timestamp: new Date().toISOString(),
          type: 'system'
        };

        return {
          ...assessment,
          areas: updatedAreas,
          status: newStatus,
          comments: [...assessment.comments, statusComment]
        };
      }
      return assessment;
    }));
  };

  const handleAddIssue = (assessmentId, issue) => {
    setAssessments(prev => prev.map(assessment => {
      if (assessment.id === assessmentId) {
        return {
          ...assessment,
          issues: [...assessment.issues, issue]
        };
      }
      return assessment;
    }));
  };

  const handleRemoveIssue = (assessmentId, index) => {
    setAssessments(prev => prev.map(assessment => {
      if (assessment.id === assessmentId) {
        const newIssues = [...assessment.issues];
        newIssues.splice(index, 1);
        return {
          ...assessment,
          issues: newIssues
        };
      }
      return assessment;
    }));
  };

  const handleAddComment = (assessmentId) => {
    if (!commentText.trim()) return;

    setAssessments(prev => prev.map(assessment => {
      if (assessment.id === assessmentId) {
        const newComment = {
          text: commentText.trim(),
          timestamp: new Date().toISOString(),
          type: 'user'
        };
        return {
          ...assessment,
          comments: [...assessment.comments, newComment]
        };
      }
      return assessment;
    }));
    setCommentText('');
    setShowCommentModal(false);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'fair';
    return 'poor';
  };

  const calculateScore = (areas) => {
    let totalPoints = 0;
    let earnedPoints = 0;

    areas.forEach(area => {
      area.checkpoints.forEach(checkpoint => {
        if (checkpoint.status !== null) {
          totalPoints++;
          if (checkpoint.status === true) earnedPoints++;
        }
      });
    });

    return totalPoints === 0 ? 0 : Math.round((earnedPoints / totalPoints) * 100);
  };

  const calculateOverallStats = () => {
    if (assessments.length === 0) return { averageScore: 0, improvement: 0 };

    const scores = assessments.map(assessment => calculateScore(assessment.areas));
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    
    const recentScores = scores.slice(0, 5);
    const oldScores = scores.slice(5, 10);
    const recentAvg = recentScores.length ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length : 0;
    const oldAvg = oldScores.length ? oldScores.reduce((a, b) => a + b, 0) / oldScores.length : recentAvg;
    const improvement = oldAvg ? Math.round(((recentAvg - oldAvg) / oldAvg) * 100) : 0;

    return { averageScore, improvement };
  };

  const stats = calculateOverallStats();

  const renderAssessmentCard = (assessment) => {
    const score = calculateScore(assessment.areas);
    const scoreClass = getScoreColor(score);

    return (
      <div 
        key={assessment.id} 
        className={`assessment-card ${selectedAssessment === assessment.id ? 'selected' : ''}`}
        onClick={() => setSelectedAssessment(assessment.id)}
      >
        <div className="assessment-header">
          <h3>Room {assessment.roomNumber}</h3>
          <div className={`score-badge ${scoreClass}`}>
            {score}%
          </div>
        </div>

        <div className="assessment-info">
          <div className="info-row">
            <p><strong>Date:</strong> {assessment.date}</p>
            <p><strong>Inspector:</strong> {assessment.inspector}</p>
            <p className={`status ${assessment.status.toLowerCase().replace(' ', '-')}`}>
              <strong>Status:</strong> {assessment.status}
            </p>
          </div>
          
          <div className="areas-summary">
            {assessment.areas.map(area => (
              <div key={area.id} className="area-section">
                <h4>
                  <FontAwesomeIcon icon={area.icon} /> {area.name}
                </h4>
                <div className="checkpoints-list">
                  {area.checkpoints.map(checkpoint => (
                    <div key={checkpoint.id} className="checkpoint-item">
                      <span className="checkpoint-text">{checkpoint.text}</span>
                      <div className="checkpoint-actions">
                        <button
                          className={`status-btn ${checkpoint.status === true ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateCheckpoint(assessment.id, area.id, checkpoint.id, true);
                          }}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          className={`status-btn ${checkpoint.status === false ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateCheckpoint(assessment.id, area.id, checkpoint.id, false);
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {assessment.comments.length > 0 && (
            <div className="comments-section">
              <h4>
                <FontAwesomeIcon icon={faComments} /> Comments
              </h4>
              <div className="comments-list">
                {assessment.comments.map((comment, index) => (
                  <div key={index} className={`comment ${comment.type}`}>
                    <p>{comment.text}</p>
                    <span className="timestamp">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {assessment.issues.length > 0 && (
            <div className="issues-section">
              <h4>
                <FontAwesomeIcon icon={faExclamationTriangle} /> Issues Found
              </h4>
              <ul>
                {assessment.issues.map((issue, index) => (
                  <li key={index}>
                    {issue}
                    <button
                      className="remove-issue-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveIssue(assessment.id, index);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="assessment-actions">
            <button 
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                const issue = window.prompt('Enter the issue:');
                if (issue) handleAddIssue(assessment.id, issue);
              }}
            >
              <FontAwesomeIcon icon={faExclamationTriangle} /> Add Issue
            </button>
            <button 
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                setEditingAssessment(assessment.id);
                setShowCommentModal(true);
              }}
            >
              <FontAwesomeIcon icon={faComments} /> Add Comment
            </button>
            <button
              className="action-btn delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAssessment(assessment.id);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'needs improvement', label: 'Needs Improvement' }
  ];

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || assessment.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="quality-assessment-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '0.5rem' }}>
        <TimeDateDisplay />
      </div>
      <div className="page-header">
        <div className="header-content">
          <h2>
            <FontAwesomeIcon icon={faClipboardCheck} />
            Quality Assessment
          </h2>
          <p className="header-subtitle">Track and review quality assessments</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <FontAwesomeIcon icon={faCheckCircle} />
            <div className="stat-info">
              <span className="stat-value">{stats.averageScore}%</span>
              <span className="stat-label">Average Score</span>
            </div>
          </div>
          <div className="stat-item">
            <FontAwesomeIcon icon={faChartLine} />
            <div className="stat-info">
              <span className="stat-value">{stats.improvement > 0 ? '+' : ''}{stats.improvement}%</span>
              <span className="stat-label">Improvement</span>
            </div>
          </div>
        </div>
        <button className="add-assessment-button" onClick={() => setShowAddModal(true)}>
          <FontAwesomeIcon icon={faPlus} /> New Assessment
        </button>
      </div>

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by room number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter by status"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredAssessments.length === 0 ? (
        <div className="no-results">
          <p>No assessments found matching your criteria.</p>
        </div>
      ) : (
        <div className="assessments-grid">
          {filteredAssessments.map(renderAssessmentCard)}
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>New Quality Assessment</h3>
              <button className="close-button" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form
              className="assessment-form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  roomNumber: e.target.roomNumber.value,
                  inspector: e.target.inspector.value,
                  date: e.target.date.value
                };
                handleAddAssessment(formData);
              }}
            >
              <div className="form-group">
                <label htmlFor="roomNumber">Room Number *</label>
                <input
                  id="roomNumber"
                  type="text"
                  required
                  placeholder="Enter room number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inspector">Inspector Name *</label>
                <input
                  id="inspector"
                  type="text"
                  required
                  placeholder="Enter inspector name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Create Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCommentModal && (
        <div className="modal-overlay" onClick={() => setShowCommentModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Comment</h3>
              <button className="close-button" onClick={() => setShowCommentModal(false)}>×</button>
            </div>
            <div className="comment-form">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Enter your comment..."
                rows={4}
              />
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={() => setShowCommentModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="submit-button"
                  onClick={() => handleAddComment(editingAssessment)}
                  disabled={!commentText.trim()}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityAssessment; 