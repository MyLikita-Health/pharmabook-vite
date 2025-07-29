"use client"

import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Badge } from "reactstrap"
import { CustomTable } from "../../../components/UI"
import CustomCard from "../../../components/UI/CustomCard"
import { useNavigate } from "react-router-dom"
import { deletePharmUsers, getPharmUsers } from "../../../redux/action/pharmacy"
import Scrollbar from "../../../components/UI/Scrollbar"
import { SELECTED_USER } from "../../../redux/action/actionType"
import {
  Users as UsersIcon,
  Search,
  Edit3,
  Trash2,
  Filter,
  Download,
  RefreshCw,
  UserPlus,
  Phone,
  Mail,
  Shield,
  MoreVertical,
} from "react-feather"
import "./Users.css"

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [sortBy, setSortBy] = useState("username")
  const [sortOrder, setSortOrder] = useState("asc")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const pharmUsers = useSelector((state) => state.pharmacy.pharmUsers)
  const loading = useSelector((state) => state.pharmacy.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const _getPharmUsers = useCallback(() => {
    dispatch(getPharmUsers("select"))
  }, [dispatch])

  const handleSearchTermChange = (value) => {
    setSearchTerm(value)
  }

  const handleDelete = useCallback(
    (userId) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(deletePharmUsers(userId))
      }
    },
    [dispatch],
  )

  const handleBulkDelete = () => {
    if (selectedUsers.length > 0 && window.confirm(`Delete ${selectedUsers.length} selected users?`)) {
      selectedUsers.forEach((userId) => {
        dispatch(deletePharmUsers(userId))
      })
      setSelectedUsers([])
    }
  }

  const handleRefresh = () => {
    _getPharmUsers()
  }

  const handleCreateAgent = () => {
    navigate("/app/pharmacy/create-agent?name=Create agents&type=Store Setup&disabled=false")
  }

  const handleEditUser = (user) => {
    navigate(`/app/pharmacy/create-agent?name=Create agents&type=Store Setup&disabled=false&id=${user.id}`)
    dispatch({ type: SELECTED_USER, payload: user })
  }

  useEffect(() => _getPharmUsers(), [_getPharmUsers])

  // Enhanced fields with better styling
  const fields = [
    {
      title: (
        <div className="table-header-checkbox">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={selectedUsers.length === pharmUsers?.length && pharmUsers?.length > 0}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedUsers(pharmUsers?.map((user) => user.id) || [])
              } else {
                setSelectedUsers([])
              }
            }}
          />
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="table-checkbox">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={selectedUsers.includes(item.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedUsers([...selectedUsers, item.id])
              } else {
                setSelectedUsers(selectedUsers.filter((id) => id !== item.id))
              }
            }}
          />
        </div>
      ),
      className: "text-center",
      width: "50px",
    },
    {
      title: "S/N",
      custom: true,
      component: (item, idx) => (
        <div className="serial-number">
          <span className="serial-badge">{idx + 1}</span>
        </div>
      ),
      className: "text-center",
      width: "80px",
    },
    {
      title: (
        <div className="table-header-with-icon">
          <UsersIcon size={16} />
          <span>User Details</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="user-details-cell">
          <div className="user-avatar">
            <div className="avatar-circle">
              <UsersIcon size={16} />
            </div>
          </div>
          <div className="user-info">
            <div className="user-name">{item.username}</div>
            <div className="user-meta">
              {item.email && (
                <div className="user-email">
                  <Mail size={12} />
                  <span>{item.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      sortable: true,
      sortKey: "username",
    },
    {
      title: (
        <div className="table-header-with-icon">
          <Phone size={16} />
          <span>Contact</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="contact-cell">
          {item.phone ? (
            <div className="phone-number">
              <Phone size={14} />
              <span>{item.phone}</span>
            </div>
          ) : (
            <span className="no-data">No phone</span>
          )}
        </div>
      ),
      sortable: true,
      sortKey: "phone",
    },
    {
      title: (
        <div className="table-header-with-icon">
          <Shield size={16} />
          <span>Role</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="role-cell">
          <Badge className={`role-badge role-${item.role?.toLowerCase().replace(/\s+/g, "-")}`}>
            <Shield size={12} />
            <span>{item.role || "User"}</span>
          </Badge>
        </div>
      ),
      sortable: true,
      sortKey: "role",
    },
    {
      title: "Actions",
      custom: true,
      className: "text-center",
      component: (item) => (
        <div className="action-buttons">
          <button className="action-btn edit-btn" onClick={() => handleEditUser(item)} title="Edit User">
            <Edit3 size={14} />
          </button>
          <button className="action-btn delete-btn" onClick={() => handleDelete(item.id)} title="Delete User">
            <Trash2 size={14} />
          </button>
          <button className="action-btn more-btn" title="More Options">
            <MoreVertical size={14} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ]

  // Filter and sort data
  let filteredRows = []
  if (pharmUsers && pharmUsers.length) {
    filteredRows = pharmUsers.filter((user) => {
      const matchesSearch =
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = filterRole === "all" || user.role?.toLowerCase() === filterRole.toLowerCase()

      return matchesSearch && matchesRole
    })

    // Sort data
    filteredRows.sort((a, b) => {
      const aValue = a[sortBy]?.toString().toLowerCase() || ""
      const bValue = b[sortBy]?.toString().toLowerCase() || ""

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }

  const uniqueRoles = [...new Set(pharmUsers?.map((user) => user.role).filter(Boolean))]

  return (
    <div className="users-page">
      <UserWrapper>
        {/* Header Section */}
        <div className="users-header">
          <div className="header-left">
            <div className="page-title">
              <div className="title-icon">
                <UsersIcon size={24} />
              </div>
              <div className="title-content">
                <h1>User Management</h1>
                <p>Manage pharmacy staff and user accounts</p>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-label">Total Users</span>
                <span className="stat-value">{filteredRows.length}</span>
              </div>
              {selectedUsers.length > 0 && (
                <div className="stat-item selected">
                  <span className="stat-label">Selected</span>
                  <span className="stat-value">{selectedUsers.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="action-bar">
          <div className="action-left">
            <div className="search-section">
              <div className="search-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search users by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => handleSearchTermChange(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <button
              className={`filter-toggle ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filters</span>
              {filterRole !== "all" && <div className="filter-indicator"></div>}
            </button>
          </div>

          <div className="action-right">
            {selectedUsers.length > 0 && (
              <button className="bulk-action-btn delete" onClick={handleBulkDelete}>
                <Trash2 size={16} />
                <span>Delete Selected ({selectedUsers.length})</span>
              </button>
            )}

            <button className="action-btn-secondary" onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={16} className={loading ? "spinning" : ""} />
              <span>Refresh</span>
            </button>

            <button className="action-btn-secondary">
              <Download size={16} />
              <span>Export</span>
            </button>

            <button className="create-agent-btn" onClick={handleCreateAgent}>
              <UserPlus size={16} />
              <span>Create Agent</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label className="filter-label">Role</label>
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="filter-select">
                <option value="all">All Roles</option>
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                <option value="username">Username</option>
                <option value="phone">Phone</option>
                <option value="role">Role</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Order</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="filter-select">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <button
              className="clear-filters-btn"
              onClick={() => {
                setFilterRole("all")
                setSortBy("username")
                setSortOrder("asc")
                setSearchTerm("")
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <span>Loading users...</span>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="table-section">
          {filteredRows.length === 0 && !loading ? (
            <div className="empty-state">
              <div className="empty-icon">
                <UsersIcon size={48} />
              </div>
              <h3>No Users Found</h3>
              <p>
                {searchTerm || filterRole !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first agent"}
              </p>
              <button className="create-agent-btn" onClick={handleCreateAgent}>
                <UserPlus size={16} />
                <span>Create First Agent</span>
              </button>
            </div>
          ) : (
            <Scrollbar height="calc(100vh - 400px)">
              <div className="table-container">
                <CustomTable fields={fields} data={filteredRows} className="modern-table" />
              </div>
            </Scrollbar>
          )}
        </div>
      </UserWrapper>
    </div>
  )
}

// Enhanced UserWrapper
export const UserWrapper = (props) => {
  return (
    <div className="user-wrapper mt-5 ">
      {/* <CustomCard className="user-card" full_width> */}
        {props.children}
      {/* </CustomCard> */}
    </div>
  )
}
