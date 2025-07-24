import { Card, CardHeader, Col, Row, CardBody, Form, FormGroup, Table, Input, Button } from "reactstrap"

export default Sample

function Sample() {
    return (
        <div className="mt-2">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <button style={{
                                backgroundColor: "skyblue",
                                color: "white",
                                borderRadius: "3px",
                                borderWidth: "0px",
                                height: "40px"
                            }}>Quick search</button>
                            {/* <center>Simpla Tracing</center> */}
                            <button style={{
                                float: "right",
                                backgroundColor: "skyblue",
                                color: "white",
                                borderRadius: "3px",
                                borderWidth: "0px",
                                height: "40px",


                            }}>Sample Tracing</button>
                        </CardHeader>
                        <CardBody>

                            <FormGroup>
                                <Input type="date" style={{ borderRadius: "3px", float: "right", width: "150px" }} />
                                <Input type="date" style={{ borderRadius: "3px", width: "150px", margin: "10px" }} />
                                <Input type="text" style={{ borderRadius: "3px", width: "100%" }} />
                            </FormGroup>
                            <Row>
                                <Col md={3}>
                                    <Button
                                        style={{
                                            backgroundColor: "yellowgreen",
                                            color: "white", height: "40px",
                                            width: "155px", borderWidth: "0px"
                                        }}>
                                        Reported
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    <Button style={{
                                        backgroundColor: "seagreen",
                                        color: "white",
                                        height: "40px",
                                        width: "155px",
                                        borderWidth: "0px"
                                    }}>
                                        Analyzed
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    <Button style={{
                                        backgroundColor: "brown",
                                        color: "white",
                                        height: "40px",
                                        width: "155px",
                                        borderWidth: "0px"
                                    }}>
                                        Sample Collected
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    <Button style={{
                                        backgroundColor: "wheat",
                                        color: "white",
                                        height: "40px",
                                        width: "150px",
                                        borderWidth: "0px"
                                    }}>
                                        Pending
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}


