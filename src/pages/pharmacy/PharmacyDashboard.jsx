"use client"

import moment from "moment"
import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Card, CardBody, CardHeader, Table, CardTitle, Col, Badge, Progress, Container } from "reactstrap"
import { Checkbox, SearchBar } from "../../components/UI"
import CustomScrollbar from "../../components/UI/CustomScrollbar"
import DaterangeSelector from "../../components/UI/DaterangeSelector"
import { formatNumber } from "../../components/UI/helpers"
import { getAllReport } from "../../redux/action/pharmacy"
import DashboardSales from "./DashboardSales"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  Calendar,
  Search,
  Filter,
} from "react-feather"
import './dashboard.css'

function PharmacyDashboard() {
  const today = moment().format("YYYY-MM-DD")
  const [dateInfo, setDateInfo] = useState({ from: today, to: today })
  const dispatch = useDispatch()
  const [purchase, setPurchase] = useState([])
  const [sales, setSales] = useState([])
  const [discount, setDiscount] = useState([])
  const [debts, setDebts] = useState([])
  const [list, setList] = useState([])
  const [items, setItems] = useState([])
  const user = useSelector((state) => state.auth.user)
  const [showAllPurchase, setShowAllPurchase] = useState(false)
  const { activeBusiness } = useSelector((state) => state.auth)

  const syncData = useCallback(() => {
    dispatch(
      getAllReport(setPurchase, {
        from: dateInfo.from,
        to: dateInfo.to,
        query_type: "Purchase summary",
      }),
    )
    dispatch(
      getAllReport(setSales, {
        from: dateInfo.from,
        to: dateInfo.to,
        query_type: "Sales summary",
      }),
    )
    dispatch(
      getAllReport(setDiscount, {
        from: dateInfo.from,
        to: dateInfo.to,
        query_type: "Discount summary",
      }),
    )
    dispatch(
      getAllReport(setDebts, {
        from: dateInfo.from,
        to: dateInfo.to,
        query_type: "Debt summary",
      }),
    )
  }, [dispatch, dateInfo.from, dateInfo.to])

  useEffect(() => {
    syncData()
  }, [syncData])

  const getReports = useCallback(() => {
    dispatch(
      getAllReport(setList, {
        from: dateInfo.from,
        to: dateInfo.to,
        query_type: "Purchase category summary",
      }),
    )
  }, [dispatch, dateInfo.from, dateInfo.to])

  const [searchTxt, addSearchTxt] = useState("")

  const retrieveList = useCallback(() => {
    setItems(
      searchTxt.length > 2 && list.length
        ? list.filter((item) => {
            return item.description
              ?.toLowerCase()
              ?.includes(searchTxt.toLowerCase() || item.receive_date.toString().includes(searchTxt))
          })
        : list,
    )
  }, [list, searchTxt])

  useEffect(() => {
    getReports()
  }, [getReports])

  useEffect(() => {
    retrieveList()
  }, [retrieveList])

  const handleChange = ({ target: { name, value } }) => {
    setDateInfo((p) => ({ ...p, [name]: value }))
  }

  const totalAmount = list.reduce((a, b) => Number.parseFloat(a) + Number.parseFloat(b.amount || 0), 0)
  const total_selling_price = list.reduce(
    (a, b) => Number.parseFloat(a) + Number.parseFloat(b.selling_price || 0) * Number.parseFloat(b.qty || 0),
    0,
  )
  const final = items.length > 0 && showAllPurchase ? items : items.slice(-15)

  // Calculate metrics
  const purchaseTotal = purchase.length ? purchase[0].total || 0 : 0
  const salesTotal = sales.length ? sales[0].total || 0 : 0
  const discountTotal = discount.length ? discount[0].total || 0 : 0
  const debtsTotal = debts.length ? debts[0].total || 0 : 0

  // Calculate profit margin
  const profitMargin = salesTotal > 0 ? ((salesTotal - purchaseTotal) / salesTotal) * 100 : 0

  return (
    <Container fluid className="py-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <CardBody className="bg-gradient-primary text-white rounded">
              <Row className="align-items-center">
                <Col md={8}>
                  <h2 className="mb-1 text-white">Welcome back, {activeBusiness?.pharmacy_name || "Pharmacy"}</h2>
                  <p className="mb-0 text-white-50">
                    <Calendar size={16} className="me-2" />
                    {moment().format("dddd, MMMM Do YYYY")}
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="me-3">
                      <small className="text-white-50 d-block">Profit Margin</small>
                      <h4 className="mb-0 text-white">{profitMargin.toFixed(1)}%</h4>
                    </div>
                    {profitMargin > 0 ? (
                      <TrendingUp size={32} className="text-success" />
                    ) : (
                      <TrendingDown size={32} className="text-warning" />
                    )}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Date Range Selector */}
      {user?.role === "Pharmacy Owner" && (
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-light border-0">
                <CardTitle className="mb-0 d-flex align-items-center">
                  <Filter size={18} className="me-2 text-primary" />
                  Date Range Filter
                </CardTitle>
              </CardHeader>
              <CardBody>
                <DaterangeSelector handleChange={handleChange} from={dateInfo.from} to={dateInfo.to} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      {/* Financial Summary Cards */}
      <Row className="mb-4">
        {user?.role === "Pharmacy Owner" && (
          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100 hover-shadow">
              <CardBody className="text-center">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                    <ShoppingCart size={24} className="text-primary" />
                  </div>
                  <Badge color="primary" pill>
                    Purchases
                  </Badge>
                </div>
                <h3 className="mb-1 text-primary">₦{formatNumber(purchaseTotal)}</h3>
                <p className="text-muted mb-0">Total Purchases</p>
                <div className="mt-2">
                  <small className="text-success">
                    <TrendingUp size={12} className="me-1" />
                    This period
                  </small>
                </div>
              </CardBody>
            </Card>
          </Col>
        )}

        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100 hover-shadow">
            <CardBody className="text-center">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                  <DollarSign size={24} className="text-success" />
                </div>
                <Badge color="success" pill>
                  Sales
                </Badge>
              </div>
              <h3 className="mb-1 text-success">₦{formatNumber(salesTotal)}</h3>
              <p className="text-muted mb-0">Total Sales</p>
              <div className="mt-2">
                <Progress value={75} color="success" className="progress-sm" />
                <small className="text-muted">75% of target</small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100 hover-shadow">
            <CardBody className="text-center">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                  <Package size={24} className="text-warning" />
                </div>
                <Badge color="warning" pill>
                  Discounts
                </Badge>
              </div>
              <h3 className="mb-1 text-warning">₦{formatNumber(discountTotal)}</h3>
              <p className="text-muted mb-0">Total Discounts</p>
              <div className="mt-2">
                <small className="text-info">
                  {salesTotal > 0 ? ((discountTotal / salesTotal) * 100).toFixed(1) : 0}% of sales
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        {user?.role === "Pharmacy Owner" && (
          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100 hover-shadow">
              <CardBody className="text-center">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-danger bg-opacity-10 p-3 rounded-circle">
                    <AlertTriangle size={24} className="text-danger" />
                  </div>
                  <Badge color="danger" pill>
                    Debts
                  </Badge>
                </div>
                <h3 className="mb-1 text-danger">₦{formatNumber(debtsTotal)}</h3>
                <p className="text-muted mb-0">Outstanding Debts</p>
                <div className="mt-2">
                  <small className="text-danger">Requires attention</small>
                </div>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>

      {/* Main Content Area */}
      <Row>
        {user?.role === "Pharmacy Owner" ? (
          <Col lg={8}>
            {/* Purchase Items Table */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-light border-0">
                <Row className="align-items-center">
                  <Col md={6}>
                    <CardTitle className="mb-0 d-flex align-items-center">
                      <Package size={18} className="me-2 text-primary" />
                      Recent Purchases
                    </CardTitle>
                  </Col>
                  <Col md={6}>
                    <div className="d-flex align-items-center justify-content-end">
                      <div className="me-3">
                        <Checkbox
                          label="Show All"
                          checked={showAllPurchase}
                          onChange={() => setShowAllPurchase((p) => !p)}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="p-0">
                {/* Search Bar */}
                <div className="p-3 border-bottom bg-light">
                  <div className="position-relative">
                    <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    <SearchBar
                      onFilterTextChange={(v) => addSearchTxt(v)}
                      filterText={searchTxt}
                      placeholder="Search for purchases..."
                      className="ps-5"
                    />
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="p-3 bg-light border-bottom">
                  <Row className="text-center">
                    <Col md={4}>
                      <div>
                        <h6 className="mb-1 text-primary">{final.length}</h6>
                        <small className="text-muted">Total Items</small>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div>
                        <h6 className="mb-1 text-success">₦{formatNumber(totalAmount)}</h6>
                        <small className="text-muted">Total Cost</small>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div>
                        <h6 className="mb-1 text-info">₦{formatNumber(total_selling_price)}</h6>
                        <small className="text-muted">Selling Price</small>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Table */}
                <CustomScrollbar height="400px">
                  {final.length > 0 ? (
                    <Table responsive hover className="mb-0">
                      <thead className="bg-light sticky-top">
                        <tr>
                          <th className="border-0 text-center">#</th>
                          <th className="border-0">Date</th>
                          <th className="border-0">Drug Name</th>
                          <th className="border-0 text-center">Quantity</th>
                          <th className="border-0 text-end">Cost Price (₦)</th>
                          <th className="border-0 text-end">Amount (₦)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {final.map((item, i) => (
                          <tr key={i} className="border-bottom">
                            <td className="text-center">
                              <Badge color="light" pill>
                                {i + 1}
                              </Badge>
                            </td>
                            <td>
                              <small className="text-muted">{moment(item.receive_date).format("MMM DD, YYYY")}</small>
                            </td>
                            <td>
                              <div>
                                <div className="fw-medium">{item.description}</div>
                                {item.generic_name && <small className="text-muted">{item.generic_name}</small>}
                              </div>
                            </td>
                            <td className="text-center">
                              <Badge color="primary" pill>
                                {formatNumber(item.qty)}
                              </Badge>
                            </td>
                            <td className="text-end fw-medium">₦{formatNumber(item.unit_price)}</td>
                            <td className="text-end fw-bold text-success">₦{formatNumber(item.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <div className="text-center py-5">
                      <Package size={48} className="text-muted mb-3" />
                      <h5 className="text-muted">No purchases found</h5>
                      <p className="text-muted">Try adjusting your search or date range</p>
                    </div>
                  )}
                </CustomScrollbar>
              </CardBody>
            </Card>
          </Col>
        ) : (
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-light border-0">
                <CardTitle className="mb-0 d-flex align-items-center">
                  <DollarSign size={18} className="me-2 text-success" />
                  Sales Dashboard
                </CardTitle>
              </CardHeader>
              <CardBody>
                <DashboardSales />
              </CardBody>
            </Card>
          </Col>
        )}

        {user?.role === "Pharmacy Owner" && (
          <Col lg={4}>
            {/* Quick Stats */}
            <Card className="border-0 shadow-sm mb-4">
              <CardHeader className="bg-light border-0">
                <CardTitle className="mb-0">Quick Overview</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Revenue Growth</span>
                    <span className="text-success fw-bold">+12.5%</span>
                  </div>
                  <Progress value={75} color="success" className="progress-sm" />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Inventory Turnover</span>
                    <span className="text-info fw-bold">8.2x</span>
                  </div>
                  <Progress value={82} color="info" className="progress-sm" />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Customer Satisfaction</span>
                    <span className="text-warning fw-bold">4.8/5</span>
                  </div>
                  <Progress value={96} color="warning" className="progress-sm" />
                </div>
              </CardBody>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-light border-0">
                <CardTitle className="mb-0">Recent Activity</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="timeline">
                  <div className="timeline-item mb-3">
                    <div className="timeline-marker bg-success"></div>
                    <div className="timeline-content">
                      <h6 className="mb-1">New Sale Completed</h6>
                      <p className="text-muted mb-0 small">₦15,000 - Paracetamol & Vitamins</p>
                      <small className="text-muted">2 minutes ago</small>
                    </div>
                  </div>

                  <div className="timeline-item mb-3">
                    <div className="timeline-marker bg-primary"></div>
                    <div className="timeline-content">
                      <h6 className="mb-1">Inventory Updated</h6>
                      <p className="text-muted mb-0 small">50 items restocked</p>
                      <small className="text-muted">1 hour ago</small>
                    </div>
                  </div>

                  <div className="timeline-item mb-3">
                    <div className="timeline-marker bg-warning"></div>
                    <div className="timeline-content">
                      <h6 className="mb-1">Low Stock Alert</h6>
                      <p className="text-muted mb-0 small">Aspirin running low</p>
                      <small className="text-muted">3 hours ago</small>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>

      {/* Custom Styles */}
      <style jsx>{`
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .progress-sm {
          height: 4px;
        }
        .timeline {
          position: relative;
        }
        .timeline-item {
          position: relative;
          padding-left: 2rem;
        }
        .timeline-marker {
          position: absolute;
          left: 0;
          top: 0.25rem;
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }
        .timeline-item:not(:last-child)::before {
          content: '';
          position: absolute;
          left: 0.375rem;
          top: 1rem;
          width: 1px;
          height: calc(100% - 0.5rem);
          background-color: #dee2e6;
        }
        .bg-gradient-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }
        .sticky-top {
          position: sticky;
          top: 0;
          z-index: 10;
        }
      `}</style>
    </Container>
  )
}

export default PharmacyDashboard
