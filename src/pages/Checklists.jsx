import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faSearch,
  faFilter,
  faHospital,
  faLocationDot,
  faSave,
  faUndo,
  faTrash,
  faPencilAlt,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import './Checklists.css';

const Checklists = () => {
  const location = useLocation();
  // Initialize checklist items with localStorage data or default items
  const [checklists, setChecklists] = useState(() => {
    const savedChecklists = localStorage.getItem('roomChecklists');
    if (savedChecklists) {
      return JSON.parse(savedChecklists);
    }
    return [
      {
        id: 'CL' + Date.now(),
        roomNumber: '',
        floor: '',
        date: new Date().toISOString().split('T')[0],
        items: [
          { id: 1, task: 'Change bed sheets', status: null },
          { id: 2, task: 'Disinfect bed rails', status: null },
          { id: 3, task: 'Mop floor with disinfectant', status: null },
          { id: 4, task: 'Clean bathroom and toilet', status: null },
          { id: 5, task: 'Wipe down medical equipment', status: null },
          { id: 6, task: 'Empty trash and replace liners', status: null },
          { id: 7, task: 'Clean windows and curtains', status: null },
          { id: 8, task: 'Report any broken items', status: null }
        ],
        notes: '',
        completed: false,
        isEditing: false
      }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  // Save to localStorage whenever checklists change
  useEffect(() => {
    localStorage.setItem('roomChecklists', JSON.stringify(checklists));
  }, [checklists]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('newChecklist') === 'true') {
      handleAddChecklist();
      // Clear the query parameter
      window.history.replaceState({}, '', location.pathname);
    }
  }, [location]);

  const handleAddChecklist = () => {
    const newChecklist = {
      id: 'CL' + Date.now(),
      roomNumber: '',
      floor: '',
      date: new Date().toISOString().split('T')[0],
      items: [
        { id: 1, task: 'Change bed sheets', status: null },
        { id: 2, task: 'Disinfect bed rails', status: null },
        { id: 3, task: 'Mop floor with disinfectant', status: null },
        { id: 4, task: 'Clean bathroom and toilet', status: null },
        { id: 5, task: 'Wipe down medical equipment', status: null },
        { id: 6, task: 'Empty trash and replace liners', status: null },
        { id: 7, task: 'Clean windows and curtains', status: null },
        { id: 8, task: 'Report any broken items', status: null }
      ],
      notes: '',
      completed: false,
      isEditing: true // Set to true so the new checklist is immediately editable
    };
    setChecklists(prevChecklists => [newChecklist, ...prevChecklists]); // Add to the beginning of the list
  };

  const handleDeleteChecklist = (checklistId) => {
    if (window.confirm('Are you sure you want to delete this checklist?')) {
      setChecklists(prevChecklists => 
        prevChecklists.filter(checklist => checklist.id !== checklistId)
      );
    }
  };

  const handleEditChecklist = (checklistId) => {
    setChecklists(prevChecklists =>
      prevChecklists.map(checklist =>
        checklist.id === checklistId
          ? { ...checklist, isEditing: !checklist.isEditing }
          : checklist
      )
    );
  };

  const handleAddTask = (checklistId) => {
    setChecklists(prevChecklists =>
      prevChecklists.map(checklist => {
        if (checklist.id === checklistId) {
          const newTask = {
            id: checklist.items.length + 1,
            task: '',
            status: null
          };
          return {
            ...checklist,
            items: [...checklist.items, newTask]
          };
        }
        return checklist;
      })
    );
  };

  const handleEditTask = (checklistId, taskId, newTaskName) => {
    setChecklists(prevChecklists =>
      prevChecklists.map(checklist => {
        if (checklist.id === checklistId) {
          const updatedItems = checklist.items.map(item =>
            item.id === taskId ? { ...item, task: newTaskName } : item
          );
          return { ...checklist, items: updatedItems };
        }
        return checklist;
      })
    );
  };

  const handleDeleteTask = (checklistId, taskId) => {
    setChecklists(prevChecklists =>
      prevChecklists.map(checklist => {
        if (checklist.id === checklistId) {
          const updatedItems = checklist.items.filter(item => item.id !== taskId);
          return { ...checklist, items: updatedItems };
        }
        return checklist;
      })
    );
  };

  const handleItemStatus = (checklistId, itemId, status) => {
    setChecklists(prevChecklists =>
      prevChecklists.map(checklist => {
        if (checklist.id === checklistId) {
          const updatedItems = checklist.items.map(item =>
            item.id === itemId ? { ...item, status } : item
          );
          const allCompleted = updatedItems.every(item => item.status !== null);
          return {
            ...checklist,
            items: updatedItems,
            completed: allCompleted
          };
        }
        return checklist;
      })
    );
  };

  const handleInputChange = (checklistId, field, value) => {
    setChecklists(prevChecklists =>
      prevChecklists.map(checklist =>
        checklist.id === checklistId ? { ...checklist, [field]: value } : checklist
      )
    );
  };

  const handleResetChecklist = (checklistId) => {
    setChecklists(prevChecklists =>
      prevChecklists.map(checklist => {
        if (checklist.id === checklistId) {
          return {
            ...checklist,
            items: checklist.items.map(item => ({ ...item, status: null })),
            completed: false
          };
        }
        return checklist;
      })
    );
  };

  const getCompletionPercentage = (items) => {
    const completedItems = items.filter(item => item.status !== null).length;
    return Math.round((completedItems / items.length) * 100);
  };

  const filteredChecklists = checklists.filter(checklist => {
    const matchesSearch = 
      checklist.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.floor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'completed' && checklist.completed) ||
      (filterStatus === 'pending' && !checklist.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="checklists-container">
      <div className="page-header">
        <h2>Room Cleaning Checklists</h2>
        <button className="add-checklist-button" onClick={handleAddChecklist}>
          <FontAwesomeIcon icon={faHospital} /> New Checklist
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by room number or floor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-filter">
          <FontAwesomeIcon icon={faFilter} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="checklists-grid">
        {filteredChecklists.map(checklist => (
          <div key={checklist.id} className="checklist-card">
            <div className="checklist-header">
              <div className="room-info">
                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faHospital} /> Room Number:
                  </label>
                  <input
                    type="text"
                    value={checklist.roomNumber}
                    onChange={(e) => handleInputChange(checklist.id, 'roomNumber', e.target.value)}
                    placeholder="Enter room number"
                  />
                </div>
                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faLocationDot} /> Floor:
                  </label>
                  <input
                    type="text"
                    value={checklist.floor}
                    onChange={(e) => handleInputChange(checklist.id, 'floor', e.target.value)}
                    placeholder="Enter floor"
                  />
                </div>
                <div className="input-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    value={checklist.date}
                    onChange={(e) => handleInputChange(checklist.id, 'date', e.target.value)}
                  />
                </div>
              </div>
              <div className="completion-badge">
                {getCompletionPercentage(checklist.items)}% Complete
              </div>
            </div>

            <div className="checklist-items">
              {checklist.items.map(item => (
                <div key={item.id} className="checklist-item">
                  {checklist.isEditing && editingTask === item.id ? (
                    <input
                      type="text"
                      className="edit-task-input"
                      value={item.task}
                      onChange={(e) => handleEditTask(checklist.id, item.id, e.target.value)}
                      onBlur={() => setEditingTask(null)}
                      autoFocus
                    />
                  ) : (
                    <span className="task-name" onClick={() => checklist.isEditing && setEditingTask(item.id)}>
                      {item.task}
                    </span>
                  )}
                  <div className="task-actions">
                    {checklist.isEditing && (
                      <button
                        className="delete-task-button"
                        onClick={() => handleDeleteTask(checklist.id, item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                    <div className="status-buttons">
                      <button
                        className={`status-button ${item.status === true ? 'selected' : ''}`}
                        onClick={() => handleItemStatus(checklist.id, item.id, true)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        className={`status-button ${item.status === false ? 'selected' : ''}`}
                        onClick={() => handleItemStatus(checklist.id, item.id, false)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {checklist.isEditing && (
                <button
                  className="add-task-button"
                  onClick={() => handleAddTask(checklist.id)}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add New Task
                </button>
              )}
            </div>

            <div className="checklist-footer">
              <div className="notes-section">
                <textarea
                  placeholder="Add notes here..."
                  value={checklist.notes}
                  onChange={(e) => handleInputChange(checklist.id, 'notes', e.target.value)}
                />
              </div>
              <div className="action-buttons">
                <button
                  className="edit-button"
                  onClick={() => handleEditChecklist(checklist.id)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} /> {checklist.isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteChecklist(checklist.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                <button
                  className="reset-button"
                  onClick={() => handleResetChecklist(checklist.id)}
                >
                  <FontAwesomeIcon icon={faUndo} /> Reset
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklists; 