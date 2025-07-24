/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as UUIDV4 } from "uuid";
import moment from "moment";
import { CustomButton, CustomForm } from "../../../components/UI";
import CustomTypeahead from "../../../components/UI/CustomTypeahead";
import CustomCard from "../../../components/UI/CustomCard";
import {
  getSupplierInfo,
  supplierPayment,
} from "../../../redux/action/pharmacy";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import _customNotification from "../../../components/UI/_customNotification";
import { useToasts } from "react-toast-notifications";
import { generateReceiptNo, today } from "../../../components/UI/helpers";
import { DepositReceipt } from "./PaymentReceipt";
import { PDFViewer } from "@react-pdf/renderer";
import { Col, Row } from "reactstrap";
import { formatNumber } from "../../../utils";

export default function SupplierPayment() {
  const supplierList = useSelector((state) => state.pharmacy.supplierInfo);
  const facilityId = useSelector((state) => state.auth.user.facilityId);
  const { user, activeBusiness } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const receiptNo = moment().format("YYMDhms");
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [receiptSN, setReceiptSN] = useState(false);
  const initForm = {
    narration: "",
    name: "",
    supplier_code: "",
    modeOfPayment: "CASH",
    amount: 0,
    facilityId,
    balance: 0,
    date: today,
  };
  const [form, setForm] = useState(initForm);
  const _getSupplierInfo = useCallback(() => {
    dispatch(getSupplierInfo());
  }, [dispatch]);
  useEffect(() => {
    _getSupplierInfo();
  }, [_getSupplierInfo]);

  const fields = [
    {
      label: "Select Supplier",
      name: "selectedSupplier",
      value: form.selectedSupplier,
      type: "custom",
      col: 4,

      component: () => (
        <CustomTypeahead
          label={
            <div>
              Select Supplier<span style={{ color: "red" }}>*</span>
            </div>
          }
          labelKey="supplier_name"
          options={supplierList}
          clearButton
          onChange={(s) => {
            if (s.length) {
              console.log(s);
              setForm((p) => ({
                ...p,
                name: s[0].supplier_name,
                supplier_code: s[0].supplier_code,
                acct: `${activeBusiness.prefix}-${s[0].id}`,
                balance: s[0].balance,
              }));
            }
          }}
          onInputChange={(v) => {
            if (v.length) {
              console.log(v, "KDDDDDDDK");
            }
          }}
        />
      ),
    },
    {
      label: "Mode Of Payment",
      type: "select",
      options: ["Cash", "POS", "Transfer", "Credit", "Cheque"],
      name: "modeOfPayment",
      value: form.modeOfPayment,
      col: 4,
      defaultValue: form.modeOfPayment,
    },
    {
      label: "Amount",
      name: "amount",
      type: "number",
      value: form.amount,
      col: 4,
      required: true,
    },
    {
      label: "Narration",
      name: "narration",
      type: "text",
      value: form.narration,
      col: 4,
      // required:true
    },
  ];

  const handleSubmit = () => {
    if (form.name === "" || form.amount === 0) {
      _customNotification(
        addToast,
        "Please complete the required field",
        "warning"
      );
    } else {
      setLoading(true);
      generateReceiptNo((receiptDateSN, receiptSN) => {
        console.log({ receiptDateSN, receiptSN });
        supplierPayment(
          { ...form, receiptDateSN, receiptSN },
          (res) => {
            //   con
            if (res) {
              setLoading(false);
              _customNotification(addToast, "Successfully", "success");
              setReceiptSN(receiptDateSN);
              // setTimeout(() => {
                setPreview(true);
              // }, 100);
            }
          },
          () => {
            setLoading(false);
            _customNotification(addToast, "Error", "error");
          }
        );
      });
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({
      ...p,
      [name]: value,
    }));
  };

  return (
    <CustomCard back header={<h5>Supplier Payment</h5>}>
      {preview ? (
        <PDFViewer height="700" width="1100">
          <DepositReceipt
            depositDetails={form}
            receiptSN={receiptSN}
            user={user.username}
            // activeBusiness={activeBusiness}
            activeBusiness={activeBusiness}
            description={form.narration}
          />
        </PDFViewer>
      ) : (
        <div style={{ height: "75vh" }}>
          <Row>
            <Col md={4} className="text-center">
              Name: {form.name}
            </Col>
            <Col md={4} className="text-center">
              Balance:{formatNumber(form.balance)}
            </Col>
            <Col md={4} className="text-center">
              Receipt No.: {receiptNo}
            </Col>
          </Row>
          <hr />
          <CustomForm fields={fields} handleChange={handleChange} />
          <center>
            <CustomButton onClick={handleSubmit} loading={loading}>
              Submit
            </CustomButton>
          </center>
        </div>
      )}
    </CustomCard>
  );
}
