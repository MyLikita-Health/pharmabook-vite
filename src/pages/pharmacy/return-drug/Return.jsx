import React, { useState } from "react";
import "./hover.css";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  Row,
  Table,
} from "reactstrap";
// import CustomButton from '../../../app/components/Button'
// import { formatNumber } from '../../../app/utilities'
import { CustomButton, SearchBar } from "../../../components/UI";
import { formatNumber } from "../../../components/UI/helpers";
import CustomCard from "../../../components/UI/CustomCard";
import { useNavigate } from "react-router-dom";

export default function Return({
  form = {},
  handleChange = (f) => f,
  handleSearch = (f) => f,
  loading = false,
  list = [],
  handleTable = (f) => f,
  returnAmt,
  data,
  setReturnItem,
  theme,
  returnItem,
}) {
  const total = list.reduce((a, b) => a + parseFloat(b.amount), 0);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  return (
    <CustomCard
      header="Return Item"
      back={true}
      container=" m-2 h-100"
      style={{ height: "97%" }}
    >

      <Row>
        <Col md={6}>
          {/* <Input
            container=""
            placeholder="Receipt No"
            name="receiptNo"
            value={form.receiptNo}
            onChange={handleChange}
          /> */}
          <SearchBar
            filterText={filterText}
            placeholder="Search items"
            onFilterTextChange={(input) => { setFilterText(input); handleChange({ target: { name: 'receiptNo', value: input } }) }}
          />
        </Col>
        <Col md={3} className="textt">
          <CustomButton
            onClick={handleSearch}
            loading={loading}
          // className="mb-1 px-5"
          >
            Search
          </CustomButton>

        </Col>
        <Col md={3}>
          {/* </InputGroupAddon> */}
          {' '}
          <CustomButton
            onClick={() => navigate('/app/pharmacy/dashboard-view/Return category summary')}

          >
            Goto reports
          </CustomButton>
        </Col>
      </Row>
      <br />
      {list.length ? (
        <Alert className="text-center">Select an item to return</Alert>
      ) : null}
      <Table striped bordered>
        <tr>
          <th className="text-center">Item Name</th>
          <th className="text-center">Selling Price</th>
          <th className="text-center">Qty</th>
          <th className="text-center">Amount</th>
          {/* <th>R. Qty</th> */}
        </tr>
        {list.map((item, i) => {
          let ls = data && data.filter(itm => itm.item_code === item.item_code)
          if (!ls.length)
            return (
              <tr
                style={{ cursor: "pointer" }}
                // className="hover"
                onClick={() => {
                  // data.forEach((item)=>{
                  //   // if(item.it)
                  // })
                  setReturnItem(item);
                }}
                className={` hover ${item.acct==="60000"?"bg-info":""}`}
              >
                <td> {item.description}</td>
                <td className="text-right">{formatNumber(item.selling_price)}</td>
                <td className="text-center">{formatNumber(item.quantity)}</td>
                <td className="text-right">
                  {formatNumber(parseInt(item.selling_price) * parseInt(item.quantity))}
                </td>
                {/* <td>
                <TextInput
                  container="col-md-12"
                  className="mb-2"
                  name="return_quantity"
                  value={item.return_quantity}
                  onChange={(e) => {
                    let value = e.target.value;
                    handleTable("return_quantity", value, i);
                  }}
                />
              </td> */}
              </tr>
            )
        })}
      </Table>
      <div className="text-right">
        <span className="mr-2 font-weight-bold">
          Total Amount: ₦{formatNumber(total)}
        </span>
        {/* <span className="font-weight-bold">Amount Return: ₦{returnAmt}</span> */}
      </div>
    </CustomCard>
  );
}
