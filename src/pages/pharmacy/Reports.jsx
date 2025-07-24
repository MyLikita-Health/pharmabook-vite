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
import {
  Checkbox,
  CustomButton,
  SearchBar,
  SelectInput,
  TextInput,
} from "../../components/UI";
import {
  getAllReport,
  getPharmStore,
  getPharmUsers,
} from "../../redux/action/pharmacy";
import CustomTypeahead from "../../components/UI/CustomTypeahead";
import ReportRecieptPDF from "./ReportRecieptPDF";
import BackButton from "../../components/UI/BackButton";
import { Printer } from "react-feather";
import Loading from "../../components/UI/Loading";

export default function Reports({ mini = false }) {
  // const today = moment().format('YYYY-MM-DD')
  const query = useQuery();
  const fromDate = query.get("from");
  const toDate = query.get("to");
  let query_type = query.get("_type") ||"Purchase report";
  // const pharmStore = useSelector((s) => s.pharmacy.pharmStore);
  const { user, activeBusiness } = useSelector((s) => s.auth);
  const load =useSelector((pr)=>pr.pharmacy.loading)
  const dispatch = useDispatch();
  const [report, setReport] = useState([]);
  const [list, setList] = useState([]);
  const pharmUsers = useSelector((state) => state.pharmacy.pharmUsers);
  const [filterText, setFilterText] = useState("");
  // const [showAllPurchase, setShowAllPurchase] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const from = fromDate
    ? moment(fromDate).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const to = toDate
    ? moment(toDate).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const [range, setRange] = useState({ from, to });

  const [type, setType] = useState(query_type || "");
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
      getAllReport(setReport, {
        from: range.from,
        to: range.to,
        query_type: type.split(" ")[0] + " category summary",
        agent: form.role === "Pharmacy Owner" ? "" : form.agent,
      })
    );
    dispatch(getPharmStore());
  }, [dispatch, range, type, form]);

  useEffect(() => {
    getReports();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0, getReports]);
  // useEffect(() => {
  //   dispatch(getStoresList());
  // }, [dispatch]);

  const retrieveList = useCallback(() => {
    setList(
      filterText.length > 3 && report.length
        ? report.filter((item) => {
            return item.description
              ?.toLowerCase()
              ?.includes(filterText.toLowerCase());
            // || item.drug_name
            //   ?.toLowerCase()
            //   ?.includes(filterText.toLowerCase())
          })
        : report
    );
  }, [report, filterText]);

  // const sycSearch = useCallback(() => {
  //   setList(
  //     form.branch_name.length > 3 && report.length
  //       ? report.filter((item) => {
  //         console.error({ branch_name: item });
  //         return item.branch_name
  //           ?.toLowerCase()
  //           ?.includes(form.branch_name.toLowerCase());
  //       })
  //       : report
  //   );
  // }, [report, form.branch_name]);

  useEffect(() => {
    retrieveList();
  }, [retrieveList]);

  // useEffect(() => {
  //   sycSearch();
  // }, [sycSearch]);
  const tt =
    list &&
    list.length &&
    list.map((item) => parseInt(item.qty) * parseInt(item.selling_price));

  let total =
    tt && tt.reduce((total, num) => parseFloat(total) + parseFloat(num));

  const tt2 =
    list &&
    list.length &&
    list
      .map((item) => parseInt(item.amount))
      .reduce((total, num) => parseFloat(total) + parseFloat(num));

  const totalDicount =
    list && list.reduce((a, b) => parseFloat(a) + parseFloat(b.credit), 0);

  const printReport = () => {
    setShowReport(!showReport);
  };
  // category summary
  const title = type ? type.split(" ")[0] + " report" : "";
  const query_types = [
    "Purchase report",
    "Sales report",
    "Discount report",
    "Debt report",
    "Revenue report",
    "Expenses report",
  ];
  return (
    <CustomCard
      container="shadow container p-0"
      body="p-0"
      back={showReport ? <BackButton /> : <CustomButton>Back</CustomButton>}
      header={"Total " + title}
      style={{ height: "90.5vh" }}
      headerRight={
        mini || list?.length < 0 ? null : (
          <CustomButton
            color={showReport ? "danger" : ""}
            outline
            size="sm"
            onClick={printReport}
          >
            {showReport ? (
              "Close"
            ) : (
              <span>
                <Printer style={{ fontSize: "8px" }} /> Print
              </span>
            )}
          </CustomButton>
        )
      }
    >
      {/* {JSON.stringify(list)} */}
      {showReport ? (
        <div className="m-2 text-center">
          <ReportRecieptPDF
            list={list}
            range={range}
            agent={form.agent}
            title={title}
            activeBusiness={activeBusiness}
          />
        </div>
      ) : (
        <>
          <div className="m-2">
            <DaterangeSelector
              handleChange={handleChange}
              from={range.from}
              to={range.to}
              disabled ={user.role === "Pharmacy Owner"?false:true}
            />
            <Row clasName="mb-3">
              <Col md={5}>
                <SearchBar
                  filterText={filterText}
                  placeholder="Search items"
                  onFilterTextChange={(input) => setFilterText(input)}
                />
              </Col>
              <Col md={3}>
                <SelectInput
                  options={query_types}
                  defaultValue="< Report type >"
                  defaultClass="text-center"
                  onChange={({ target: { value } }) => {
                    setType(value.replace("report", "category summary"));
                  }}
                  disabled ={user.role === "Pharmacy Owner"?false:true}
                />
               
              </Col>
              <Col>
                {/* <Input
                  placeholder="All agent report"
                  options={}
                  value={form.agent}
                  onChange={({target:{value}}) => setForm((p) => ({...p,agent:value}))}
                /> */}
                {user.role === "Pharmacy Owner" ? (
                  <CustomTypeahead
                    placeholder="Select Agent"
                    labelKey={(i) => `${i.username}'s Reports`}
                    clearButton
                    options={pharmUsers}
                    onChange={(s) => {
                      if (s.length) {
                        console.log(s);
                        setForm((p) => ({
                          ...p,
                          agent: s[0].username,
                          role: s[0].role,
                        }));
                      }
                    }}
                    onInputChange={(v) => {
                      if (v.length) {
                        setForm((p) => ({ ...p, agent: "" }));
                      }
                    }}
                  />
                ) : (
                  <TextInput disabled value={`${user.username}'s Reports`} />
                )}
              </Col>
              <Col md={2}>
                <div className="text-end">
                  Rows: <strong>{list?.length}</strong>
                </div>
                <div className="text-end">
                  Total: <strong>{renderTotal(list, type)}</strong>
                </div>
              </Col>
            </Row>
          </div>
          {load?<Loading size="sm"/>:null }
          
          <Scrollbars style={{ height: "50.6vh" }} autoHide>
            <Table bordered size="sm">
              {["Revenue", "Expenses", "Debt", "Discount"].includes(
                type.split(" ")[0]
              ) ? (
                <thead>
                  <tr>
                    <th className="text-center">S/N</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Amount (₦)</th>
                  </tr>
                </thead>
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
                      {type.includes("Sales")
                        ? "Qty Sold"
                        : `Qty ${type.split(" ")[0]}`}
                    </th>
                    <th className="text-center">
                      {["Sales", "Return"].includes(type.split(" ")[0])
                        ? "Selling Price (₦)"
                        : "Cost Price (₦)"}
                    </th>
                    <th className="text-end">Total (₦)</th>
                  </tr>
                </thead>
              )}
              {type &&
              ["Revenue", "Expenses", "Debt", "Discount"].includes(
                type.split(" ")[0]
              ) ? (
                <tbody>
                  
                  {list &&
                    list.map((item, i) => (
                      <tr key={i}>
                        <th className="text-end">{i + 1}</th>
                        <td>
                          {moment(item.receive_date).format("DD-MM-YYYY")}
                        </td>
                        {["Revenue"].includes(type.split(" ")[0]) ? (
                          <td>{item.drug_name}</td>
                        ) : (
                          <td>{item.description}</td>
                        )}
                        {type.includes("Return") ? (
                          <td className="text-end">
                            {formatNumber(-parseFloat(item.selling_price))}
                          </td>
                        ) : type.includes("Expenses") ? (
                          <td className="text-end">
                            {formatNumber(-parseFloat(item.debit))}
                          </td>
                        ) : ["Discount"].includes(type.split(" ")[0]) ? (
                          <td className="text-center">
                            {formatNumber(item.credit)}
                          </td>
                        ) : ["Revenue"].includes(type.split(" ")[0]) ? (
                          <td className="text-center">
                            {formatNumber(
                              parseFloat(item.selling_price) -
                                parseFloat(item.unit_price)
                            )}
                          </td>
                        ) : (
                          <td className="text-end">
                            {formatNumber(item.amount)}
                          </td>
                        )}
                      </tr>
                    ))}
                  <tr>
                    <th scope="row" colSpan="3" className="text-end">
                      Total
                    </th>
                    <th className="text-end">{renderTotal(list, type)}</th>
                  </tr>
                </tbody>
              ) : (
                // ) : ['Discount'].includes(type.split(' ')[0]) ? (
                //   <>
                //     <tbody>
                //       {list &&
                //         list.map((item, i) => (
                //           <tr key={i}>
                //             <th className="text-center">{i + 1}</th>
                //             <td className="text-end">
                //               {" "}
                //               {moment(item.created).format("DD-MM-YYYY")}
                //             </td>
                //             <td>{item.description}</td>
                //             <td className="text-center">
                //               {formatNumber(item.credit)}
                //             </td>
                //           </tr>
                //         ))}
                //       <tr>
                //         <th scope="row" colSpan="4" className="text-end">
                //           Total
                //         </th>
                //         <th className="text-end">{formatNumber(totalDicount)}</th>
                //       </tr>
                //     </tbody>
                //   </>
                
                <tbody>
                  {list &&
                    list.map((item, i) => (
                      <tr key={i}>
                        <th className="text-center">{i + 1}</th>
                        <td>
                          {moment(item.receive_date).format("DD-MM-YYYY")}
                        </td>
                        <td>{item.description}</td>
                        <td className="text-center">
                          {formatNumber(item.qty)}
                        </td>
                        {["Sales", "Return"].includes(type.split(" ")[0]) ? (
                          <td className="text-end">
                            {formatNumber(item.selling_price)}
                          </td>
                        ) : (
                          <td className="text-end">
                            {formatNumber(item.unit_price)}
                          </td>
                        )}
                        {["Return report"].includes(type) ? (
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
                                : parseInt(item.qty) *
                                  parseInt(item.unit_price))
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  <tr>
                    <th scope="row" colSpan="5" className="text-end">
                      Total {type}
                    </th>
                    {type.includes("Return") ? (
                      <th className="text-end">
                        {formatNumber(
                          list.reduce(
                            (a, b) =>
                              parseFloat(a) + parseFloat(b.selling_price),
                            0
                          )
                        )}
                      </th>
                    ) : type.includes("Expenses") ? (
                      <th className="text-end">
                        {formatNumber(
                          list.reduce(
                            (a, b) => parseFloat(a) + parseFloat(b.debit),
                            0
                          )
                        )}
                      </th>
                    ) : (
                      <th className="text-end">
                        {formatNumber(
                          list?.reduce(
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
        </>
      )}
    </CustomCard>
  );
}
export const renderTotal = (list, type) => {
  return (
    <>
      ₦
      {type.includes("Return") ? (
        <span className="text-end">
          {formatNumber(
            list.reduce(
              (a, b) => parseFloat(a) + parseFloat(b.selling_price),
              0
            )
          )}
        </span>
      ) : type.includes("Expenses") ? (
        <span className="text-end">
          {formatNumber(
            list.reduce((a, b) => parseFloat(a) + -parseFloat(b.debit), 0)
          )}
        </span>
      ) : type.includes("Discount") ? (
        <span className="text-end">
          {formatNumber(
            list.reduce((a, b) => parseFloat(a) + -parseFloat(b.credit), 0)
          )}
        </span>
      ) : type.includes("Revenue") ? (
        <span className="text-end">
          {formatNumber(
            list.reduce(
              (a, b) =>
                parseFloat(a) +
                (parseFloat(b.selling_price) - parseFloat(b.unit_price)),
              0
            )
          )}
        </span>
      ) : (
        <span className="text-end">
          {formatNumber(
            list?.reduce((a, b) => parseFloat(a) + parseFloat(b.amount), 0)
          )}
        </span>
      )}
    </>
  );
};
