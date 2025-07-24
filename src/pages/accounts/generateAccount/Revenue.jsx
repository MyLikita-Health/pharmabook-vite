import React from "react";
import { CustomTable } from "../../../components/UI";

function Revenue() {
  const data = [
    {
      title: "Date",
      value: "date",
    },
    {
        title: "Description",
        value: "description",
      },
      {
        title: "Client",
        value: "client",
      },
      {
        title: "Amount",
        value: "amount",
      },
  ];
  return (
    <div>
      <CustomTable fields={data} className="mt-3" size="sm" />
    </div>
  );
}

export default Revenue;
