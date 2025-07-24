import React from "react";
import { CustomForm, CustomTable } from "../../../components/UI";
import CustomCard from "../../../components/UI/CustomCard";
import DaterangeSelector from "../../../components/UI/DaterangeSelector";


function PatientIncome() {
    const data = [
        {
            title: "S/N",
            value: "sn"
        },
        {
            title: "Date",
            value: "date"
        },
        {
            title: "Patient Name",
            value: "patient_name"
        },
        {
            title: "Amount (₦)",
            value: "amount"
        },
    ]
  return (
    <div>
        <CustomTable fields={data} className="mt-3" size="sm"/>
    </div>
  );
}

export default PatientIncome;
