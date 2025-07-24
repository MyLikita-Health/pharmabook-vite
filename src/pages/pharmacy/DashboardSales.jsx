import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Col, Button, Row, Input } from "reactstrap";
// import { _fetchApi } from "../../redux/actions/api";
// import SearchBar from "../components/SearchBar";
import { useParams } from "react-router";
import { formatNumber } from "../../components/UI/helpers";
import Scrollbars from "../../components/UI/Scrollbar";
import DaterangeSelector from "../../components/UI/DaterangeSelector";
import useQuery from "../../hooks/useQuery";
import CustomCard from "../../components/UI/CustomCard";
import { Checkbox, CustomButton, SearchBar } from "../../components/UI";
import {
  getAllReport,
  getPharmStore,
  getPharmUsers,
} from "../../redux/action/pharmacy";
import CustomTypeahead from "../../components/UI/CustomTypeahead";
import ReportRecieptPDF from "./ReportRecieptPDF";
import BackButton from "../../components/UI/BackButton";

export default function DashboardSales() {
  // const today = moment().format('YYYY-MM-DD')
  const query = useQuery();
  const fromDate = query.get("from");
  const toDate = query.get("to");
  // const pharmStore = useSelector((s) => s.pharmacy.pharmStore);
  const { user, activeBusiness } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [reports, setReports] = useState([]);
  const [list, setList] = useState([]);
  const pharmUsers = useSelector((state) => state.pharmacy.pharmUsers);
  const [filterText, setFilterText] = useState("");
  const query_type = "Sales category summary";
  const [showAllPurchase, setShowAllPurchase] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const from = fromDate
    ? moment(fromDate).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const to = toDate
    ? moment(toDate).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const [range, setRange] = useState({ from, to });

  const handleChange = ({ target: { name, value } }) => {
    setRange((prev) => ({
      ...prev,
      [name]: moment(value).format("YYYY-MM-DD"),
    }));
  };
  const [form, setForm] = useState({
    branch_name: "",
    agent: "",
  });

  const _getPharmUsers = useCallback(() => {
    dispatch(getPharmUsers());
  }, [dispatch]);

  useEffect(() => _getPharmUsers(), [_getPharmUsers]);
  const getReports = useCallback(() => {
    dispatch(
      getAllReport(setReports, {
        from: range.from,
        to: range.to,
        query_type: query_type.split(" ")[0] + " category summary",
        agent: form.role === "Pharmacy Owner" ? "" : form.agent,
      })
    );
    dispatch(getPharmStore());
  }, [dispatch, range, query_type, form]);

  useEffect(() => {
    getReports();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0, getReports]);
  // useEffect(() => {
  //   dispatch(getStoresList());
  // }, [dispatch]);

  const retrieveList = useCallback(() => {
    setList(
      filterText.length > 3 && reports.length
        ? reports.filter((item) => {
            return item.description
              ?.toLowerCase()
              ?.includes(filterText.toLowerCase());
          })
        : reports
    );
  }, [reports, filterText]);

  const sycSearch = useCallback(() => {
    setList(
      form.branch_name.length > 3 && reports.length
        ? reports.filter((item) => {
            console.error({ branch_name: item });
            return item.branch_name
              ?.toLowerCase()
              ?.includes(form.branch_name.toLowerCase());
          })
        : reports
    );
  }, [reports, form.branch_name]);

  useEffect(() => {
    retrieveList();
  }, [retrieveList]);

  useEffect(() => {
    sycSearch();
  }, [sycSearch]);
  const tt =
    list &&
    list.length &&
    list.map((item) => parseInt(item.qty) * parseInt(item.selling_price));

  let total = tt && tt.reduce((total, num) => total + num);
  const tt2 =
    list &&
    list.length &&
    list
      .map((item) => parseInt(item.amount))
      .reduce((total, num) => total + num);

  const totalDicount = list && list.reduce((a, b) => a + b.credit, 0);
  const printReport = () => {
    setShowReport(!showReport);
  };
  return (
    <Scrollbars style={{ height: "70.6vh" }} autoHide>
      <Table bordered size="sm">
        {(query_type && query_type.split(" ")[0]) === "Expenses" ||
        (query_type && query_type.split(" ")[0]) === "Debt" ? (
          <thead>
            <tr>
              <th className="text-center">S/N</th>
              <th className="text-center">Date</th>
              <th className="text-center">Description</th>
              <th className="text-center">Amount (₦)</th>
            </tr>
          </thead>
        ) : query_type && query_type.split(" ")[0] === "Discount" ? (
          <>
            <thead>
              <tr>
                <th className="text-center">S/N</th>
                <th className="text-center">Date</th>
                <th className="text-center">Enter By</th>
                <th className="text-center">Description</th>
                <th className="text-center">Amount (₦)</th>
              </tr>
            </thead>
          </>
        ) : (
          <thead>
            <tr>
              <th rowSpan={2} className="text-center">
                S/N
              </th>
              <th rowSpan={2} className="text-center">
                Date
              </th>
              <th rowSpan={2} className="text-center">
                Description
              </th>

              {/* <th colSpan={3} className="text-center">
                    Item Qty & Cost
                  </th> */}
            </tr>
            <tr>
              <th className="text-center">
                {" "}
                {query_type === "Sales category summary"
                  ? "Qty Sold"
                  : `Qty ${query_type.split(" ")[0]}`}
              </th>
              <th className="text-center">
                {query_type.split(" ")[0] === "Sales reports" ||
                query_type.split(" ")[0] === "Return"
                  ? "Selling Price (₦)"
                  : "Cost Price (₦)"}
              </th>
              <th className="text-end">Total (₦)</th>
            </tr>
          </thead>
        )}
        {(query_type && query_type.split(" ")[0] === "Expenses") ||
        (query_type && query_type.split(" ")[0] === "Debt") ? (
          <tbody>
            {list &&
              list.map((item, i) => (
                <tr key={i}>
                  <th className="text-end">{i + 1}</th>
                  <td>{moment(item.created).format("DD-MM-YYYY")}</td>
                  <td>{item.description}</td>
                  {["Return category summary"].includes(query_type) ? (
                    <td className="text-end">
                      {formatNumber(item.selling_price)}
                    </td>
                  ) : (
                    <td className="text-end">{formatNumber(item.amount)}</td>
                  )}
                </tr>
              ))}
            <tr>
              <th scope="row" colSpan="3" className="text-end">
                Total
              </th>
              <th className="text-end">{formatNumber(tt2)}</th>
            </tr>
          </tbody>
        ) : query_type && query_type.split(" ")[0] === "Discount" ? (
          <>
            <tbody>
              {list &&
                list.map((item, i) => (
                  <tr key={i}>
                    <th className="text-center">{i + 1}</th>
                    <td className="text-end">
                      {" "}
                      {moment(item.created).format("DD-MM-YYYY")}
                    </td>
                    <td>{item.enteredBy}</td>
                    <td>{item.description}</td>
                    <td className="text-center">{formatNumber(item.credit)}</td>
                  </tr>
                ))}
              <tr>
                <th scope="row" colSpan="4" className="text-end">
                  Total
                </th>
                <th className="text-end">{formatNumber(totalDicount)}</th>
              </tr>
            </tbody>
          </>
        ) : (
          <tbody>
            {list &&
              list.map((item, i) => (
                <tr key={i}>
                  <th className="text-center">{i + 1}</th>
                  <td>{moment(item.receive_date).format("DD-MM-YYYY")}</td>
                  <td>{item.description}</td>
                  <td className="text-center">{formatNumber(item.qty)}</td>
                  {[
                    "Sales category summary",
                    "Return category summary",
                  ].includes(query_type) ? (
                    <td className="text-end">
                      {formatNumber(item.selling_price)}
                    </td>
                  ) : (
                    <td className="text-end">
                      {formatNumber(item.unit_price)}
                    </td>
                  )}
                  {["Return category summary"].includes(query_type) ? (
                    <td className="text-end">
                      {formatNumber(
                        parseInt(item.selling_price) * parseInt(item.qty)
                      )}
                    </td>
                  ) : (
                    <td className="text-end">
                      {formatNumber(
                        (item.sales_type = "sales"
                          ? item.amount
                          : parseInt(item.qty) * parseInt(item.unit_price))
                      )}
                    </td>
                  )}
                </tr>
              ))}
            <tr>
              <th scope="row" colSpan="5" className="text-end">
                Total
              </th>
              {["Return category summary"].includes(query_type) ? (
                <th className="text-end">
                  {formatNumber(
                    list.reduce(
                      (a, b) => parseFloat(a) + parseFloat(b.selling_price),
                      0
                    )
                  )}
                </th>
              ) : (
                <th className="text-end">
                  {formatNumber(
                    list.reduce(
                      (a, b) => parseFloat(a) + parseFloat(b.amount),
                      0
                    )
                  )}
                </th>
              )}
            </tr>
          </tbody>
        )}
      </Table>
    </Scrollbars>
  );
}
