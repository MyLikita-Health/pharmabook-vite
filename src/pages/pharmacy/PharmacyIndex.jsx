import { Outlet } from "react-router";
import { Col, Row } from "reactstrap";
import useQuery from "../../hooks/useQuery";
import DrugAlerts, { OutOfStock } from "./drug/DrugAlerts";

export default function PharmacyIndex() {
  const query = useQuery();
  const type = query.get("type");
  return (
    <div className="">
      <div>
        {/* {type === "with-alert" ? (
         
        ) : type === "sales" ? (
          <DrugSale />
        ) : type === "salesPage" ? (
          
        ) : type === "return" ? (
          <ReturnItem />
        ) : ( */}
        <Row className="mt-1 m-0">
          <Outlet />
        </Row>
      </div>
    </div>
  );
}

export const MainWrapper = (props) => {
  return (
    <Row className="m-0">
      <Col md={2} className="px-1">
        <OutOfStock />
      </Col>
      <Col md={8} className="px-1">
        {props.children}
      </Col>
      <Col className="px-1" md={2}>
        <DrugAlerts />
      </Col>
    </Row>
  );
};
