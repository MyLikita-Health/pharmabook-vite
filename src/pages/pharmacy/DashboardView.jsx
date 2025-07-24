import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Table, Card, Row, Col } from "reactstrap";
import SearchBar from "../components/SearchBar";
import DaterangeSelector from "../../app/components/DaterangeSelector";
import { getItemList } from "../../redux/actions/purchase";
import { useDispatch } from "react-redux";
import moment from "moment";
import Widget from "../components/Widget";
import { getAllReport } from "../../redux/actions/reports";
import { formatNumber } from "../../app/utilities";
import { CURRENCY } from "../../constants";
import Checkbox from "../components/CheckBox";
import { useSelector } from "react-redux";

export default function Dashboard() {
  // const getList = (data)   =>  useDispatch()
  const activeBusiness = useSelector((state) => state.auth.activeBusiness);
  const today = moment().format("YYYY-MM-DD");
  // const aMonthAgo = moment().subtract(1, 'month').format('YYYY-MM-DD');
  const dispatch = useDispatch();
  // const { purchaseList } = useSelector((state) => state.purchase);
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  const [showAllPurchase, setShowAllPurchase] = useState(false);
  const [range, setRange] = useState({
    from: today,
    to: today,
  });
  const handleChange = ({ target: { name, value } }) => {
    setRange({
      ...range,
      [name]: value,
    });
  };
  const [purchase, setPurchase] = useState([]);
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState([]);

  const syncData = useCallback(() => {
    dispatch(
      getAllReport(setPurchase, range.from, range.to, "Purchase summary")
    );
    dispatch(getAllReport(setSales, range.from, range.to, "Sales summary"));
    dispatch(
      getAllReport(setExpenses, range.from, range.to, "Expenses summary")
    );
    dispatch(getAllReport(setDebts, range.from, range.to, "Debt summary"));
  }, [dispatch, range]);
  // const DashboardView = React.lazy(() => import("./DashboardView"));

  useEffect(() => {
    syncData();
  }, [syncData]);

  const getReports = useCallback(() => {
    dispatch(
      getAllReport(setList, range.from, range.to, "Purchase category summary")
    );
  }, [dispatch, range.from, range.to]);

  const [searchTxt, addSearchTxt] = useState("");
  const retrieveList = useCallback(() => {
    setItems(
      searchTxt.length > 2 && list.length
        ? list.filter((item) => {
            return item.description
              ?.toLowerCase()
              ?.includes(
                searchTxt.toLowerCase() ||
                  item.receive_date.toString().includes(searchTxt)
              );
          })
        : list
    );
  }, [list, searchTxt]);

  useEffect(() => {
    retrieveList();
  }, [retrieveList]);

  useEffect(() => {
    getReports();
  }, [getReports]);

  const fetchData = useCallback(() => {
    dispatch(getItemList());
  }, [dispatch]);

  useEffect(() => {
    // retrieveList()
    syncData();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0]);

  // console.log({ purchase, expenses, debts, sales })
  const totalAmount = list.reduce(
    (a, b) => parseFloat(a) + parseFloat(b.amount),
    0
  );
  const total_selling_price = list.reduce(
    (a, b) => parseFloat(a) + parseFloat(b.selling_price) * parseFloat(b.qty),
    0
  );
  const final = items.length > 0 && showAllPurchase ? items : items.slice(-15);
  return (
    <div className="shadow m-4">
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Card className="p-2">
          <div className="">
            <span className="h5">
              Welcome back, {activeBusiness.business_name}
            </span>
          </div>
          <DaterangeSelector
            from={range.from}
            to={range.to}
            handleChange={handleChange}
          />
          <Row>
            <Widget
              fa="fa-store"
              id={0}
              link={`/app/reports/Purchase category summary?from=${range.from}&to=${range.to}`}
              title="Total purchase"
              content={`₦ ${
                purchase.length
                  ? purchase[0].total
                    ? formatNumber(purchase[0].total)
                    : 0
                  : 0
              }`}
            />
            <Widget
              fa="fa-credit-card"
              id={0}
              link={`/app/reports/Sales category summary?from=${range.from}&to=${range.to}`}
              title="Total sales"
              content={`₦ ${
                sales.length
                  ? sales[0].total
                    ? formatNumber(sales[0].total)
                    : 0
                  : 0
              }`}
            />
            <Widget
              fa="fa-briefcase"
              id={0}
              link={`/app/reports/Expenses category summary?from=${range.from}&to=${range.to}`}
              title="Total expenses"
              content={`₦ ${
                expenses.length
                  ? expenses[0].total
                    ? formatNumber(expenses[0].total)
                    : 0
                  : 0
              }`}
            />
            <Widget
              fa="fa-briefcase"
              id={0}
              link={`/app/reports/Debt category summary?from=${range.from}&to=${range.to}`}
              title="Total debts"
              content={`₦ ${
                debts.length
                  ? debts[0].total
                    ? formatNumber(debts[0].total)
                    : 0
                  : 0
              }`}
            />
          </Row>
          <Row>
            <Col md={10}>
              <SearchBar
                onFilterTextChange={(v) => addSearchTxt(v)}
                filterText={searchTxt}
                placeholder="search for purchase"
              />
            </Col>
            <Col className="d-flex flex-direction-row align-items-center">
              <Checkbox
                label="Show All"
                checked={showAllPurchase}
                onChange={() => setShowAllPurchase((p) => !p)}
              />
              {/* <CustomButton
              className="mb-2 btn-block"
              onClick={() => {
                // retrieveList()
                syncData()
                fetchData()
              }}
            >
              Get list
            </CustomButton> */}
            </Col>
          </Row>
          <div
            className=""
            style={{ marginLeft: "auto", marginRight: 0, paddingRight: "20px" }}
          >
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              Total No. of Items:{" "}
              <span style={{ textAlign: "center", fontWeight: "bold" }}>
                {final.length}
              </span>
            </div>
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              Total Cost:
              <span style={{ textAlign: "center", fontWeight: "bold" }}>
                {CURRENCY}
                {formatNumber(totalAmount)}
              </span>
            </div>
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              Total Selling Price:
              <span style={{ textAlign: "center", fontWeight: "bold" }}>
                {CURRENCY}
                {formatNumber(total_selling_price)}
              </span>
            </div>
          </div>
          <Table bordered>
            <thead>
              <tr>
                <th className="text-center">S/N</th>
                <th className="text-center">Date</th>
                <th className="text-center">Item name </th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Cost Price ({CURRENCY})</th>
                <th className="text-center">Amount ({CURRENCY})</th>
              </tr>
            </thead>
            <tbody>
              {final.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.receive_date}</td>
                  <td>{item.description}</td>
                  <td className="text-center">{formatNumber(item.qty)}</td>
                  <td className="text-right">
                    {formatNumber(item.selling_price)}
                  </td>
                  <td className="text-right">{formatNumber(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      {/* </Suspense> */}
    </div>
  );
}
