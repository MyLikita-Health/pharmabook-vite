import React, { useState } from "react";
import { CustomButton } from "../../../components/UI";
import CustomModal from "../../../components/UI/CustomModal";
import CustomDrugSaleForm from "./CustomDrugSaleForm";

function NewCustomerModal({
  isOpen = false,
  toggle = (f) => f,
  onSkipClicked = (f) => f,
  onSubmit = (f) => f,
  form = {},
  setForm = (f) => f,
  submitting = false,
  cart = [],
  otherInfo = {},
}) {
  // const [form, setForm] = useState({});
  const handleFormChange = ({ target: { name, value } }) =>
    setForm((p) => ({ ...p, [name]: value }));
  let total = cart.reduce((a, b) => a + parseFloat(b.amount), 0);
  return (
    <CustomModal
      isOpen={isOpen}
      toggle={toggle}
      autoFocus={false}
      header="Customer Details"
      footer={
        <>
          {form.discount > 0 || parseFloat(otherInfo.amountPaid)-parseFloat(total) <0  ? null : (
            <CustomButton
              color="success"
              submitting={submitting}
              onClick={onSkipClicked}
            >
              Skip
            </CustomButton>
          )}
          <CustomButton
            disabled={form.customerName === ""}
            onClick={() => onSubmit(form)}
            submitting={submitting}
          >
            Submit
          </CustomButton>
        </>
      }
    >
      <CustomDrugSaleForm
        form={form}
        handleFormChange={handleFormChange}
        showDeposit={false}
      />
    </CustomModal>
  );
}
export default NewCustomerModal;
