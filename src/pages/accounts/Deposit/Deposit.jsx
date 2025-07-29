"use client"

import { PDFViewer } from "@react-pdf/renderer"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useToasts } from "react-toast-notifications"
import CustomTypeahead from "../../../components/UI/CustomTypeahead"
import { generateReceiptNo } from "../../../components/UI/helpers"
import _customNotification from "../../../components/UI/_customNotification"
import { addNewClent, getClientInfo } from "../../../redux/action/pharmacy"
import { DepositReceipt } from "../../pharmacy/supplier/PaymentReceipt"
import { ArrowLeft, User, CreditCard, FileText, AlertCircle, CheckCircle, DollarSign } from "lucide-react"

export default function Deposit() {
  const [form, setForm] = useState({
    modeOfPayment: "CASH",
    description: "",
    amount: 0,
  })
  const [loading, setLoading] = useState(false)
  const clientInfo = useSelector((state) => state.pharmacy.clientInfo)
  const { activeBusiness } = useSelector((state) => state.auth)
  const [preview, setPreview] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const [receiptSN, setReceiptSN] = useState("")
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  const _getClientInfo = useCallback(() => {
    dispatch(getClientInfo())
  }, [dispatch])

  useEffect(() => {
    _getClientInfo()
  }, [_getClientInfo])

  const handleClientChange = (selectedClients) => {
    if (selectedClients.length) {
      const client = selectedClients[0]
      setForm((p) => ({
        ...p,
        acct: client.accountNo,
        name: client.accName,
        balance: client.balance,
      }))
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = () => {
    if (!form.acct || form.amount === 0) {
      _customNotification(addToast, "Please complete the required fields", "warning")
    } else {
      setLoading(true)
      generateReceiptNo((receiptDateSN, receiptSN) => {
        addNewClent(
          { ...form, receiptDateSN, receiptSN },
          (res) => {
            if (res) {
              setLoading(false)
              _customNotification(addToast, "Successfully Submitted", "success")
              setReceiptSN(receiptDateSN)
              setPreview(true)
            }
          },
          (err) => {
            _customNotification(addToast, "Error Occurred", "warning")
            console.log(err)
            setLoading(false)
          },
        )
      })
    }
  }

  const handleBack = () => {
    if (preview) {
      setPreview(false)
    } else {
      // Navigate back logic here
    }
  }

  if (preview) {
    return (
      <div className="client-registration-container">
        <div className="registration-header">
          <div className="header-card">
            <div className="card-body" style={{ padding: "2rem" }}>
              <div className="header-content">
                <div className="header-main">
                  <div className="header-icon">
                    <FileText size={24} />
                  </div>
                  <div className="header-text">
                    <h1 className="header-title">Deposit Receipt</h1>
                    <p className="header-subtitle">Transaction completed successfully</p>
                  </div>
                </div>
                <div className="header-actions">
                  <button className="back-btn" onClick={handleBack}>
                    <ArrowLeft size={16} />
                    Back to Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PDFViewer height="700" width="100%" style={{ borderRadius: "16px" }}>
          <DepositReceipt
            depositDetails={form}
            receiptSN={receiptSN}
            user={user.username}
            activeBusiness={activeBusiness}
            description={form.description}
          />
        </PDFViewer>
      </div>
    )
  }

  return (
    <div className="client-registration-container">
      {/* Header Section */}
      <div className="registration-header">
        <div className="header-card">
          <div className="card-body" style={{ padding: "2rem" }}>
            <div className="header-content">
              <div className="header-main">
                <div className="header-icon">
                  <DollarSign size={24} />
                </div>
                <div className="header-text">
                  <h1 className="header-title">Client Deposit</h1>
                  <p className="header-subtitle">Process client payments and deposits</p>
                </div>
              </div>
              <div className="header-actions">
                <button className="back-btn" onClick={handleBack}>
                  <ArrowLeft size={16} />
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Card */}
      <div className="registration-card">
        <div className="card-header">
          <div className="card-header-content">
            <h2 className="card-title">
              <CreditCard size={20} />
              Deposit Information
            </h2>
            <div className="required-note">
              <AlertCircle size={16} />
              Required fields are marked with *
            </div>
          </div>
        </div>

        <div className="card-body" style={{ padding: "2rem" }}>
          <div className="form-sections">
            {/* Client Information Section */}
            <div className="form-section">
              <div className="section-header">
                <User size={20} />
                <h3 className="section-title">Client Information</h3>
              </div>

              <div className="row">
                <div className="col-md-9">
                  <label className="form-label required">Select Client</label>
                  <CustomTypeahead
                    labelKey="accName"
                    options={clientInfo}
                    onChange={handleClientChange}
                    placeholder="Search and select client..."
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Current Balance</label>
                  <input type="text" className="modern-input" value={form.balance || ""} disabled placeholder="0.00" />
                </div>
              </div>
            </div>

            {/* Payment Details Section */}
            <div className="form-section">
              <div className="section-header">
                <CreditCard size={20} />
                <h3 className="section-title">Payment Details</h3>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label required">Amount Paid</label>
                  <div className="modern-input-group">
                    <div className="input-prefix">
                      <DollarSign size={16} />
                      Amount
                    </div>
                    <input
                      type="number"
                      name="amount"
                      className="modern-input"
                      value={form.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label required">Mode of Payment</label>
                  <select
                    name="modeOfPayment"
                    className="modern-input"
                    value={form.modeOfPayment}
                    onChange={handleChange}
                  >
                    <option value="CASH">Cash</option>
                    <option value="POST">POS</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="CREDIT">Credit</option>
                    <option value="CHEQUE">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12">
                  <label className="form-label">Narration</label>
                  <textarea
                    name="description"
                    className="modern-input"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter payment description or notes..."
                    rows={3}
                  />
                  <small className="form-help">Optional: Add any additional notes about this deposit</small>
                </div>
              </div>
            </div>
          </div>

          {/* Form Summary */}
          {form.name && (
            <div className="form-summary">
              <div className="summary-card">
                <div className="summary-header">
                  <CheckCircle size={20} />
                  <h6>Transaction Summary</h6>
                </div>
                <div className="summary-content">
                  <div className="summary-item">
                    <span className="summary-label">Client Name:</span>
                    <span className="summary-value">{form.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Account Number:</span>
                    <span className="summary-value">{form.acct}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Current Balance:</span>
                    <span className="summary-value">₦{form.balance?.toLocaleString() || "0.00"}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Deposit Amount:</span>
                    <span className="summary-value">₦{form.amount?.toLocaleString() || "0.00"}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Payment Method:</span>
                    <span className="summary-value">{form.modeOfPayment}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleBack} disabled={loading}>
              <ArrowLeft size={16} />
              Cancel
            </button>
            <button
              type="button"
              className="save-btn"
              onClick={handleSubmit}
              disabled={loading || !form.acct || !form.amount}
            >
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  Process Deposit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
