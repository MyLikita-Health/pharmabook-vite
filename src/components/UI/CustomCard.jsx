import React from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";
import BackButton from "./BackButton";

function CustomCard(props) {
  const { header, footer, back, headerRight, full_width } = props;
  const activeBusiness = useSelector((state) => state.app.theme);

  return (
    <Card
      className={`${props.container}`}
      // outline
      style={{
        ...props.style,
        borderWidth: 1,
        borderColor: activeBusiness.primary_color,
        borderStyle: "solid",
      }}
    >
      {header && (
        <CardHeader
          // className={`py-2`}
          style={{
            borderBottom: `1px solid ${activeBusiness.primary_color}`,
            // backgroundColor: activeBusiness.primary_color,
            color: activeBusiness.primary_color,
            paddingTop: ".1rem",
            paddingBottom: "0rem",
          }}
          className={back ? "row m-0 p-0 align-items-center" : "row m-0 p-0"}
        >
          {full_width ? (
            <Row className="pb-1 pt-1">{header}</Row>
          ) : (
            <Row className="pb-1 pt-1">
              <Col>
                {back && <BackButton size="sm" outline text="Go Back" />}
              </Col>

              <Col>
                <h5
                  className={back ? "p-0 text-center" : "text-center"}
                  style={{ color: activeBusiness.primary_color || "#EEE" }}
                >
                  {header}
                </h5>
              </Col>
              {/* <div className={back ? 'col-md-6' : ''}>{header}</div> */}
              <Col className="text-white text-end">
                {headerRight ? headerRight : ""}
              </Col>
            </Row>
          )}
        </CardHeader>
      )}
      <CardBody className={props.body}>{props.children}</CardBody>
      {footer && (
        <CardFooter
          style={{
            borderBottom: `1px solid ${activeBusiness.primary_color}`,
            backgroundColor: activeBusiness.primary_color,
            color: activeBusiness.secondary_color,
            // paddingTop: '.4rem',
            // paddingBottom: '.4rem',
          }}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

export default CustomCard;
