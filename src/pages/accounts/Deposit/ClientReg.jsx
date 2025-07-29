"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToasts } from "react-toast-notifications"
import { Row, Col, Card, CardBody, CardHeader, InputGroup, InputGroupText } from "reactstrap"
import { CustomButton, TextInput } from "../../../components/UI"
import { generateReceiptNo } from "../../../components/UI/helpers"
import _customNotification from "../../../components/UI/_customNotification"
import { addNewClent } from "../../../redux/action/pharmacy"
import {
  User,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  CreditCard,
  Save,
  ArrowLeft,
  UserPlus,
  AlertCircle,
  CheckCircle,
  FileText,
} from "react-feather"
import './client-registration.css'

function ClientReg() {
  const [client, setClient] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    amount: 0,
    acct: "",
    description: "Opening Balance",
    credit_limit: 0,
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { addToast } = useToasts()

  const validateForm = () => {
    const newErrors = {}

    if (!client.name.trim()) {
      newErrors.name = "Customer name is required"
    }

    if (!client.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\d{10,15}$/.test(client.phoneNumber.replace(/\s+/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    if (client.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (client.credit_limit < 0) {
      newErrors.credit_limit = "Credit limit cannot be negative"
    }

    if (client.amount < 0) {
      newErrors.amount = "Opening balance cannot be negative"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormChange = ({ target: { name, value } }) => {
    setClient((p) => ({ ...p, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      _customNotification(addToast, "Please fix the errors in the form", "error")
      return
    }

    setLoading(true)
    generateReceiptNo((receiptDateSN, receiptSN) => {
      addNewClent(
        {
          ...client,
          receiptDateSN,
          receiptSN,
        },
        (res) => {
          if (res) {
            setLoading(false)
            _customNotification(addToast, "Client registered successfully!", "success")
            navigate(-1)
          }
        },
        (err) => {
          _customNotification(addToast, "Error occurred while registering client", "error")
          console.log(err)
          setLoading(false)
        },
      )
    })
  }

  return (
    <div className="client-registration-container">
      {/* Header Section */}
      <div className="registration-header">
        <Card className="header-card">
          <CardBody>
            <div className="header-content">
              <div className="header-main">
                <div className="header-icon">
                  <UserPlus size={28} />
                </div>
                <div className="header-text">
                  <h1 className="header-title">Client Registration</h1>
                  <p className="header-subtitle">Add a new client to your pharmacy system</p>
                </div>
              </div>
              <div className="header-actions">
                <CustomButton size="sm" outline onClick={() => navigate(-1)} className="back-btn">
                  <ArrowLeft size={16} />
                  Go Back
                </CustomButton>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Registration Form */}
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="registration-card">
            <CardHeader>
              <div className="card-header-content">
                <User size={20} />
                <h4 className="card-title">Client Information</h4>
                <span className="required-note">
                  <AlertCircle size={14} />
                  Fields marked with * are required
                </span>
              </div>
            </CardHeader>

            <CardBody>
              <div className="form-sections">
                {/* Personal Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <User size={18} />
                    <h5 className="section-title">Personal Information</h5>
                  </div>

                  <Row>
                    <Col md={6} className="mb-3">
                      <label className="form-label required">
                        <User size={16} />
                        Customer Name
                      </label>
                      <TextInput
                        name="name"
                        value={client.name}
                        onChange={handleFormChange}
                        placeholder="Enter customer full name"
                        className={`modern-input ${errors.name ? "error" : ""}`}
                      />
                      {errors.name && <div className="error-message">{errors.name}</div>}
                    </Col>

                    <Col md={6} className="mb-3">
                      <label className="form-label required">
                        <Phone size={16} />
                        Phone Number
                      </label>
                      <TextInput
                        name="phoneNumber"
                        value={client.phoneNumber}
                        onChange={handleFormChange}
                        placeholder="Enter phone number"
                        className={`modern-input ${errors.phoneNumber ? "error" : ""}`}
                      />
                      {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                    </Col>

                    <Col md={6} className="mb-3">
                      <label className="form-label">
                        <Mail size={16} />
                        Email Address
                      </label>
                      <TextInput
                        name="email"
                        type="email"
                        value={client.email}
                        onChange={handleFormChange}
                        placeholder="Enter email address (optional)"
                        className={`modern-input ${errors.email ? "error" : ""}`}
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                    </Col>

                    <Col md={6} className="mb-3">
                      <label className="form-label">
                        <MapPin size={16} />
                        Address
                      </label>
                      <TextInput
                        name="address"
                        value={client.address}
                        onChange={handleFormChange}
                        placeholder="Enter customer address"
                        className="modern-input"
                      />
                    </Col>
                  </Row>
                </div>

                {/* Financial Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <CreditCard size={18} />
                    <h5 className="section-title">Financial Information</h5>
                  </div>

                  <Row>
                    <Col md={6} className="mb-3">
                      <label className="form-label">
                        <DollarSign size={16} />
                        Opening Balance
                      </label>
                      <InputGroup className="modern-input-group">
                        <InputGroupText className="input-prefix">
                          <DollarSign size={16} />₦
                        </InputGroupText>
                        <TextInput
                          name="amount"
                          type="number"
                          value={client.amount}
                          onChange={handleFormChange}
                          placeholder="0.00"
                          className={`modern-input ${errors.amount ? "error" : ""}`}
                          min="0"
                          step="0.01"
                        />
                      </InputGroup>
                      {errors.amount && <div className="error-message">{errors.amount}</div>}
                      <small className="form-help">Initial balance for the customer account</small>
                    </Col>

                    <Col md={6} className="mb-3">
                      <label className="form-label">
                        <CreditCard size={16} />
                        Credit Limit
                      </label>
                      <InputGroup className="modern-input-group">
                        <InputGroupText className="input-prefix">
                          <CreditCard size={16} />₦
                        </InputGroupText>
                        <TextInput
                          name="credit_limit"
                          type="number"
                          value={client.credit_limit}
                          onChange={handleFormChange}
                          placeholder="0.00"
                          className={`modern-input ${errors.credit_limit ? "error" : ""}`}
                          min="0"
                          step="0.01"
                        />
                      </InputGroup>
                      {errors.credit_limit && <div className="error-message">{errors.credit_limit}</div>}
                      <small className="form-help">Maximum credit amount allowed for this customer</small>
                    </Col>
                  </Row>
                </div>

                {/* Additional Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <FileText size={18} />
                    <h5 className="section-title">Additional Information</h5>
                  </div>

                  <Row>
                    <Col md={12} className="mb-3">
                      <label className="form-label">
                        <FileText size={16} />
                        Description
                      </label>
                      <TextInput
                        name="description"
                        value={client.description}
                        onChange={handleFormChange}
                        placeholder="Enter description for opening balance"
                        className="modern-input"
                      />
                      <small className="form-help">Description for the opening balance transaction</small>
                    </Col>
                  </Row>
                </div>
              </div>

              {/* Form Summary */}
              <div className="form-summary">
                <div className="summary-card">
                  <div className="summary-header">
                    <CheckCircle size={18} />
                    <h6>Registration Summary</h6>
                  </div>
                  <div className="summary-content">
                    <div className="summary-item">
                      <span className="summary-label">Customer Name:</span>
                      <span className="summary-value">{client.name || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Opening Balance:</span>
                      <span className="summary-value">₦{Number(client.amount || 0).toLocaleString()}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Credit Limit:</span>
                      <span className="summary-value">₦{Number(client.credit_limit || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <CustomButton size="lg" outline onClick={() => navigate(-1)} className="cancel-btn" disabled={loading}>
                  <ArrowLeft size={18} />
                  Cancel
                </CustomButton>
                <CustomButton
                  size="lg"
                  color="primary"
                  loading={loading}
                  onClick={handleSubmit}
                  className="save-btn"
                  disabled={loading}
                >
                  <Save size={18} />
                  {loading ? "Registering..." : "Register Client"}
                </CustomButton>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ClientReg
