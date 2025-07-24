import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHeader, Col, Row, CardBody } from "reactstrap";
import useQuery from "../../../../hooks/useQuery";
import DaterangeSelector from "../../../../components/UI/DaterangeSelector";
import CustomCard from "../../../../components/UI/CustomCard";
import { getPatientAccountView } from "../../../../redux/action/pharmacy";
import {
  CustomButton,
  CustomForm,
  CustomTable,
} from "../../../../components/UI";
import { formatNumber } from "../../../../components/UI/helpers";
import BackButton from "../../../../components/UI/BackButton";
import { PDFViewer } from "@react-pdf/renderer";
import ClientRecieptPDF from "./ClientRecieptPDF";
import SupplierRecieptPDF from "../../../pharmacy/supplier/SupplierRecieptPDF";
import CustomScrollbar from "../../../../components/UI/CustomScrollbar";
import CustomModal from "../../../../components/UI/CustomModal";
import _customNotification from "../../../../components/UI/_customNotification";
import { useToasts } from "react-toast-notifications";
import { _postApi } from "../../../../redux/action/api";
import { useNavigate } from "react-router-dom";
export default function ViewClient() {
  const dispatch = useDispatch();
  const query = useQuery();
  const [print, setPrint] = useState(false);
  const acct = query.get("accountNo");
  const accName = query.get("accName");
  const phone = query.get("phone");
  const email = query.get("email");
  const balance = query.get("balance");
  const credit_limit = query.get("credit_limit");
  const { addToast } = useToasts();
  // alert(balance)
  const clientStatement = useSelector(
    (state) => state.pharmacy.clientStatement
  );
  const activeBusiness = useSelector((state) => state.auth.activeBusiness);
  const { user } = useSelector((s) => s.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const contactPhone = query.get("contactPhone");
  // const contactAddress = query.get("contactAddress");
  // const customerId = query.get("id");
  const today = moment.utc().format("YYYY-MM-DD");
  const yearStart = moment().startOf("year").format("YYYY-MM-DD");
  const [range, setRange] = useState({
    from: yearStart,
    to: today,
  });
  const initialState = {
    credit_limit: credit_limit,
    accName: accName,
    balance:
      accName === "walk-in"
        ? formatNumber(Math.abs(balance))
        : formatNumber(balance),
  };
  const [form, setForm] = useState(initialState);

  const _getPatientAccountView = useCallback(() => {
    dispatch(getPatientAccountView(range.from, range.to, acct));
  }, [acct, dispatch, range.from, range.to]);

  useEffect(() => {
    _getPatientAccountView();
  }, [_getPatientAccountView]);

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
      component: (item) => item.date,
      // className: "text-c",
    },
    {
      title: "description",
      custom: true,
      component: (item) => item.description,
      // className: "text-c",
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
        item.cr === null || item.cr === 0 ? "-" : formatNumber(item.cr),
      className: "text-end",
    },
    {
      title: "Amount Paid(₦)",
      custom: true,
      component: (item) =>
        item.dr === 0 || item.dr === null ? "-" : formatNumber(item.dr),
      className: "text-end",
    },
    // {
    //   title: "Total(₦)",
    //   custom: true,
    //   component: (item) => formatNumber(item.total),
    //   className: "text-end",
    // },
  ];
  const business_logo = activeBusiness?.business_logo;
  const business_address = activeBusiness?.business_address;
  const business_name = activeBusiness?.business_name;
  const state_of_practice = activeBusiness?.state_of_practice;
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const _fields = [
    {
      label: "Name",
      name: "accName",
      value: form.accName,
      type: "text",
      disabled: true,
    },
    {
      label: "Balance",
      name: "balance",
      value: form.balance,
      type: "text",
      disabled: true,
    },

    {
      label: "Credit limit",
      name: "credit_limit",
      value: form.credit_limit,
      type: "number",
      autoFocus: true,
    },
  ];
  const handleChange = ({ target: { name, value } }) => {
    console.log({ name, value });
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    _postApi(
      `/pharmacy/v1/update-credit-limit`,
      {
        ...form,
        facilityId: user?.facilityId,
        acct: acct,
      },
      (res) => {
        if (res.success) {
          setLoading(false);
          _customNotification(addToast, "Successfully updated", "success");
          _customNotification(addToast, "Successfully updated", "success");
          navigate(-1);
          toggle();
          setForm(initialState);
        }
      },
      (err) => {
        console.log(err);
        _customNotification(
          addToast,
          `Error occured ${JSON.stringify(err)}`,
          "warning"
        );
        setLoading(false);
      }
    );
  };
  return (
    <CustomCard
      back
      header="Customer Overview"
      headerRight={
        print ? (
          ""
        ) : (
          <>
            <CustomButton outline onClick={toggle} className="text-end  p-1">
              Edit credit limit
            </CustomButton>
            <CustomButton
              onClick={() => setPrint(true)}
              className="text-end m-1 p-1"
            >
              Print Report
            </CustomButton>
          </>
        )
      }
    >
      {print ? (
        <PDFViewer height="700" width="900">
          <SupplierRecieptPDF
            data={clientStatement}
            type="supplier"
            name={accName}
            balance={balance}
            phone={phone}
            email={email}
            bussiness_logo={business_logo}
            state_of_practice={state_of_practice}
            business_address={business_address}
            business_name={business_name}
            client={{ from: range.from, to: range.to }}
            activeBusiness={activeBusiness}
            // agent={user.username}
            title="Client report"
          />
        </PDFViewer>
      ) : (
        <>
          <Row className="p-0 m-0">
            <Col md={4} className="text-center">
              Name: {accName}
            </Col>
            <Col md={4} className="text-center">
              Credit limit: {formatNumber(credit_limit)}
            </Col>
            <Col md={4} className="text-center">
              Balance:{" "}
              {accName === "walk-in"
                ? formatNumber(Math.abs(balance))
                : formatNumber(balance)}
            </Col>
          </Row>
          <hr />
          <DaterangeSelector
            from={range.from}
            to={range.to}
            handleChange={({ target: { name, value } }) =>
              setRange((p) => ({ ...p, [name]: value }))
            }
          />
          <CustomScrollbar style={{ height: "57vh" }}>
            <CustomTable data={clientStatement} fields={fields} />
          </CustomScrollbar>
        </>
      )}

      <CustomModal
        isOpen={isOpen}
        toggle={toggle}
        autoFocus={false}
        header="Update credit limit"
        footer={
          <>
            <CustomButton outline onClick={toggle}>
              Cancel
            </CustomButton>
            <CustomButton onClick={handleSubmit} loading={loading}>
              Update
            </CustomButton>
          </>
        }
      >
        <CustomForm fields={_fields} handleChange={handleChange} />
      </CustomModal>
    </CustomCard>
  );
}
