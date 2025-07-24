import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import { CustomTable } from "../../components/UI";
import CustomCard from "../../components/UI/CustomCard";
import CustomScrollbar from "../../components/UI/CustomScrollbar";
import DaterangeSelector from "../../components/UI/DaterangeSelector";
import useQuery from "../../hooks/useQuery";
import { getDrugView } from "../../redux/action/pharmacy";
import { formatNumber } from "../../utils";

export default function DrugView() {
  const today = moment().format("YYYY-MM-DD");
  const query = useQuery();
  const item_code = query.get("item_code");
  const expiry_date = query.get("expiry_date");
  const drug_name = query.get("drug_name");
  const store = query.get("store");
  const generic_name = query.get("generic_name");
  const formulation = query.get('formulation');
  const dispatch = useDispatch();
  const drugView = useSelector((state) => state.pharmacy.purchaseItems);
  const { activeBusiness, user } = useSelector((state) => state.auth);
  const facilityId = useSelector((state) => state.auth.user.facilityId);
  const aMonthAgo = moment(today)
    .subtract(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD");
  const [form, setForm] = useState({
    from: aMonthAgo,
    to: today,
  });

  const _getItemBalance = useCallback(() => {
    dispatch(
      getDrugView(
        store,
        item_code,
        form.from,
        form.to,
        facilityId,
        drug_name,
        expiry_date,
        formulation,
        generic_name
      )
    );
  }, [
    dispatch,
    form.from,
    form.to,
    item_code,
    store,
    facilityId,
    drug_name,
    expiry_date,
  ]);

  useEffect(() => {
    _getItemBalance();
  }, [_getItemBalance]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({
      ...p,
      [name]: value,
    }));
  };
  const fields = [
    {
      title: "SN",
      custom: true,
      component: (item, ind) => ind + 1,
      className: "text-center",
    },
    {
      title: "Date",
      custom: true,
      component: (item) => item.receive_date,
      className: "text-end",
    },
    {
      title: "Qty In",
      custom: true,
      component: (item) => item.qty_in,
      className: "text-center",
    },
    {
      title: "Qty Out",
      custom: true,
      component: (item) => item.qty_out,
      className: "text-center",
    },
    {
      title: "Balance",
      custom: true,
      component: (item) => item.balance,
      className: "text-center",
    },
    {
      title: "Notes",
      custom: true,
      component: (item) => item.supplier_name,
      className: "text-",
    },
    {
      title: "Signature",
      custom: true,
      component: (item) => item.userName,
      className: "text-left",
    },
  ];
  return (
    <GeneralWrapper>
      <CustomCard header={`Bin card (${drug_name})`} back>
        <DaterangeSelector
          handleChange={handleChange}
          from={form.from}
          to={form.to}
        />
        <CustomScrollbar>
          <div
            className=""
            style={{ marginLeft: "auto", marginRight: 0, paddingRight: "20px" }}
          >
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              Pharmacy name:{" "}
              <span style={{ textAlign: "center", fontWeight: "bold" }}>
                {activeBusiness?.pharmacy_name}
              </span>
            </div>
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              Pharmacy branch:
              <span style={{ textAlign: "center", fontWeight: "bold" }}>
                {user?.branch_name}
              </span>
            </div>
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              Drug name:
              <span style={{ textAlign: "center", fontWeight: "bold" }}>
                {drug_name}
                {generic_name ? "(" +  generic_name  + ")" : null}
              </span>
            </div>
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              Drug Code:
              <span style={{ textAlign: "center", fontWeight: "bold" }}>
                {item_code}
              </span>
            </div>
          </div>
          <CustomTable fields={fields} data={drugView} />
        </CustomScrollbar>
      </CustomCard>
    </GeneralWrapper>
  );
}

export const GeneralWrapper = (props) => {
  return (
    <Row>
      <Col md={1}></Col>
      <Col md={10}>{props.children}</Col>
      <Col md={1}></Col>
    </Row>
  );
};
