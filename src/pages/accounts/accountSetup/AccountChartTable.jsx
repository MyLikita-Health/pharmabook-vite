import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomTable } from "../../../components/UI";

export default function AccountChartTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fields = [
    { title: "Description", value: "description" },
    { title: "Head", value: "head" },
    { title: "Subhead", value: "subhead" },
    { title: "Action", value: "subhead" },
  ];

  return (
    <div>
      <CustomButton
        onClick={() => navigate("/app/accounts/account-chart-setup/tree")}
      >
        + Click To Add New
      </CustomButton>
      <h1>Account Table</h1>
      <CustomTable fields={fields} data={data} />
    </div>
  );
}
