
import React, { useEffect, useState } from "react";
import paracetamol from './paracetamol.jpg'
import { Card, CardHeader, CardBody, Row, Col, Button, Input, Container, Table, } from "reactstrap"
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../../redux/action/pharmacy";
import { _postApi } from "../../../redux/action/api";
import store from "../../../redux/store";

function Description() {
  const navigate = useNavigate()
  const facilityId = store.getState().auth.user.facilityId;
  const [results, setResults] = useState([])
  const getDrugList = () => {
    _postApi(
      `/${endpoint}/v1/drug-list?facilityId=${facilityId}&query_type=select`,
      // form,
      {},
      (data) => {
        if (data.success) {
          setResults(data.results)
        }
      },
    )
    // )
  };

  useEffect(() => {
    getDrugList();
  }, []);
  return (
    <Row className="mt-3">
      {/* {JSON.stringify(results)} */}
      <Col>
        <Container>
          <Card>
            <center><CardHeader className="bg-primary text-white">Description Drug Information</CardHeader></center>
            <CardBody>
              <Button color="primary" className="mt-3" onClick={() => navigate("drug")}>Add New</Button>
              <Row className="mt-4">
                <Col md="8">
                  <Input type="search" placeholder="search" />
                </Col>

                <Col md="4">
                  <Input type="selet" placeholder="Filter By Category" />
                </Col>
                <Table className="mt-4 table table-bordered">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Image</th>
                      <th>Brand Name</th>
                      <th>Generic Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {results && results.map((i, index) => <tr>
                      <td>{index + 1}</td>
                      <img
                        src={i.image} width="70" />
                      <td>{i.name}</td>
                      <td>{i.generic_name}</td>
                      <td>{i.short_description}</td>
                      <td><Button onClick={() => navigate(`view/${i.id}`)} color="success">View</Button>&nbsp;<Button color="primary" onClick={() => navigate(`drug/${i.id}`)}>Edit</Button>&nbsp;<Button color="danger">Delete</Button></td>
                    </tr>)}




                  </tbody>

                </Table>

              </Row>
            </CardBody>
          </Card>
        </Container>
      </Col>
    </Row>
  )
}

export default Description;
