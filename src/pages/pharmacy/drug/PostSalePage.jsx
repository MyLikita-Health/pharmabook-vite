"use client"

import { useEffect, useState, useCallback } from "react"
import { Container } from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import CustomCard from "../../../components/UI/CustomCard"
import Loading from "../../../components/UI/Loading"
import { formatNumber } from "../../../components/UI/helpers"
import { CustomTable } from "../../../components/UI"
import useQuery from "../../../hooks/useQuery"
import { PDFViewer } from "@react-pdf/renderer"
import SalesReceipt from "./SalesReceipt"
import { getDiscount, getReceiptData } from "../../../redux/action/pharmacy"
import {
  Receipt,
  Printer,
  Download,
  Share2,
  Eye,
  X,
  Calendar,
  User,
  CreditCard,
  Hash,
  DollarSign,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

import "./PostSalePage.css"

function PostSalePage() {
  const query = useQuery()
  const receiptList = useSelector((state) => state.pharmacy.receiptData)
  const discount = useSelector((state) => state.pharmacy._discount)
  const loading = useSelector((state) => state.pharmacy.loading)
  const { busName, address, phone, username } = useSelector((state) => state.auth.user)

  const receiptNo = query.get("transaction_id")
  const buyer = query.get("buyer")
  const customer_balance = query.get("customer_balance")
  const page = query.get("page")
  const identifier = query.get("identifier")

  const [preview, setPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  const _getReceiptData = useCallback(() => {
    dispatch(getReceiptData(receiptNo))
    dispatch(getDiscount({ receiptNo }))
  }, [dispatch, receiptNo])

  useEffect(() => {
    const timer = setTimeout(() => {
      _getReceiptData()
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [_getReceiptData])

  const info = receiptList.length ? receiptList[receiptList.length - 1] : {}
  const { user, activeBusiness } = useSelector((s) => s.auth)

  const item_list = receiptList.filter((state) => !state.item_name?.includes("Discount"))
  const totalAmount = receiptList
    .filter((state) => state.acct !== "60000")
    .reduce((a, b) => a + Number.parseFloat(b.amount), 0)
  const amountPaid = Number.parseFloat(query.get("amount"))
  const grandTotal = Number.parseFloat(totalAmount) - (Number.parseFloat(discount) || 0)
  const balance = Number.parseFloat(grandTotal) - Number.parseFloat(amountPaid)

  const printBtn = () => {
    setPreview((p) => !p)
  }

  const handleShare = () => {
    // Share functionality
    console.log("Share receipt")
  }

  const handleDownload = () => {
    // Download functionality
    console.log("Download receipt")
  }

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case "cash":
        return DollarSign
      case "card":
        return CreditCard
      default:
        return CreditCard
    }
  }

  const getCustomerType = () => {
    return buyer === "undefined" || buyer === null || buyer === "" || buyer === "walk-in" ? "walk-in" : "registered"
  }

  const fields = [
    {
      title: "S/N",
      custom: true,
      component: (item, index) => (
        <div className="serial-number">
          <span className="serial-badge">{index + 1}</span>
        </div>
      ),
      className: "text-center",
      width: "80px",
    },
    {
      title: (
        <div className="table-header-with-icon">
          <ShoppingCart size={16} />
          <span>Item Details</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="item-details-cell">
          <div className="item-icon">
            <ShoppingCart size={16} />
          </div>
          <div className="item-info">
            <div className="item-name">{item.item_name}</div>
            {item.batch_no && <div className="item-batch">Batch: {item.batch_no}</div>}
          </div>
        </div>
      ),
      className: "text-left",
    },
    {
      title: (
        <div className="table-header-with-icon">
          <Hash size={16} />
          <span>Qty</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="quantity-cell">
          {item.quantity === "0" ? (
            <span className="no-data">-</span>
          ) : (
            <div className="quantity-badge">
              <span>{formatNumber(item.quantity)}</span>
            </div>
          )}
        </div>
      ),
      className: "text-center",
      width: "100px",
    },
    {
      title: (
        <div className="table-header-with-icon">
          <DollarSign size={16} />
          <span>Unit Price</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="price-cell">
          {item.quantity === "0" ? (
            <span className="no-data">-</span>
          ) : (
            <div className="price-amount">₦{formatNumber(item.price)}</div>
          )}
        </div>
      ),
      className: "text-end",
      width: "120px",
    },
    {
      title: (
        <div className="table-header-with-icon">
          <Receipt size={16} />
          <span>Total</span>
        </div>
      ),
      custom: true,
      component: (item) => (
        <div className="amount-cell">
          <div className="amount-value">₦{formatNumber(item.amount)}</div>
        </div>
      ),
      className: "text-end",
      width: "120px",
    },
  ]

  if (isLoading) {
    return (
      <Container className="mt-0">
        <div className="loading-page">
          <div className="loading-content">
            <div className="loading-spinner-large"></div>
            <h3>Loading Receipt...</h3>
            <p>Please wait while we fetch your transaction details</p>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="mt-5">
      <div className="post-sale-page">
        <CustomCard className="receipt-card" full_width>
          {!preview ? (
            <>
              {/* Header Section */}
              <div className="receipt-header">
                <div className="header-left">
                  <div className="receipt-title">
                    <div className="title-icon">
                      <Receipt size={24} />
                    </div>
                    <div className="title-content">
                      <h1>Transaction Receipt</h1>
                      <p>Sales transaction details and summary</p>
                    </div>
                  </div>
                </div>
                <div className="header-right">
                  <div className="receipt-status">
                    <div className="status-badge completed">
                      <CheckCircle size={16} />
                      <span>Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div className="business-info">
                <div className="business-header">
                  <h2 className="business-name">{busName}</h2>
                  <div className="business-details">
                    <span>{address}</span>
                    <span>•</span>
                    <span>{phone}</span>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="transaction-details">
                <div className="details-grid">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <Calendar size={18} />
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Date & Time</span>
                      <span className="detail-value">{moment(info.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <User size={18} />
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Customer</span>
                      <span className="detail-value">
                        {getCustomerType() === "walk-in" ? "Walk-In Customer" : buyer}
                      </span>
                      <div className={`customer-type ${getCustomerType()}`}>
                        {getCustomerType() === "walk-in" ? "Walk-In" : "Registered"}
                      </div>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <Hash size={18} />
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Invoice No</span>
                      <span className="detail-value invoice-no">{receiptNo}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      {(() => {
                        const PaymentIcon = getPaymentMethodIcon(info.modeOfPayment || query.get("payment"))
                        return <PaymentIcon size={18} />
                      })()}
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Payment Method</span>
                      <span className="detail-value">{info.modeOfPayment || query.get("payment") || "CASH"}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <User size={18} />
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Operator</span>
                      <span className="detail-value">
                        {user.username} ({user.role})
                      </span>
                    </div>
                  </div>

                  {buyer !== "walk-in" && identifier !== "regenerate" && (
                    <div className="detail-item">
                      <div className="detail-icon">
                        <DollarSign size={18} />
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">Customer Balance</span>
                        <span className="detail-value balance">
                          ₦{formatNumber(Number.parseFloat(customer_balance) - Number.parseFloat(amountPaid))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="loading-section">
                  <Loading size="sm" />
                  <span>Loading transaction details...</span>
                </div>
              )}

              {/* Items Table */}
              <div className="items-section">
                <div className="section-header">
                  <div className="section-title">
                    <ShoppingCart size={20} />
                    <span>Items Purchased ({item_list.length})</span>
                  </div>
                </div>
                <div className="table-container">
                  <CustomTable fields={fields} height="auto" data={item_list} className="modern-receipt-table" />
                </div>
              </div>

              {/* Summary Section */}
              <div className="summary-section">
                <div className="summary-container">
                  <div className="summary-header">
                    <h3>Transaction Summary</h3>
                  </div>
                  <div className="summary-rows">
                    <div className="summary-row">
                      <span className="summary-label">Subtotal</span>
                      <span className="summary-value">₦{formatNumber(totalAmount)}</span>
                    </div>
                    <div className="summary-row discount">
                      <span className="summary-label">Discount</span>
                      <span className="summary-value">-₦{formatNumber(discount)}</span>
                    </div>
                    <div className="summary-row grand-total">
                      <span className="summary-label">Grand Total</span>
                      <span className="summary-value">₦{formatNumber(grandTotal)}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Amount Paid</span>
                      <span className="summary-value">₦{formatNumber(amountPaid)}</span>
                    </div>
                    <div className="summary-row balance">
                      <span className="summary-label">Balance</span>
                      <span className="summary-value">
                        ₦
                        {buyer === "walk-in"
                          ? formatNumber(balance)
                          : formatNumber(Number.parseFloat(grandTotal) - Number.parseFloat(amountPaid))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-section">
                <div className="action-buttons">
                  <button className="action-btn secondary" onClick={handleShare}>
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                  <button className="action-btn secondary" onClick={handleDownload}>
                    <Download size={18} />
                    <span>Download</span>
                  </button>
                  <button className="action-btn primary" onClick={printBtn}>
                    <Printer size={18} />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* PDF Preview Header */}
              <div className="pdf-preview-header">
                <div className="preview-title">
                  <Eye size={20} />
                  <span>Print Preview</span>
                </div>
                <button className="close-preview-btn" onClick={() => setPreview(false)}>
                  <X size={18} />
                  <span>Close Preview</span>
                </button>
              </div>

              {/* PDF Viewer */}
              <div className="pdf-viewer-container">
                <PDFViewer height="700" width="100%">
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
                    name={buyer}
                  />
                </PDFViewer>
              </div>
            </>
          )}
        </CustomCard>
      </div>
    </Container>
  )
}

export default PostSalePage
