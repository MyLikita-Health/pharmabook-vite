import React, { useEffect, useState } from "react";
// import { searchTransactionByReceipt } from "../../../redux/actions/transactions";
// import useQuery from "../../hooks/useQuery";
import { Col, Container, Row, Table } from "reactstrap";
// import { AiOutlineShareAlt } from "react-icons/ai";
// import CustomButton from "../../../app/components/Button";
import { useSelector } from "react-redux";
// import { formatNumber } from "../../../app/utilities";
import moment from "moment";
import CustomCard from "../../../components/UI/CustomCard";
import Loading from "../../../components/UI/Loading";
import { formatNumber } from "../../../components/UI/helpers";
import { CustomButton, CustomTable } from "../../../components/UI";
import useQuery from "../../../hooks/useQuery";
import BackButton from "../../../components/UI/BackButton";
import { PDFViewer } from "@react-pdf/renderer";
import SalesReceipt from "./SalesReceipt";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getDiscount, getReceiptData } from "../../../redux/action/pharmacy";
import { Printer } from "react-feather";
// import CustomCard from "../../../components/CustomCard";
// import { MdPrint } from "react-icons/md";
// import { useRequestDevice } from "react-web-bluetooth";
// import { PDFViewer } from "@react-pdf/renderer";
// import SalesReceipt from "../../pdf-template/sales-receipt";
// import { useRequestDevice } from "react-web-bluetooth";
// import Loading from "../../../app/components/Loading";
// import BackButton from "../../../app/components/BackButton";

