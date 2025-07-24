"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch } from "react-redux"
import { Col, Row, Container } from "reactstrap"
import { v4 as UUIDV4 } from "uuid"
import SelectedDrugList from "./SelectedDrugList"
import NewCustomerModal from "./WarningModal"
import DrugCardList from "./DrugCardList"
import {
  addNewClent,
  getClientInfo,
  getPharmStore,
  getSalesDrugs,
  makeSale,
  searchDrugSale,
} from "../../../redux/action/pharmacy"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { generateReceiptNo } from "../../../components/UI/helpers"
import "./drug-sales.css"

function DrugSale() {
  const navigate = useNavigate()
  const pharmStore = useSelector((state) => state.pharmacy.pharmStore)
  const saleItems = useSelector((state) => state.pharmacy.saleItems)
  const clientInfo = useSelector((state) => state.pharmacy.clientInfo)
  const auth = useSelector((state) => state.auth)
  const _amountPaid = useSelector((state) => state.pharmacy.amountPaid)
  const _discount = useSelector((state) => state.pharmacy.discount)
  const totalPaid = _amountPaid - _discount
  const user = auth.user
  const defaultCustomer =
    clientInfo && clientInfo.filter((state) => state.accountNo === auth.facilityId).map((state) => state.accName)

  const check = ""
  const [form, setForm] = useState({
    quantity_sold: "",
    customerName: "",
    _amount: 0,
    email: "",
    adrdress: "",
    phone: "",
    credit_limit: null,
    store_name: auth.user.branch_name,
    selectedItem: {
      balance: 0,
      drug_name: "",
      item_code: "",
      expiry_date: "",
      store: "",
      selling_price: 0,
    },
    from: 0,
    to: 100,
  })

  const qttyRef = useRef()
  const itemNameRef = useRef()
  const amountPaidRef = useRef()
  const dispatch = useDispatch()
  const _getPharmStore = useCallback(() => {
    dispatch(getSalesDrugs(form.store_name, form.from, form.to))
    dispatch(getClientInfo())
    dispatch(getPharmStore())
  }, [dispatch, form.from, form.store_name, form.to])

  const [filterText, setFilterText] = useState("")
  const [cart, setCart] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState({
    credit_limit: null,
    accountNo: "",
    accName: "",
    balance: 0,
    contactEmail: "",
    contactAddress: "",
    contactPhone: "",
  })

  const initial = {
    discount: _discount,
    amountPaidDefault: 0,
    amountPaid: "",
    total: 0,
    modeOfPayment: "CASH",
    discount_type: "Fixed",
    discount_value: 0,
    label: "",
  }
  const [otherInfo, setOtherInfo] = useState(initial)
  useEffect(() => {
    setOtherInfo((p) => ({ ...p, amountPaid: totalPaid, discount: _discount }))
  }, [_discount, totalPaid])
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleDelete = (i) => {
    const newVal = cart.filter((item, index) => i !== index)
    setCart(newVal)
  }
  const options = pharmStore.map((item) => item.store_name)
  useEffect(() => {
    if (filterText.length > 3) {
      dispatch(searchDrugSale(form.store_name, 0, 100, filterText))
    } else if (filterText.length === 0) {
      _getPharmStore()
    }
  }, [_getPharmStore, dispatch, filterText, filterText.length, form.store_name])

  const selectItem = (item, index) => {
    console.log(item, index)
    const arr = []
    saleItems.forEach((item, idx) => {
      if (idx === index) {
        arr.push({ ...item, selected: true })
      } else {
        arr.push({ ...item, selected: false })
      }
      arr.push()
    })
    dispatch({ type: "SALES", payload: arr })
    setForm((p) => ({ ...p, selectedItem: item }))
    qttyRef.current.select()
  }

  const formIsValid =
    form.selectedItem.drug_name !== "" &&
    form.quantity_sold !== "0" &&
    form.quantity_sold !== 0 &&
    form.quantity_sold !== ""

  const addToCart = useCallback(() => {
    console.log("adding to cart", form)
    if (formIsValid) {
      if (Number.parseInt(form.quantity_sold) > Number.parseInt(form.selectedItem.balance)) {
        alert(`Quantity requested is more than the quantity available`)
      } else {
        console.error({ selectedCustomer: selectedCustomer })
        const total = form.selectedItem.selling_price * Number.parseFloat(form.quantity_sold)
        const id = UUIDV4()
        const itemObj = {
          id,
          patientAcc: selectedCustomer.accountNo,
          accName: selectedCustomer.accName,
          name: selectedCustomer.accName,
          price: form.selectedItem.selling_price,
          quantity: form.quantity_sold,
          balance: form.selectedItem.balance,
          customer_balance: selectedCustomer.balance,
          item_name: form.selectedItem.drug_name,
          item_category: form.selectedItem.itemCategory,
          amount: total,
          customerId: form.acct,
          item_id: form._id,
          salesFrom: form.store_name,
          item_code: form.selectedItem.item_code,
          discount: otherInfo.discount,
          imeiText: form.imeiText,
          imeiImage: form.imeiImage,
          truckNo: form.truckNo,
          waybillNo: form.waybillNo,
          supplier_code: form.supplier_code,
          supplier_name: form.supplierName,
          supplierName: form.supplierName,
          expiry_date: form.selectedItem.expiry_date,
          formulation: form.selectedItem.formulation,
          generic_name: form.selectedItem.generic_name,
        }
        setCart((p) => [...p, itemObj])
        setForm((p) => ({
          ...p,
          quantity_sold: "",
        }))
        dispatch({
          type: "DISPATCH_AMOUNT_PAID",
          payload: [...cart, itemObj].reduce((a, b) => a + Number.parseFloat(b.amount), 0),
        })
        itemNameRef.current?.focus()
      }
    } else {
      console.log("Item not selected")
    }
  }, [cart, dispatch, form, formIsValid, otherInfo.discount, selectedCustomer])

  const checkout = useCallback(() => {
    console.log("Called checkout...........")
    setIsNewCustomerModalOpen(false)
    setSubmitting(true)
    const totalDiscount = Number.parseFloat(otherInfo.discount)
    const txn = []
    cart.forEach((item, index) => {
      const lastIndex = cart.length - 1
      const itemList = cart.map((state) => state.item_name)
      txn.push({
        _id: item.id,
        source: "STORE",
        product_code: item.item_name,
        dr: Number.parseFloat(item.amount),
        amount: Number.parseFloat(item.amount),
        selling_price: item.price,
        cr: 0,
        business_bank_acc_no: user?.facilityId || "",
        destination: "CASH",
        accNo: form.acct,
        quantity: item.quantity,
        description: item.item_name,
        category: item.item_category,

        customerId: selectedCustomer.accountNo,
        clientAccount: form.acct,
        customerName: selectedCustomer.accName,
        transaction_type: "NEW_SALE",
        branch_name: user.busName,
        totalAmount: txn.total,
        imeiText: item.imeiText,
        imeiImage: item.imeiImage,
        truckNo: item.truckNo,
        waybillNo: item.waybillNo,
        itemList: index === lastIndex ? itemList.join(",") : "",
        txn_type:
          Number.parseInt(otherInfo.amountPaid) < Number.parseInt(cart.reduce((a, b) => a + b.amount, 0))
            ? "Part Payment"
            : "Full Payment",
        supplier_code: item.supplier_code,
        supplierName: item.supplierName,
        supplier_name: item.supplier_name,
        item_id: item.item_id,
        salesFrom: item.salesFrom,
        item_code: item.item_code,
        expiry_date: item.expiry_date,
        formulation: item.formulation,
        generic_name: item.generic_name,
        expiring_date: item.expiry_date,
        facilityId: user.facilityId,
        ...otherInfo,
        ...form,
        amountPaid: index === lastIndex ? otherInfo.amountPaid : 0,
        amountPaidDefault: index === lastIndex ? otherInfo.amountPaidDefault : 0,
        discount: index === lastIndex ? totalDiscount : "0",
      })
    })
    generateReceiptNo((receiptDateSN, receiptSN) => {
      const arr = []
      txn.forEach((item) => {
        arr.push({
          ...item,
          receiptDateSN: receiptDateSN,
          receiptSN: receiptSN,
          userName: user.username,
          customerName: selectedCustomer.accName,
        })
      })

      makeSale(
        { data: arr },
        () => {
          setSubmitting(false)

          if (selectedCustomer.accountNo) {
          }
          navigate(
            `/app/pharmacy/post-sale-page?type=Sales&transaction_id=${receiptDateSN}&buyer=${
              selectedCustomer.accountNo ? selectedCustomer.accName || form.customerName : "walk-in"
            }&payment=${otherInfo.modeOfPayment}&amount=${
              otherInfo.amountPaid
            }&discount=${otherInfo.discount}&customer_balance=${selectedCustomer.balance}`,
          )

          dispatch({
            type: "DISPATCH_AMOUNT_PAID",
            payload: 0,
          })
          dispatch({ type: "DISPATCH_DISCOUNT", payload: 0 })
        },
        (err) => {
          setSubmitting(false)
          console.log("An error occured", err)
        },
      )
    })
  }, [
    otherInfo,
    cart,
    user.facilityId,
    user.busName,
    user.username,
    form,
    selectedCustomer.accountNo,
    selectedCustomer.accName,
    selectedCustomer.balance,
    navigate,
    dispatch,
  ])

  const checkoutWithCustomerRegistration = useCallback(
    (form) => {
      console.log("Called checkout...........")
      setIsNewCustomerModalOpen(false)
      setSubmitting(true)
      const totalDiscount = Number.parseFloat(otherInfo.discount)
      const txn = []
      cart.forEach((item, index) => {
        const lastIndex = cart.length - 1
        const itemList = cart.map((state) => state.item_name)
        txn.push({
          _id: item.id,
          source: "STORE",
          product_code: item.item_name,
          dr: Number.parseFloat(item.amount),
          amount: Number.parseFloat(item.amount),
          selling_price: item.price,
          cr: 0,
          business_bank_acc_no: user?.facilityId || "",
          destination: "CASH",
          accNo: form.acct,
          quantity: item.quantity,
          description: item.item_name,
          category: item.item_category,

          customerId: selectedCustomer.accountNo,
          clientAccount: form.acct,
          customerName: form.customerName,
          transaction_type: "NEW_SALE",
          branch_name: user.busName,
          totalAmount: txn.total,
          imeiText: item.imeiText,
          imeiImage: item.imeiImage,
          truckNo: item.truckNo,
          waybillNo: item.waybillNo,
          itemList: index === lastIndex ? itemList.join(",") : "",
          txn_type:
            Number.parseInt(otherInfo.amountPaid) < Number.parseInt(cart.reduce((a, b) => a + b.amount, 0))
              ? "Part Payment"
              : "Full Payment",
          supplier_code: item.supplier_code,
          supplierName: item.supplierName,
          supplier_name: item.supplier_name,
          item_id: item.item_id,
          salesFrom: item.salesFrom,
          item_code: item.item_code,
          expiry_date: item.expiry_date,
          expiring_date: item.expiry_date,
          formulation: item.formulation,
          generic_name: item.generic_name,
          facilityId: user.facilityId,
          ...otherInfo,
          ...form,
          amountPaid: index === lastIndex ? otherInfo.amountPaid : 0,
          amountPaidDefault: index === lastIndex ? otherInfo.amountPaidDefault : 0,
          discount: index === lastIndex ? totalDiscount : "0",
        })
      })
      generateReceiptNo((receiptDateSN, receiptSN) => {
        const acct = ""
        addNewClent(
          {
            ...form,
            amount: form._amount,
            acct,
            name: form.customerName,
            receiptDateSN,
            receiptSN,
            description: "Opening Balance",
          },
          (res) => {
            if (res) {
              const { acct, name, amount } = res
              generateReceiptNo((receiptDateSN, receiptSN) => {
                const arr = []
                txn.forEach((item) => {
                  arr.push({
                    ...item,
                    receiptDateSN: receiptDateSN,
                    receiptSN: receiptSN,
                    userName: user.username,
                    customerId: acct,
                    clientAccount: acct,
                    customerName: name,
                  })
                })

                makeSale(
                  { data: arr },
                  () => {
                    setSubmitting(false)

                    if (selectedCustomer.accountNo) {
                    }
                    navigate(
                      `/app/pharmacy/post-sale-page?type=Sales&transaction_id=${receiptDateSN}&buyer=${
                        acct ? name : "walk-in"
                      }&payment=${otherInfo.modeOfPayment}&amount=${otherInfo.amountPaid}&discount=${
                        otherInfo.discount
                      }&customer_balance=${amount}`,
                    )

                    dispatch({
                      type: "DISPATCH_AMOUNT_PAID",
                      payload: 0,
                    })
                    dispatch({ type: "DISPATCH_DISCOUNT", payload: 0 })
                  },
                  (err) => {
                    setSubmitting(false)
                    console.log("An error occured", err)
                  },
                )
              })
            }
          },
          (err) => {
            console.log(err)
            setSubmitting(false)
          },
        )
      })
    },
    [
      otherInfo,
      cart,
      user.facilityId,
      user.busName,
      user.username,
      form,
      selectedCustomer.accountNo,
      selectedCustomer.accName,
      selectedCustomer.balance,
      navigate,
      dispatch,
    ],
  )

  const handleSubmit = useCallback(() => {
    otherInfo.amountPaid = otherInfo.amountPaid ? otherInfo.amountPaid : otherInfo.amountPaidDefault
    if (!otherInfo.amountPaid) {
      alert("Please enter the amount paid")
      amountPaidRef.current.focus()
    } else if (!selectedCustomer.accName) {
      setIsNewCustomerModalOpen(true)
    } else {
      checkout()
    }
  }, [selectedCustomer, otherInfo, checkout])

  const handleKeyPress = useCallback(
    (e) => {
      switch (e.key) {
        case "Enter":
          return addToCart()
        case "F10":
          return handleSubmit()

        default:
          return null
      }
    },
    [addToCart, handleSubmit],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  const handleChange = ({ target: { name, value } }) => {
    console.log({ name, value })
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleOtherInfoChange = useCallback(
    ({ target: { name, value } }) => {
      console.log(name)
      if (name === "discount_value") {
        dispatch({
          type: "DISPATCH_DISCOUNT",
          payload:
            otherInfo.discount_type === "Percentage"
              ? (Number.parseFloat(cart.reduce((a, b) => a + Number.parseFloat(b.amount), 0)) / 100) *
                Number.parseFloat(value)
              : Number.parseFloat(value),
        })
      } else if (name === "discount_type") {
        if (Number.parseFloat(otherInfo.discount_value) > 0) {
          dispatch({
            type: "DISPATCH_DISCOUNT",
            payload:
              otherInfo.discount_type === "Percentage"
                ? Number.parseFloat(otherInfo.discount_value)
                : (Number.parseFloat(cart.reduce((a, b) => a + Number.parseFloat(b.amount), 0)) / 100) *
                  Number.parseFloat(otherInfo.discount_value),
          })
        }
      }
      setOtherInfo((p) => ({ ...p, [name]: value }))
    },
    [cart, dispatch, otherInfo.discount_type, otherInfo.discount_value],
  )

  const toggleCustomerForm = () => setIsNewCustomerModalOpen((p) => !p)

  return (
    <Container fluid className="drug-sales-container">
      <div className="sales-header">
        <h4 className="sales-title">
          <i className="fas fa-shopping-cart me-2"></i>
          Point of Sale
        </h4>
        <div className="sales-stats">
          <div className="stat-item">
            <span className="stat-label">Items Available</span>
            <span className="stat-value">{saleItems.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Cart Items</span>
            <span className="stat-value">{cart.length}</span>
          </div>
        </div>
      </div>

      <Row className="sales-content">
        <Col lg={8} className="products-section">
          <SelectedDrugList
            itemNameRef={itemNameRef}
            qttyRef={qttyRef}
            selectItem={selectItem}
            itemList={saleItems}
            form={form}
            addToCart={addToCart}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setFilterText={setFilterText}
            filterText={filterText}
            options={options}
            disabled={!check}
          />
        </Col>

        <Col lg={4} className="cart-section">
          <DrugCardList
            setSelectedCustomer={setSelectedCustomer}
            list={cart}
            clientInfo={clientInfo}
            otherInfo={otherInfo}
            handleOtherInfoChange={handleOtherInfoChange}
            handleSubmit={handleSubmit}
            amountPaidRef={amountPaidRef}
            handleDelete={handleDelete}
            setForm={setForm}
            form={form}
            defaultCustomer={defaultCustomer}
          />
        </Col>
      </Row>

      <NewCustomerModal
        isOpen={isNewCustomerModalOpen}
        onSkipClicked={() => {
          setForm((p) => ({ ...p, customerName: "" }))
          checkout()
        }}
        onSubmit={checkoutWithCustomerRegistration}
        form={{ ...form, ...otherInfo }}
        setForm={setForm}
        submitting={submitting}
        toggle={toggleCustomerForm}
        otherInfo={otherInfo}
        cart={cart}
      />
    </Container>
  )
}

export default DrugSale
