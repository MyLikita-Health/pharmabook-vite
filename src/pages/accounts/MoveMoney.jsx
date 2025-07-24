import React, { useState } from "react";
import { CustomButton, CustomForm } from "../../components/UI";
import CustomCard from "../../components/UI/CustomCard";

function MoveMoney() {
  let _form = {
    date: "",
    from: "",
    to: "",
    amount: "",
    comment: "",
  };
  const [form, setForm] = useState(_form);

  const handleChange = ({ target: { name, value } }) =>
    setForm((p) => ({ ...p, [name]: value }));

  const fields = [
    {
      name: "date",
      type: "date",
      offset: 6,
      label: "date",
      col: 6,
      value: form.date,
    },
    {
      name: "from",
      label: "From",
      col: 6,
      value: form.from,
    },
    {
      name: "to",
      label: "TO",
      col: 6,
    },
    {
      name: "amount",
      type: "number",
      label: "Amount",
      col: 6,
      value: form.amount,
    },
    {
      name: "comment",
      label: "Comment (optional)",
      col: 6,
      value: form.comment,
    },
  ];
  return (
    <div>
      <CustomCard header="Move Money" back>
        <CustomForm fields={fields} handleChange={handleChange} />
        <center>
          <CustomButton>Move Money Now</CustomButton>
        </center>
      </CustomCard>
    </div>
  );
}

export default MoveMoney;
