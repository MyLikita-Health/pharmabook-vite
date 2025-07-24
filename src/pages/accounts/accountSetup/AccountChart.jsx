import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import { Form, FormGroup, Card, CardHeader, CardBody } from "reactstrap";
// import ChartTree from './ChartTree';
import { createAccHead, getAccHeads } from "../../../redux/action/transactions";
import { getAccChart } from "../../../redux/action/account";
import { apiURL, _fetchApi } from "../../../redux/action/api";
import Tree from "../sortable-tree";

function AccountChart() {
    const [state, setState] = useState({
        head: "",
        subHead: "",
        description: "",
        accountCharFormAlert: "",
        deletable: false,
      });
      const dispatch = useDispatch();
      const headRef = React.createRef();
      const transaction = useSelector((p) => p.transaction);
      //   const {accHeads,} = transaction
      const account = useSelector((p) => p.account);
    
      const getNextCode = (subhead) => {
        _fetchApi(
          `${apiURL}/account/chart/next-code/${subhead}`,
          (data) => {
            setState((p) => ({ ...p, description: data.results }));
          },
          (err) => {
            console.log(err);
          }
        );
      };
      const handleChange = ({ target: { name, value } }) => {
        setState((p) => ({ ...p, [name]: value }));
      };
      //   const setHead = (head) => setState((p) => ({ ...p, head: head }));
      const setSubHead = (subHead) => setState((p) => ({ ...p, subHead: subHead }));
      //   const setDescription = (description) =>
      //     setState((p) => ({ ...p, description: description }));
      //   const setAlert = (accountCharFormAlert) =>
      //     setState((p) => ({ ...p, accountCharFormAlert: accountCharFormAlert }));
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const { head, subHead, description, setAlert } = state;
        if (head === "") {
          setAlert("Please provide Account Head");
        } else {
          const data = { head, subHead, description };
          dispatch(createAccHead(data, resetForm));
        }
      };
    
      const handleDelete = () => {};
    
      useEffect(() => {
        dispatch(getAccHeads());
        dispatch(getAccChart());
      });
    
      const resetForm = () => setState({ head: "", description: "" });
    
      const handleChartClick = (node) => {
        setState((p) => ({ ...p, subHead: node.title }));
        headRef.current.setState({
          text: `${node.description} (${node.title})`,
          deletable: !node.children.length,
        });
        // console.log(node.children.length);
        getNextCode(node.title);
      };
    
      return (
        <Card>
          <CardHeader>
            <h5>Chart of Account Setup</h5>
          </CardHeader>
          <CardBody>
            <div className="row">
              <Form className="col-md-4 col-lg-4">
                <FormGroup>
                  <label>Select Account Head</label>
                  <Typeahead
                    id="head"
                    align="justify"
                    labelKey={(item) => `${item.description} (${item.head})`}
                    options={account?.accHeads || []}
                    onChange={(val) => {
                      if (val.length) {
                        let selected = val[0];
                        setSubHead(selected["head"]);
                        getNextCode(selected.description);
                        // console.log(selected);
                      }
                    }}
                    // onInputChange={head => setSubHead(head)}
                    // allowNew
                    ref={headRef}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Account Subhead Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                    value={state.description}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Account Subhead Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="head"
                    onChange={handleChange}
                    value={state.head}
                  />
                </FormGroup>
    
                <center>
                  <span style={{ color: "red" }}>
                    {state.accountCharFormAlert.length
                      ? state.accountCharFormAlert
                      : null}
                  </span>
                </center>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Create
                </button>
                {state.deletable && (
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                )}
                {/* {JSON.stringify(this.props.accChartTree)} */}
              </Form>
              <div className="col-md-8 col-lg-8">
                {/* {} */}
                {/* <ChartTree tree={this.props.accChartTree} /> */}
                <Tree
                  treeInfo={account?.accChartTree || []}
                  // getNodeKey={({ node }) => node.id}
                  generateNodeProps={({ node, path }) => ({
                    title: `${node.title} - ${node.description}`,
                    buttons: [
                      <button
                        className="btn btn-outline"
                        onClick={() => handleChartClick(node)}
                      >
                        Edit
                      </button>,
                      //   !node.children.length &&<button
                      //   className="btn btn-outline"
                      //   onClick={() => handleChartClick(node)}
                      // >
                      //   Edit
                      // </button>,
                    ],
                    // style: { backgroundColor:'red'}
                  })}
                  treeLoading={false}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      );
    }

export default AccountChart;


