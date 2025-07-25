"use client"
import { Link, useLocation } from "react-router-dom"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import {
  Home,
  Package,
  Users,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  Pill,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react"
import './Navitems.css'

const navigationItems = [
  {
    label: "Dashboard",
    path: "/app/pharmacy/dashboard",
    icon: Home,
    exact: true,
  },
  {
    label: "Inventory",
    icon: Package,
    dropdown: true,
    items: [
      {
        label: "All Products",
        path: "/app/pharmacy/inventory",
        icon: Pill,
      },
      {
        label: "Add Product",
        path: "/app/pharmacy/inventory/add",
        icon: Package,
      },
      {
        label: "Low Stock",
        path: "/app/pharmacy/inventory/low-stock",
        icon: AlertTriangle,
        badge: 5,
      },
    ],
  },
  {
    label: "Sales",
    icon: ShoppingCart,
    dropdown: true,
    items: [
      {
        label: "Point of Sale",
        path: "/app/pharmacy/sales/pos",
        icon: ShoppingCart,
      },
      {
        label: "Sales History",
        path: "/app/pharmacy/sales/history",
        icon: FileText,
      },
      {
        label: "Returns",
        path: "/app/pharmacy/sales/returns",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Customers",
    
    path: "/app/pharmacy/customers",
    icon: Users,
  },
  {
    label: "Reports",
    path: "/app/pharmacy/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/app/pharmacy/settings",
    icon: Settings,
  },
]

// 🔁 Export just the route labels for privilege access
export const routes = navigationItems.map((item) => item.label)

const NavItems = ({ mobile = false }) => {
  const location = useLocation()

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  if (mobile) {
    return (
      <>
        {navigationItems.map((item, index) => {
          if (item.dropdown) {
            return (
              <div key={index}>
                {item.items.map((subItem, subIndex) => {
                  const SubIcon = subItem.icon
                  return (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className={`mobile-nav-item ${isActive(subItem.path) ? "active" : ""}`}
                    >
                      <div className="mobile-nav-content-item">
                        <SubIcon className="mobile-nav-icon" />
                        <span className="mobile-nav-label">{subItem.label}</span>
                        {subItem.badge && <span className="nav-badge">{subItem.badge}</span>}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )
          }

          const Icon = item.icon
          return (
            <Link
              key={index}
              to={item.path}
              className={`mobile-nav-item ${isActive(item.path, item.exact) ? "active" : ""}`}
            >
              <div className="mobile-nav-content-item">
                <Icon className="mobile-nav-icon" />
                <span className="mobile-nav-label">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <>
      {navigationItems.map((item, index) => {
        if (item.dropdown) {
          const Icon = item.icon
          return (
            <UncontrolledDropdown key={index} nav inNavbar className="nav-dropdown-modern  ">
              <DropdownToggle nav caret={false} className="nav-dropdown-toggle nav-link-modern  ">
                <Icon className="nav-icon " />
                <span className="nav-label">{item.label}</span>
                <ChevronDown size={14} style={{ marginLeft: "0.25rem" }} />
              </DropdownToggle>
              <DropdownMenu className="nav-dropdown-menu ">
                
                {item.items.map((subItem, subIndex) => {
                  const SubIcon = subItem.icon
                  return (
                    <DropdownItem
                      key={subIndex}
                      tag={Link}
                      to={subItem.path}
                      className="nav-dropdown-item "
                    >
                      <SubIcon size={16} />
                      <span>{subItem.label}</span>
                      {subItem.badge && <span className="nav-badge">{subItem.badge}</span>}
                    </DropdownItem>
                  )
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          )
        }

        const Icon = item.icon
        return (
          <div key={index} className="nav-item-modern">
            <Link
              to={item.path}
              className={`nav-link-modern ${isActive(item.path, item.exact) ? "active" : ""}`}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
            {/* <div className="nav-tooltip">{item.label}</div> */}
          </div>
        )
      })}
    </>
  )
}

export default NavItems
