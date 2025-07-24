import { Card, CardBody, CardHeader, Col, Form, FormGroup, Row, Table, Input, Alert, Container } from "reactstrap"

export default Pending

function Pending() {
  return (
    <div className="mt-2">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              Pending Request
              <button style={{
                backgroundColor: "green",
                color: "white",
                height: "30px", width: "100px"
                , float: "right",
                borderWidth: "0px", borderRadius: "3px"
              }}>Refresh</button>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Input type="date" />
                </Col>
                <Col md={6}>
                  <Input type="date" />
                </Col>
                <Col md={12} className="mt-3">
                  <Input type="search" placeholder="Search by patient" />
                </Col>
              </Row>
              <Row>
                <Table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                </Table>
                <center><Alert>List  is empty </Alert></center>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}


