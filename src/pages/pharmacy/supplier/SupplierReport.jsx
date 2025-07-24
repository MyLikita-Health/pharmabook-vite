import { PDFViewer } from "@react-pdf/renderer";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {  Col, Row } from "reactstrap";
import { CustomButton, CustomTable } from "../../../components/UI";
import CustomAlert from "../../../components/UI/CustomAlert";
import CustomCard from "../../../components/UI/CustomCard";
import CustomScrollbar from "../../../components/UI/CustomScrollbar";
import DaterangeSelector from "../../../components/UI/DaterangeSelector";
import { formatNumber } from "../../../components/UI/helpers";
import useQuery from "../../../hooks/useQuery";
import {
  getSupplierStatement,
  supplierPayment,
} from "../../../redux/action/pharmacy";
import SupplierRecieptPDF from "./SupplierRecieptPDF";

export default function SupplierReport() {
  const today = moment().format("YYYY-MM-DD");
  const aMonthAgo = moment().subtract(1, "month").format("YYYY-MM-DD");
  const query = useQuery();
  const supplier_code = query.get("supplier_code");
  const supplier_name = query.get("supplier_name");
  const balance = query.get("balance");
  const phone = query.get("phone");
  const supplierStatement = useSelector(
    (state) => state.pharmacy.supplierStatement
  );  
  const {activeBusiness} = useSelector(
    (state) => state.auth
  );
  const [print, setPrint] = useState();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    from: aMonthAgo,
    to: today,
    searchTxt: "",
  });

  const { from, to } = form;
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const _getSupplierStatement = useCallback(() => {
    dispatch(getSupplierStatement(form.from, form.to, supplier_code));
  }, [dispatch, form.from, form.to, supplier_code]);
  const fields = [
    {
      title: "S/N",
      custom: true,
      component: (item, index) => index + 1,
      className: "text-center",
    },
    {
      title: "Date",
      custom: true,
      component: (item) => moment(item.created_at).format("DD-MM-YYYY"),
      className: "text-right",
    },
    {
      title: "Description",
      value: "description",
    },
    {
      title: "Quantity",
      custom: true,
      component: (item) =>
        item.quantity === 0 || item.quantity === null
          ? "-"
          : formatNumber(item.quantity),
      className: "text-center",
    },
    {
      title: "Cost Of Items(₦)",
      custom: true,
      component: (item) =>
        item.quantity === null || item.quantity === 0
          ? "-"
          : formatNumber(item.quantity * item.cost_price),
      className: "text-end",
    },
    {
      title: "Amount Paid(₦)",
      custom: true,
      component: (item) =>
        item.cr === 0 || item.cr === null ? "-" : formatNumber(item.cr),
      className: "text-end",
    },
    // {
    //   title: "Total(₦)",
    //   custom: true,
    //   component: (item) => formatNumber(item.total),
    //   className: "text-end",
    // },
  ];
  useEffect(() => {
    _getSupplierStatement();
  }, [_getSupplierStatement]);
  return (
    <CustomCard
      back
      header="Supplier Report"
      headerRight={
        print ? (
          ""
        ) : (
          <CustomButton onClick={() => setPrint(true)} className="text-end">
            Print Report
          </CustomButton>
        )
      }
    >
      {print ? (
        <PDFViewer height="700" width="900">
          <SupplierRecieptPDF
            name={supplier_name}
            data={supplierStatement}
            phone={phone}
            activeBusiness={activeBusiness}
            client={{ from: form.from, to: form.to }}
            balance={balance}
            // agent={user.username}
            title="Supplier Report"
          />
        </PDFViewer>
      ) : (
        <>
          <Row>
            <Col md={6} className="text-center">Supplier Name: {supplier_name}</Col>
            <Col md={6} className="text-center">Balance: {formatNumber(balance)}</Col>
          </Row>
          <hr />
          <DaterangeSelector
            handleChange={(e) => handleChange(e)}
            from={from}
            to={to}
          />
          {/* <div className="m-0 p-0">
        <SearchBar
          name="supplier"
          placeholder="Select supplier..."
          value={form.supplier}
        />
      </div> */}
          <div style={{ height: "64vh" }}>
            <CustomScrollbar>
              <CustomTable fields={fields} data={supplierStatement} />
            </CustomScrollbar>
          </div>
          <div>
            {!supplierPayment.length && (
              <CustomAlert
                text="No report found at this time, please check back later."
                color="warning"
                className="text-center"
              />
            )}
          </div>
        </>
      )}
    </CustomCard>
  );
}
