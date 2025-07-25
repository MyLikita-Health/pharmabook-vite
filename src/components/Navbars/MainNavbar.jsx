"use client"

import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavbarToggler,
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
import {
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Menu,
  X,
  AlertTriangle,
  BellOff,
} from "react-feather"
import "./MainNavbar.css"

const MainNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const _logout = () => dispatch(logout(gotoLogin()))
  const gotoLogin = () => navigate("/app/login")
  const toggle = () => setIsOpen(!isOpen)

  const { user } = useSelector((state) => state.auth)
  const { topFive } = useSelector((state) => state.pharmacy)

  return (
    <div className="navbar-wrapper ">
      <AlertNews />
      <Navbar className="modern-navbar"  fixed="top" style={{ top: topFive.length > 0 ? "60px" : "0" }}>
        <Container fluid className="navbar-container">
          {/* Brand Section */}
          <NavbarBrand className="navbar-brand-enhanced" to="/app/pharmacy/dashboard" tag={Link}>
            <div className="brand-content">
              <div className="brand-logo">
                <div className="logo-circle">
                  <img alt="Pharmacy Logo" src={logo || "/placeholder.svg"} className="logo-image" />
                </div>
              </div>
              <div className="brand-text">
                <h1 className="brand-title">PharmaBooks</h1>
                <p className="brand-subtitle">Management System</p>
              </div>
            </div>
          </NavbarBrand>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <div className="desktop-nav-items">
              <NavItems />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            {/* Search Section */}
            <div className="search-section">
              <div className={`search-container ${showSearch ? "expanded" : ""}`}>
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search medications, patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    onFocus={() => setShowSearch(true)}
                    onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                  />
                </div>
                {searchQuery && (
                  <div className="search-results">
                    <div className="search-result-item">
                      <Search size={16} />
                      <span>Search for "{searchQuery}"</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications */}
            <UncontrolledDropdown nav inNavbar className="notification-dropdown">
              <DropdownToggle nav caret={false} className="nav-action-btn">
                <div className="notification-btn">
                  <Bell size={20} />
                  {topFive.length > 0 && (
                    <Badge className="notification-badge">{topFive.length > 9 ? "9+" : topFive.length}</Badge>
                  )}
                  <div className="btn-ripple"></div>
                </div>
              </DropdownToggle>
              <DropdownMenu right className="notification-menu">
                <div className="notification-header">
                  <div className="notification-title">
                    <Bell size={18} />
                    <span>Notifications</span>
                    {topFive.length > 0 && <Badge className="header-badge">{topFive.length}</Badge>}
                  </div>
                </div>

                <div className="notification-content">
                  {topFive.length === 0 ? (
                    <div className="empty-notifications">
                      <BellOff size={32} />
                      <p>No new notifications</p>
                      <span>You're all caught up!</span>
                    </div>
                  ) : (
                    <div className="notification-list">
                      {topFive.slice(0, 5).map((item, index) => (
                        <div key={index} className="notification-item">
                          <div className="notification-icon">
                            <AlertTriangle size={16} />
                          </div>
                          <div className="notification-details">
                            <h6 className="notification-drug-name">{item.drug_name}</h6>
                            <p className="notification-expiry">
                              Expires in {moment(item.expiry_date).diff(today, "days")} days
                            </p>
                            <span className="notification-time">{moment(item.expiry_date).format("MMM DD, YYYY")}</span>
                          </div>
                          <div className="notification-status">
                            <div className="status-dot urgent"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {topFive.length > 0 && (
                  <div className="notification-footer">
                    <Link to="/app/pharmacy/alerts" className="view-all-btn">
                      View All Alerts
                    </Link>
                  </div>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>

            {/* User Profile */}
            <UncontrolledDropdown nav inNavbar className="user-dropdown">
              <DropdownToggle nav caret={false} className="nav-action-btn">
                <div className="user-btn">
                  <div className="user-avatar">
                    <img src="/placeholder.svg?height=36&width=36" alt="User Avatar" className="avatar-image" />
                    <div className="avatar-status online"></div>
                  </div>
                  <div className="user-info">
                    <span className="user-name">{user?.name || "John Doe"}</span>
                    <span className="user-role">{user?.role || "Pharmacist"}</span>
                  </div>
                  <ChevronDown size={16} className="dropdown-arrow" />
                </div>
              </DropdownToggle>
              <DropdownMenu right className="user-menu">
                <div className="user-menu-header">
                  <div className="user-profile-info">
                    <img src="/placeholder.svg?height=48&width=48" alt="User Avatar" className="profile-avatar" />
                    <div className="profile-details">
                      <h6 className="profile-name">{user?.name || "John Doe"}</h6>
                      <p className="profile-email">{user?.email || "john@pharmacy.com"}</p>
                    </div>
                  </div>
                </div>

                <div className="user-menu-content">
                  <DropdownItem className="menu-item">
                    <User size={18} />
                    <span>Profile Settings</span>
                  </DropdownItem>
                  <DropdownItem className="menu-item">
                    <Settings size={18} />
                    <span>Preferences</span>
                  </DropdownItem>
                  <DropdownItem className="menu-item">
                    <HelpCircle size={18} />
                    <span>Help & Support</span>
                  </DropdownItem>
                </div>

                <div className="user-menu-footer">
                  <DropdownItem onClick={_logout} className="menu-item logout-item">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </DropdownItem>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>

            {/* Mobile Menu Toggle */}
            <NavbarToggler onClick={toggle} className="mobile-toggle">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </NavbarToggler>
          </div>

          {/* Mobile Navigation */}
          <Collapse isOpen={isOpen} navbar className="mobile-nav">
            <div className="mobile-nav-content">
              <div className="mobile-nav-items">
                <NavItems mobile />
              </div>

              {/* Mobile Search */}
              <div className="mobile-search">
                <div className="mobile-search-wrapper">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mobile-search-input"
                  />
                </div>
              </div>
            </div>
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
      <div className="alert-banner-content">
        <Marquee speed={60} gradient={false} className="alert-marquee">
          {topFive.map((item, index) => (
            <div key={index} className="alert-item">
              {item.expiry_date !== "1111-11-11" && (
                <div className="alert-content">
                  <div className="alert-icon">
                    <AlertTriangle size={16} />
                  </div>
                  <span className="alert-drug-name">{item.drug_name}</span>
                  <span className="alert-text">expires in</span>
                  <Badge className="alert-badge">{moment(item.expiry_date).diff(today, "days")} days</Badge>
                </div>
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default MainNavbar
