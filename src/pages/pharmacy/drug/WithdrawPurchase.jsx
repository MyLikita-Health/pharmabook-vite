import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { CustomButton, CustomTable, TextInput } from "../../../components/UI";
import CustomModal from "../../../components/UI/CustomModal";
import CustomScrollbar from "../../../components/UI/CustomScrollbar";
import DaterangeSelector from "../../../components/UI/DaterangeSelector";
import Scrollbar from "../../../components/UI/Scrollbar";
import _customNotification from "../../../components/UI/_customNotification";
import { VIEW_PURCHASE } from "../../../redux/action/actionType";
import { _postApi } from "../../../redux/action/api";
import { getPurchases, viewPurchase } from "../../../redux/action/pharmacy";

export default function WithdrawPurchase() {
  const today = moment().format("YYYY-MM-DD");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { purchase_order, view_purchase } = useSelector(
    (state) => state.pharmacy
  );
  const { facilityId, username } = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const aMonthAgo = moment(today)
    .subtract(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD");
  const [form, setForm] = useState({
    from: aMonthAgo,
    to: today,
  });
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const onChange = (value, index) => {
    let arr = [];
    view_purchase?.forEach((item, idx) => {
      if (index === idx) {
        arr.push({ ...item, qty_out: value });
      } else {
        arr.push(item);
      }
    });
    dispatch({
      type: VIEW_PURCHASE,
      payload: arr,
    });
  };
  const _getPurchases = useCallback(() => {
    dispatch(getPurchases({ from: form.from, to: form.to }));
  }, [dispatch, form.from, form.to]);

  useEffect(() => {
    _getPurchases();
  }, [_getPurchases]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({
      ...p,
      [name]: value,
    }));
  };
  const fields = [
    {
      title: "SN",
      custom: true,
      component: (item, ind) => ind + 1,
      className: "text-center",
    },
    {
      title: "Date",
      custom: true,
      component: (item) => item.receive_date,
      className: "text-end",
    },
    {
      title: "PO no.",
      custom: true,
      component: (item) => item.po_no,
      className: "text-center",
    },
    {
      title: "Supplier name",
      custom: true,
      component: (item) => item.supplier_name,
      className: "",
    },
    {
      title: "Signature",
      custom: true,
      component: (item) => item.userName,
      className: "",
    },
    {
      title: "Action",
      custom: true,
      component: (item) => (
        <CustomButton
          size="sm"
          onClick={() => {
            dispatch(viewPurchase({ po_no: item.po_no }));
            toggle();
          }}
        >
          Withdraw
        </CustomButton>
      ),
      className: "text-center",
    },
  ];
  const _fields = [
    {
      title: "SN",
      custom: true,
      component: (item, ind) => ind + 1,
      className: "text-center",
    },
    {
      title: "Date",
      custom: true,
      component: (item) => item.receive_date,
      className: "text-end",
    },
    {
      title: "Drug name",
      custom: true,
      component: (item) => `${item.drug_name}(${item.generic_name})`,
      className: "text-",
    },
    {
      title: "Supplier name",
      custom: true,
      component: (item) => item.supplier_name,
      className: "text-",
    },
    {
      title: "Withdraw QTY",
      custom: true,
      component: (item, ind) => (
        <TextInput
          autoFocus={true}
          size="sm"
          className="text-center p-0 py-0 shadow-sm form-control  border-primary"
          value={item.qty_out}
          onChange={({ target: { value } }) => {
            onChange(value, ind);
          }}
          type="number"
        />
      ),
      className: "text-left",
    },
  ];

  const handleSubmit = () => {
    setLoading(true);
    _postApi(
      `/pharmacy/v1/withdrawal-purchase?facilityId=${facilityId}&userId=${username}`,
      view_purchase,
      (res) => {
        console.log(res);
        if (res.success) {
          setLoading(false);
          toggle()
          _customNotification(addToast, "Submitted", "success");
          _customNotification(addToast, "Submitted", "success");
        }
      },
      (err) => {
        console.log(err);
        _customNotification(addToast, "Error occured", "warning");
        _customNotification(addToast, "Error occured", "warning");
        setLoading(false);
      }
    );
  };

  return (
    <>
      <DaterangeSelector
        handleChange={handleChange}
        from={form.from}
        to={form.to}
      />
      <CustomScrollbar>
        <CustomTable fields={fields} data={purchase_order} />
      </CustomScrollbar>
      <CustomModal
        header="Purchase withdrawal"
        isOpen={isOpen}
        toggle={toggle}
        autoFocus={false}
        size="lg"
        footer={
          <>
            {" "}
            <CustomButton size='sm' outline onClick={toggle}>
              Cancel
            </CustomButton>
            <CustomButton size='sm' loading={loading} onClick={handleSubmit}>
              Withdraw
            </CustomButton>
          </>
        }
      >
        <Scrollbar>
          <CustomTable fields={_fields} data={view_purchase} />
        </Scrollbar>
      </CustomModal>
    </>
  );
}
