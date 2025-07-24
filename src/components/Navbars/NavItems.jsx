import React from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const NavItems = ({ mobile = false }) => {
  const location = useLocation();

  const navItems = [
    {
      path: "/app/pharmacy/dashboard",
      label: "Dashboard",
      icon: "fas fa-tachometer-alt"
    },
    {
      path: "/app/pharmacy/inventory",
      label: "Inventory",
      icon: "fas fa-boxes"
    },
    {
      path: "/app/pharmacy/sales",
      label: "Sales",
      icon: "fas fa-shopping-cart"
    },
    {
      path: "/app/pharmacy/reports",
      label: "Reports",
      icon: "fas fa-chart-bar"
    }
  ];

  const isActive = (path) => location.pathname.includes(path);

  if (mobile) {
    return (
      <div className="space-y-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`mobile-nav-item ${isActive(item.path) ? 'bg-white/20' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <i className={`${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {navItems.map((item, index) => (
        <NavItem key={index} className="nav-item-modern">
          <NavLink
            tag={Link}
            to={item.path}
            className={`nav-link-modern ${isActive(item.path) ? 'active' : ''}`}
          >
            <i className={item.icon}></i>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        </NavItem>
      ))}
    </div>
  );
};

// Export routes for use in other components like NewUser
export const routes = navItems;

export default NavItems;