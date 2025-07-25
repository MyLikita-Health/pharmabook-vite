"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import Logo from "../../../assets/images/new-logo.png"
import bg11 from "../../../assets/images/login1.jpg"
import { useDispatch } from "react-redux"
import { Eye, EyeOff } from "react-feather"
import { login } from "../../../redux/action/auth"
import _customNotification from "../../../components/UI/_customNotification"
import { useToasts } from "react-toast-notifications"
import "./Login.css"

export const Login = () => {
  const navigate = useNavigate()
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    username: "",
    password: "",
    remeberMe: false,
  })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const showPassword = (e) => {
    e.preventDefault()
    setShowPass((p) => !p)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    dispatch(
      login(
        { username: form.username, password: form.password },
        (data) => {
          console.log(data)
          if (data && data.success) {
            setLoading(false)
            _customNotification(addToast, "Login succesfully ")
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
  }

  useEffect(() => {
    const rem = localStorage.getItem("@@remembered")
    setForm((p) => ({ ...p, remeberMe: rem }))
  }, [])

  const onRemember = () => {
    setForm((p) => ({ ...p, remeberMe: !form.remeberMe }))
    localStorage.setItem("@@remembered", !form.remeberMe)
  }

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg11})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay */}
      <div className="login-overlay"></div>

      <div className="container-fluid h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            {/* Main login card */}
            <div className="card login-card shadow-lg border-0">
              <div className="card-body p-4 p-md-5">
                {/* Logo section */}
                <div className="text-center mb-4">
                  <div className="logo-container mx-auto mb-3">
                    <img src={Logo || "/placeholder.svg"} alt="logo" className="logo-image" />
                  </div>
                  <h1 className="login-title mb-2">Welcome Back</h1>
                  <p className="text-muted small">Sign in to your PharmaBooks account</p>
                </div>

                {/* Login form */}
                <form onSubmit={handleSubmit}>
                  {/* Username field */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={({ target: { name, value } }) => {
                        setForm((p) => ({ ...p, [name]: value }))
                      }}
                      placeholder="Enter your username"
                      required
                      className="form-control form-control-lg custom-input"
                    />
                  </div>

                  {/* Password field */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Password</label>
                    <div className="position-relative">
                      <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={({ target: { name, value } }) => {
                          setForm((p) => ({ ...p, [name]: value }))
                        }}
                        placeholder="Enter your password"
                        required
                        className="form-control form-control-lg custom-input pe-5"
                      />
                      <button
                        type="button"
                        onClick={showPassword}
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted border-0 bg-transparent"
                        style={{ zIndex: 10 }}
                      >
                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me and forgot password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        checked={form.remeberMe}
                        onChange={onRemember}
                        className="form-check-input"
                        id="rememberMe"
                      />
                      <label className="form-check-label text-muted fw-medium" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <button type="button" className="btn btn-link p-0 text-decoration-none fw-semibold">
                      Forgot Password?
                    </button>
                  </div>

                  {/* Sign in button */}
                  <button type="submit" disabled={loading} className="btn btn-lg w-100 mb-4 custom-btn-primary">
                    {loading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Divider */}
                  <div className="position-relative mb-4">
                    <hr className="text-muted" />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                      or
                    </span>
                  </div>

                  {/* Create account link */}
                  <div className="text-center mb-3">
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/app/sign-up")}
                        className="btn btn-link p-0 text-decoration-none fw-semibold"
                      >
                        Create Account
                      </button>
                    </p>
                  </div>

                  {/* Help link */}
                  <div className="text-center">
                    <button type="button" className="btn btn-link p-0 text-muted small text-decoration-none">
                      Need Help?
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="decorative-element decorative-element-1"></div>
            <div className="decorative-element decorative-element-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
