"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Col, Input, Row, InputGroup, InputGroupText } from "reactstrap"
import { CustomButton, TextInput } from "../../components/UI"
import Switch from "react-switch"
import { apiURL, _postApi } from "../../redux/action/api"
import { useDispatch, useSelector } from "react-redux"
import _customNotification from "../../components/UI/_customNotification"
import { useToasts } from "react-toast-notifications"
import { ACTIVEBUSINESS } from "../../redux/action/actionType"
import {
  Camera,
  Edit3,
  Eye,
  Save,
  Upload,
  Store,
  MapPin,
  User,
  Mail,
  Link as LinkIcon,
  Bell,
  Shield,
  FileText,
  Settings,
  Globe,
} from "lucide-react"

import './store-setup.css'


export default function StoreSetup() {
  const [loading, setLoading] = useState(false)
  const [subLoading, setSubtLoading] = useState(false)
  const [state, setState] = useState(false)
  const [edit, setEdit] = useState(null)
  const { user, activeBusiness } = useSelector((s) => s.auth)
  const { addToast } = useToasts()
  const [form, setForm] = useState(activeBusiness)
  const dispatch = useDispatch()

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }))
  }

  const [image, setImage] = useState()

  function handleImage(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(file)
      setState(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const fields = [
    {
      label: "Pharmacy Name",
      name: "pharmacy_name",
      value: form.pharmacy_name,
      col: 6,
      disabled: edit ? false : true,
      icon: Store,
    },
    {
      label: "State of Practice",
      name: "state_of_practice",
      value: form.state_of_practice,
      col: 6,
      disabled: edit ? false : true,
      icon: MapPin,
    },
    {
      label: "Pharmacy Address",
      name: "pharmacy_address",
      value: form.pharmacy_address,
      col: 6,
      disabled: edit ? false : true,
      icon: MapPin,
    },
    {
      label: "Residence Name",
      name: "residance_name",
      value: form.residance_name,
      col: 6,
      disabled: edit ? false : true,
      icon: User,
    },
  ]

  const uploadLogo = () => {
    setLoading(true)
    const data = new FormData()
    data.append("image", image)
    data.append("state", state)
    Object.keys(form).forEach((i) => data.append(i, form[i]))

    fetch(`${apiURL}/pharmacy/v1/update-bussiness?facilityId=${user.facilityId}`, {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          _customNotification(addToast, "Logo successfully uploaded", "success")
          setLoading(false)
          dispatch({
            type: ACTIVEBUSINESS,
            payload: { ...activeBusiness, pharmacy_logo: data.filename },
          })
        }
      })
      .catch((err) => {
        alert("An Error Occurred")
        setLoading(false)
      })
  }

  const handleSubmit = () => {
    setSubtLoading(true)
    _postApi(
      `/pharmacy/v1/update-biz-profile?facilityId=${user.facilityId}`,
      form,
      (data) => {
        if (data.success) {
          _customNotification(addToast, "Successfully updated", "success")
          setSubtLoading(false)
          dispatch({
            type: ACTIVEBUSINESS,
            payload: form,
          })
        } else {
          _customNotification(addToast, "Error occurred", "warning")
          setSubtLoading(false)
        }
      },
      (err) => {
        alert("An Error Occurred")
        console.log(err)
        setSubtLoading(false)
      },
    )
  }

  return (
    <div className="store-setup-container">
      {/* Header Section */}
      <div className="setup-header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="header-title">
              <Settings size={24} />
              Store Setup & Configuration
            </h1>
            <p className="header-subtitle">Manage your pharmacy profile and business settings</p>
          </div>
          <div className="header-actions">
            <CustomButton
              size="sm"
              outline={!edit}
              color={edit ? "success" : "primary"}
              onClick={() => setEdit(!edit)}
              className="edit-toggle-btn"
            >
              {edit ? (
                <>
                  <Eye size={16} />
                  Switch to Read-only
                </>
              ) : (
                <>
                  <Edit3 size={16} />
                  Enable Editing
                </>
              )}
            </CustomButton>
          </div>
        </div>
      </div>

      <Row className="setup-content">
        {/* Logo Upload Section */}
        <Col lg={4} md={6} className="mb-4">
          <div className="logo-upload-card">
            <div className="card-header">
              <h5 className="card-title">
                <Camera size={18} />
                Pharmacy Logo
              </h5>
              <p className="card-subtitle">Upload your pharmacy logo (JPG, PNG)</p>
            </div>

            <div className="logo-upload-area">
              <div className="logo-preview">
                <label htmlFor="newProfilePhoto" className="upload-trigger">
                  {state ? (
                    <img src={state || "/placeholder.svg"} alt="Preview" className="logo-image" />
                  ) : (
                    <img
                      src={activeBusiness.pharmacy_logo || "/placeholder.svg?height=150&width=190"}
                      alt="Current Logo"
                      className="logo-image"
                    />
                  )}
                  <div className="upload-overlay">
                    <Upload size={24} />
                    <span>Click to upload</span>
                  </div>
                </label>
                <input
                  type="file"
                  name="profile_pic"
                  id="newProfilePhoto"
                  style={{ display: "none" }}
                  onChange={handleImage}
                  accept="image/jpg, image/png"
                />
              </div>

              <div className="upload-actions">
                <CustomButton
                  loading={loading}
                  onClick={uploadLogo}
                  disabled={!image}
                  color="primary"
                  className="upload-btn"
                >
                  <Upload size={16} />
                  Upload Logo
                </CustomButton>
              </div>
            </div>
          </div>
        </Col>

        {/* Basic Information */}
        <Col lg={8} md={6} className="mb-4">
          <div className="info-card">
            <div className="card-header">
              <h5 className="card-title">
                <Store size={18} />
                Basic Information
              </h5>
              <p className="card-subtitle">Essential pharmacy details and location</p>
            </div>

            <div className="form-grid">
              {fields.map((field, index) => (
                <div key={index} className={`form-group col-${field.col}`}>
                  <label className="form-label">
                    <field.icon size={16} />
                    {field.label}
                  </label>
                  <TextInput
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    disabled={field.disabled}
                    className="modern-input"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Settings Section */}
      <Row>
        <Col lg={6} className="mb-4">
          <div className="settings-card">
            <div className="card-header">
              <h5 className="card-title">
                <Globe size={18} />
                Store Visibility & Access
              </h5>
              <p className="card-subtitle">Control how your store appears online</p>
            </div>

            <div className="settings-list">
              {/* Online Store Listing */}
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon online">
                    <Globe size={20} />
                  </div>
                  <div className="setting-details">
                    <h6>Online Store Listing</h6>
                    <p>Make your pharmacy discoverable in online directories</p>
                  </div>
                </div>
                <div className="setting-control">
                  <Switch
                    disabled={!edit}
                    checked={form.outline_store_listing}
                    onChange={() => alert("Coming soon")}
                    onColor="#007BFF"
                    offColor="#E5E7EB"
                    height={24}
                    width={48}
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </div>
              </div>

              {/* Dedicated Link */}
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon link">
                    <Link size={20} />
                  </div>
                  <div className="setting-details">
                    <h6>Enable Dedicated Link</h6>
                    <p>Create a custom URL for your pharmacy</p>
                  </div>
                </div>
                <div className="setting-control">
                  <Switch
                    checked={form.enable_delicate_link}
                    disabled={!edit}
                    onChange={() => alert("Coming soon")}
                    onColor="#007BFF"
                    offColor="#E5E7EB"
                    height={24}
                    width={48}
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </div>
              </div>

              {form.enable_delicate_link && (
                <div className="url-input-section">
                  <label className="form-label">Custom Store URL</label>
                  <InputGroup className="url-input-group">
                    <InputGroupText className="url-prefix">
                      <Globe size={16} />
                      https://pharmacy.MyLikitaHealth.com/
                    </InputGroupText>
                    <Input
                      name="store_id"
                      value={form.store_id?.split(" ").join("-").toLowerCase() || ""}
                      onChange={() => alert("Coming soon")}
                      placeholder="your-store-name"
                      className="url-input"
                    />
                  </InputGroup>
                </div>
              )}
            </div>
          </div>
        </Col>

        <Col lg={6} className="mb-4">
          <div className="settings-card">
            <div className="card-header">
              <h5 className="card-title">
                <Bell size={18} />
                Notifications & Communication
              </h5>
              <p className="card-subtitle">Manage how you receive updates</p>
            </div>

            <div className="settings-list">
              {/* Email Notifications */}
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon email">
                    <Mail size={20} />
                  </div>
                  <div className="setting-details">
                    <h6>Email Notifications</h6>
                    <p>Receive important updates via email</p>
                  </div>
                </div>
                <div className="setting-control">
                  <Switch
                    disabled={!edit}
                    checked={form.enable_Email_notification}
                    onChange={() => alert("Coming soon")}
                    onColor="#007BFF"
                    offColor="#E5E7EB"
                    height={24}
                    width={48}
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </div>
              </div>

              {form.enable_Email_notification && (
                <div className="email-input-section">
                  <label className="form-label">
                    <Mail size={16} />
                    Notification Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="modern-input"
                    disabled={!edit}
                  />
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* License Information */}
      <Row>
        <Col lg={12} className="mb-4">
          <div className="license-card">
            <div className="card-header">
              <h5 className="card-title">
                <Shield size={18} />
                License & Professional Information
              </h5>
              <p className="card-subtitle">Professional credentials and licensing details</p>
            </div>

            <div className="license-form">
              <Row>
                <Col md={6} className="mb-3">
                  <label className="form-label">
                    <User size={16} />
                    Pharmacist Name
                  </label>
                  <TextInput
                    name="pharmacist_name"
                    value={form.pharmacist_name || ""}
                    onChange={handleChange}
                    disabled={!edit}
                    className="modern-input"
                    placeholder="Enter pharmacist name"
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <label className="form-label">
                    <Shield size={16} />
                    PCN Registration Number
                  </label>
                  <TextInput
                    name="pcn_number"
                    value={form.pcn_number || ""}
                    onChange={handleChange}
                    disabled={!edit}
                    className="modern-input"
                    placeholder="Enter PCN registration number"
                  />
                </Col>

                <Col md={12} className="mb-3">
                  <label className="form-label">
                    <FileText size={16} />
                    Short Bio (Optional)
                  </label>
                  <TextInput
                    type="textarea"
                    name="short_bio"
                    value={form.short_bio || ""}
                    onChange={handleChange}
                    disabled={!edit}
                    className="modern-textarea"
                    placeholder="Tell us about your pharmacy and services..."
                    rows={4}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Action Buttons */}
      <div className="action-section">
        <div className="action-buttons">
          <CustomButton
            className="save-btn"
            loading={subLoading}
            onClick={handleSubmit}
            disabled={!edit}
            color="success"
            size="lg"
          >
            <Save size={18} />
            Save Changes
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
