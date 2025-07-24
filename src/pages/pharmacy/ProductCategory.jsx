import React, { useEffect, useState } from 'react'
import { Col, Input, Row } from 'reactstrap'
import { CustomButton, CustomTable } from '../../components/UI'
import CustomCard from '../../components/UI/CustomCard'
import { _postApi } from './../../redux/action/api'
import { endpoint } from './../../redux/action/pharmacy'
import { useNavigate } from "react-router-dom"
import store from '../../redux/store'
import { useToasts } from 'react-toast-notifications'
import _customNotification from '../../components/UI/_customNotification'
export default function ProductCategory() {
  const facilityId = store.getState().auth.user.facilityId;

  const { addToast } = useToasts();
  const navigate = useNavigate()
  const fields = [
    {
      title: "S/N",
      custom: true,
      component: (i, index) => index + 1
    },
    {
      title: "Name",
      value: "name"
    }, {
      title: "Description",
      value: "description"
    },

  ]
  const [form, setForm] = useState({
    name: "",
    description: "",
  })
  const handleChange = ({ target: { value, name } }) => {
    setForm((p) => ({ ...p, [name]: value }))

  }
  const handlAdd = () => {
    console.log(form)
    _postApi(
      `/${endpoint}/v1/product-description?facilityId=${facilityId}&query_type=insert`,
      form,
      (data) => {
        if (data.success) {
          _customNotification(addToast, "sucess");
          getProductDescription();
          //    navigate(-1);
        }
      },
    )
    handleReset()
  }
  const handleReset = () => {
    setForm(p => ({
      ...p,

      name: "",
      description: "",
    }))
  }
  const [results, setResults] = useState([])
  const getProductDescription = () => {
    _postApi(
      `/${endpoint}/v1/product-description?facilityId=${facilityId}&query_type=select`,
      // form,
      {},
      (data) => {
        if (data.success) {
          setResults(data.results)
        }
      },
    )
    // )
  };

  useEffect(() => {
    getProductDescription();
  }, []);
  return (
    <div className=''>
      <CustomCard header="Product Category">        <Row className='mb-3'>
        <Col md={5}>
          <label>Name</label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </Col>
        <Col md={5}>
          <label>Description</label>
          <Input type="textarea" name="description" vlaue={form.description} onChange={handleChange} />
        </Col>
        <Col md={2}>
          <CustomButton className="mt-4" onClick={handlAdd}>Add</CustomButton>
        </Col>
      </Row>
        <CustomTable fields={fields} data={results} />
      </CustomCard>

    </div>
  )
}
