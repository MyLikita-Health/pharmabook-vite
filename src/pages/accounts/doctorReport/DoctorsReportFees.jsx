import React from 'react'
import { Col, Row } from 'reactstrap'
import { CustomButton, CustomForm, CustomTable } from '../../../components/UI'
import CustomCard from '../../../components/UI/CustomCard'
import DaterangeSelector from '../../../components/UI/DaterangeSelector'
import { useNavigate } from 'react-router-dom'


function DoctorsReportFees() {
  const navigate = useNavigate()
  const fields = [
    {
      title: 'S/N',
      value: 'sn',
    },
    {
      title: "Doctor's Name",
      value: 'doctorName',
    },
    {
      title: 'Doctor Fees',
      value: 'doctorFee',
    },
    {
      title: 'Action',
      custom: true,
      className: 'text-center',
      component: () => <CustomButton onClick={() => navigate('/app/accounts/doctors-reporting-fees-details')}>View Details</CustomButton>
    }
  ]

  const tableData = [
    {
      sn: "1",
      doctorName: "Abc Def",
      doctorFee: "100",
    }
  ]
  return (
    <div>
      <CustomCard header="Doctors Report Fees">
        <DaterangeSelector />

        <Row>
          <Col md="6">

          </Col>
          <Col md="6">
            <CustomButton color="success" style={{ float: 'right', marginTop: 30, marginBottom: 10 }}>
              Print
            </CustomButton>
          </Col>
        </Row>
        <CustomTable fields={fields} data={tableData} size="sm" />
      </CustomCard>
    </div>
  )
}

export default DoctorsReportFees
