import { useState } from "react";
import { Label, Col, Row, Input, Button, Table } from "reactstrap";
// import CustomButton from "../../app/components/Button";
// import CustomCard from "../components/CustomCard";
// import { FcCheckmark } from "react-icons/fc";
// import {saveTransaction} from "../../redux/actions/transactions";
// import { CURRENCY, TRANSACTION_TYPES } from "../../constants";
// import SearchStoresInput from "../../app/admin/stores/SearchStores";
// import { formatNumber } from "../../app/utilities";

// import { FiDelete } from "react-icons/fi";
// import { newExpenses } from "../../redux/actions/transactionApi";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import _customNotification from "../../components/UI/_customNotification";
import {
  CustomButton,
  CustomForm,
  SelectInput,
  TextInput,
} from "../../components/UI";
import { formatNumber } from "../../utils";
import { newExpenses } from "../../redux/action/transactions";
import CustomCard from "../../components/UI/CustomCard";
import { CheckCircle, Trash2 } from "react-feather";
import { useToasts } from "react-toast-notifications";
import Scrollbar from "../../components/UI/Scrollbar";

export default function Expenses() {
  const initForm = {
    item_name: "",
    quantity: 1,
    cost: "",
  };
  const { addToast } = useToasts();
  const [form, setForm] = useState(initForm);
  const [selected_store, setSelected_store] = useState("");
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const facilityId = useSelector((state) => state.auth.user.id);
  const isValid = (form) => {
    const values = Object.values(form);
    // alert(values.filter(item=>item==='').length)
    return values && values.filter((item) => item === "").length < 1;
  };
  const navigate = useNavigate();
  const addData = () => {
    if (isValid(form)) {
      setData((prev) => [
        ...prev,
        {
          ...form,
          query_type: "CASH",
          dr: parseInt(form.cost),
          cr: 0,
          destination: "EXPENSES",
          description: form.item_name,
          price: form.cost,
          source: user.branch_name,
          totalAmount: parseInt(form.cost),
          branch_name: selected_store,
          collectedBy: user.username,
          userId: user.id,
          facilityId: facilityId,
        },
      ]);
      setForm(initForm);
    }
  };

  const handleDelete = (index) => {
    let item = data.filter((i, idx) => index !== idx);
    setData(item);
    console.log(index);
  };

  const handleChange = ({ target: { value, name } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitAll = (e) => {
    e.preventDefault();
    let newArr = [];
    data.forEach((i) =>
      newArr.push({ ...i, receiptNo: moment().format("ssmsDDMMhh") })
    );
    // submit form data
    newExpenses(
      newArr,
      () => {
        console.log("Transaction successiful");
        _customNotification(addToast, "Transaction successiful");
      },
      () => {
        _customNotification(addToast, "Failed to saved transaction", "warning");
      }
    );
    setData([]);
    setForm(initForm);
  };
  let total = data.reduce((i, idx) => i + parseFloat(idx.cost), 0);

  const fields = [
    { title: "Service", value: "title" },
    {
      title: "Account",
      //   custom: true,
      //   component: (i) => `${i.acc_head} - ${i.acc_head_name}`,
    },
    {
      title: "Price(₦)",
      custom: true,
      component: (item) => (
        <div className="text-end">{formatNumber(item?.cost)}</div>
      ),
    },
  ];
  return (
    <CustomCard style={{ height: "91vh" }} back header={"Expenses form"}>
      <CustomForm fields={fields} handleChange={handleChange} />

      <Row>
        <Col md="3">
          <SelectInput
            label="Select Stores"
            type="select"
            defaultValue={user.branch_name}
            options={[]}
            onChange={({ target: { value } }) => {
              setSelected_store(value);
              setForm((p) => ({ ...p, store_name: value }));
            }}
          ></SelectInput>
        </Col>
        <Col md="4">
          <TextInput
            label="Description"
            type="text"
            name="item_name"
            value={form.item_name}
            onChange={handleChange}
          />
        </Col>

        <Col md="2">
          <TextInput
            label="Qty"
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
        </Col>

        <Col md="3">
          <TextInput
            label="Amount"
            type="number"
            name="cost"
            value={form.cost}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <center>
        <CustomButton size="sm" onClick={addData} className="m-2 px-5">
          + Add
        </CustomButton>
      </center>
      <h6 className="text-right">Total: {total}</h6>
      <Scrollbar height="50vh">
        <Table striped size="sm" bordered>
          {data.length > 0 ? (
            <thead>
              <tr>
                <th style={{ width: "2%" }}>S/N</th>
                <th className="text-center">Description</th>
                <th className="text-center">Qty</th>
                <th className="text-center">Cost(NGN)</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
          ) : null}
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.item_name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">{formatNumber(item.cost)}</td>
                  <td className="text-right">
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Scrollbar>
      {data.length > 0 ? (
        <Row>
          <Col md={12} className="text-center">
            <CustomButton onClick={submitAll}>
              <CheckCircle className="mr-1" size={20} /> Submit
            </CustomButton>
          </Col>
        </Row>
      ) : (
        <p className="text-info text-center">Add more expenses to this list</p>
      )}
    </CustomCard>
  );
}
