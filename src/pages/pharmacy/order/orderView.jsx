import React, { useCallback, useEffect, useState } from 'react'
import CustomCard from '../../../components/UI/CustomCard'
import { useNavigate, useParams } from "react-router-dom";
import { endpoint } from "../../../redux/action/pharmacy";
import { _postApi } from "../../../redux/action/api";
import { CustomButton, CustomTable, SearchBar } from '../../../components/UI'
import { Alert } from 'reactstrap';

function OrderView() {
  const params = useParams()
  const [results, setResults] = useState([])

  const getIds = useCallback(() => {

    _postApi(
      `/${endpoint}/v1/orders/id?order_id=${params.order_id}`,
      // form,
      {},
      (data) => {
        if (data.success) {
          setResults(data.results)
        }
      },
    )
  }, [params]);
  useEffect(() => {
    getIds();
  }, [getIds]);
  const fields = [
    {
      title: "S/N",
      value: "id",
      custom: true,
      component: (item) => item.id
    },
    {
      title: "Item Name",
      value: "item_name"
    },
    {
      title: "Quantity",
      value: "qty_req",
      custom: true,
      component: (item) => item.qty_req
    },
    {
      title: "Item Category",
      value: "item_cat"
    },
    {
      title: "Unit Price",
      value: "unit_price",
      custom: true,
      component: (item) => item.unit_price
    },
    {
      title: "Amount(N)",
      value: "customer_code",
      custom: true,
      component: (item) => item.customer_code
    },
  ]
  return (
    <div>
      <CustomCard header="Order View" back>
        {/* {JSON.stringify(results)} */}
        {/* <h1>hi i am  order view </h1>  */}
        <div><b>Order ID :</b> {params.order_id}</div>
        <div><b>Customer Name :</b> Abdulsalam</div>

        <CustomTable fields={fields} data={results} />
        {!results.length ? <Alert className="mt-2">
          {/* <center> <AlertCircle /></center> */}
          <center>No Order Yet !</center>
        </Alert> : ""}
      </CustomCard>
    </div>
  )
}

export default OrderView