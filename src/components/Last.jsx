
import { Card, CardHeader, Col, Row, CardBody, Table, Input,  } from "reactstrap"
export default Last;


function Last() {
  return (
    <div className="mt-3">
      <>
        <Row>
          <Col>
            <Card>
              <CardHeader>Patients Record</CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <Input type="search" placeholder="Search"/>
                  </Col>
                </Row>
                <Row>
                  <Table className="table table-bordered mt-3">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Name</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                  </Table>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    </div>
  )
}






