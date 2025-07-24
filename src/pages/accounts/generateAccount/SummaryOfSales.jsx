import React from "react";
import { Col, Row } from "reactstrap";
import { CustomTable } from "../../../components/UI";

function SummaryOfSales() {
  const data = [
    {
      title: "Description",
      value: "description",
    },
    {
      title: "Amount",
      value: "amount",
    },
  ];
  const datas = [
    {
      title: "Description",
      value: "description",
    },
    {
      title: "Amount (₦) ",
      value: "amount",
    },
  ];
  return (
    <div>
      <Row>
        <Col md={6}>
          <CustomTable fields={data} className="mt-3" size="sm" />
        </Col>
        <Col md={6}>
          <CustomTable fields={datas} className="mt-3" size="sm" />
        </Col>
      </Row>
    </div>
  );
}

export default SummaryOfSales;
