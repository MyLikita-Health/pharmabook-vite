"use client"

import { useState } from "react"
import { Trash2, User, CreditCard, Percent, DollarSign } from "react-feather"
import { useSelector } from "react-redux"
import { Card, CardHeader, CardBody, Badge, Alert } from "reactstrap"
import { CustomButton, CustomForm } from "../../../components/UI"
import CustomTypeahead from "../../../components/UI/CustomTypeahead"
import { formatNumber } from "../../../components/UI/helpers"

function DrugCardList({
  list = [],
  setSelectedCustomer = {},
  otherInfo = {},
  handleOtherInfoChange = (f) => f,
  handleSubmit = (f) => f,
  amountPaidRef,
  handleDelete = (f) => f,
  clientInfo = [],
  setForm = (f) => f,
  defaulCustomer = [],
}) {
  const _discount = useSelector((state) => state.pharmacy.discount)
  const { activeBusiness } = useSelector((state) => state.auth)
  const [customer, setCustomer] = useState({})

  const total = list.reduce((a, b) => a + Number.parseFloat(b.amount), 0)
  const grandTotal = total - Number.parseFloat(_discount || 0)
  const change = Number.parseFloat(otherInfo.amountPaid) - grandTotal

  if (
    otherInfo.amountPaid === null ||
    otherInfo.amountPaid === 0 ||
    (otherInfo.amountPaid > 0 && otherInfo.amountPaid !== total)
  ) {
    otherInfo.amountPaidDefault = otherInfo.amountPaid > 0 ? otherInfo.amountPaid : grandTotal
    otherInfo.total = total
  }

  const fields = [
    {
      type: "number",
      label: "Amount Paid",
      name: "amountPaid",
      placeholder: formatNumber(grandTotal),
      value: otherInfo.amountPaid,
      size: "sm",
      col: 6,
      icon: <DollarSign size={16} />,
    },
    {
      type: "select",
      options: ["Fixed", "Percentage"],
      label: "Discount Type",
      name: "discount_type",
      value: otherInfo.discount_type,
      size: "sm",
      col: 6,
      icon: <Percent size={16} />,
    },
    {
      type: "number",
      label: `Discount (₦${formatNumber(Number.parseFloat(_discount)) || 0})`,
      name: "discount_value",
      value: otherInfo.discount_value,
      onFocus: (e) => e.target.select(),
      size: "sm",
      col: 6,
    },
    {
      type: "select",
      label: "Payment Method",
      name: "modeOfPayment",
      size: "sm",
      options: ["CASH", "POS", "BANK TRANSFER", "CREDIT", "CHEQUE"],
      col: 6,
      value: otherInfo.modeOfPayment,
      icon: <CreditCard size={16} />,
    },
  ]

  return (
    <Card className="cart-container">
      <CardHeader className="cart-header">
        <div className="cart-title">
          <i className="fas fa-shopping-cart me-2"></i>
          Shopping Cart
          <Badge color="light" className="ms-2">
            {list.length} items
          </Badge>
        </div>
      </CardHeader>

      <CardBody className="cart-body">
        {/* Customer Selection */}
        <div className="customer-select">
          <label className="form-label">
            <User size={16} className="me-1" />
            Select Customer
          </label>
          <CustomTypeahead
            placeholder="Search or select customer..."
            labelKey={(item) => `${item.accName} (${item.accountNo})`}
            defaultSelected={defaulCustomer}
            options={clientInfo.filter((state) => state.accountNo !== `${activeBusiness.prefix}-1`)}
            onChange={(s) => {
              if (s.length) {
                setSelectedCustomer(s[0])
                setCustomer(s[0])
                setForm((p) => ({
                  ...p,
                  acct: s[0].accountNo,
                  name: s[0].accName,
                  balance: s[0].balance,
                }))
              }
            }}
          />
        </div>

        {/* Customer Info */}
        {customer.accName && customer.accName !== "walk-in" && (
          <div className="customer-info">
            <div className="customer-details">
              <div className="customer-stat">
                <span className="stat-label">Balance</span>
                <span className="stat-value text-info">₦{formatNumber(customer.balance || 0)}</span>
              </div>
              <div className="customer-stat">
                <span className="stat-label">Credit Limit</span>
                <span className="stat-value text-success">₦{formatNumber(customer.credit_limit || 0)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="cart-items">
          {list.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <p className="text-muted">Your cart is empty</p>
              <small className="text-muted">Add items from the product catalog</small>
            </div>
          ) : (
            list.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.item_name}</div>
                  <div className="cart-item-details">
                    {formatNumber(item.quantity)} × ₦{formatNumber(item.price)}
                  </div>
                </div>
                <div className="cart-item-price">
                  ₦{formatNumber(Number.parseInt(item.price) * Number.parseInt(item.quantity))}
                </div>
                <button className="remove-item-btn" onClick={() => handleDelete(index)} title="Remove item">
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        {list.length > 0 && (
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₦{formatNumber(total)}</span>
            </div>
            {Number.parseFloat(_discount) > 0 && (
              <div className="summary-row text-success">
                <span>Discount:</span>
                <span>-₦{formatNumber(_discount)}</span>
              </div>
            )}
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>₦{formatNumber(grandTotal)}</span>
            </div>
            {change > 0 && otherInfo.amountPaid > grandTotal && (
              <div className="summary-row text-info">
                <span>Change:</span>
                <span>₦{formatNumber(change)}</span>
              </div>
            )}
          </div>
        )}

        {/* Payment Form */}
        <div className="payment-form">
          <h6 className="form-section-title">
            <CreditCard size={16} className="me-1" />
            Payment Details
          </h6>
          <CustomForm fields={fields} handleChange={handleOtherInfoChange} />
        </div>

        {/* Credit Limit Warning */}
        {Number.parseFloat(customer.balance) + Number.parseFloat(customer.credit_limit || 0) < grandTotal && (
          <Alert color="warning" className="credit-warning">
            <strong>Warning:</strong> Amount ₦{formatNumber(grandTotal)} exceeds credit limit of ₦
            {formatNumber(Number.parseFloat(customer.credit_limit || 0))}.
          </Alert>
        )}

        {/* Checkout Button */}
        <CustomButton
          className="checkout-btn"
          disabled={
            list.length <= 0 ||
            Number.parseFloat(customer.balance) + Number.parseFloat(customer.credit_limit || 0) < grandTotal
          }
          onClick={handleSubmit}
        >
          <i className="fas fa-credit-card me-2"></i>
          Checkout ₦{formatNumber(otherInfo.amountPaid > 0 ? otherInfo.amountPaid : grandTotal)}
        </CustomButton>
      </CardBody>
    </Card>
  )
}

export default DrugCardList
