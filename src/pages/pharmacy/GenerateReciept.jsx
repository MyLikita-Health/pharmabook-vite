import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomTable } from "../../components/UI";
import CustomCard from "../../components/UI/CustomCard";
import DaterangeSelector from "../../components/UI/DaterangeSelector";
import { today } from "../../components/UI/helpers";
import { useQuery } from "../../hooks";
import { getTransactions } from "../../redux/action/pharmacy";
import { formatNumber } from "../../utils";

export default function GenerateReciept() {
  const query =useQuery();
  const type = query.get("type")
  const aMonthAgo = moment(today)
    .subtract(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD");
  const [form, setForm] = useState({
    from: aMonthAgo,
    to: today,
  });
  const get_transactions = useSelector(
    (state) => state.pharmacy.get_transactions
  );
  const dispatch = useDispatch();
  const _getTransactions = useCallback(() => {
    dispatch(getTransactions({ from: form.from, to: form.to }));
  }, [dispatch, form.from, form.to]);
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({
      ...p,
      [name]: value,
    }));
  };

  useEffect(() => {
    _getTransactions();
  }, [_getTransactions]);
  const navigate = useNavigate();
  const fields = [
    {
      title: "SN",
      custom: true,
      component: (item, ind) => ind + 1,
      className: "text-center",
    },
    {
      title: "Transaction Date",
      custom: true,
      component: (item) => item.transaction_date,
      className: "text-end",
    },
    {
      title: "Customer Name",
      custom: true,
      component: (item) => item.customer_name?item.customer_name:"walk-in",
      className: "text-",
    },
    {
      title: "Reciept Number",
      custom: true,
      component: (item) => item.receiptDateSN,
      className: "text-center",
    },
    {
      title: "Amount",
      custom: true,
      component: (item) => formatNumber(item.credit),
      className: "text-end",
    },

    {
      title: "Action",
      custom: true,
      component: (item) => (
        <CustomButton
          size="sm"
          onClick={() => {
            navigate(
              `/app/pharmacy/post-sale-page?type=${type}&amount=${item.amount}&transaction_id=${item.receiptDateSN}&buyer=${item.customer_name?item.customer_name:"walk-in"}&payment=${item.modeOfPayment}&amount=${item.modeOfPayment}&identifier=regenerate`
            );
          }}
        >
          Generate
        </CustomButton>
      ),
      className: "text-center ",
    },
  ];
  return (
    <div>
      <CustomCard header="Generate Reciept">
        <DaterangeSelector
          handleChange={handleChange}
          from={form.from}
          to={form.to}
        />
        <CustomTable fields={fields} data={get_transactions} />
      </CustomCard>
    </div>
  );
}
