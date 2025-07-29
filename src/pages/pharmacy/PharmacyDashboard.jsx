"use client"

import moment from "moment"
import { useCallback, useEffect, useState } from "react"
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
  Activity,
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
            return (
              item.description?.toLowerCase()?.includes(searchTxt.toLowerCase()) ||
              item.receive_date.toString().includes(searchTxt)
            )
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
    <Container fluid className="dashboard-container p-5">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <Card className="welcome-card">
          <CardBody>
            <Row className="align-items-center">
              <Col md={8}>
                <div className="welcome-content">
                  <h1 className="welcome-title">Welcome back, {activeBusiness?.pharmacy_name || "Pharmacy"}</h1>
                  <p className="welcome-subtitle">
                    <Calendar size={16} className="me-2" />
                    {moment().format("dddd, MMMM Do YYYY")}
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="profit-indicator">
                  <div className="profit-content">
                    <span className="profit-label">Profit Margin</span>
                    <h2 className="profit-value">{profitMargin.toFixed(1)}%</h2>
                  </div>
                  <div className="profit-icon">
                    {profitMargin > 0 ? (
                      <TrendingUp size={32} className="trend-up" />
                    ) : (
                      <TrendingDown size={32} className="trend-down" />
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>

      {/* Date Range Filter */}
      {user?.role === "Pharmacy Owner" && (
        <div className="filter-section">
          <Card className="filter-card">
            <CardHeader>
              <CardTitle className="filter-title">
                <Filter size={18} />
                Date Range Filter
              </CardTitle>
            </CardHeader>
            <CardBody>
              <DaterangeSelector handleChange={handleChange} from={dateInfo.from} to={dateInfo.to} />
            </CardBody>
          </Card>
        </div>
      )}

      {/* Financial Summary Cards */}
      <div className="metrics-section">
        <Row>
          {user?.role === "Pharmacy Owner" && (
            <Col lg={3} md={6} className="mb-4">
              <Card className="metric-card purchases-card">
                <CardBody>
                  <div className="metric-header">
                    <div className="metric-icon purchases-icon">
                      <ShoppingCart size={24} />
                    </div>
                    <Badge className="metric-badge purchases-badge">Purchases</Badge>
                  </div>
                  <div className="metric-content">
                    <h3 className="metric-value">₦{formatNumber(purchaseTotal)}</h3>
                    <p className="metric-label">Total Purchases</p>
                  </div>
                  <div className="metric-footer">
                    <div className="metric-trend positive">
                      <TrendingUp size={12} />
                      <span>This period</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )}

          <Col lg={3} md={6} className="mb-4">
            <Card className="metric-card sales-card">
              <CardBody>
                <div className="metric-header">
                  <div className="metric-icon sales-icon">
                    <DollarSign size={24} />
                  </div>
                  <Badge className="metric-badge sales-badge">Sales</Badge>
                </div>
                <div className="metric-content">
                  <h3 className="metric-value">₦{formatNumber(salesTotal)}</h3>
                  <p className="metric-label">Total Sales</p>
                </div>
                <div className="metric-footer">
                  <Progress value={75} className="metric-progress sales-progress" />
                  <small className="progress-label">75% of target</small>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <Card className="metric-card discounts-card">
              <CardBody>
                <div className="metric-header">
                  <div className="metric-icon discounts-icon">
                    <Package size={24} />
                  </div>
                  <Badge className="metric-badge discounts-badge">Discounts</Badge>
                </div>
                <div className="metric-content">
                  <h3 className="metric-value">₦{formatNumber(discountTotal)}</h3>
                  <p className="metric-label">Total Discounts</p>
                </div>
                <div className="metric-footer">
                  <span className="discount-percentage">
                    {salesTotal > 0 ? ((discountTotal / salesTotal) * 100).toFixed(1) : 0}% of sales
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>

          {user?.role === "Pharmacy Owner" && (
            <Col lg={3} md={6} className="mb-4">
              <Card className="metric-card debts-card">
                <CardBody>
                  <div className="metric-header">
                    <div className="metric-icon debts-icon">
                      <AlertTriangle size={24} />
                    </div>
                    <Badge className="metric-badge debts-badge">Debts</Badge>
                  </div>
                  <div className="metric-content">
                    <h3 className="metric-value">₦{formatNumber(debtsTotal)}</h3>
                    <p className="metric-label">Outstanding Debts</p>
                  </div>
                  <div className="metric-footer">
                    <span className="debt-warning">Requires attention</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Row>
          {user?.role === "Pharmacy Owner" ? (
            <Col lg={8}>
              <Card className="purchases-table-card">
                <CardHeader>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <CardTitle className="table-title">
                        <Package size={18} />
                        Recent Purchases
                      </CardTitle>
                    </Col>
                    <Col md={6}>
                      <div className="table-controls">
                        <Checkbox
                          label="Show All"
                          checked={showAllPurchase}
                          onChange={() => setShowAllPurchase((p) => !p)}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody className="p-0">
                  {/* Search Section */}
                  <div className="search-section">
                    <div className="search-wrapper">
                      <Search size={16} className="search-icon" />
                      <SearchBar
                        onFilterTextChange={(v) => addSearchTxt(v)}
                        filterText={searchTxt}
                        placeholder="Search for purchases..."
                        className="search-input"
                      />
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="table-summary">
                    <Row>
                      <Col md={4}>
                        <div className="summary-item">
                          <h6 className="summary-value">{final.length}</h6>
                          <span className="summary-label">Total Items</span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="summary-item">
                          <h6 className="summary-value">₦{formatNumber(totalAmount)}</h6>
                          <span className="summary-label">Total Cost</span>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="summary-item">
                          <h6 className="summary-value">₦{formatNumber(total_selling_price)}</h6>
                          <span className="summary-label">Selling Price</span>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Table */}
                  <CustomScrollbar height="400px">
                    {final.length > 0 ? (
                      <Table responsive className="purchases-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Drug Name</th>
                            <th>Quantity</th>
                            <th>Cost Price</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {final.map((item, i) => (
                            <tr key={i}>
                              <td>
                                <Badge className="row-number">{i + 1}</Badge>
                              </td>
                              <td>
                                <span className="date-text">{moment(item.receive_date).format("MMM DD, YYYY")}</span>
                              </td>
                              <td>
                                <div className="drug-info">
                                  <div className="drug-name">{item.description}</div>
                                  {item.generic_name && <div className="generic-name">{item.generic_name}</div>}
                                </div>
                              </td>
                              <td>
                                <Badge className="quantity-badge">{formatNumber(item.qty)}</Badge>
                              </td>
                              <td className="price-cell">₦{formatNumber(item.unit_price)}</td>
                              <td className="amount-cell">₦{formatNumber(item.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="empty-state">
                        <Package size={48} />
                        <h5>No purchases found</h5>
                        <p>Try adjusting your search or date range</p>
                      </div>
                    )}
                  </CustomScrollbar>
                </CardBody>
              </Card>
            </Col>
          ) : (
            <Col lg={12}>
              <Card className="sales-dashboard-card">
                <CardHeader>
                  <CardTitle className="sales-title">
                    <DollarSign size={18} />
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
              <Card className="quick-stats-card">
                <CardHeader>
                  <CardTitle className="stats-title">Quick Overview</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="stat-item">
                    <div className="stat-header">
                      <span className="stat-label">Revenue Growth</span>
                      <span className="stat-value positive">+12.5%</span>
                    </div>
                    <Progress value={75} className="stat-progress revenue-progress" />
                  </div>

                  <div className="stat-item">
                    <div className="stat-header">
                      <span className="stat-label">Inventory Turnover</span>
                      <span className="stat-value info">8.2x</span>
                    </div>
                    <Progress value={82} className="stat-progress inventory-progress" />
                  </div>

                  <div className="stat-item">
                    <div className="stat-header">
                      <span className="stat-label">Customer Satisfaction</span>
                      <span className="stat-value warning">4.8/5</span>
                    </div>
                    <Progress value={96} className="stat-progress satisfaction-progress" />
                  </div>
                </CardBody>
              </Card>

              {/* Recent Activity */}
              <Card className="activity-card">
                <CardHeader>
                  <CardTitle className="activity-title">
                    <Activity size={18} />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="activity-timeline">
                    <div className="activity-item">
                      <div className="activity-marker success"></div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <h6>New Sale Completed</h6>
                          <span className="activity-time">2 min ago</span>
                        </div>
                        <p>₦15,000 - Paracetamol & Vitamins</p>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-marker primary"></div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <h6>Inventory Updated</h6>
                          <span className="activity-time">1 hour ago</span>
                        </div>
                        <p>50 items restocked</p>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-marker warning"></div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <h6>Low Stock Alert</h6>
                          <span className="activity-time">3 hours ago</span>
                        </div>
                        <p>Aspirin running low</p>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-marker info"></div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <h6>Report Generated</h6>
                          <span className="activity-time">5 hours ago</span>
                        </div>
                        <p>Monthly sales report ready</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </Container>
  )
}

export default PharmacyDashboard
