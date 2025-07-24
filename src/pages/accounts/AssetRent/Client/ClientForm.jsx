import React from "react";
import { Col, Row } from "reactstrap";
import { CustomButton, RadioGroup } from "../../../../components/UI";
import CustomCard from "../../../../components/UI/CustomCard";
import CustomForm from "../../../../components/UI/CustomForm";
export default function ClientForm({
  client = {},
  handleClient,
  handleContactTypeRadio = (f) => f,
  handleSubmit = (f) => f,
  loading = false,
}) {
  const fields = [
    {
      label: "Account Type",
      name: "accType",
      type: "select",
      options: ["Single", "Family", "Cooporate"],
      col: 3,
      value: client.accType,
    },
    {
      label: "Client Account No",
      name: "clientAccno",
      type: "number",
      placeholder: "6269",
      col: 3,
      offset: 3,
      value: client.clientAccno,
    },
    {
      label: "Beneficiary Number",
      name: "beneficiaryNo",
      type: "number",
      col: 3,
      value: client.beneficiaryNo,
    },
    {
      label: "Full Name",
      col: 6,
      name: "fullName",
      value: client.fullName,
    },
    {
      type: "select",
      col: 3,
      label: "Gender",
      name: "gender",
      value: client.gender,
      options: ["male", "female", "other"],
    },
    {
      type: "date",
      label: "Date of Birth",
      name: "date",
      col: 3,
      value: client.date,
    },
    {
      label: "Marital Status",
      name: "maritalStatus",
      type: "select",
      options: ["yes", "no"],
      value: client.maritalStatus,
    },
    {
      label: "Occupation",
      name: "occupation",
      value: client.occupation,
    },
    {
      label: "Address",
      name: "address",
    },
    {
      label: "Deposit",
      col: 6,
      name: "deposit",
      type: "number",
      value: client.deposit,
    },
    {
      label: "Mode Of Payment",
      col: 6,
      name: "payment",
      type: "select",
      options: ["cash", "bank transfer", "pos"],
      value: client.payment,
    },
  ];
  const contact_fields = [
    {
      label: "Name",
      col: 6,
      name: "contactName",
      type: "text",
      value: client.contactName,
      identify: true,
    },
    {
      label: "Contact Address",
      identify: false,
      col: 6,
      name: "contactAddress",
      type: "text",
      value: client.contactAddress,
    },
    {
      label: "Phone Number",
      col: 6,
      identify: false,
      name: "contactPhoneNumber",
      type: "text",
      value: client.contactPhoneNumber,
    },
    {
      label: "Email",
      col: 6,
      name: "contactEmail",
      type: "text",
      value: client.contactEmail,
      identify: true,
    },
    {
      label: "Website (optional)",
      col: 6,
      name: "contactWebsite",
      type: "text",
      identify: false,
      value: client.contactWebsite,
    },
  ];

  return (
    <div>
      <CustomCard header="Basic Information" back>
        <CustomForm
          fields={fields}
          handleChange={handleClient}
          handleClient={handleClient}
        />
        <CustomCard container="bg-light">
          <Row>
            <Col md={3}>
              <div className="h5 p-1 bg-dark text-white m-0 p-0 text-center rounded">
                Contact Person:
              </div>
            </Col>
            <Col className="offset-3">
              <RadioGroup
                options={[
                  { label: "Self", name: "self" },
                  { label: "Other", name: "other" },
                ]}
                name="contactType"
                value={client.contactType}
                onChange={handleContactTypeRadio}
              />
            </Col>
          </Row>
          <CustomForm
            handleChange={handleClient}
            fields={
              client.contactType === "other"
                ? contact_fields
                : contact_fields.filter((item) => item.identify !== false)
            }
          />
        </CustomCard>
        <center>
          <CustomButton
            className="mt-2"
            loading={loading}
            onClick={handleSubmit}
          >
            Submit
          </CustomButton>
        </center>
      </CustomCard>
    </div>
  );
}
