import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { CustomButton, CustomForm, CustomTable } from '../../components/UI'
import Autocomplete from '../../components/UI/Autocomplete'
import CustomCard from '../../components/UI/CustomCard'
import CustomEdit from '../../components/UI/CustomEdit'
import CustomModal from '../../components/UI/CustomModal'
import { formatNumber } from '../../utils'
import {
  getAccountHeads,
  getAllServices,
  getBillingCategories,
  postServices,
} from './api'

function ServiceSetup() {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [serviceList, setServiceList] = useState([])
  const [serviceModalIsOpen, setServiceModalIsOpen] = useState(false)
  const facilityId = useSelector((state) => state.auth.user.facilityId)
  const [form, setForm] = useState({ query_type: 'insert' })
  
  const fields = [
    { title: 'Service', value: 'title' },
    { title: 'Account', custom:true, component: i => `${i.acc_head} - ${i.acc_head_name}` },
    {
      title: 'Price(₦)',
      custom: true,
      component: (item) => <div className='text-end'>{formatNumber(item.cost)}</div>,
    },
    {
      title: 'Action',
      custom: true,
      component: (item) => (
        <div className='text-center'>
          <CustomEdit />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllServices(
      {facilityId, query_type: 'select'},
      (data) => {
        if (data && data.results) {
          setServiceList(data.results)
        }
      },
      (err) => {
        console.log(err)
      },
    )
  }, [facilityId])

  const saveService = (service) => {
    setLoadingSubmit(true)

    postServices(
      { ...service, facilityId },
      () => {
        setLoadingSubmit(false)
        alert('submitted')
        setServiceModalIsOpen(false)
      },
      (err) => {
        setLoadingSubmit(false)
        alert('an error occured')
      },
    )
  }

  return (
    <div>
      <CustomCard back header="Service Set up">
        <Row className="p-0 m-0">
          <Col md={6}>
            <CustomTable fields={fields} data={[[]]} />
          </Col>
          <Col md={6}>
            <CustomForm fields={form} />
          </Col>
        </Row> 
      </CustomCard>
    </div>
  )
}

function ServicesModal({
  isOpen = false,
  toggle = (f) => f,
  saveService = (f) => f,
  loadingSubmit = false,
}) {
  const [billingCategories, setBillingCategories] = useState([])
  const [accountList, setAccounts] = useState([])
  const [form, setForm] = useState({ query_type: 'insert' })

  const facilityId = useSelector((state) => state.auth.user.facilityId)

  useEffect(() => {
    getBillingCategories({ query_type: 'select' }, (data) => {
      if (data && data.results) {
        setBillingCategories(data.results)
      }
    })
  }, [])

  useEffect(() => {
    getAccountHeads(
      { facilityId },
      (data) => {
        if (data && data.results) {
          setAccounts(data.results)
        }
      },
      (err) => {
        console.log(err)
      },
    )
  }, [facilityId])

  const fields = [
    {
      name: 'account',
      col: 6,
      component: (item) => (
        <Autocomplete
          options={accountList}
          labelKey={(i) => `${i.head} ${i.description}`}
          label="Select Account Head (*)"
          // container='px-0'
          onChange={(e) => {
            if (e && e.length) {
              setForm((p) => ({
                ...p,
                account: e[0].head,
                acc_head_name: e[0].description,
              }))
            }
          }}
        />
      ),
      container: 'px-1',
    },
    { name: 'title', value: form.title, label: 'Service Name', col: 6 },
    { name: 'cost', value: form.cost, label: 'Cost', col: 6 },
    {
      name: 'category',
      value: form.category,
      label: 'Category',
      col: 6,
      type: 'select',
      options: billingCategories.map((a) => a.description),
    },
  ]

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }))
  }

  return (
    <CustomModal isOpen={isOpen} toggle={toggle} header="Create New Service">
      {/* {JSON.stringify(accountList)} */}
      <CustomForm fields={fields} handleChange={handleChange} />

      <CustomButton onClick={() => saveService(form)} loading={loadingSubmit}>
        Save
      </CustomButton>
    </CustomModal>
  )
}

export default ServiceSetup
