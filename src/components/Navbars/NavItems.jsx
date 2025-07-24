import React from "react"
import { Link, useLocation } from "react-router-dom"
import { NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

const NavItems = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname.includes(path)
  }

  const navItems = [
    {
      title: "Dashboard",
      path: "/app/pharmacy/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      title: "Inventory",
      icon: "fas fa-boxes",
      dropdown: [
        { title: "View Inventory", path: "/app/pharmacy/drug-purchase/drug-purchase?type=Inventory&tab=Drug%20shelve", icon: "fas fa-list" },
        { title: "Add Drug", path: "/app/pharmacy/drug-purchase/add-new-purchase?type=Inventory&tab=Drug%20Purchase", icon: "fas fa-plus" },
        { title: "Drug Categories", path: "/app/pharmacy/categories", icon: "fas fa-tags" },
        { title: "Stock Alerts", path: "/app/pharmacy/alerts", icon: "fas fa-exclamation-triangle" },
      ],
    },
    {
      title: "Sales",
      icon: "fas fa-shopping-cart",
      dropdown: [
        { title: "New Sale", path: "/app/pharmacy/drug-sales?type=Sales", icon: "fas fa-plus-circle" },
        { title: "Sales History", path: "/app/pharmacy/sales/history", icon: "fas fa-history" },
        { title: "Returns", path: "/app/pharmacy/returns", icon: "fas fa-undo" },
      ],
    },
    {
      title: "Suppliers",
      path: "/app/pharmacy/suppliers",
      icon: "fas fa-truck",
    },
    {
      title: "Reports",
      icon: "fas fa-chart-bar",
      dropdown: [
        { title: "Sales Reports", path: "/app/pharmacy/reports/sales", icon: "fas fa-chart-line" },
        { title: "Inventory Reports", path: "/app/pharmacy/reports/inventory", icon: "fas fa-warehouse" },
        { title: "Financial Reports", path: "/app/pharmacy/reports/financial", icon: "fas fa-dollar-sign" },
        { title: "Custom Reports", path: "/app/pharmacy/reports/custom", icon: "fas fa-cog" },
      ],
    },
    {
      title: "Users",
      path: "/app/pharmacy/users",
      icon: "fas fa-users",
    },
  ]

  return (
    <>
      {navItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.dropdown ? (
            <UncontrolledDropdown nav inNavbar className="nav-dropdown">
              <DropdownToggle
                nav
                caret
                className={`nav-dropdown-toggle ${
                  item.dropdown.some((subItem) => isActive(subItem.path)) ? "active" : ""
                }`}
              >
                <i className={`${item.icon} mr-2`}></i>
                {item.title}
              </DropdownToggle>
              <DropdownMenu className="nav-dropdown-menu">
                <DropdownItem header className="dropdown-header">
                  <i className={`${item.icon} mr-2`}></i>
                  {item.title}
                </DropdownItem>
                <DropdownItem divider />
                {item.dropdown.map((subItem, subIndex) => (
                  <DropdownItem
                    key={subIndex}
                    tag={Link}
                    to={subItem.path}
                    className={`nav-dropdown-item ${isActive(subItem.path) ? "active" : ""}`}
                  >
                    <i className={`${subItem.icon} mr-2`}></i>
                    {subItem.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <NavItem className="nav-item-custom">
              <NavLink tag={Link} to={item.path} className={`nav-link-custom ${isActive(item.path) ? "active" : ""}`}>
                <i className={`${item.icon} mr-2`}></i>
                {item.title}
              </NavLink>
            </NavItem>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default NavItems


export const routes = [
  {
    label: "Dashboard", path: "dashboard?type=Dashboard",
  },
  {
    label: "Sales",
    path: "drug-sales?type=Sales",
    // icon: <BarChart2 size={16} />,
  },
  {
    label: "Inventory",
    path: "drug-purchase/drug-purchase?type=Inventory&tab=Drug shelve",
    // icon: <Square size={16} />,
  },
  {
    label: "Expenses",
    path: "expenses"
  },
  {
    label: "Suppliers",
    path: "manage-suppliers?type=Suppliers",
    // icon: <Truck size={16} />,
  },

  {
    label: "Clients Manager",
    path: "manage-customer?type=Clients Manager",
    // icon: <UserPlus size={16} />,
  },
  {
    label: "Generate Reciept",
    path: "generate-reciept?type=Generate Reciept",
    // icon: <Book size={16} />,
  },
  // { label: "My Sales", path: "sales-report?type=", icon: <FilePlus size={16} /> },
  // { label: "Description", path: "description?type=", icon: <FileText size={16} /> },
  // { label: "Orders", path: "order?type=", icon: <ShoppingCart size={16} /> },
  {
    label: "Store Setup",
    path: `store-setup?type=Store Setup&name=Agents`,
  },
  {
    label: "Reports",
    path: `reports?type=Reports`,
  },
  // {
  //   label: "Product Category",
  //   path: "product-category?type=",
  //   icon: <Image size={16} />,
  // },
  // {
  //   label: "Transfer Form",
  //   path: "transfer-form?type=",
  //   icon: <Image size={16} />,
  // },
];