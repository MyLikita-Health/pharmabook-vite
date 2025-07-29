"use client"

import moment from "moment"
import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Col, Row, Card, CardBody, CardHeader, Badge } from "reactstrap"
import { formatNumber } from "../../components/UI/helpers"
import Scrollbars from "../../components/UI/Scrollbar"
import DaterangeSelector from "../../components/UI/DaterangeSelector"
import useQuery from "../../hooks/useQuery"
import { CustomButton, SearchBar, SelectInput, TextInput } from "../../components/UI"
import { getAllReport, getPharmStore, getPharmUsers } from "../../redux/action/pharmacy"
import CustomTypeahead from "../../components/UI/CustomTypeahead"
import ReportRecieptPDF from "./ReportRecieptPDF"
import {
  Printer,
  FileText,
  Calendar,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  AlertTriangle,
  BarChart3,
  Activity,
} from "lucide-react";
import './reports-modern.css'
import Loading from "../../components/UI/Loading"

export default function Reports({ mini = false }) {
  const query = useQuery()
  const fromDate = query.get("from")
  const toDate = query.get("to")
  const query_type = query.get("_type") || "Purchase report"

  const { user, activeBusiness } = useSelector((s) => s.auth)
  const load = useSelector((pr) => pr.pharmacy.loading)
  const dispatch = useDispatch()
  const [report, setReport] = useState([])
  const [list, setList] = useState([])
  const pharmUsers = useSelector((state) => state.pharmacy.pharmUsers)
  const [filterText, setFilterText] = useState("")
  const [showReport, setShowReport] = useState(false)

  const from = fromDate ? moment(fromDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
  const to = toDate ? moment(toDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")

  const [range, setRange] = useState({ from, to })
  const [type, setType] = useState(query_type || "")

  const handleChange = ({ target: { name, value } }) => {
    setRange((prev) => ({
      ...prev,
      [name]: moment(value).format("YYYY-MM-DD"),
    }))
  }

  const [form, setForm] = useState({
    branch_name: "",
    agent: "",
  })

  const _getPharmUsers = useCallback(() => {
    dispatch(getPharmUsers())
  }, [dispatch])

  useEffect(() => _getPharmUsers(), [_getPharmUsers])

  const getReports = useCallback(() => {
    dispatch(
      getAllReport(setReport, {
        from: range.from,
        to: range.to,
        query_type: type.split(" ")[0] + " category summary",
        agent: form.role === "Pharmacy Owner" ? "" : form.agent,
      }),
    )
    dispatch(getPharmStore())
  }, [dispatch, range, type, form])

  useEffect(() => {
    getReports()
  }, [0, getReports])

  const retrieveList = useCallback(() => {
    setList(
      filterText.length > 3 && report.length
        ? report.filter((item) => {
            return item.description?.toLowerCase()?.includes(filterText.toLowerCase())
          })
        : report,
    )
  }, [report, filterText])

  useEffect(() => {
    retrieveList()
  }, [retrieveList])

  const tt = list && list.length && list.map((item) => Number.parseInt(item.qty) * Number.parseInt(item.selling_price))

  const total = tt && tt.reduce((total, num) => Number.parseFloat(total) + Number.parseFloat(num))

  const tt2 =
    list &&
    list.length &&
    list
      .map((item) => Number.parseInt(item.amount))
      .reduce((total, num) => Number.parseFloat(total) + Number.parseFloat(num))

  const totalDicount = list && list.reduce((a, b) => Number.parseFloat(a) + Number.parseFloat(b.credit), 0)

  const printReport = () => {
    setShowReport(!showReport)
  }

  const title = type ? type.split(" ")[0] + " report" : ""

  const query_types = [
    "Purchase report",
    "Sales report",
    "Discount report",
    "Debt report",
    "Revenue report",
    "Expenses report",
  ]

  // Calculate summary statistics
  const totalAmount = list?.reduce((a, b) => Number.parseFloat(a) + Number.parseFloat(b.amount || 0), 0) || 0
  const totalItems = list?.length || 0
  const averageAmount = totalItems > 0 ? totalAmount / totalItems : 0

  const getReportIcon = (reportType) => {
    const icons = {
      Purchase: Package,
      Sales: TrendingUp,
      Discount: AlertTriangle,
      Debt: TrendingDown,
      Revenue: DollarSign,
      Expenses: Activity,
    }
    return icons[reportType.split(" ")[0]] || FileText
  }

  const getReportColor = (reportType) => {
    const colors = {
      Purchase: "#3b82f6",
      Sales: "#10b981",
      Discount: "#f59e0b",
      Debt: "#ef4444",
      Revenue: "#8b5cf6",
      Expenses: "#f97316",
    }
    return colors[reportType.split(" ")[0]] || "#6b7280"
  }

  return (
    <div className="reports-container-modern">
      {showReport ? (
        <div className="report-print-view">
          <Card className="print-card">
            <CardHeader>
              <div className="print-header">
                <div className="print-title">
                  <FileText size={24} />
                  <h3>{title}</h3>
                </div>
                <CustomButton color="danger" outline size="sm" onClick={printReport}>
                  Close Print View
                </CustomButton>
              </div>
            </CardHeader>
            <CardBody>
              <ReportRecieptPDF
                list={list}
                range={range}
                agent={form.agent}
                title={title}
                activeBusiness={activeBusiness}
              />
            </CardBody>
          </Card>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="reports-header-modern">
            <Card className="header-card-modern">
              <CardBody>
                <div className="header-content-modern">
                  <div className="header-main-modern">
                    <div className="header-icon-modern">
                      <BarChart3 size={28} />
                    </div>
                    <div className="header-text-modern">
                      <h1 className="header-title-modern">Reports & Analytics</h1>
                      <p className="header-subtitle-modern">
                        Generate comprehensive reports for your pharmacy operations
                      </p>
                    </div>
                  </div>
                  <div className="header-actions-modern">
                    <CustomButton size="sm" outline onClick={() => window.history.back()}>
                      <FileText size={16} />
                      Back
                    </CustomButton>
                    {list?.length > 0 && (
                      <CustomButton color="primary" size="sm" onClick={printReport}>
                        <Printer size={16} />
                        Print Report
                      </CustomButton>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Summary Statistics */}
          <div className="summary-stats-modern">
            <Row>
              <Col lg={3} md={6} className="mb-3">
                <Card className="stat-card-modern">
                  <CardBody>
                    <div className="stat-content-modern">
                      <div className="stat-icon-modern" style={{ backgroundColor: getReportColor(type) }}>
                        {(() => {
                          const Icon = getReportIcon(type)
                          return <Icon size={24} />
                        })()}
                      </div>
                      <div className="stat-details-modern">
                        <h3 className="stat-value-modern">{totalItems}</h3>
                        <p className="stat-label-modern">Total Records</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-3">
                <Card className="stat-card-modern">
                  <CardBody>
                    <div className="stat-content-modern">
                      <div className="stat-icon-modern total-amount">
                        <DollarSign size={24} />
                      </div>
                      <div className="stat-details-modern">
                        <h3 className="stat-value-modern">₦{formatNumber(totalAmount)}</h3>
                        <p className="stat-label-modern">Total Amount</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-3">
                <Card className="stat-card-modern">
                  <CardBody>
                    <div className="stat-content-modern">
                      <div className="stat-icon-modern average-amount">
                        <TrendingUp size={24} />
                      </div>
                      <div className="stat-details-modern">
                        <h3 className="stat-value-modern">₦{formatNumber(averageAmount)}</h3>
                        <p className="stat-label-modern">Average Amount</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-3">
                <Card className="stat-card-modern">
                  <CardBody>
                    <div className="stat-content-modern">
                      <div className="stat-icon-modern date-range">
                        <Calendar size={24} />
                      </div>
                      <div className="stat-details-modern">
                        <h3 className="stat-value-modern">{moment(range.to).diff(moment(range.from), "days") + 1}</h3>
                        <p className="stat-label-modern">Days Range</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Main Report Card */}
          <Card className="report-card-modern">
            <CardHeader>
              <div className="report-header-modern">
                <div className="report-title-modern">
                  <FileText size={20} />
                  <h4>{title || "Select Report Type"}</h4>
                  {list?.length > 0 && <Badge className="record-count-modern">{list.length} records</Badge>}
                </div>
              </div>
            </CardHeader>

            <CardBody>
              {/* Controls Section */}
              <div className="controls-section-modern">
                <Row className="align-items-end">
                  <Col lg={3} md={6} className="mb-3">
                    <label className="control-label-modern">
                      <Calendar size={16} />
                      Date Range
                    </label>
                    <DaterangeSelector
                      handleChange={handleChange}
                      from={range.from}
                      to={range.to}
                      disabled={user.role !== "Pharmacy Owner"}
                    />
                  </Col>

                  <Col lg={3} md={6} className="mb-3">
                    <label className="control-label-modern">
                      <Filter size={16} />
                      Report Type
                    </label>
                    <SelectInput
                      options={query_types}
                      defaultValue="< Report type >"
                      defaultClass="text-center"
                      onChange={({ target: { value } }) => {
                        setType(value.replace("report", "category summary"))
                      }}
                      disabled={user.role !== "Pharmacy Owner"}
                      className="modern-select"
                    />
                  </Col>

                  <Col lg={3} md={6} className="mb-3">
                    <label className="control-label-modern">
                      <Users size={16} />
                      Agent Filter
                    </label>
                    {user.role === "Pharmacy Owner" ? (
                      <CustomTypeahead
                        placeholder="Select Agent"
                        labelKey={(i) => `${i.username}'s Reports`}
                        clearButton
                        options={pharmUsers}
                        onChange={(s) => {
                          if (s.length) {
                            setForm((p) => ({
                              ...p,
                              agent: s[0].username,
                              role: s[0].role,
                            }))
                          }
                        }}
                        onInputChange={(v) => {
                          if (v.length) {
                            setForm((p) => ({ ...p, agent: "" }))
                          }
                        }}
                        className="modern-typeahead"
                      />
                    ) : (
                      <TextInput disabled value={`${user.username}'s Reports`} className="modern-input" />
                    )}
                  </Col>

                  <Col lg={3} md={6} className="mb-3">
                    <label className="control-label-modern">
                      <Search size={16} />
                      Search Items
                    </label>
                    <SearchBar
                      filterText={filterText}
                      placeholder="Search items..."
                      onFilterTextChange={(input) => setFilterText(input)}
                      className="modern-search"
                    />
                  </Col>
                </Row>
              </div>

              {/* Loading State */}
              {load && (
                <div className="loading-section-modern">
                  <Loading size="lg" />
                  <p>Generating report...</p>
                </div>
              )}

              {/* Report Table */}
              <div className="table-section-modern">
                <Scrollbars style={{ height: "50vh" }} autoHide>
                  <Table className="report-table-modern" responsive>
                    {["Revenue", "Expenses", "Debt", "Discount"].includes(type.split(" ")[0]) ? (
                      <thead>
                        <tr>
                          <th className="table-header-modern">S/N</th>
                          <th className="table-header-modern">Date</th>
                          <th className="table-header-modern">Description</th>
                          <th className="table-header-modern text-end">Amount (₦)</th>
                        </tr>
                      </thead>
                    ) : (
                      <thead>
                        <tr>
                          <th className="table-header-modern">S/N</th>
                          <th className="table-header-modern">Date</th>
                          <th className="table-header-modern">Description</th>
                          <th className="table-header-modern text-center">
                            {type.includes("Sales") ? "Qty Sold" : `Qty ${type.split(" ")[0]}`}
                          </th>
                          <th className="table-header-modern text-end">
                            {["Sales", "Return"].includes(type.split(" ")[0]) ? "Selling Price (₦)" : "Cost Price (₦)"}
                          </th>
                          <th className="table-header-modern text-end">Total (₦)</th>
                        </tr>
                      </thead>
                    )}

                    <tbody>
                      {list && list.length > 0 ? (
                        <>
                          {list.map((item, i) => (
                            <tr key={i} className="table-row-modern">
                              <td className="table-cell-modern">
                                <Badge className="row-number-modern">{i + 1}</Badge>
                              </td>
                              <td className="table-cell-modern">
                                <span className="date-text-modern">
                                  {moment(item.receive_date).format("DD-MM-YYYY")}
                                </span>
                              </td>
                              <td className="table-cell-modern">
                                <div className="description-cell-modern">
                                  {["Revenue"].includes(type.split(" ")[0]) ? item.drug_name : item.description}
                                </div>
                              </td>

                              {!["Revenue", "Expenses", "Debt", "Discount"].includes(type.split(" ")[0]) && (
                                <>
                                  <td className="table-cell-modern text-center">
                                    <Badge className="quantity-badge-modern">{formatNumber(item.qty)}</Badge>
                                  </td>
                                  <td className="table-cell-modern text-end price-cell-modern">
                                    ₦
                                    {["Sales", "Return"].includes(type.split(" ")[0])
                                      ? formatNumber(item.selling_price)
                                      : formatNumber(item.unit_price)}
                                  </td>
                                </>
                              )}

                              <td className="table-cell-modern text-end amount-cell-modern">
                                ₦
                                {type.includes("Return")
                                  ? formatNumber(-Number.parseFloat(item.selling_price))
                                  : type.includes("Expenses")
                                    ? formatNumber(-Number.parseFloat(item.debit))
                                    : ["Discount"].includes(type.split(" ")[0])
                                      ? formatNumber(item.credit)
                                      : ["Revenue"].includes(type.split(" ")[0])
                                        ? formatNumber(
                                            Number.parseFloat(item.selling_price) - Number.parseFloat(item.unit_price),
                                          )
                                        : formatNumber(item.amount)}
                              </td>
                            </tr>
                          ))}

                          {/* Total Row */}
                          <tr className="total-row-modern">
                            <td
                              colSpan={["Revenue", "Expenses", "Debt", "Discount"].includes(type.split(" ")[0]) ? 3 : 5}
                              className="total-label-modern"
                            >
                              <strong>Total {type}</strong>
                            </td>
                            <td className="total-amount-modern">
                              <strong>{renderTotal(list, type)}</strong>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td
                            colSpan={["Revenue", "Expenses", "Debt", "Discount"].includes(type.split(" ")[0]) ? 4 : 6}
                            className="empty-state-modern"
                          >
                            <div className="empty-content-modern">
                              <FileText size={48} />
                              <h5>No Data Available</h5>
                              <p>
                                {type
                                  ? "No records found for the selected criteria"
                                  : "Please select a report type to view data"}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Scrollbars>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  )
}

export const renderTotal = (list, type) => {
  return (
    <>
      ₦
      {type.includes("Return") ? (
        <span className="text-end">
          {formatNumber(list.reduce((a, b) => Number.parseFloat(a) + Number.parseFloat(b.selling_price), 0))}
        </span>
      ) : type.includes("Expenses") ? (
        <span className="text-end">
          {formatNumber(list.reduce((a, b) => Number.parseFloat(a) + -Number.parseFloat(b.debit), 0))}
        </span>
      ) : type.includes("Discount") ? (
        <span className="text-end">
          {formatNumber(list.reduce((a, b) => Number.parseFloat(a) + -Number.parseFloat(b.credit), 0))}
        </span>
      ) : type.includes("Revenue") ? (
        <span className="text-end">
          {formatNumber(
            list.reduce(
              (a, b) => Number.parseFloat(a) + (Number.parseFloat(b.selling_price) - Number.parseFloat(b.unit_price)),
              0,
            ),
          )}
        </span>
      ) : (
        <span className="text-end">
          {formatNumber(list?.reduce((a, b) => Number.parseFloat(a) + Number.parseFloat(b.amount), 0))}
        </span>
      )}
    </>
  )
}
