import React, { useCallback, useEffect, useState } from "react";
import HorizontalMenu from "../../components/UI/horizontal-menu/HorizontalMenu";
import HorizontalMenuItem from "../../components/UI/horizontal-menu/HorizontalMenuItem";
import { useSelector } from "react-redux";
import {
  Package,
  ShoppingBag,
  Truck,
  Square,
  BarChart2,
  UserPlus,
  CornerUpLeft,
  // FilePlus,
  Users,
  Book,
  // FileText,
  ShoppingCart,
  Settings,
  // Image,
} from "react-feather";
// import { _postApi } from "../../redux/action/api";
// import { endpoint } from "../../redux/action/pharmacy";
// import store from "../../redux/store";
import { useQuery } from "../../hooks";
import { useLocation } from "react-router-dom";
function PharmacyMenu() {
  const query = useQuery();
  const active = query.get("active");
  const accessTo = useSelector((state) => state.auth.user.accessTo);
  const _accessTo = (accessTo && accessTo.split(",")) || [];
  const menu = [
    { label: "Dashboard", path: "dashboard?type", icon: <Package size={16} /> },
    {
      label: "Drug Sales",
      path: "drug-sales?type=sales",
      icon: <BarChart2 size={16} />,
    },
    {
      label: "Drug Purchase",
      path: "drug-purchase?type=with-alert",
      icon: <Square size={16} />,
    },
    {
      label: "Returned Drugs",
      path: "returned-drugs?type=return",
      icon: <CornerUpLeft size={16} />,
    },
    {
      label: "Manage Store",
      path: "manage-store?type=",
      icon: <ShoppingBag size={16} />,
    },
    {
      label: "Manage Suppliers",
      path: "manage-suppliers?type=",
      icon: <Truck size={16} />,
    },

    {
      label: "Client Registration",
      path: "manage-customer?type=",
      icon: <UserPlus size={16} />,
    },

    { label: "Manage Users", path: "manage-user?type=", icon: <Users size={16} /> },
    {
      label: "Generate Reciept",
      path: "generate-reciept?type=",
      icon: <Book size={16} />,
    },
    // { label: "My Sales", path: "sales-report?type=", icon: <FilePlus size={16} /> },
    // { label: "Description", path: "description?type=", icon: <FileText size={16} /> },
    // { label: "Orders", path: "order?type=", icon: <ShoppingCart size={16} /> },
    {
      label: "Store Setup",
      path: `store-setup?type=Store Setup&name=Agents`,
      icon: <Settings size={16} />,
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

  const location = useLocation()
  return (
    <HorizontalMenu className="">
      {/* {JSON.stringify("_accessTo")} */}
      {menu.map((item, index) => (
        <HorizontalMenuItem
          key={index}
          route={`/app/pharmacy/${item.path}&active=${item.label}`}
          active={location.pathname.includes(item.path)}
        >
          {_accessTo.includes(item.label, item.icon) ? (
            <span>
              <span style={{ marginRight: "6px" }}>{item.icon}</span>
              {item.label}!
            </span>

          ) : null}
        </HorizontalMenuItem>
      ))}
    </HorizontalMenu>
  );
}

export default PharmacyMenu;
