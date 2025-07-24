import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
// import CustomButton from '../../../app/components/Button'
// import {
//   CASH,
//   CUSTOMER_TYPES,
//   STORE,
//   TRANSACTION_TYPES,
// } from '../../../constants'
// import {
//   chargeCustomer,
//   saveCustomerTxnToCache,
// } from '../../../redux/actions/customer'
// import {
//   getPurchasedItems,
//   returnSellItem,
//   saveNewPurchase,
//   sellItem,
// } from '../../../redux/actions/purchase'
// import {
//   pushTransactionChanges,
//   saveReturnTransaction,
//   saveTransaction,
//   searchTransactionByReceipt,
// } from '../../../redux/actions/transactions'
import Replace from "./Replace";
import Return from "./Return";
import {  v4 as UUIDV4 } from "uuid";
import moment from "moment";
import { returnSellItem, searchTransactionByReceipt } from "../../../redux/action/pharmacy";
import { generateReceiptNo } from "../../../components/UI/helpers";
// import moment from 'moment'
// import { formatNumber } from '../../../app/utilities'
// import transactionsLocal from '../../../pouchdb/transactions'
// import { _customNotify, _warningNotify } from '../../../redux/helper'
// import { AMOUNT_PAID } from '../../../redux/actions/actionTypes'

