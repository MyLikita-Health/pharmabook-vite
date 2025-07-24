import React, { useCallback, useEffect, useState } from "react"
import paracetamol from './paracetamol.jpg'

import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter, Label, Container, Table, TabContent, Nav, NavItem, NavLink, TabPane, } from "reactstrap"
import CustomCard from "../../../components/UI/CustomCard";
import { endpoint } from "../../../redux/action/pharmacy";
import { _fetchApi, _postApi } from "../../../redux/action/api";
import { useNavigate, useParams } from "react-router-dom";
import classnames from 'classnames';
import { Edit } from "react-feather";
import { CustomButton } from "../../../components/UI";


function DrugViews() {
    const [results,setResults]=useState([])
    const params = useParams()
    const navigate = useNavigate()
       const [currentActiveTab, setCurrentActiveTab] = useState('4');
  
    // Toggle active state for Tab
    const toggle = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }
    const getIds = useCallback(() => {
        let id = params.id;
        _postApi(
            `/${endpoint}/v1/drugId?id=${id}`,
            // form,
              {},
              (data) => {
                if (data.success) {
                  setResults(data.results)
                 }
                },
                )
      },[params]);
      useEffect(() => {
        getIds();
      }, [getIds]);
    return (
        <CustomCard back header="view drug">
            {/* {JSON.stringify(results[0])} */}
        <Container>
            <Row className="">
                <Col md={2}>
                    <img src={results[0]&&results[0].image} width="150" />
                </Col>
                <Col style={{ float: "left", marginRight: "100px" }}  md={3}>
                    <p> Generic Name: {results[0]&&results[0].generic_name}</p>
                    <p> Brand Name: {results[0]&&results[0].name}</p>
                    <p> Short Description: {results[0]&&results[0].short_description}</p>
                </Col >
                <Col md={2}><CustomButton><Edit/> Edit</CustomButton></Col>
                <Col></Col>

            </Row>
           
                <Row>
                    <Col>
                     
                          
                                <div >
            
            <Nav tabs>
              
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '4'
                        })}
                        onClick={() => { toggle('4'); }}
                    >
                        Long Description
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '5'
                        })}
                        onClick={() => { toggle('5'); }}
                    >
                        Drug Usage
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '6'
                        })}
                        onClick={() => { toggle('6'); }}
                    >
                       Side Effects
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '7'
                        })}
                        onClick={() => { toggle('7'); }}
                    >
                      Ingredient
                    </NavLink>
                </NavItem>
                 <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '8'
                        })}
                        onClick={() => { toggle('8'); }}
                    >
                        Warning
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <Card>
                                
                                <CardBody>
                                    <div><b>Generic Name :</b> {results[0]&&results[0].generic_name}</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                        <Card>
                                
                                <CardBody>
                                    <div><b>Brand Name :</b> {results[0]&&results[0].name}</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                        <Card>
                                
                                <CardBody>
                                    <div><b>Short Description :</b> {results[0]&&results[0].short_description}</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="4">
                    <Row>
                        <Col sm="12">
                        <Card>
                                
                                <CardBody>
                                    <div><b></b> {results[0]&&results[0].long_description}</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="5">
                    <Row>
                        <Col sm="12">
                        <Card>
                                
                                <CardBody>
                                    <div><b></b> {results[0]&&results[0].drug_usage}</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="6">
                    <Row>
                        <Col sm="12">
                        <Card>
                                
                                <CardBody>
                                    <div><b></b> {results[0]&&results[0].side_effect}</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="7">
                    <Row>
                        <Col sm="12">
                        <Card>
                                
                                <CardBody>
                                    <div><b></b> {results[0]&&results[0].ingredients}</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="8">
                    <Row>
                        <Col sm="12">
                        <Card>
                                
                                <CardBody>
                                    <div><b></b> {results[0]&&results[0].warning}</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div >

                               


                              

                              
                      
                    </Col>
                </Row>
            
        </Container>
        </CustomCard>
    )
}
export default DrugViews;