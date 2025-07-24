import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Table } from "reactstrap";
// import SearchBar from "../components/SearchBar";
// import { FaCoins, FaPlus } from "react-icons/fa";
// import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../../../../components/UI/CustomCard";
import {
  CustomButton,
  CustomTable,
  SearchBar,
} from "../../../../components/UI";
import { useNavigate } from "react-router-dom";
import { getClientInfo } from "../../../../redux/action/pharmacy";
import Loading from "../../../../components/UI/Loading";
import { formatNumber } from "../../../../components/UI/helpers";
import Scrollbar from "../../../../components/UI/Scrollbar";
import { useQuery } from "../../../../hooks";
// import { getCustomers } from "../../redux/actions/customer";
// import Loading from "../components/Loading";
// import { formatNumber } from "../utilities";
// import CustomButton from "../components/Button";
// import CustomCard from "../../components/CustomCard";
// import { Checkbox } from "evergreen-ui";
// import CustomCard from '../../inventria/components/CustomCard'

export default function ClientTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientInfo = useSelector((state) => state.pharmacy.clientInfo);
  const loading = useSelector((state) => state.pharmacy.loading);
  const [showAllPurchase, setShowAllPurchase] = useState(false);
  const query = useQuery();
  const type = query.get("type");
  //   const [filterText, setFilterText] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const customers = useSelector((state) => state.customer.customerList);
  //   const customerList = showAllPurchase ? customers : customers.slice(-15);

  //   const rows =
  //     filterText.length && customerList.length
  //       ? customerList.filter(
  //           (item) =>
  //             item.accName &&
  //             item.accName.toLowerCase().includes(filterText.toLowerCase())
  //         )
  //       : customerList;

  const _getClientInfo = useCallback(() => {
    dispatch(getClientInfo());
  }, [dispatch]);

  useEffect(() => {
    _getClientInfo();
  }, [_getClientInfo]);
  const fields = [
    {
      title: "Client Id",
      custom: true,
      component: (item) => item.accountNo,
      className: "text-right",
    },
    { title: "Name", value: "accName" },
    // { title: "Address", value: "contactAddress" },
    { title: "Phone", value: "contactPhone" },
    // { title: "Email", value: "contactEmail" },
    {
      title: "Credit limit",
      custom: true,
      component: (item) => formatNumber(item.credit_limit),
      className: "text-end",
    },
    {
      title: "Balance",
      custom: true,
      component: (item) =>
        item.accName === "walk-in"
          ? formatNumber(Math.abs(item.balance))
          : formatNumber(item.balance),
      className: "text-end",
    },
    {
      title: "Action",
      custom: true,
      component: (item) => (
        <CustomButton
          size="sm"
          onClick={() =>
            navigate(
              `/app/pharmacy/manage-customer/client_account_view?credit_limit=${item.credit_limit}&type=${type}&accountNo=${item.accountNo}&contactPhone=${item.contactPhone}&contactAddress=${item.contactAddress}&accName=${item.accName}&balance=${item.balance}&phone=${item.contactPhone}&email=${item.contactEmail}`
            )
          }
        >
          View
        </CustomButton>
      ),
      className: "text-center",
    },
  ];
  return (
    <CustomCard
      back
      header={"Clients"}
      headerRight={
        <Row>
          <Col md={12}></Col>
          <Col>
            <CustomButton
            size="sm"
              outline
             
              onClick={() =>
                navigate(
                  `/app/pharmacy/manage-customer/client_deposit?type=${type}`
                )
              }
            >
              Client Deposit
            </CustomButton>
            <CustomButton
              color="primary"
               size="sm"
                className="m-1"
              onClick={() =>
                navigate(
                  `/app/pharmacy/manage-customer/client_reg_form?type=${type}`
                )
              }
            >
              Add New Client
            </CustomButton>
          </Col>
        </Row>
      }
    >
      <div className="mb-2">
        <SearchBar
          placeholder="Search for a patient by name or address"
          // onFilterTextChange={(val) => setFilterText(val)}
          // filterText={filterText}
        />
      </div>
      <div>
        {loading && <Loading size="sm" />}
        <Scrollbar>
          <CustomTable height="70vh" fields={fields} data={clientInfo} />
        </Scrollbar>
      </div>
    </CustomCard>
  );
}
