import { PDFViewer } from "@react-pdf/renderer";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { CustomButton, CustomForm } from "../../../components/UI";
import CustomCard from "../../../components/UI/CustomCard";
import CustomTypeahead from "../../../components/UI/CustomTypeahead";
import { generateReceiptNo } from "../../../components/UI/helpers";
import _customNotification from "../../../components/UI/_customNotification";
import { addNewClent, getClientInfo } from "../../../redux/action/pharmacy";
import { DepositReceipt } from "../../pharmacy/supplier/PaymentReceipt";

export default function Deposit() {
  const [form, setForm] = useState({
    modeOfPayment: "CASH",
    description: "",
    amount: 0,
  });
  const [loading, setLoading] = useState(false);
  const clientInfo = useSelector((state) => state.pharmacy.clientInfo);
  const { activeBusiness } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [receiptSN, setReceiptSN] = useState("");
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const _getClientInfo = useCallback(() => {
    dispatch(getClientInfo());
  }, [dispatch]);
  useEffect(() => {
    _getClientInfo();
  }, [_getClientInfo]);
  const fields = [
    {
      type: "custom",
      component: () => (
        <CustomTypeahead
          label={
            <div>
              Select Client<span style={{ color: "red" }}>*</span>
            </div>
          }
          labelKey="accName"
          options={clientInfo}
          onChange={(s) => {
            if (s.length) {
              console.log(s);
              setForm((p) => ({
                ...p,
                acct: s[0].accountNo,
                name: s[0].accName,
                balance: s[0].balance,
              }));
            }
          }}
        />
      ),
    },
    {
      name: "balance",
      label: "Balance",
      value: form.balance,
      col: 3,
      disabled: "disabled",
    },
    {
      name: "amount",
      label: "Amount Paid",
      col: 5,
      required: true,
    },
    {
      label: "Mode Of Payment",
      type: "select",
      options: Object.values({
        CASH: "CASH",
        POST: "POS",
        BANK_TRANSFER: "BANK TRANSFER",
        CREDIT: "CREDIT",
        CHEQUE: "CHEQUE",
      }),
      name: "modeOfPayment",
      value: form.modeOfPayment,
      col: 6,
    },
    {
      name: "description",
      label: "Narration",
      col: 6,
      value: form.description,
      // required:true
    },
  ];
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };
  const handleSubmit = () => {
    if (form.acct === "" || form.amount === 0) {
      _customNotification(
        addToast,
        "Please complete the required field ",
        "warning"
      );
    } else {
      setLoading(true);
      generateReceiptNo((receiptDateSN, receiptSN) => {
        addNewClent(
          { ...form, receiptDateSN, receiptSN },
          (res) => {
            if (res) {
              setLoading(false);
              _customNotification(addToast, "Succesfully Submit", "success");
              setReceiptSN(receiptDateSN);
              setPreview(true);
            }
          },
          (err) => {
            _customNotification(addToast, "Error Occured", "warning");
            console.log(err);
            setLoading(false);
          }
        );
      });
    }
  };
  return (
    <div>
      <CustomCard header="Deposit Form" back>
        {preview ? (
          <PDFViewer height="700" width="1100">
            <DepositReceipt
              depositDetails={form}
              receiptSN={receiptSN}
              user={user.username}
              activeBusiness={activeBusiness}
              description={form.description}
            />
          </PDFViewer>
        ) : (
          <>
            <CustomForm fields={fields} handleChange={handleChange} />
            {/* {JSON.stringify(form)} */}
            <center>
              <CustomButton onClick={handleSubmit} loading={loading}>
                Save
              </CustomButton>
            </center>
          </>
        )}
      </CustomCard>
    </div>
  );
}
