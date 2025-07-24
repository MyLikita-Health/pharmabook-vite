import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { CustomButton, CustomForm } from "../../../components/UI";
import CustomCard from "../../../components/UI/CustomCard";
import { generateReceiptNo } from "../../../components/UI/helpers";
import _customNotification from "../../../components/UI/_customNotification";
import { addNewClent } from "../../../redux/action/pharmacy";

function ClientReg() {
  const [client, setClient] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    amount: 0,
    acct:"",
    description:'Opening Balance'
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const fields = [
    {
      label: "Customer Name",
      col: 6,
      required: true,
      name: "name",
      type: "text",
      value: client.name,
    },
    {
      label: "Address",
      col: 6,
      name: "address",
      type: "text",
      value: client.address,
    },
    {
      label: "Phone Number",
      col: 6,
      name: "phoneNumber",
      type: "text",
      value: client.phoneNumber,
    },
    {
      label: "Email",
      col: 6,
      name: "email",
      type: "text",
      value: client.email,
    },
    {
      label: "Opening Balance",
      col: 6,
      name: "amount",
      type: "number",
      value: client.amount,
    },
    {
      label: "Credit Limit",
      col: 6,
      name: "credit_limit",
      type: "number",
      value: client.credit_limit,
    },
  ];
  const handleFormChange = ({ target: { name, value } }) =>
    setClient((p) => ({ ...p, [name]: value }));
  const handleSubmit = () => {
    if(client.name === ""){
       _customNotification(addToast, "complete the form")
    }else{
    setLoading(true);
    generateReceiptNo((receiptDateSN, receiptSN) => {
      addNewClent(
        {...client,receiptDateSN, receiptSN},
        (res) => {
          if (res) {
            setLoading(false);
             _customNotification(addToast, "Succesfully Submit");
            navigate(-1);
          }
        },
        (err) => {
           _customNotification(addToast, "Error Occured");
          console.log(err);
          setLoading(false);
        }
      );
    })
  }
  };
  return (
    <div>
      <CustomCard header="Client Registration" back>
        <CustomForm fields={fields} handleChange={handleFormChange} />
        <center>
          <CustomButton loading={loading} onClick={handleSubmit}>
            Save Customer
          </CustomButton>
        </center>
      </CustomCard>
    </div>
  );
}

export default ClientReg;
