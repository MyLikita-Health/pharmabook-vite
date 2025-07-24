// import { useSelector } from 'react-redux'
import { Row, Col, FormGroup } from "reactstrap";
import TextInput from "./TextInput";

function DaterangeSelector({ from, to, handleChange ,disabled=false}) {
  // const activeBusiness = useSelector((state) => state.auth.activeBusiness)

  return (
    <Row>
      <Col md={4}>
        <FormGroup>
          <TextInput
            label="From (date):"
            type="date"
            value={from}
            name="from"
            onChange={handleChange}
            disabled={disabled}
          />
        </FormGroup>
      </Col>

      <Col md={4}></Col>

      <Col md={4}>
        <FormGroup>
          <TextInput
            type="date"
            value={to}
            disabled={disabled}
            name="to"
            onChange={handleChange}
            label="To (date):"
          />
        </FormGroup>
      </Col>
    </Row>
  );
}

export default DaterangeSelector;
