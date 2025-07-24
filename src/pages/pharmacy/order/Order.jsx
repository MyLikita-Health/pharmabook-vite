import React, { useCallback, useEffect, useState } from 'react'
import { CustomButton, CustomTable, SearchBar } from '../../../components/UI'
import CustomCard from '../../../components/UI/CustomCard'
import { _postApi } from '../../../redux/action/api';
import { endpoint } from '../../../redux/action/pharmacy';
import { useNavigate } from "react-router-dom"
import moment from "moment";
import DaterangeSelector from '../../../components/UI/DaterangeSelector';
import store from '../../../redux/store';
function Order() {
  const today = moment().format("YYYY-MM-DD");
  const aMonthAgo = moment().subtract(1, "month").format("YYYY-MM-DD");
  const [results, setResults] = useState([])
  const navigate = useNavigate()
  const [form, setForm] = useState({
    from: aMonthAgo,
    to: today,
  })
  const { from, to } = form;
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };
  const facilityId = store.getState().auth.user.facilityId;

  const getOrder = useCallback(() => {
    _postApi(
      `/${endpoint}/v1/orders/select?facilityId=${facilityId}&from=${form.from}&to=${form.to}`,
      // form,
      {},
      (data) => {
        if (data.success) {
          setResults(data.results)
        }
      },
    )
    // )
  }, [form])

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  const fields = [
    {
      title: "S/N",
      value: "order_id",
      custom: true,
      component: (item) => item.order_id
    },
    {
      title: "Patient Name",
      value: "sn"
    },
    {
      title: "Address",
      value: "sn"
    },
    {
      title: "Status",
      value: "order_status"
    },
    {
      title: "Payment Status",
      value: "payment_status"
    },
    {
      title: "Order Date",
      value: "oder_date"
    },
    {
      title: "Total Amount",
      value: "total_amount"
    },
    {
      title: "Action",
      custom: true,
      component: (item) => <><CustomButton color="success" onClick={() => navigate(`view/${item.order_id}`)}>View</CustomButton> <CustomButton color="danger">Delete</CustomButton></>
    },


  ]
  return (
    <div>
      {/* {JSON.stringify(form)} */}
      <CustomCard header="Manage Orders">
        <DaterangeSelector
          handleChange={(e) => handleChange(e)}
          from={from}
          to={to}
        />
        <SearchBar />
        <CustomTable fields={fields} className="mt-3" data={results} />
      </CustomCard>
    </div>
  )
}

export default Order