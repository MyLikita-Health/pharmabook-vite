"use client"

import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import "./nav.css"
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Container,
} from "reactstrap"
import logo from "../../assets/images/white-logo.png"
import NavItems from "./NavItems"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/action/auth"
import { getExpiryAlertTopFive } from "../../redux/action/pharmacy"
import moment from "moment"
import { today } from "../UI/helpers"
import Marquee from "react-fast-marquee"

const MainNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const _logout = () => dispatch(logout(gotoLogin()))
  const gotoLogin = () => navigate("/app/login")
  const toggle = () => setIsOpen(!isOpen)

  const { user } = useSelector((state) => state.auth)
  const { topFive } = useSelector((state) => state.pharmacy)

  const getPageTitle = () => {
    const path = location.pathname
    if (path.includes("dashboard")) return "Dashboard"
    if (path.includes("inventory")) return "Inventory"
    if (path.includes("sales")) return "Sales"
    if (path.includes("reports")) return "Reports"
    return "Pharmacy Management"
  }

  return (
    <div className="navbar-wrapper">
      <AlertNews />
      <Navbar className="main-navbar" expand="lg" fixed="top" style={{ top: topFive.length > 0 ? "40px" : "0" }}>
        <Container fluid className="d-flex align-items-center justify-content-between">
          {/* Brand Section */}
          <NavbarBrand className="navbar-brand-custom mr-4" to="/app/pharmacy/dashboard" tag={Link}>
            <div className="brand-container">
              <img alt="Pharmacy Logo" src={logo || "/placeholder.svg"} height="45" className="brand-logo" />
              <div className="brand-text">
                <span className="brand-title">PharmaBooks</span>
                <span className="brand-subtitle">Management System</span>
              </div>
            </div>
          </NavbarBrand>

          <NavbarToggler onClick={toggle} className="custom-toggler">
            <span className="navbar-toggler-icon">
              <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
            </span>
          </NavbarToggler>

          <Collapse isOpen={isOpen} navbar className="navbar-collapse-custom">
            {/* Navigation Items */}
            <Nav className="navbar-nav-custom" navbar>
              <NavItems />
            </Nav>

            {/* Right Side Actions */}
            <Nav className="navbar-actions ml-auto" navbar>
              {/* Notifications */}
              <UncontrolledDropdown nav inNavbar className="notification-dropdown">
                <DropdownToggle nav caret={false} className="notification-toggle">
                  <i className="fas fa-bell"></i>
                  {topFive.length > 0 && (
                    <Badge color="danger" className="notification-badge">
                      {topFive.length}
                    </Badge>
                  )}
                </DropdownToggle>
                <DropdownMenu right className="notification-menu">
                  <DropdownItem header className="notification-header">
                    <i className="fas fa-bell mr-2"></i>
                    Notifications ({topFive.length})
                  </DropdownItem>
                  <div className="notification-list">
                    {topFive.slice(0, 5).map((item, index) => (
                      <DropdownItem key={index} className="notification-item">
                        <div className="notification-content">
                          <div className="notification-icon">
                            <i className="fas fa-exclamation-triangle text-warning"></i>
                          </div>
                          <div className="notification-text">
                            <strong>{item.drug_name}</strong>
                            <br />
                            <small className="text-muted">
                              Expires in {moment(item.expiry_date).diff(today, "days")} days
                            </small>
                          </div>
                        </div>
                      </DropdownItem>
                    ))}
                  </div>
                  <DropdownItem divider />
                  <DropdownItem className="text-center">
                    <Link to="/app/pharmacy/alerts" className="view-all-link">
                      View All Alerts
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              {/* User Profile */}
              <UncontrolledDropdown nav inNavbar className="user-dropdown">
                <DropdownToggle nav caret={false} className="user-toggle">
                  <div className="user-avatar">
                    <img src="/placeholder.svg?height=35&width=35" alt="User Avatar" className="avatar-img" />
                    <div className="user-info d-none d-md-block">
                      <span className="user-name">{user?.name || "User"}</span>
                      <span className="user-role">{user?.role || "Pharmacist"}</span>
                    </div>
                  </div>
                </DropdownToggle>
                <DropdownMenu right className="user-menu">
                  <DropdownItem header className="user-menu-header">
                    <div className="user-details">
                      <img src="/placeholder.svg?height=50&width=50" alt="User Avatar" className="user-menu-avatar" />
                      <div>
                        <strong>{user?.name || "User Name"}</strong>
                        <br />
                        <small className="text-muted">{user?.email || "user@pharmacy.com"}</small>
                      </div>
                    </div>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <i className="fas fa-user mr-2"></i>
                    Profile Settings
                  </DropdownItem>
                  <DropdownItem>
                    <i className="fas fa-cog mr-2"></i>
                    Preferences
                  </DropdownItem>
                  <DropdownItem>
                    <i className="fas fa-question-circle mr-2"></i>
                    Help & Support
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={_logout} className="logout-item">
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

const AlertNews = () => {
  const dispatch = useDispatch()
  const { topFive } = useSelector((state) => state.pharmacy)

  const info = useCallback(() => {
    dispatch(getExpiryAlertTopFive())
  }, [dispatch])

  useEffect(() => {
    info()
  }, [info])

  if (topFive.length === 0) return null

  return (
    <div className="alert-banner">
      <Marquee speed={50} gradient={false} className="alert-marquee">
        {topFive.map((item, index) => (
          <div key={index} className="alert-item">
            {item.expiry_date !== "1111-11-11" && (
              <>
                <i className="fas fa-exclamation-triangle mr-2"></i>
                <strong>{item.drug_name}</strong>
                <span className="mx-2">expires in</span>
                <Badge color="warning" className="mx-1">
                  {moment(item.expiry_date).diff(today, "days")} days
                </Badge>
                <span className="mx-4">•</span>
              </>
            )}
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default MainNavbar
