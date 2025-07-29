"use client"

import { useCallback, useEffect, useState } from "react"
import { Col, Row, Badge, Card, CardBody, CardHeader } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getClientInfo } from "../../../../redux/action/pharmacy"
import { formatNumber } from "../../../../components/UI/helpers"
import { useQuery } from "../../../../hooks"
import {
  Users,
  Search,
  Plus,
  Eye,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Download,
  RefreshCw,
} from "react-feather"
import { CustomButton, SearchBar } from "../../../../components/UI"
import Loading from "../../../../components/UI/Loading"
import Scrollbar from "../../../../components/UI/Scrollbar"
import './client.css'

export default function ClientTable() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const clientInfo = useSelector((state) => state.pharmacy.clientInfo)
  const loading = useSelector((state) => state.pharmacy.loading)
  const [showAllPurchase, setShowAllPurchase] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [sortBy, setSortBy] = useState("accName")
  const [sortOrder, setSortOrder] = useState("asc")
  const query = useQuery()
  const type = query.get("type")

  const _getClientInfo = useCallback(() => {
    dispatch(getClientInfo())
  }, [dispatch])

  useEffect(() => {
    _getClientInfo()
  }, [_getClientInfo])

  // Filter and sort clients
  const filteredClients = clientInfo
    ?.filter((client) => {
      if (!filterText) return true
      const searchTerm = filterText.toLowerCase()
      return (
        client.accName?.toLowerCase().includes(searchTerm) ||
        client.contactPhone?.toLowerCase().includes(searchTerm) ||
        client.contactEmail?.toLowerCase().includes(searchTerm) ||
        client.accountNo?.toLowerCase().includes(searchTerm)
      )
    })
    .sort((a, b) => {
      const aValue = a[sortBy] || ""
      const bValue = b[sortBy] || ""
      if (sortOrder === "asc") {
        return aValue.toString().localeCompare(bValue.toString())
      }
      return bValue.toString().localeCompare(aValue.toString())
    })

  // Calculate statistics
  const totalClients = clientInfo?.length || 0
  const activeClients = clientInfo?.filter((client) => client.balance > 0).length || 0
  const totalCreditLimit = clientInfo?.reduce((sum, client) => sum + (client.credit_limit || 0), 0) || 0
  const totalBalance = clientInfo?.reduce((sum, client) => sum + (client.balance || 0), 0) || 0

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const getBalanceStatus = (balance, creditLimit) => {
    if (balance <= 0) return "paid"
    if (balance >= creditLimit * 0.8) return "critical"
    if (balance >= creditLimit * 0.5) return "warning"
    return "normal"
  }

  const getBalanceBadge = (balance, creditLimit) => {
    const status = getBalanceStatus(balance, creditLimit)
    const badges = {
      paid: { color: "success", icon: CheckCircle, text: "Paid" },
      normal: { color: "info", icon: TrendingUp, text: "Normal" },
      warning: { color: "warning", icon: AlertCircle, text: "High" },
      critical: { color: "danger", icon: AlertCircle, text: "Critical" },
    }
    const badge = badges[status]
    const Icon = badge.icon
    return (
      <Badge className={`balance-badge balance-badge--${status}`}>
        <Icon size={12} />
        {badge.text}
      </Badge>
    )
  }

  return (
    <div className="client-table-container">
      {/* Header Section */}
      <div className="client-header">
        <Card className="header-card">
          <CardBody>
            <Row className="align-items-center">
              <Col md={6}>
                <div className="header-content">
                  <div className="header-icon">
                    <Users size={28} />
                  </div>
                  <div className="header-text">
                    <h1 className="header-title">Client Management</h1>
                    <p className="header-subtitle">Manage customer accounts and credit information</p>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="header-actions">
                  <CustomButton
                    size="sm"
                    outline
                    color="info"
                    onClick={() => navigate(`/app/pharmacy/manage-customer/client_deposit?type=${type}`)}
                    className="action-btn"
                  >
                    <CreditCard size={16} />
                    Client Deposit
                  </CustomButton>
                  <CustomButton
                    color="primary"
                    size="sm"
                    onClick={() => navigate(`/app/pharmacy/manage-customer/client_reg_form?type=${type}`)}
                    className="action-btn primary"
                  >
                    <Plus size={16} />
                    Add New Client
                  </CustomButton>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className="stats-section">
        <Row>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stat-card total-clients">
              <CardBody>
                <div className="stat-content">
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-details">
                    <h3 className="stat-value">{totalClients}</h3>
                    <p className="stat-label">Total Clients</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stat-card active-clients">
              <CardBody>
                <div className="stat-content">
                  <div className="stat-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="stat-details">
                    <h3 className="stat-value">{activeClients}</h3>
                    <p className="stat-label">Active Accounts</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stat-card credit-limit">
              <CardBody>
                <div className="stat-content">
                  <div className="stat-icon">
                    <CreditCard size={24} />
                  </div>
                  <div className="stat-details">
                    <h3 className="stat-value">₦{formatNumber(totalCreditLimit)}</h3>
                    <p className="stat-label">Total Credit Limit</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stat-card total-balance">
              <CardBody>
                <div className="stat-content">
                  <div className="stat-icon">
                    <AlertCircle size={24} />
                  </div>
                  <div className="stat-details">
                    <h3 className="stat-value">₦{formatNumber(totalBalance)}</h3>
                    <p className="stat-label">Outstanding Balance</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Main Table Card */}
      <Card className="table-card">
        <CardHeader>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="table-header">
                <Users size={20} />
                <h4 className="table-title">Client Directory</h4>
                <Badge className="client-count">{filteredClients?.length || 0} clients</Badge>
              </div>
            </Col>
            <Col md={6}>
              <div className="table-controls">
                <div className="search-wrapper">
                  <Search size={16} className="search-icon" />
                  <SearchBar
                    placeholder="Search clients by name, phone, or email..."
                    onFilterTextChange={(val) => setFilterText(val)}
                    filterText={filterText}
                    className="search-input"
                  />
                </div>
                <div className="control-buttons">
                  <CustomButton size="sm" outline onClick={_getClientInfo} className="refresh-btn">
                    <RefreshCw size={14} />
                  </CustomButton>
                  <CustomButton size="sm" outline className="export-btn">
                    <Download size={14} />
                  </CustomButton>
                </div>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody className="p-0">
          {loading ? (
            <div className="loading-container">
              <Loading size="lg" />
              <p>Loading client information...</p>
            </div>
          ) : (
            <Scrollbar>
              <div className="table-wrapper">
                <table className="clients-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort("accountNo")} className="sortable">
                        <div className="th-content">
                          Client ID
                          {sortBy === "accountNo" && (
                            <span className={`sort-indicator ${sortOrder}`}>{sortOrder === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                      </th>
                      <th onClick={() => handleSort("accName")} className="sortable">
                        <div className="th-content">
                          Client Name
                          {sortBy === "accName" && (
                            <span className={`sort-indicator ${sortOrder}`}>{sortOrder === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                      </th>
                      <th>Contact Info</th>
                      <th onClick={() => handleSort("credit_limit")} className="sortable text-end">
                        <div className="th-content">
                          Credit Limit
                          {sortBy === "credit_limit" && (
                            <span className={`sort-indicator ${sortOrder}`}>{sortOrder === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                      </th>
                      <th onClick={() => handleSort("balance")} className="sortable text-end">
                        <div className="th-content">
                          Balance
                          {sortBy === "balance" && (
                            <span className={`sort-indicator ${sortOrder}`}>{sortOrder === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                      </th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients?.map((client, index) => (
                      <tr key={client.accountNo || index} className="client-row">
                        <td>
                          <div className="client-id">
                            <span className="id-badge">{client.accountNo}</span>
                          </div>
                        </td>
                        <td>
                          <div className="client-name">
                            <div className="name-avatar">
                              <Users size={16} />
                            </div>
                            <div className="name-details">
                              <h6 className="name">{client.accName}</h6>
                              {client.contactAddress && (
                                <p className="address">
                                  <MapPin size={12} />
                                  {client.contactAddress}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="contact-info">
                            {client.contactPhone && (
                              <div className="contact-item">
                                <Phone size={12} />
                                <span>{client.contactPhone}</span>
                              </div>
                            )}
                            {client.contactEmail && (
                              <div className="contact-item">
                                <Mail size={12} />
                                <span>{client.contactEmail}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="text-end">
                          <span className="credit-limit">₦{formatNumber(client.credit_limit || 0)}</span>
                        </td>
                        <td className="text-end">
                          <span className={`balance ${client.balance > 0 ? "outstanding" : "clear"}`}>
                            ₦{formatNumber(Math.abs(client.balance || 0))}
                          </span>
                        </td>
                        <td>{getBalanceBadge(client.balance, client.credit_limit)}</td>
                        <td className="text-center">
                          <CustomButton
                            size="sm"
                            outline
                            color="primary"
                            onClick={() =>
                              navigate(
                                `/app/pharmacy/manage-customer/client_account_view?credit_limit=${client.credit_limit}&type=${type}&accountNo=${client.accountNo}&contactPhone=${client.contactPhone}&contactAddress=${client.contactAddress}&accName=${client.accName}&balance=${client.balance}&phone=${client.contactPhone}&email=${client.contactEmail}`,
                              )
                            }
                            className="view-btn"
                          >
                            <Eye size={14} />
                            View
                          </CustomButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {(!filteredClients || filteredClients.length === 0) && !loading && (
                  <div className="empty-state">
                    <Users size={48} />
                    <h5>No clients found</h5>
                    <p>{filterText ? "Try adjusting your search criteria" : "Start by adding your first client"}</p>
                    {!filterText && (
                      <CustomButton
                        color="primary"
                        onClick={() => navigate(`/app/pharmacy/manage-customer/client_reg_form?type=${type}`)}
                      >
                        <Plus size={16} />
                        Add First Client
                      </CustomButton>
                    )}
                  </div>
                )}
              </div>
            </Scrollbar>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