export default function ReturnItem() {
  const theme = {};
  const amount_paid = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ quantity: "", });
  const [selected, setSelected] = useState([]);
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [returnData, setReturnData] = useState([]);
  const [returnItem, setReturnItem] = useState({});
  let itemDetails = selected.length ? selected[0] : {};
  let returnDetails = list.length ? list[0] : {};
  let [submitLoading, setSubmitLoading] = useState("");
  const itemRef = useRef();
  const repRef = useRef();
  const selling_price =
    parseFloat(itemDetails.cost) +
    parseFloat(
      itemDetails.markupTypes
        ? itemDetails.markupTypes[0].markup
        : itemDetails.markup
    );
  const total = data.reduce((a, b) => a + b.amount, 0);
  const total_ret = data
    .filter((item) => item.type === "return")
    .reduce((a, b) => a + parseInt(b.selling_price) * parseInt(b.quantity), 0);
  // const total_rep = data
  // .filter((item) => item.type === "replace")
  // .reduce((a, b) => a + parseInt(b.selling_price) * parseInt(b.quantity), 0);
  // const returnData = []
  const returnAmt = list
    .filter((item) => item.return_quantity > 0)
    .map(
      (item, i) =>
        (parseInt(item.amount) / parseInt(item.quantity)) * item.return_quantity
    )
    .reduce((a, b) => a + b, 0);
  const balanceToPaid = parseFloat(total_ret)
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({
      ...p,
      [name]: value,
    }));
    if(name==='receiptNo'){
      handleSearch()
    }
  };
  const handleQtyChanges = ({ target: { name, value } }) => {
    if (parseInt(returnItem.quantity) < parseInt(value)) {
      alert("Quantity is greater than ");
    } else {
      setForm((p) => ({
        ...p,
        [name]: value,
      }));
    }
  };
  const dispatch = useDispatch();
  const history = [];

  const handleAdd = () => {
    if (parseInt(form.quantity) > parseInt(itemDetails.balance)) {
      alert("Quantity returned is more than recieved");
    } else {
      setData((p) => [
        ...p,
        Object.keys(returnItem).length !== 0 && {
          ...returnItem,
          type: "return",
          quantity:form.quantity,
          product_code: form.product_code,
        }
      ]);
      console.log(data);
      setForm((p) => ({
        ...p,
        selling_price: '',
        item_code: '',
        expiry_date: '',
        quantity:''
      }));
      setReturnItem({});
      itemRef.current.clear();
      // repRef.current.clear();
    }
  };
  const handleSearch = useCallback(() => {
    setLoading(true);
    searchTransactionByReceipt(
      form.receiptNo,
      (data) => {
        setList(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, [form.receiptNo]);
  const handleDelete = (index) => {
    let del = data.filter((item, i) => index !== i);
    setData(del);
  };
  const handleTable = (name, value, index) => {
    let arr = [];
    list.forEach((item, i) => {
      if (index === i) {
        arr.push({
          ...item,
          [name]: value,
        });
      } else {
        arr.push(item);
      }
    });
    setList(arr);
  };

  const checkout = () => {
    setSubmitLoading(true);
    let returnArr = data.filter((item, i) => item.type === "return");
    // let replaceArr = data.filter((item, i) => item.type === "replace");
    let receiptNo = moment().format("YYMDhms");
    const transaction_id = UUIDV4();
   
    let lastIndex = returnArr.length - 1;

    const final = returnArr.map((item) => ({
      // if (item.type === "return") {
      //   final.push({
          ...item,
          // transaction_id: transaction_id,
          _id: UUIDV4(),
          // source: item.source,
          // product_code: item.product_code,
          // dr: item.dr,
          // amount: item.amount,
          // selling_price: item.selling_price,
          // cr: item.cr,
          acct: "CASH",
          // destination: item.destination,
          // quantity: item.quantity,
          // description: item.description,
          // discount: item.discount,
          // customerId: item.customerId,
          transaction_type: "RETURN_ITEM",
          // branch_name: item.branch_name,
          // receiptNo: receiptNo,
          // totalAmount: item.totalAmount,
          // modeOfPayment: item.modeOfPayment,
          // itemList: item.itemList,
          // txn_type: item.txn_type,
          // supplierName: item.supplierName,
          // item_id: item.item_id,
          // type: item.type,
          userName: user.username,
          facilityId: user.facilityId,
          branch_name: item.salesFrom,
          receiptDateSN:item.receiptDateSN
        }))
        // } else {
        //   // if () {
        //   final.push({
        //     transaction_id: transaction_id,
        //     supplierName: item.supplierName,
        //     item_name: item.item_name,
        //     description: item.item_name,
        //     uom: item.uom,
        //     destination: "CASH",
        //     source: "STORE",
        //     quantity: item.quantity,
        //     cost: item.cost,
        //     markup: item.markup,
        //     selling_price: parseInt(item.cost) + parseInt(item.markup),
        //     amount:
        //       (parseInt(item.cost) + parseInt(item.markup)) *
        //       parseInt(item.quantity),
        //     expiry_date: item.expiry_date,
        //     reorder: item.reorder,
        //     receivedTo: item.receivedTo,
        //     type: item.type,
        //     transaction_type: "RETURN_ITEM",
        //     _id: UUIDV4(),
        //     acct: "400021",
        //     receiptNo: receiptNo,
        //     modeOfPayment: "CASH",
        //     discount: form.discount || 0,
        //     amountPaid:
        //       amount_paid === 0 ? 0 : (lastIndex = i ? parseInt(amount_paid) : 0),
        //       // itemList: index === lastIndex ? itemList.join(",") : "",
        //       // txn_type:
        //       //   parseInt(otherInfo.amountPaid) < parseInt(cart.reduce((a,b)=>a+b.amount,0))
        //       //     ? "Part Payment"
        //       //     : "Full Payment",
        //       //     amountPaid: index === lastIndex ? otherInfo.amountPaid : 0,
        //       //     amountPaidDefault:
        //       //       index === lastIndex ? otherInfo.amountPaidDefault : 0,
        //       //     discount: index === lastIndex ? totalDiscount : "0",
        //   });

      
    // });

    console.log(final);
    console.log("final=========--------------xx------------===============");
    // generateReceiptNo((receiptDateSN, receiptSN) => {
    //   const arr = [];
    //   returnArr.forEach((item) => {
    //     arr.push({
    //       ...item,
    //       // receiptDateSN: receiptDateSN,
    //       // receiptSN: receiptSN,
    //     });
    //   });
    returnSellItem(final,
      () => {
        setSubmitLoading(false)
        setSelected([]);
        setList([])
        setData([])
        setForm((p)=>({...p,selling_price: '',
        item_code: '',
        expiry_date: ''}))
      },
      () => {
        console.log('Error Occurred')
        setSubmitLoading(false)
      })
    // })
  };

  const handleSubmit = () => {
    if (!list.length) {
      alert("Please put the receipt number");
    } else if (!data.length) {
      alert("Please select item");
    } else {
      checkout();
    }
  };

  // to search when user press enter button
  const handleKeyPress = useCallback(
    (e) => {
      switch (e.key) {
        case "Enter":
          return handleSearch();
        default:
          return null;
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    // const total_rep = data
    // .filter((item) => item.type === "replace")
    // .reduce(
    //   (a, b) =>
    //     a + (parseInt(b.cost) + parseInt(b.markup)) * parseInt(b.quantity),
    //   0
    // );

    const total_ret = data
      .filter((item) => item.type === "return")
      .reduce((a, b) => a + parseInt(b.amount), 0);
    console.log(total_ret);
    // dispatch({ type: AMOUNT_PAID, payload: total_rep - total_ret })
  }, [data]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // handleGetAmount();
  }, [handleKeyPress]);

  const handleItem = (item) => {
    //     amount: 6000
    // amount1: 6000
    // description: "Beans"
    // drugs: "Beans"
    // price: 6000
    // qtty: "1"
    // quantity: "1"
    // selling_price: 6000
    setReturnItem(item);
    console.log(item);
    console.log("===================================================");
    itemRef.current.setState({ text: item.description });
    setForm({
      ...form,
      ...item,
      cost: item.amount,
      product_code: item.product_code,
    });
  };
  return (
    <>
      <Row className="m-0 p-0 mt-0">
        {/* {JSON.stringify({ data })} */}
        <Col className="m-0 p-0" md="12" sm="12" xm="12" lg="6">
          <Return
            data={data}
            setReturnItem={handleItem}
            form={form}
            handleChange={handleChange}
            handleSearch={handleSearch}
            loading={loading}
            list={list}
            handleTable={handleTable}
            returnAmt={returnAmt}
          />
        </Col>
        <Col className="m-0 p-0" md="12" sm="12" xm="12" lg="6">
          <Replace
            returnItem={returnItem}
            _ref={itemRef}
            repRef={repRef}
            total_ret={total_ret}
            total_rep={0}
            balanceToPaid={balanceToPaid}
            theme={theme}
            form={form}
            setForm={setForm}
            handleQtyChanges={handleQtyChanges}
            handleChange={handleChange}
            itemDetails={itemDetails}
            setSelected={setSelected}
            handleAdd={handleAdd}
            data={data}
            list={list}
            handleDelete={handleDelete}
            handleSubmit={handleSubmit}
            returnAmt={returnAmt}
            selected={selected}
            setReturnItem={handleItem}
            selling_price={selling_price}
            amount_paid={amount_paid}
            loading={submitLoading}
          />
        </Col>
      </Row>
    </>
  );
}
