import { useDispatch } from "react-redux";
import { Trash } from "react-feather";
import { Col, Table, Row, Form } from "reactstrap";
import { CustomButton, TextInput } from "../../../components/UI";
import CustomCard from "../../../components/UI/CustomCard";
import { formatNumber } from "../../../components/UI/helpers";
import SearchItemInput from "./SearchItem";
import CustomTypeahead from "../../../components/UI/CustomTypeahead";
// import CustomButton from '../../../app/components/Button'
// import { formatNumber } from '../../../app/utilities'
// import { sellItem } from '../../../redux/actions/purchase'
// import TextInput from '../../components/TextInput'
// import SearchItemInput from '../make-sales/SearchItem'

export default function Replace({
  _ref,
  theme,
  form = {},
  setForm = (f) => f,
  handleChange = (f) => f,
  itemDetails = {},
  setSelected,
  handleAdd = (f) => f,
  setReturnItem = (f) => f,
  data,
  handleDelete = (f) => f,
  selling_price,
  returnItem,
  selected,
  handleQtyChanges,
  handleSubmit,
  returnAmt,
  repRef,
  amount_paid,
  loading,
  list,
  total_ret = 0,
  total_rep = 0,
  balanceToPaid = 0,
}) {
  const dispatch = useDispatch();
  let ls = data.length? list.filter(itm=>data.map(dt=>dt.item_code).includes(itm.item_code)===false):list

  return (
    <CustomCard
      header="Returned Drugs "
      container="m-2 h-100"
      style={{ height: "97%" }}
    >
      {/* {JSON.stringify(ls)} */}
      <Form onSubmit={handleAdd}>
        <Row className="m-0">
          <Col md="6" className="p-1">
            <CustomTypeahead
              label="Item Name"
              options={ls}
              _ref={_ref}
              placeholder="Search items by name"
              labelKey="item_name"
              onInputChange={(v) =>  {
                  // setSelected([v]); setReturnItem({})
               }}
              onChange={(v) =>{ 
                if(v.length){
                setSelected({...v[0],quantity:form.quantity}); 
                setReturnItem({...v[0],quantity:form.quantity}) }
              }}
            />
          </Col>
          <Col md="6" className="p-1">
            <TextInput
              container="col-md-12"
              type="number"
              // className="mb-2"
              label="Quantity Return"
              placeholder="quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </Col>
          {/* <Col md="6" className="p-1">
            <SearchItemInput
              _ref={repRef}
              labelKey="item_name"
              label="Replace With" 
              onChange={(v) => setSelected([v])}
              onInputChange={(v) => setSelected([v])}
            />
          </Col> */}
          {/* <Col md="6" className="p-1">
            <TextInput
              container="col-md-12"
              type="number"
              className="mb-2"
              label="Quantity Replace"
              placeholder="quantity"
              name="rep_quantity"
              value={form.rep_quantity}
              onChange={handleChange}
            />
          </Col> */}
          {/* <Col>
            Remaining Qty:{" "}
            <span className="font-weight-bold">{itemDetails.balance}</span>
          </Col> */}
          <Col>
            Selling Price:
            <span className="font-weight-bold">
              {formatNumber(form.selling_price)}
            </span>
          </Col>
          <Col>
            Expiry Date:
            <span className="font-weight-bold">{form.expiry_date}</span>
          </Col>
        </Row>
        <center>
          <CustomButton className="m-2" onClick={handleAdd}>
            Add to cart
          </CustomButton>
        </center>
      </Form>
      <Table striped bordered>
        <tr>
          <th className="text-center">Item Name</th>
          <th className="text-center">Selling Price</th>
          <th className="text-center">Qty</th>
          <th className="text-center">Amount</th>
          <th className="text-center">Status</th>
          <th className="text-center">X</th>
        </tr>

        {data &&
          data
            .filter((state) => state !== false)
            .map((item, i) => (
              <tr key={i}>
                {/* {JSON.stringify()} */}
                <td>{item.drug_name ? item.drug_name : item.description}</td>
                <td className="text-end">{formatNumber(item.selling_price)}</td>
                <td className="text-center">{formatNumber(item.quantity)}</td>
                <td className="text-end">
                  {formatNumber(item.selling_price * item.quantity)}
                </td>
                <td className="text-center">{item.type}</td>
                <td className="text-center">
                  <a
                    href="#oppen"
                    onClick={() => handleDelete(i)}
                    className="text-danger outline"
                    size="xs"
                  >
                    <Trash className="text-danger" size={20} />
                  </a>
                </td>
              </tr>
            ))}
      </Table>
      <span>
        Total Balance to be paid: <b>{formatNumber(balanceToPaid)}</b>
      </span>

      <Row style={{ marginRight: "2px" }}>
        <Col md="6">
          <TextInput
            container="col-md-12"
            type="number"
            hidden
            className="mb-2"
            // label="Amount Paid"
            name="amountPaid"
            value={form.amount_paid || amount_paid}
            onChange={({ target: { value } }) => {
              setForm({ ...form, amount_paid: value });
              dispatch({ type: "AMOUNT_PAID", payload: value });
            }}
            placeholder={balanceToPaid}
          />
        </Col>
        {/* <Col md="6">
          <TextInput
            container="col-md-12"
            type="number"
            className="mb-2"
            label="Discount"
            name="discount"
            value={form.discount}
            onChange={handleChange}
          />
        </Col> */}
      </Row>
      <center>
        <CustomButton
          className="px-5 m-2"
          onClick={handleSubmit}
          loading={loading}
        >
          ₦{formatNumber(balanceToPaid)} Submit
        </CustomButton>
      </center>
    </CustomCard>
  );
}
