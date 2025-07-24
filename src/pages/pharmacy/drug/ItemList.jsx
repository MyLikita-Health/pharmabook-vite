"use client"
import { Badge } from "reactstrap"
import { formatNumber } from "../../../components/UI/helpers"
import Scrollbar from "../../../components/UI/Scrollbar"
import ItemAvatar from "./ItemAvatar"

function ItemsList({ list = [], selectItem = (f) => f, filterText = "" }) {
  const rows = []

  list
    .filter((i) => i.balance > 0)
    .forEach((item) => {
      if (item.drug_name && item.drug_name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return

      rows.push(item)
    })

  return (
    <div className="items-list-container">
      <Scrollbar style={{ height: "55vh" }}>
        <div className="product-grid">
          {list.map((item, index) => (
            <ProductCard key={index} index={index} item={item} selectItem={selectItem} />
          ))}
        </div>
        {list.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-pills"></i>
            </div>
            <h6>No products found</h6>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        )}
      </Scrollbar>
    </div>
  )
}

function ProductCard({ item = {}, selectItem = (f) => f, index }) {
  const getStockStatus = (balance) => {
    if (balance <= 0) return { status: "out-of-stock", label: "Out of Stock", color: "danger" }
    if (balance <= 10) return { status: "low-stock", label: "Low Stock", color: "warning" }
    return { status: "in-stock", label: "In Stock", color: "success" }
  }

  const stockInfo = getStockStatus(item.balance)

  return (
    <div className={`product-card ${item.selected ? "selected" : ""}`} onClick={() => selectItem(item, index)}>
      <div className="product-header">
        <div className="product-avatar">
          <ItemAvatar item={item} value={item.drug_name} />
        </div>
        <div className="product-status">
          <Badge color={stockInfo.color} className="stock-badge">
            {stockInfo.label}
          </Badge>
          <small className="text-muted">{item.balance} available</small>
        </div>
      </div>

      <div className="product-info">
        <h6 className="product-name">{item.drug_name}</h6>

        <div className="product-details">
          {item.drug_category && (
            <div className="product-detail">
              <span className="label">Category:</span>
              <span className="value">{item.drug_category}</span>
            </div>
          )}
          {item.generic_name && (
            <div className="product-detail">
              <span className="label">Generic:</span>
              <span className="value">{item.generic_name}</span>
            </div>
          )}
          {item.uom && (
            <div className="product-detail">
              <span className="label">Unit:</span>
              <span className="value">{item.uom}</span>
            </div>
          )}
        </div>

        <div className="product-price">₦{formatNumber(item.selling_price)}</div>
      </div>
    </div>
  )
}

export default ItemsList
