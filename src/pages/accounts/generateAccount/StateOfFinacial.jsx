import React from "react";
import { CustomTable } from "../../../components/UI";

function StateOfFinacial() {
  const data = [
    {
      title: "Description",
      value: "description",
    },
  ];
  return (
    <div>
      <CustomTable fields={data} className="mt-3" size="sm" />
    </div>
  );
}

export default StateOfFinacial;
