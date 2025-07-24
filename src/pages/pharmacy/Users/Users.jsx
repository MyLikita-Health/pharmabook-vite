import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import { CustomButton, CustomTable, SearchBar } from "../../../components/UI";

import CustomCard from "../../../components/UI/CustomCard";
import { useNavigate } from "react-router-dom";
import {
  deletePharmUsers,
  getPharmUsers,
} from "../../../redux/action/pharmacy";
import Loading from "../../../components/UI/Loading";
import Scrollbar from "../../../components/UI/Scrollbar";
import { SELECTED_USER } from "../../../redux/action/actionType";
import { useQuery } from "../../../hooks";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const pharmUsers = useSelector((state) => state.pharmacy.pharmUsers);
  const loading = useSelector((state) => state.pharmacy.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _getPharmUsers = useCallback(() => {
    dispatch(getPharmUsers("select"));
  }, [dispatch]);

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
  };

  const handleDelete = useCallback(
    (userId) => {
      dispatch(deletePharmUsers(userId));
    },
    [dispatch]
  );

  useEffect(() => _getPharmUsers(), [_getPharmUsers, handleDelete]);
  const fields = [
    {
      title: "S/N",
      custom: true,
      component: (item, idx) => idx + 1,
      className: "text-center",
    },
    {
      title: "User name",
      value: "username",
    },
    {
      title: "Phone",
      value: "phone",
    },
    {
      title: "Role",
      value: "role",
    },
    {
      title: "Action",
      custom: true,
      className: "text-center ",
      component: (item) => (
        <>
          {" "}
          <CustomButton
            color="danger"
            size="sm"
            className="p-1"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </CustomButton>
          <CustomButton
            color="primary"
            size="sm"
            className="m-1"
            onClick={() => {
              navigate(
                `/app/pharmacy/create-agent?name=Create agents&type=Store Setup&disabled=false&id=${item.id}`
              );
              dispatch({ type: SELECTED_USER, payload: item });
            }}
          >
            Edit
          </CustomButton>
        </>
      ),
    },
  ];
  const rows = [];
  if (pharmUsers) {
    pharmUsers.length &&
      pharmUsers.forEach((user, i) => {
        if (
          user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1
        )
          return;

        rows.push(user);
      });
  }
  return (
    <div>
      <UserWrapper>
        <Row>
          <Col md={9}>
            <SearchBar
              filterText={searchTerm}
              onFilterTextChange={handleSearchTermChange}
              placeholder="Search agents by name | phone | email "
            />
          </Col>
          <Col>Total: {rows.length}</Col>
        </Row>
        {loading && <Loading size="sm" />}
        <Scrollbar height={"90vh"}>
          <div style={{ paddingTop: 4 }}>
            <CustomTable fields={fields} data={rows} />
          </div>
        </Scrollbar>
      </UserWrapper>
    </div>
  );
}

export const UserWrapper = (props) => {
  const tabs = [
    { name: "Agents", route: "store-setup" },
    { name: "Create agents", route: "create-agent" },
    { name: "Manage store", route: "manage-store" },
    { name: "Settings", route: "settings" },
  ];
  const navigate = useNavigate();
  const query = useQuery();
  const type = query.get("type");
  const name = query.get("name");
  const { activeBusiness } = useSelector((state) => state.auth);
  return (
    <CustomCard
      className="p-0 m-0"
      // style={{ height: "90vh" }}
      full_width
      header={
        <Nav tabs className="p-0 m-0">
          {tabs.map((tab) => (
            <NavItem
              onClick={() => {
                navigate(
                  `/app/pharmacy/${tab.route}?name=${tab.name}&type=${type}`
                );
              }}
              className="p-0 m-0 mx-2"
            >
              <NavLink
                className="btn btn-primary"
                size="sm"
                style={{
                  borderBlockColor:
                    tab.name === name ? activeBusiness?.primary_color : "#EEE",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {tab.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      }
    >
      {props.children}
    </CustomCard>
  );
};
