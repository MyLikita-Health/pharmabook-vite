
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

  const _logout = () => dispatch(logout(gotoLogin()))
  const gotoLogin = () => navigate("/app/login")
  const toggle = () => setIsOpen(!isOpen)

  const { user } = useSelector((state) => state.auth)
  const { topFive } = useSelector((state) => state.pharmacy)

  return (
    <div className="navbar-wrapper">
      <AlertNews />
      <Navbar 
        className="modern-navbar shadow-lg" 
        expand="lg" 
        fixed="top" 
        style={{ top: topFive.length > 0 ? "56px" : "0" }}
      >
        <Container fluid className="px-4">
          <div className="flex items-center justify-between w-full">
            {/* Brand Section */}
            <NavbarBrand 
              className="navbar-brand-modern" 
              to="/app/pharmacy/dashboard" 
              tag={Link}
            >
              <div className="flex items-center space-x-3">
                <div className="brand-logo-container">
                  <img 
                    alt="Pharmacy Logo" 
                    src={logo || "/placeholder.svg"} 
                    className="h-10 w-auto transition-transform hover:scale-105" 
                  />
                </div>
                <div className="brand-text-container hidden md:block">
                  <h1 className="text-xl font-bold text-white mb-0">PharmaBooks</h1>
                  <p className="text-sm text-blue-100 mb-0">Management System</p>
                </div>
              </div>
            </NavbarBrand>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavItems />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar - Desktop Only */}
              <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 max-w-xs">
                <i className="fas fa-search text-white/70 mr-2"></i>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-0 text-white placeholder-white/70 text-sm focus:outline-none w-full"
                />
              </div>

              {/* Notifications */}
              <UncontrolledDropdown nav inNavbar className="relative">
                <DropdownToggle nav caret={false} className="notification-button">
                  <div className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <i className="fas fa-bell text-white text-lg"></i>
                    {topFive.length > 0 && (
                      <Badge 
                        color="danger" 
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold rounded-full"
                      >
                        {topFive.length}
                      </Badge>
                    )}
                  </div>
                </DropdownToggle>
                <DropdownMenu right className="notification-dropdown-modern mt-2 w-80 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h6 className="flex items-center font-semibold text-gray-800 mb-0">
                      <i className="fas fa-bell mr-2 text-blue-600"></i>
                      Notifications ({topFive.length})
                    </h6>
                  </div>
                  
                  {topFive.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <i className="fas fa-bell-slash text-3xl mb-3 text-gray-300"></i>
                      <p>No notifications</p>
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {topFive.slice(0, 5).map((item, index) => (
                        <DropdownItem key={index} className="notification-item-modern p-3 border-0">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-exclamation-triangle text-orange-600"></i>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{item.drug_name}</p>
                              <p className="text-sm text-gray-500">
                                Expires in {moment(item.expiry_date).diff(today, "days")} days
                              </p>
                            </div>
                          </div>
                        </DropdownItem>
                      ))}
                    </div>
                  )}
                  
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <Link 
                      to="/app/pharmacy/alerts" 
                      className="block text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View All Alerts
                    </Link>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>

              {/* User Profile */}
              <UncontrolledDropdown nav inNavbar className="relative">
                <DropdownToggle nav caret={false} className="user-button">
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <img 
                      src="/placeholder.svg?height=32&width=32" 
                      alt="User Avatar" 
                      className="w-8 h-8 rounded-full border-2 border-white/30"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-white mb-0">{user?.name || "User"}</p>
                      <p className="text-xs text-blue-100 mb-0">{user?.role || "Pharmacist"}</p>
                    </div>
                    <i className="fas fa-chevron-down text-white/70 text-xs"></i>
                  </div>
                </DropdownToggle>
                <DropdownMenu right className="user-dropdown-modern mt-2 w-64">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/placeholder.svg?height=48&width=48" 
                        alt="User Avatar" 
                        className="w-12 h-12 rounded-full border-2 border-blue-200"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 mb-0">{user?.name || "User Name"}</p>
                        <p className="text-sm text-gray-600 mb-0">{user?.email || "user@pharmacy.com"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <DropdownItem className="user-menu-item">
                      <i className="fas fa-user mr-3 text-gray-400"></i>
                      Profile Settings
                    </DropdownItem>
                    <DropdownItem className="user-menu-item">
                      <i className="fas fa-cog mr-3 text-gray-400"></i>
                      Preferences
                    </DropdownItem>
                    <DropdownItem className="user-menu-item">
                      <i className="fas fa-question-circle mr-3 text-gray-400"></i>
                      Help & Support
                    </DropdownItem>
                  </div>
                  
                  <div className="border-t border-gray-200 py-2">
                    <DropdownItem onClick={_logout} className="user-menu-item text-red-600 hover:bg-red-50">
                      <i className="fas fa-sign-out-alt mr-3"></i>
                      Logout
                    </DropdownItem>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>

              {/* Mobile Menu Toggle */}
              <NavbarToggler onClick={toggle} className="lg:hidden text-white border-white/30">
                <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
              </NavbarToggler>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Collapse isOpen={isOpen} navbar className="lg:hidden">
            <div className="mt-4 pt-4 border-t border-white/20">
              <NavItems mobile />
              
              {/* Mobile Search */}
              <div className="mt-4 mb-3">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <i className="fas fa-search text-white/70 mr-2"></i>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-0 text-white placeholder-white/70 text-sm focus:outline-none w-full"
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
    <div className="alert-banner-modern">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 shadow-md">
        <Marquee speed={50} gradient={false} className="flex items-center">
          {topFive.map((item, index) => (
            <div key={index} className="flex items-center mx-8">
              {item.expiry_date !== "1111-11-11" && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-1">
                    <i className="fas fa-exclamation-triangle text-yellow-200"></i>
                    <span className="font-medium">{item.drug_name}</span>
                    <span className="text-white/80">expires in</span>
                    <Badge color="warning" className="text-orange-800 font-bold">
                      {moment(item.expiry_date).diff(today, "days")} days
                    </Badge>
                  </div>
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
