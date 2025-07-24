import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Col, Row } from "reactstrap";
import { CustomButton, CustomForm, CustomTable } from "../../../components/UI";
import CustomCard from "../../../components/UI/CustomCard";
import CustomModal from "../../../components/UI/CustomModal";
import CustomTypeahead from "../../../components/UI/CustomTypeahead";
import {
  filterDrugsToPurchase,
  formatNumber,
  generateReceiptNo,
} from "../../../components/UI/helpers";
import _customNotification from "../../../components/UI/_customNotification";
import { GET_DRUG_LIST } from "../../../redux/action/actionType";
import {
  addPurchase,
  getDrugList,
  getDrugListSearch,
  getPharmStore,
  getPurchaseItem,
  getSupplierInfo,
  supplierPayment,
} from "../../../redux/action/pharmacy";
export default function AddNewDrug({ stockItem }) {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const drugNameRef = useRef();
  const storeRef = useRef();
  const sub = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const supplierList = useSelector((state) => state.pharmacy.supplierInfo);
  const { pharmStore, drugList } = useSelector((state) => state.pharmacy);
  const { username, facilityId } = useSelector((state) => state.auth.user);

  const user = useSelector((state) => state.auth.user);
  const [show, setShow] = useState(false);

  const _form = {
    supplierName: "",
    description: "",
    supplier_code: "",
    store_code: "",
    store_name: user.branch_name,
    sourceAcc: "",
    receivedTo: user.branch_name,
    truckNo: "",
    drugCategory: "",
    selling_price: "",
    expiry_date: "",
    modeOfPayment: "",
    transfer_from: "Purchase order",
    branch_name: user.branch_name,
    transfer_to: user.branch_name,
    drugCode: "",
    barcode: "",
    // genericName: "",
    uom: "",
    otherDetails: "",
    waybillNo: "",
    quantity: 0,
    unitCost: 0,
    query_type: "received",
    cost: 0,
    expiryDate: "",
    store: "",
    markup: 0,
    payment: "",
    status: "",
    item_code: "",
    reorder: "",
    generic_name: "",
    userId: username,
  };
  const [form, setForm] = useState(_form);
  const [tbls, setTbls] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const supplierFormIn = {
    supplierName: "",
    amount: 0,
    supplier_code: "",
    mop: "Purchase on credit",
  };
  const [supplierForm, setSupplierForm] = useState(supplierFormIn);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const _getSupplierInfo = useCallback(() => {
    dispatch(getSupplierInfo());
    dispatch(getPharmStore());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDrugList());
  }, [dispatch]);
  useEffect(() => {
    _getSupplierInfo();
  }, [_getSupplierInfo]);

  // let generics = drugList.map(function (obj) { return obj.generic_name; });
  // generics = generics.filter(function (v, i) { return generics.indexOf(v) == i; });

  const fields = [
    {
      type: "custom",
      required: true,
      component: () => (
        <CustomTypeahead
          label={
            <>
              Drug Name <span className="text-danger">*</span>
            </>
          }
          labelKey="name"
          placeholder={form.description}
          options={drugList}
          _ref={drugNameRef}
          defaultSelectedValue={form.description}
          // value={form.description}
          clearButton
          onChange={(s) => {
            if (s.length) {
              console.log(s);
              setForm((p) => ({
                ...p,
                description: s[0].name,
                generic_name: s[0].generic_name,
                formulation: s[0].formulation,
                item_code: s[0].id,
              }));
            }
          }}
          onInputChange={(v) => {
            dispatch(getDrugListSearch(v, 0, 100, "drug_list"));
            if (v.length) {
              setForm((p) => ({
                ...p,
                description: v,
              }));
            }
          }}
        />
      ),
      col: 3,
    },
    {
      label: "Generic Name",
      type: "text",
      name: "generic_name",
      placeholder: "Generic Name",
      value: form.generic_name,
      col: 3,
    },

    {
      label: "Unit of Measurement",
      labelkey: "label",
      options: [{ label: "--unit--" }, { label: "Other" }],
      name: "uom",
      value: form.uom,
      col: 3,
    },
    {
      label: "Bar code",
      name: "barcode",
      value: form.barcode,
      col: 3,
      type: "text",
    },
    {
      label: "Cost Price",
      type: "number",
      name: "cost",
      value: form.cost,
      required: true,
      col: 3,
    },
    {
      label: "Quantity",
      type: "number",
      name: "quantity",
      placeholder: "QTY",
      value: form.quantity,
      required: true,
      col: 3,
    },
    {
      label: "Selling Price",
      type: "number",
      name: "selling_price",
      value: form.selling_price,
      required: true,
      col: 3,
    },
    {
      label: "Reorder Level",
      type: "number",
      name: "reorder",
      value: form.reorder,
      placeholder: "0",
      col: 3,
    },
    {
      label: "Expiry Date",
      type: "date",
      name: "expiry_date",
      value: form.expiry_date,
      col: 3,
    },
    {
      label: "",
      type: "custom",
      component: () => (
        <CustomTypeahead
          label="Receiving Store"
          // defaultSelected={pharmStore[0].store_name}
          labelKey="store_name"
          options={pharmStore}
          _ref={storeRef}
          allowNew
          onChange={(s) => {
            if (s.length) {
              console.log(s);
              setForm((p) => ({
                ...p,
                branch_name: s[0].store_name,
                store_code: s[0].store_code,
                transfer_to: s[0].store_name,
              }));
            }
          }}
          defaultSelected={[user.branch_name]}
          onInputChange={(v) => {
            if (v.length) {
              console.log(v, "KDDDDDDDK");
            }
          }}
        />
      ),
      name: "receivedTo",
      value: form.receivedTo,
      col: 3,
    },
  ];

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };
  const _handleChange = ({ target: { name, value } }) => {
    if (name === "mop") {
      if (value === "Purchase on credit") {
        setSupplierForm((p) => ({ ...p, amount: 0, [name]: value }));
      } else if (value === "Full payment") {
        setSupplierForm((p) => ({
          ...p,
          // amount: tbls.reduce((a, b) => a + b.quantity * b.cost, 0),
          amount: tbls.reduce(
            (a, b) => a + parseInt(b.quantity) * parseFloat(b.cost),
            0
          ),
          [name]: value,
        }));
      } else {
        setSupplierForm((p) => ({ ...p, [name]: value }));
      }
    } else {
      setSupplierForm((p) => ({ ...p, [name]: value }));
    }
  };
  const handleAdd = () => {
    console.log({ form });
    if (
      form.cost === "" ||
      parseInt(form.quantity) <= 0 ||
      form.selling_price === "" ||
      form.receivedTo === ""
    ) {
      _customNotification(addToast, `Fill some required fileds`, "warning");
    } else {
      if (form.description === "") {
        _customNotification(addToast, "Please Enter Drug name", "warning");
      } else {
        setTbls((p) => [...p, form]);
        setForm((p) => ({
          ...p,
          waybillNo: "",
          quantity: 0,
          unitCost: 0,
          cost: 0,
          expiryDate: "",
          store: "",
          markup: 0,
          payment: "",
          status: "",
          reorder: 0,
          uom: "",
          otherDetails: "",
          truckNo: "",
          expiry_date: "",
          modeOfPayment: "",
          barcode: "",
          selling_price: "",
          description: "",
          generic_name: "",
          userId: username,
        }));
        // dispatch({
        //   type: GET_DRUG_LIST,
        //   payload: drugList.filter((item) => item.id !== form.item_code),
        // });
        drugNameRef.current.clear();
        // storeRef.current.clear();
        drugNameRef.current.focus();
        setShow(true);
      }
    }
  };
  const handleDelete = (idx) => {
    const data = tbls.filter((item, index) => idx !== index);

    setTbls(data);
  };

  const tbl = [
    {
      title: "S/N",
      custom: true,
      component: (item, index) => index + 1,
      className: "text-center",
    },
    {
      title: "Name",
      value: "description",
    },
    {
      title: "Unit Cost",
      custom: true,
      component: (item) => formatNumber(item.cost),
      className: "text-end",
    },
    {
      title: "Quantity",
      custom: true,
      component: (item) => item.quantity,
      className: "text-center ",
    },
    {
      title: "Amount",
      custom: true,
      component: (item) => formatNumber(item.quantity * item.cost),
      className: "text-end",
    },
    {
      title: "Action",
      custom: true,
      component: (item, idx) => (
        <div>
          <center>
            <CustomButton
              className="btn-danger"
              size="sm"
              onClick={() => {
                handleDelete(idx);
              }}
            >
              X
            </CustomButton>
          </center>
        </div>
      ),
    },
  ];
  const handleSubmit = () => {
    setLoading(true);
    generateReceiptNo((receiptDateSN, receiptSN) => {
      console.log({ receiptDateSN, receiptSN });
      supplierPayment(
        {
          modeOfPayment: supplierForm.mop,
          amount: supplierForm.amount,
          supplierName: supplierForm.supplierName,
          supplier_code: supplierForm.supplier_code,
          facilityId,
          receiptDateSN,
          receiptSN,
          narration: `${supplierForm.mop} (${tbls.map(
            (item) => item.description
          )})`,
        },
        (res) => {
          const arr = [];

          tbls.forEach((item) => {
            arr.push({
              ...item,
              supplierName: supplierForm.supplierName,
              supplier_code: supplierForm.supplier_code,
            });
          });
          if (res.success) {
            addPurchase(
              arr,
              (res) => {
                console.log(res);
                if (res) {
                  setLoading(false);
                  _customNotification(addToast, "Submitted", "success");
                  _customNotification(addToast, "Submitted", "success");
                  setTbls([]);
                  setForm(_form);
                  toggle();
                  setSupplierForm(supplierFormIn);
                  // sub.current.clear();
                }
              },
              (err) => {
                console.log(err);
                _customNotification(addToast, "Error Occured", "error");
                setLoading(false);
              },
              username
            );
          }
        },
        () => {
          setLoading(false);
          _customNotification(addToast, "Successfully Saved", "error");
        }
      );
    });
  };
  useEffect(() => {
    if (stockItem && form.description === "") {
      setForm((p) => ({
        ...p,
        ...stockItem,
        description: stockItem.drug_name,
      }));
    }
  }, [dispatch, form, stockItem]);

  const _fields = [
    {
      label: "Supplier Name",
      name: "supplier_name",
      type: "custom",
      required: true,
      _ref: { sub },
      component: () => (
        <CustomTypeahead
          label="Select Supplier"
          required={true}
          labelKey="supplier_name"
          options={supplierList}
          onChange={(s) => {
            if (s.length) {
              console.log(s);
              setSupplierForm((p) => ({
                ...p,
                supplierName: s[0].supplier_name,
                supplier_code: s[0].supplier_code,
              }));
            }
          }}
          onInputChange={(v) => {
            if (v.length) {
              console.log(v, "KDDDDDDDK");
            }
          }}
        />
      ),
      col: 4,
    },
    {
      label: "Mode of payment",
      type: "select",
      labelkey: "item",
      name: "mop",
      options: ["Purchase on credit", "Full payment", "Part payment"],
      value: supplierForm.mop,
      col: 4,
    },
    {
      label: "Amount",
      type: "text",
      labelkey: "item",
      name: "amount",
      value: supplierForm.amount,
      col: 4,
      disabled: supplierForm.mop === "Part payment" ? false : true,
    },
  ];
  return (
    <div>
      <CustomCard
        header={
          stockItem ? (
            <h6 md={12} className="text-center">
              {stockItem.drug_name} (Reorder)
            </h6>
          ) : (
            <h6 md={12} className="text-center mt-2 mb-0">
              STOCK PURCHASE
            </h6>
          )
        }
      >
        <CustomForm fields={fields} handleChange={handleChange} />
        <center>
          <CustomButton className="mb-2" onClick={handleAdd}>
            Add to List
          </CustomButton>
        </center>
        {tbls.length > 0 ? (
          <>
            <CustomTable
              preheader={tbls.length > 0}
              fields={tbl}
              height={"auto"}
              data={tbls}
            />{" "}
            <center>
              <CustomButton onClick={toggle}>Submit</CustomButton>
            </center>
          </>
        ) : null}
        <CustomModal
          header="Select Supplier"
          isOpen={isOpen}
          toggle={toggle}
          autoFocus={false}
          footer={
            <>
              {" "}
              <CustomButton outline onClick={toggle}>
                Cancel
              </CustomButton>
              <CustomButton
                loading={loading}
                onClick={handleSubmit}
                disabled={!supplierForm.supplier_code}
              >
                Submit
              </CustomButton>
            </>
          }
        >
          <CustomForm fields={_fields} handleChange={_handleChange} />
        </CustomModal>
      </CustomCard>
    </div>
  );
}
