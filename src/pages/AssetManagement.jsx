import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxes,
  faSearch,
  faFilter,
  faPlus,
  faLocationDot,
  faTools,
  faCheckCircle,
  faUserCog,
  faEdit,
  faTrash,
  faClock,
  faBuilding,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import './AssetManagement.css';

const AssetManagement = () => {
  const location = useLocation();
  const [assets, setAssets] = useState(() => {
    const savedAssets = localStorage.getItem('assets');
    if (savedAssets) {
      return JSON.parse(savedAssets);
    }
    return [
      {
        id: 'FCM001',
        name: 'Floor Cleaning Machine',
        type: 'Cleaning Equipment',
        location: 'Emergency Wing',
        condition: 'In Use',
        assignedTo: 'Emergency Team',
        maintenanceSchedule: '2024-04-15',
        lastMaintenance: '2024-01-15',
        status: 'operational',
        notes: 'Regular maintenance required every 3 months'
      },
      {
        id: 'FCM002',
        name: 'Floor Cleaning Machine',
        type: 'Cleaning Equipment',
        location: 'Maintenance Bay',
        condition: 'Under Maintenance',
        assignedTo: 'Maintenance Team',
        maintenanceSchedule: '2024-03-20',
        lastMaintenance: '2023-12-20',
        status: 'maintenance',
        notes: 'Belt replacement needed'
      },
      {
        id: 'FCM003',
        name: 'Floor Cleaning Machine',
        type: 'Cleaning Equipment',
        location: 'Maintenance Bay',
        condition: 'Under Maintenance',
        assignedTo: 'Maintenance Team',
        maintenanceSchedule: '2024-03-25',
        lastMaintenance: '2023-12-25',
        status: 'maintenance',
        notes: 'Motor inspection ongoing'
      },
      {
        id: 'FCM004',
        name: 'Floor Cleaning Machine',
        type: 'Cleaning Equipment',
        location: 'Storage Room A',
        condition: 'Available',
        assignedTo: 'Unassigned',
        maintenanceSchedule: '2024-05-10',
        lastMaintenance: '2024-02-10',
        status: 'available',
        notes: 'Ready for use'
      },
      {
        id: 'FCM005',
        name: 'Floor Cleaning Machine',
        type: 'Cleaning Equipment',
        location: 'Storage Room A',
        condition: 'Available',
        assignedTo: 'Unassigned',
        maintenanceSchedule: '2024-05-15',
        lastMaintenance: '2024-02-15',
        status: 'available',
        notes: 'Ready for use'
      }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  useEffect(() => {
    localStorage.setItem('assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('addAsset') === 'true') {
      setShowAddModal(true);
      // Clear the query parameter
      window.history.replaceState({}, '', location.pathname);
    }
  }, [location]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return '#22c55e';
      case 'maintenance':
        return '#f59e0b';
      case 'repair':
        return '#ef4444';
      case 'available':
        return '#3b82f6';
      default:
        return '#64748b';
    }
  };

  const getAssetStatistics = () => {
    const total = assets.length;
    const operational = assets.filter(a => a.status === 'operational').length;
    const maintenance = assets.filter(a => a.status === 'maintenance').length;
    const available = assets.filter(a => a.status === 'available').length;

    return { total, operational, maintenance, available };
  };

  const stats = getAssetStatistics();

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || asset.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteAsset = (assetId) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      setAssets(prevAssets => prevAssets.filter(a => a.id !== assetId));
    }
  };

  const handleSubmitAsset = (formData) => {
    if (editingAsset) {
      setAssets(prevAssets =>
        prevAssets.map(a => a.id === editingAsset.id ? { ...formData, id: editingAsset.id } : a)
      );
      setEditingAsset(null);
    } else {
      setAssets(prevAssets => [...prevAssets, {
        ...formData,
        id: 'AST' + Date.now().toString().slice(-6)
      }]);
      setShowAddModal(false);
    }
  };

  return (
    <div className="asset-management-container">
      <div className="page-header">
        <div className="header-content">
          <h2>
            <FontAwesomeIcon icon={faCog} />
            Asset Management Dashboard
          </h2>
          <p className="header-subtitle">Monitor your asset performance and analytics</p>
        </div>
        <button className="add-asset-button" onClick={() => setShowAddModal(true)}>
          <FontAwesomeIcon icon={faPlus} /> 
          <span>Add New Asset</span>
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">
            <FontAwesomeIcon icon={faBoxes} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Assets</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon operational">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div className="stat-info">
            <span className="stat-label">In Use</span>
            <span className="stat-value">{stats.operational}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon maintenance">
            <FontAwesomeIcon icon={faTools} />
          </div>
          <div className="stat-info">
            <span className="stat-label">In Maintenance</span>
            <span className="stat-value">{stats.maintenance}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon available">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Available</span>
            <span className="stat-value">{stats.available}</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, location, or assignment..."
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
            <option value="operational">In Use</option>
            <option value="maintenance">In Maintenance</option>
            <option value="available">Available</option>
          </select>
        </div>
      </div>

      <div className="assets-grid">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="asset-card">
            <div className="asset-header">
              <h3>{asset.name}</h3>
              <div 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(asset.status) }}
              >
                {asset.condition}
              </div>
            </div>

            <div className="asset-details">
              <div className="detail-item">
                <FontAwesomeIcon icon={faBoxes} />
                <span>ID: {asset.id}</span>
              </div>
              <div className="detail-item">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{asset.location}</span>
              </div>
              <div className="detail-item">
                <FontAwesomeIcon icon={faUserCog} />
                <span>{asset.assignedTo}</span>
              </div>
              <div className="detail-item">
                <FontAwesomeIcon icon={faClock} />
                <span>Next Maintenance: {new Date(asset.maintenanceSchedule).toLocaleDateString()}</span>
              </div>
            </div>

            {asset.notes && (
              <div className="asset-notes">
                <p>{asset.notes}</p>
              </div>
            )}

            <div className="asset-actions">
              <button
                className="edit-button"
                onClick={() => setEditingAsset(asset)}
              >
                <FontAwesomeIcon icon={faEdit} />
                <span>Edit</span>
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteAsset(asset.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {(showAddModal || editingAsset) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingAsset ? 'Edit Asset' : 'Add New Asset'}</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingAsset(null);
                }}
              >
                ×
              </button>
            </div>
            <AssetForm
              asset={editingAsset}
              onSubmit={handleSubmitAsset}
              onCancel={() => {
                setShowAddModal(false);
                setEditingAsset(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const AssetForm = ({ asset, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    asset || {
      name: '',
      type: '',
      location: '',
      condition: 'Available',
      assignedTo: 'Unassigned',
      maintenanceSchedule: new Date().toISOString().split('T')[0],
      lastMaintenance: new Date().toISOString().split('T')[0],
      status: 'available',
      notes: ''
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="asset-form">
      <div className="form-grid">
        <div className="input-group">
          <label htmlFor="name">Asset Name *</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="type">Type *</label>
          <input
            id="type"
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="location">Location *</label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="condition">Condition *</label>
          <select
            id="condition"
            value={formData.condition}
            onChange={(e) => {
              const condition = e.target.value;
              let status = 'available';
              if (condition === 'In Use') status = 'operational';
              if (condition === 'Under Maintenance') status = 'maintenance';
              if (condition === 'Needs Repair') status = 'repair';
              setFormData({ ...formData, condition, status });
            }}
            required
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Needs Repair">Needs Repair</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="assignedTo">Assigned To</label>
          <input
            id="assignedTo"
            type="text"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label htmlFor="maintenanceSchedule">Next Maintenance Date *</label>
          <input
            id="maintenanceSchedule"
            type="date"
            value={formData.maintenanceSchedule}
            onChange={(e) => setFormData({ ...formData, maintenanceSchedule: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="lastMaintenance">Last Maintenance Date</label>
          <input
            id="lastMaintenance"
            type="date"
            value={formData.lastMaintenance}
            onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
          />
        </div>

        <div className="input-group full-width">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows="3"
            placeholder="Add any additional notes here..."
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-button">
          {asset ? 'Save Changes' : 'Add Asset'}
        </button>
      </div>
    </form>
  );
};

export default AssetManagement; 