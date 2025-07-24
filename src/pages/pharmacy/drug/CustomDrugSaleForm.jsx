import React from "react";
import { Row } from "reactstrap";
import { CustomForm, TextInput } from "../../../components/UI";
// import SimpleInput from "../../components/SimpleInput";

function  CustomDrugSaleForm({
  form = {},
  handleFormChange = (f) => f,
  showDeposit = true,
}) {
  const fields = [
    {
      label: "Customer Name",
      name: "customerName",
      type: "text",
      value: form.customerName,
      required: true,
      autoFocus:true
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      value: form.address,
      // required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
      value: form.phone,
      // required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      value: form.email,
      // required: true,
    },
    {
      label: "Deposit Amount",
      name: "_amount",
      type: "number",
      value: form._amount,
      hide: !showDeposit,
    },
    {
      label: "Credit Limit",
      name: "credit_limit",
      type: "number",
      value: form.credit_limit,
      hide: true,
      // required: true,
    },
  ];

  return (
    <Row>
      <CustomForm fields={fields} handleChange={handleFormChange}/>
    </Row>
  );
}

export default CustomDrugSaleForm;
