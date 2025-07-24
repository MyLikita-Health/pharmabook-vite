import React, { useState } from "react";
import { CustomButton, CustomForm, CustomTable } from "../../../components/UI";
import CustomCard from "../../../components/UI/CustomCard";
import DaterangeSelector from "../../../components/UI/DaterangeSelector";
import Expenses from "./Expenses";
import PatientIncome from "./PatientIncome";
import Revenue from "./Revenue";
import SummaryOfSales from "./SummaryOfSales";
import StateOfFinacial from "./StateOfFinacial";
import TrialBallance from "./TrialBallance";
import { Row } from "reactstrap";

function GenerateAccountReport() {
  const [form, setForm] = useState({
    select_report_type: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
      title: "Paid (₦)",
      value: "paid",
    },
  ];
  const fields = [
    {
      name: "select_report_type",
      label: "Select Report Types",
      type: "select",
      value: form.select_report_type,
      options: [
        "Daily Total",
        "Patient Income",
        "Summary of Sales and Expenses",
        "Reneue",
        "Expenses",
        "Statement Of Finacial Position",
        "Trial Balance",
      ],
    },
  ];
  return (
    <div>
      <>
        <CustomCard header="Generate Account Report">
          <DaterangeSelector />
          <div className=" d-flex flex-direction-row justify-content-between align-items-center">
            <div className="col-md-9">
              <CustomForm fields={fields} handleChange={handleChange} />
            </div>
            <CustomButton>Export / Download</CustomButton>
          </div>
          {form.select_report_type === "" ? (
            <>
              <CustomTable fields={data} size="sm" className="mt-3" />
            </>
          ) : form.select_report_type === "Daily Total" ? (
            <>
              <CustomTable fields={data} size="sm" className="mt-3" />
            </>
          ) : form.select_report_type === "Patient Income" ? (
            <>
              <PatientIncome />
            </>
          ) : form.select_report_type === "Summary of Sales and Expenses" ? (
            <>
              <SummaryOfSales />
            </>
          ) : form.select_report_type === "Reneue" ? (
            <>
              <Revenue />
            </>
          ) : form.select_report_type === "" ? (
            <>
              <Expenses />
            </>
          ) : form.select_report_type === "Statement Of Finacial Position" ? (
            <>
              <StateOfFinacial />
            </>
          ) : form.select_report_type === "Trial Balance" ? (
            <>
              <TrialBallance />
            </>
          ) : (
            ""
          )}
        </CustomCard>
      </>
    </div>
  );
}

export default GenerateAccountReport;
