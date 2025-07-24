"use client"
import { useNavigate } from "react-router-dom"
import { Card, CardBody, CardHeader, Row, Col, Badge } from "reactstrap"
import { CustomButton } from "../../../components/UI"
import { useQuery } from "../../../hooks"
import ItemsList from "./ItemList"
import { Search, Package, ShoppingCart } from "react-feather"

function SelectedDrugList({
  disabled,
  form = {
    filterText: "",
  },
  hide = false,
  itemList = {},
  addToCart = (f) => f,
  selectItem = (f) => f,
  qttyRef,
  itemNameRef,
  handleChange,
  handleSubmit = (f) => f,
  filterText,
  setFilterText,
  options,
  user_id,
}) {
  const navigate = useNavigate()
  const query = useQuery()
  const type = query.get("type")

  return (
    <Card className="modern-card h-100">
      <CardHeader className="modern-card-header">
        <div className="header-content">
          <div className="header-left">
            <Package className="header-icon" />
            <div>
              <h5 className="header-title">Product Catalog</h5>
              <p className="header-subtitle">Select items to add to cart</p>
            </div>
          </div>
          <div className="header-actions">
            <CustomButton
              size="sm"
              color="info"
              outline
              onClick={() => navigate(`/app/pharmacy/returned-drugs?type=${type}&type=return`)}
            >
              <i className="fas fa-undo me-1"></i>
              Returns
            </CustomButton>
          </div>
        </div>
      </CardHeader>

      <CardBody className="modern-card-body p-0">
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <Row className="search-row g-3">
            <Col md={6}>
              <div className="search-input-group">
                <Search className="search-icon" size={18} />
                <input
                  ref={itemNameRef}
                  type="text"
                  className="search-input"
                  placeholder="Search drugs by name or code..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input
                  ref={qttyRef}
                  type="number"
                  className="quantity-input"
                  placeholder="Qty"
                  value={form.quantity_sold}
                  name="quantity_sold"
                  onChange={handleChange}
                  min="1"
                />
              </div>
            </Col>
            <Col md={3}>
              <div className="form-group">
                <label className="form-label">Store</label>
                <select className="store-select" value={form.store_name} name="store_name" onChange={handleChange}>
                  <option value="">Select Store</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
          </Row>
        </div>

        {/* Products Grid */}
        <div className="products-container">
          <div className="products-header">
            <div className="products-count">
              <Badge color="primary" pill>
                {itemList.length} Products Available
              </Badge>
            </div>
            {form.selectedItem?.drug_name && (
              <div className="selected-item-info">
                <span className="selected-label">Selected:</span>
                <span className="selected-name">{form.selectedItem.drug_name}</span>
                <Badge color="success" className="ms-2">
                  ₦{form.selectedItem.selling_price?.toLocaleString()}
                </Badge>
              </div>
            )}
          </div>

          <ItemsList filterText={filterText} selectItem={selectItem} list={itemList} />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <div className="keyboard-shortcuts">
            <small className="text-muted">
              <kbd>Enter</kbd> Add to Cart • <kbd>F10</kbd> Checkout
            </small>
          </div>
          <div className="action-buttons-group">
            <CustomButton
              color="success"
              className="add-to-cart-btn"
              onClick={addToCart}
              disabled={!form.selectedItem?.drug_name || !form.quantity_sold}
            >
              <ShoppingCart size={18} className="me-2" />
              Add to Cart
            </CustomButton>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default SelectedDrugList
