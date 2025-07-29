"use client"

import { useEffect, useState, useCallback } from "react"
import { CustomTable } from "../../components/UI"
import CustomCard from "../../components/UI/CustomCard"
import { addNewPharmStore, getPharmStore, getPharmUsers } from "../../redux/action/pharmacy"
import { v4 as uuidV4 } from "uuid"
import { useDispatch, useSelector } from "react-redux"
import _customNotification from "../../components/UI/_customNotification"
import { useToasts } from "react-toast-notifications"
import CustomTypeahead from "../../components/UI/CustomTypeahead"
import Scrollbar from "../../components/UI/Scrollbar"
import {
  Store,
  MapPin,
  Phone,
  User,
  Building,
  Edit3,
  Plus,
  Save,
  RotateCcw,
  Package,
  ShoppingCart,
  Settings,
} from "lucide-react";


import "./ManageStore.css"

export default function ManageStore() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const dispatch = useDispatch()

  const initialState = {
    store_name: "",
    phone: "",
    address: "",
    location: "",
    storeType: "Sales",
    manage_by: "",
    store_code: uuidV4(),
    status: "insert",
  }

  const [form, setForm] = useState(initialState)
  const [selectedManager, setSelectedManager] = useState(null)

  const pharmStore = useSelector((state) => state.pharmacy.pharmStore)
  const _loading = useSelector((state) => state.pharmacy.loading)
  const pharmUsers = useSelector((state) => state.pharmacy.pharmUsers)
  const { addToast } = useToasts()

  const fields = [
    {
      label: "Store Name",
      name: "store_name",
      required: true,
      value: form.store_name,
      icon: Store,
      placeholder: "Enter store name",
    },
    {
      label: "Phone Number",
      name: "phone",
      value: form.phone,
      icon: Phone,
      placeholder: "Enter phone number (optional)",
      type: "tel",
    },
    {
      label: "Store Location",
      name: "location",
      value: form.location,
      icon: MapPin,
      placeholder: "Enter store location",
    },
    {
      label: "Address",
      type: "textarea",
      required: true,
      name: "address",
      value: form.address,
      icon: Building,
      placeholder: "Enter complete store address",
      rows: 3,
    },
    {
      label: "Store Type",
      type: "select",
      required: true,
      name: "storeType",
      options: [
        { value: "Sales", label: "Sales Store", icon: ShoppingCart },
        { value: "Store", label: "Warehouse Store", icon: Package },
      ],
      value: form.storeType,
      icon: Building,
    },
  ]

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({
      ...p,
      [name]: value,
    }))
  }

  const handleManagerChange = (selected) => {
    if (selected.length) {
      setSelectedManager(selected[0])
      setForm((p) => ({
        ...p,
        manage_by: selected[0].username,
      }))
    } else {
      setSelectedManager(null)
      setForm((p) => ({
        ...p,
        manage_by: "",
      }))
    }
  }

  const handleReset = () => {
    setForm({ ...initialState, store_code: uuidV4() })
    setSelectedManager(null)
  }

  const validateForm = () => {
    const errors = []
    if (!form.store_name.trim()) errors.push("Store name is required")
    if (!form.address.trim()) errors.push("Address is required")
    if (!form.manage_by.trim()) errors.push("Manager selection is required")
    return errors
  }

  const handleSubmit = () => {
    const errors = validateForm()
    if (errors.length > 0) {
      _customNotification(addToast, errors.join(", "), "warning")
      return
    }

    setLoading(true)
    addNewPharmStore(
      form,
      (res) => {
        if (res) {
          setLoading(false)
          _customNotification(
            addToast,
            `Store ${form.status === "update" ? "updated" : "created"} successfully!`,
            "success",
          )
          handleReset()
          _getPharmStore()
          setActiveTab("list")
        }
      },
      (err) => {
        _customNotification(addToast, "An error occurred. Please try again.", "error")
        setLoading(false)
        console.log(err)
      },
    )
  }

  const _getPharmStore = useCallback(() => {
    dispatch(getPharmStore())
    dispatch(getPharmUsers())
  }, [dispatch])

  useEffect(() => {
    _getPharmStore()
  }, [_getPharmStore])

  const handleEdit = (store) => {
    setForm((p) => ({ ...p, ...store, status: "update" }))
    const manager = pharmUsers.find((user) => user.username === store.manage_by)
    if (manager) {
      setSelectedManager(manager)
    }
    setActiveTab("form")
  }

  const getStoreTypeIcon = (type) => {
    return type === "Sales" ? ShoppingCart : Package
  }

  const getStoreTypeColor = (type) => {
    return type === "Sales" ? "sales" : "warehouse"
  }

  const tblfields = [
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
          <Store size={16} />
          <span>Store Details</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="store-details-cell">
          <div className="store-icon">
            <div className="store-icon-circle">
              <Store size={16} />
            </div>
          </div>
          <div className="store-info">
            <div className="store-name">{item.store_name}</div>
            <div className="store-code">Code: {item.store_code}</div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="table-header-with-icon">
          <MapPin size={16} />
          <span>Location</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="location-cell">
          <div className="location-info">
            <div className="location-name">{item.location || "Not specified"}</div>
            <div className="location-address">{item.address}</div>
          </div>
        </div>
      ),
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
    },
    {
      title: (
        <div className="table-header-with-icon">
          <Building size={16} />
          <span>Type</span>
        </div>
      ),
      custom: true,
      component: (item) => {
        const Icon = getStoreTypeIcon(item.storeType)
        return (
          <div className="store-type-cell">
            <div className={`store-type-badge ${getStoreTypeColor(item.storeType)}`}>
              <Icon size={14} />
              <span>{item.storeType}</span>
            </div>
          </div>
        )
      },
    },
    {
      title: (
        <div className="table-header-with-icon">
          <User size={16} />
          <span>Manager</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="manager-cell">
          <div className="manager-info">
            <User size={14} />
            <span>{item.manage_by || "Not assigned"}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      custom: true,
      component: (item) => (
        <div className="action-buttons">
          <button className="action-btn edit-btn" onClick={() => handleEdit(item)} title="Edit Store">
            <Edit3 size={14} />
          </button>
        </div>
      ),
      className: "text-center",
      width: "100px",
    },
  ]

  return (
    <div className="manage-store-page">
      <StoreWrapper>
        {/* Header Section */}
        <div className="store-header">
          <div className="header-left">
            <div className="page-title">
              <div className="title-icon">
                <Store size={24} />
              </div>
              <div className="title-content">
                <h1>Store Management</h1>
                <p>Create and manage your pharmacy store locations</p>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="header-stats">
              <div className="stat-item">
                <div className="stat-icon sales">
                  <ShoppingCart size={16} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">
                    {pharmStore?.filter((store) => store.storeType === "Sales").length || 0}
                  </span>
                  <span className="stat-label">Sales Stores</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon warehouse">
                  <Package size={16} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">
                    {pharmStore?.filter((store) => store.storeType === "Store").length || 0}
                  </span>
                  <span className="stat-label">Warehouses</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button className={`tab-btn ${activeTab === "form" ? "active" : ""}`} onClick={() => setActiveTab("form")}>
            <Plus size={16} />
            <span>{form.status === "update" ? "Edit Store" : "Create Store"}</span>
          </button>
          <button className={`tab-btn ${activeTab === "list" ? "active" : ""}`} onClick={() => setActiveTab("list")}>
            <Store size={16} />
            <span>Store List ({pharmStore?.length || 0})</span>
          </button>
        </div>

        {/* Form Tab */}
        {activeTab === "form" && (
          <div className="form-section">
            <div className="form-container">
              <div className="form-header">
                <div className="form-title">
                  <div className="form-title-icon">
                    {form.status === "update" ? <Edit3 size={20} /> : <Plus size={20} />}
                  </div>
                  <div>
                    <h3>{form.status === "update" ? "Edit Store" : "Create New Store"}</h3>
                    <p>
                      {form.status === "update"
                        ? "Update store information and settings"
                        : "Add a new store location to your pharmacy network"}
                    </p>
                  </div>
                </div>
                {form.status === "update" && (
                  <div className="form-status">
                    <div className="status-badge editing">
                      <Edit3 size={14} />
                      <span>Editing Mode</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-content">
                <div className="form-grid">
                  {/* Basic Information */}
                  <div className="form-section-group">
                    <div className="section-header">
                      <div className="section-icon">
                        <Store size={18} />
                      </div>
                      <div className="section-title">
                        <h4>Basic Information</h4>
                        <p>Essential store details</p>
                      </div>
                    </div>

                    <div className="form-fields">
                      {fields.slice(0, 2).map((field, index) => (
                        <div key={index} className="form-group">
                          <label className="form-label">
                            <field.icon size={16} />
                            <span>
                              {field.label}
                              {field.required && <span className="required">*</span>}
                            </span>
                          </label>
                          <input
                            type={field.type || "text"}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="form-input"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="form-section-group">
                    <div className="section-header">
                      <div className="section-icon">
                        <MapPin size={18} />
                      </div>
                      <div className="section-title">
                        <h4>Location Details</h4>
                        <p>Store location and address</p>
                      </div>
                    </div>

                    <div className="form-fields">
                      <div className="form-group">
                        <label className="form-label">
                          <MapPin size={16} />
                          <span>Store Location</span>
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="Enter store location"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <Building size={16} />
                          <span>
                            Address<span className="required">*</span>
                          </span>
                        </label>
                        <textarea
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Enter complete store address"
                          required
                          rows={3}
                          className="form-input form-textarea"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Store Configuration */}
                  <div className="form-section-group full-width">
                    <div className="section-header">
                      <div className="section-icon">
                        <Settings size={18} />
                      </div>
                      <div className="section-title">
                        <h4>Store Configuration</h4>
                        <p>Store type and management settings</p>
                      </div>
                    </div>

                    <div className="form-fields">
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">
                            <Building size={16} />
                            <span>
                              Store Type<span className="required">*</span>
                            </span>
                          </label>
                          <select
                            name="storeType"
                            value={form.storeType}
                            onChange={handleChange}
                            required
                            className="form-select"
                          >
                            <option value="Sales">
                              <ShoppingCart size={14} /> Sales Store
                            </option>
                            <option value="Store">
                              <Package size={14} /> Warehouse Store
                            </option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <User size={16} />
                            <span>
                              Store Manager<span className="required">*</span>
                            </span>
                          </label>
                          <div className="manager-select">
                            <CustomTypeahead
                              label=""
                              labelKey="username"
                              options={pharmUsers || []}
                              clearButton
                              selected={selectedManager ? [selectedManager] : []}
                              onChange={handleManagerChange}
                              placeholder="Select store manager"
                              className="manager-typeahead"
                            />
                          </div>
                        </div>
                      </div>

                      {form.store_code && (
                        <div className="form-group">
                          <label className="form-label">
                            <Settings size={16} />
                            <span>Store Code</span>
                          </label>
                          <div className="store-code-display">
                            <code>{form.store_code}</code>
                            <span className="code-info">Auto-generated unique identifier</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={handleReset} disabled={loading}>
                    <RotateCcw size={16} />
                    <span>Reset Form</span>
                  </button>

                  <button type="button" className="btn-primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                      <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <span>{form.status === "update" ? "Updating..." : "Creating..."}</span>
                      </div>
                    ) : (
                      <div className="button-content">
                        <Save size={16} />
                        <span>{form.status === "update" ? "Update Store" : "Create Store"}</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List Tab */}
        {activeTab === "list" && (
          <div className="list-section">
            <div className="list-header">
              <div className="list-title">
                <h3>Store Locations</h3>
                <p>Manage all your pharmacy store locations</p>
              </div>
              <button className="create-store-btn" onClick={() => setActiveTab("form")}>
                <Plus size={16} />
                <span>Add New Store</span>
              </button>
            </div>

            {_loading && (
              <div className="loading-overlay">
                <div className="loading-content">
                  <div className="loading-spinner"></div>
                  <span>Loading stores...</span>
                </div>
              </div>
            )}

            <div className="table-container">
              {pharmStore && pharmStore.length > 0 ? (
                <Scrollbar height="calc(100vh - 500px)">
                  <CustomTable fields={tblfields} data={pharmStore} className="modern-table" />
                </Scrollbar>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Store size={48} />
                  </div>
                  <h3>No Stores Found</h3>
                  <p>You haven't created any store locations yet. Get started by adding your first store.</p>
                  <button className="create-store-btn" onClick={() => setActiveTab("form")}>
                    <Plus size={16} />
                    <span>Create First Store</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </StoreWrapper>
    </div>
  )
}

// Enhanced StoreWrapper
export const StoreWrapper = (props) => {
  return (
    <div className="store-wrapper">
      {/* <CustomCard className="store-card" full_width> */}
        {props.children}
      {/* </CustomCard> */}
    </div>
  )
}
