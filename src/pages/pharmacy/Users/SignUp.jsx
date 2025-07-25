"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { login } from "../../../redux/action/auth"
import moment from "moment"
import { _fetchApi, _postApi } from "../../../redux/action/api"
import _customNotification from "../../../components/UI/_customNotification"
import { useToasts } from "react-toast-notifications"
import { routes } from "../../../components/Navbars/NavItems"
import { Building, Eye, EyeOff, Check, X, User, Mail, Phone, UserCheck, Lock } from "lucide-react"

import "./SignUp.css"

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    pharmName: "",
    pharmAddress: "",
    pharmPrefix: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    date: moment().format("YYYY-MM-DD"),
    remeberMe: false,
    message: "",
    loading: false,
    userCheck: false,
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const rem = localStorage.getItem("@@remembered")
    setForm((p) => ({ ...p, remeberMe: rem }))
  }, [])

  const onRemember = () => {
    setForm((p) => ({ ...p, remeberMe: !form.remeberMe }))
    localStorage.setItem("@@remembered", !form.remeberMe)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const obj = {
      ...form,
      busName: form.pharmName,
      businessType: "Pharmacy",
      address: form.pharmAddress,
      status: "",
      role: "Pharmacy Owner",
      date: form.date,
      store: form.pharmName,
      accessTo: routes.map((item) => item.label),
      functionality: "",
      firstname: form.firstName,
      lastname: form.lastName,
      branch_name: form.pharmName,
      query_type: "new_admin",
      business_includes_logistics: false,
    }

    _postApi(
      "/users/create",
      obj,
      (d) => {
        console.log(d)
        if (d.success) {
          dispatch(
            login(
              { username: form.username, password: form.password },
              (data) => {
                console.log(data)
                if (data && data.success) {
                  setLoading(false)
                  _customNotification(addToast, "Account successfully created")
                  navigate("/app/pharmacy/dashboard?type=Dashboard&active=Dashboard")
                } else {
                  if (data) {
                    _customNotification(addToast, JSON.stringify(Object.values(data)[0]), "warning")
                    setLoading(false)
                  } else {
                    setLoading(false)
                    _customNotification(addToast, "An error occured!", "warning")
                  }
                }
              },
              (err) => {
                _customNotification(addToast, JSON.stringify(Object.values(err)[0]) || "error occured", "warning")
                setLoading(false)
                console.log("err", err)
              },
            ),
          )
        } else {
          _customNotification(addToast, d.msg, "warning")
          setLoading(false)
        }
      },
      () => {
        alert("An error occurred")
        setLoading(false)
      },
    )
  }

  const verifyUserName = (username) => {
    if (username.length < 3) return
    setForm((p) => ({ ...p, loading: true }))
    _fetchApi(
      `/v1/username-verification?username=${username}`,
      (res) => {
        console.log(res)
        if (res.success) {
          setForm((p) => ({ ...p, message: res.msg, userCheck: true }))
          setForm((p) => ({ ...p, loading: false }))
        } else {
          setForm((p) => ({
            ...p,
            loading: false,
            message: res.msg,
            userCheck: false,
          }))
        }
      },
      (err) => {
        setForm((p) => ({ ...p, loading: false }))
        _customNotification(addToast, "Error Occured", "warning")
      },
    )
  }

  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: "Very Weak", color: "danger" }
      case 2:
        return { text: "Weak", color: "warning" }
      case 3:
        return { text: "Fair", color: "info" }
      case 4:
        return { text: "Good", color: "success" }
      case 5:
        return { text: "Strong", color: "success" }
      default:
        return { text: "", color: "" }
    }
  }

  const passwordStrength = getPasswordStrength(form.password)
  const passwordStrengthInfo = getPasswordStrengthText(passwordStrength)

  return (
    <div className="signup-container">
      {/* Animated background */}
      <div className="signup-bg-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      <div className="container-fluid min-vh-100 d-flex align-items-center py-5">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-xl-10">
            {/* Main signup card */}
            <div className="signup-main-card">
              {/* Header with logo and title */}
              <div className="signup-header text-center mb-5">
                <div className="signup-logo-container mx-auto mb-4">
                  <div className="signup-logo-inner">
                    <Building size={32} className="text-white" />
                  </div>
                </div>
                <h1 className="signup-main-title mb-2">Join PharmaBooks</h1>
                <p className="signup-subtitle">Create your pharmacy management account in minutes</p>
              </div>

              {/* Progress indicator */}
              <div className="progress-container mb-5">
                <div className="progress-bar-custom">
                  <div className="progress-step active">
                    <div className="step-circle">
                      <Building size={16} />
                    </div>
                    <span className="step-label">Pharmacy Info</span>
                  </div>
                  <div className="progress-line"></div>
                  <div className="progress-step">
                    <div className="step-circle">
                      <User size={16} />
                    </div>
                    <span className="step-label">Personal Info</span>
                  </div>
                  <div className="progress-line"></div>
                  <div className="progress-step">
                    <div className="step-circle">
                      <Check size={16} />
                    </div>
                    <span className="step-label">Complete</span>
                  </div>
                </div>
              </div>

              {/* Registration form */}
              <form onSubmit={handleSubmit} className="signup-form">
                <div className="row g-4">
                  {/* Left Column - Pharmacy Information */}
                  <div className="col-lg-6">
                    <div className="form-section pharmacy-info-section">
                      <div className="section-header">
                        <div className="section-icon">
                          <Building size={20} />
                        </div>
                        <div>
                          <h3 className="section-title">Pharmacy Information</h3>
                          <p className="section-subtitle">Tell us about your pharmacy</p>
                        </div>
                      </div>

                      <div className="form-fields">
                        <div className="form-group">
                          <label className="form-label">
                            <Building size={16} className="me-2" />
                            Pharmacy Name *
                          </label>
                          <input
                            type="text"
                            name="pharmName"
                            placeholder="Enter your pharmacy name"
                            value={form.pharmName}
                            onChange={({ target: { name, value } }) => {
                              setForm((p) => ({ ...p, [name]: value }))
                            }}
                            required
                            className="form-control modern-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <UserCheck size={16} className="me-2" />
                            Pharmacy Prefix
                          </label>
                          <input
                            type="text"
                            name="pharmPrefix"
                            placeholder="e.g., PH001, PHARM-A"
                            value={form.pharmPrefix}
                            onChange={({ target: { name, value } }) => {
                              setForm((p) => ({ ...p, [name]: value }))
                            }}
                            className="form-control modern-input"
                          />
                          <div className="form-help">
                            <small>Used for file naming and identification</small>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <Building size={16} className="me-2" />
                            Pharmacy Address *
                          </label>
                          <textarea
                            name="pharmAddress"
                            placeholder="Enter complete pharmacy address including city and postal code"
                            value={form.pharmAddress}
                            onChange={({ target: { name, value } }) => {
                              setForm((p) => ({ ...p, [name]: value }))
                            }}
                            required
                            rows={4}
                            className="form-control modern-input modern-textarea"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - User Information */}
                  <div className="col-lg-6">
                    <div className="form-section user-info-section">
                      <div className="section-header">
                        <div className="section-icon">
                          <User size={20} />
                        </div>
                        <div>
                          <h3 className="section-title">Personal Information</h3>
                          <p className="section-subtitle">Your account details</p>
                        </div>
                      </div>

                      <div className="form-fields">
                        <div className="row g-3">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-label">
                                <User size={16} className="me-2" />
                                First Name *
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={form.firstName}
                                onChange={({ target: { name, value } }) => {
                                  setForm((p) => ({ ...p, [name]: value }))
                                }}
                                required
                                className="form-control modern-input"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-label">
                                <User size={16} className="me-2" />
                                Last Name *
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={form.lastName}
                                onChange={({ target: { name, value } }) => {
                                  setForm((p) => ({ ...p, [name]: value }))
                                }}
                                required
                                className="form-control modern-input"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <Mail size={16} className="me-2" />
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="your.email@example.com"
                            value={form.email}
                            onChange={({ target: { name, value } }) => {
                              setForm((p) => ({ ...p, [name]: value }))
                            }}
                            required
                            className="form-control modern-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <Phone size={16} className="me-2" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 123-4567"
                            value={form.phone}
                            onChange={({ target: { name, value } }) => {
                              setForm((p) => ({ ...p, [name]: value }))
                            }}
                            className="form-control modern-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <UserCheck size={16} className="me-2" />
                            Username *
                          </label>
                          <div className="input-with-validation">
                            <input
                              type="text"
                              name="username"
                              placeholder="Choose a unique username"
                              value={form.username}
                              onChange={({ target: { name, value } }) => {
                                setForm((p) => ({ ...p, [name]: value }))
                                if (value.length >= 3) {
                                  verifyUserName(value)
                                }
                              }}
                              required
                              className={`form-control modern-input ${
                                form.message ? (form.userCheck ? "is-valid" : "is-invalid") : ""
                              }`}
                            />
                            <div className="input-status">
                              {form.loading && (
                                <div className="spinner-border spinner-border-sm text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              )}
                              {!form.loading && form.message && (
                                <div className={`status-icon ${form.userCheck ? "text-success" : "text-danger"}`}>
                                  {form.userCheck ? <Check size={16} /> : <X size={16} />}
                                </div>
                              )}
                            </div>
                          </div>
                          {form.message && (
                            <div className={`form-feedback ${form.userCheck ? "valid-feedback" : "invalid-feedback"}`}>
                              {form.message}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <Lock size={16} className="me-2" />
                            Password *
                          </label>
                          <div className="password-input-container">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Create a strong password"
                              value={form.password}
                              onChange={({ target: { name, value } }) => {
                                setForm((p) => ({ ...p, [name]: value }))
                              }}
                              required
                              className="form-control modern-input"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="password-toggle"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {form.password && (
                            <div className="password-strength">
                              <div className="strength-bar">
                                <div
                                  className={`strength-fill strength-${passwordStrengthInfo.color}`}
                                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                ></div>
                              </div>
                              <small className={`text-${passwordStrengthInfo.color}`}>
                                Password strength: {passwordStrengthInfo.text}
                              </small>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions mt-5">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check custom-checkbox">
                      <input
                        type="checkbox"
                        checked={form.remeberMe}
                        onChange={onRemember}
                        className="form-check-input"
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember my preferences
                      </label>
                    </div>
                    <button type="button" className="btn btn-link help-link">
                      <span>Need help?</span>
                    </button>
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-100 create-account-btn">
                    {loading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Creating your account...
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center">
                        <UserCheck size={20} className="me-2" />
                        Create My Account
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Sign in link */}
            <div className="signin-prompt text-center mt-4">
              <div className="signin-card">
                <p className="mb-0">
                  Already have an account?{" "}
                  <button type="button" onClick={() => navigate("/app/login")} className="btn btn-link signin-link p-0">
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