function PostSalePage() {
  const query = useQuery();
  const receiptList = useSelector((state) => state.pharmacy.receiptData);
  const discount = useSelector((state) => state.pharmacy._discount);
  const loading = useSelector((state) => state.pharmacy.loading);
  const { busName, address, phone, username } = useSelector(
    (state) => state.auth.user
  );
  const receiptNo = query.get("transaction_id");
  const buyer = query.get("buyer");
  const customer_balance = query.get("customer_balance");
  const page = query.get("page");
  const identifier = query.get("identifier");
  //   const [txnList, setTxnList] = useState([]);
  const [preview, setPreview] = useState(false);
  const dispatch = useDispatch();
  const _getReceiptData = useCallback(() => {
    dispatch(getReceiptData(receiptNo));
    dispatch(getDiscount({receiptNo}));
  }, [dispatch, receiptNo]);
  useEffect(() => {
    setTimeout(() => {
      _getReceiptData();
    }, 2000);
  }, [_getReceiptData]);

  let info = receiptList.length ? receiptList[receiptList.length - 1] : {};
  const { user, activeBusiness } = useSelector((s) => s.auth);
  let item_list = receiptList.filter(
    (state) => !state.item_name?.includes("Discount")
  );
  let totalAmount = receiptList
    .filter((state) => state.acct !== "60000")
    .reduce((a, b) => a + parseFloat(b.amount), 0);
  let amountPaid = parseFloat(query.get("amount"));
  // let discount = parseFloat(query.get("discount"));
  let grandTotal = parseFloat(totalAmount) - (parseFloat(discount) || 0);
  let balance = parseFloat(grandTotal) - parseFloat(amountPaid);
  const style = {
    borderRightStyle: "hidden",
    borderLeftStyle: "hidden",
    borderBottomStyle: "hidden",
  };

  const printBtn = () => {
    setPreview((p) => !p);
  };
  console.error({ info });
  const fields = [
    {
      title: "S/N",
      custom: true,
      component: (item, index) => index + 1,
      className: "text-center",
    },
    {
      title: "Drug Name",
      custom: true,
      component: (item) => item.item_name,
      className: "text-left",
    },
    {
      title: "Quantity",
      custom: true,
      component: (item) =>
        item.quantity === "0" ? "-" : formatNumber(item.quantity),
      className: "text-center",
    },
    {
      title: "Price (₦)",
      custom: true,
      component: (item) =>
        item.quantity === "0" ? "-" : formatNumber(item.price),
      className: "text-end",
    },
    {
      title: "Amount (₦)",
      custom: true,
      component: (item) => formatNumber(item.amount),
      className: "text-end",
    },
  ];

  return (
    <Container className="mt-0">
      <CustomCard
        back
        header={
          <Row>
            <Col>
              <h3>Transaction Reciept</h3>
            </Col>
            {preview ? (
              <Col md={2}>
                <CustomButton
                  onClick={() => setPreview(false)}
                  outline
                  color="danger"
                >
                  Close
                </CustomButton>
              </Col>
            ) : null}
          </Row>
        }
      >
        {!preview ? (
          <>
            <center>
              <h4>{busName}</h4>
            </center>
            <div>Date: {moment(info.createdAt).format("DD/MM/YYYY HH:mm")}</div>
            <div>
              Customer Name:{" "}
              {buyer === "undefined" || buyer === null || buyer === ""
                ? "Walk-In"
                : buyer}
            </div>
            <div>Invoice No: {receiptNo}</div>
            {buyer !== "walk-in" ? (
              identifier === "regenerate" ? null : (
                <div>
                  Customer Balance: ₦
                  {parseFloat(customer_balance) - parseFloat(amountPaid)}
                </div>
              )
            ) : null}
            <div>
              Payment Method:{" "}
              {info.modeOfPayment || query.get("payment") || "CASH"}
            </div>
            <div>
              Operator: {user.username} ({user.role})
            </div>
            {loading && <Loading size="sm" />}
            <CustomTable fields={fields} height="auto" data={item_list} />
            <Table bordered size="sm">
              <tr>
                <th colSpan={4} className="text-right" style={style}>
                  Discount
                </th>
                <th className="text-right" style={style}>
                  {formatNumber(discount)}
                </th>
              </tr>
              <tr>
                <th colSpan={4} className="text-right" style={style}>
                  Grand Total
                </th>
                <th className="text-right" style={style}>
                  {formatNumber(grandTotal)}
                </th>
              </tr>
              <tr>
                <th colSpan={4} className="text-right" style={style}>
                  Amount Paid
                </th>
                <th className="text-right" style={style}>
                  {formatNumber(amountPaid)}
                </th>
              </tr>
              <tr>
                <th colSpan={4} className="text-right" style={style}>
                  Balance
                </th>
                <th className="text-right" style={style}>
                  {buyer === "walk-in" ? (
                    formatNumber(balance)
                  ) : (
                    <>
                      {formatNumber(
                        parseFloat(grandTotal) - parseFloat(amountPaid)
                      )}
                    </>
                  )}
                </th>
              </tr>
              <tr>
                <th colSpan={4} className="text-right" style={style}>
                  Total
                </th>
                <th className="text-right" style={style}>
                  ₦{formatNumber(totalAmount)}
                </th>
              </tr>
            </Table>
            <center>
              {/* <CustomButton
                color="primary"
                className="m-2 col-md-2"
                onClick={() => {
                  //   onClick();
                }}
              >
                Pair bluetooth
              </CustomButton> */}
              <CustomButton
                color="primary"
                className="m-2 col-md-2"
                onClick={() => {
                  printBtn();
                }}
              >
                <Printer /> Print
              </CustomButton>
              {/* <CustomButton color="primary" className="col-md-2">
                Share
              </CustomButton> */}
            </center>
          </>
        ) : (
          <div className="d-flex">
            <PDFViewer height="700" width="1100">
              <SalesReceipt
                data={receiptList}
                total={totalAmount}
                grandTotal={grandTotal}
                activeBusiness={activeBusiness}
                balance={balance}
                info={info}
                page={page}
                modeOfPayment={query.get("payment")}
                receiptNo={receiptNo}
                discount={discount}
                busName={busName}
                cashier={username}
                address={address}
                amountPaid={amountPaid}
                phone={phone}
                name ={buyer}
              />
            </PDFViewer>
          </div>
        )}
      </CustomCard>
    </Container>
  );
}
export default PostSalePage;
