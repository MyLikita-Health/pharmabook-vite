import React from 'react'
import { Col, Row } from 'reactstrap'
import { CustomButton, CustomForm, CustomTable } from '../../../components/UI'
import CustomCard from '../../../components/UI/CustomCard'
import DaterangeSelector from '../../../components/UI/DaterangeSelector'

function DoctorsDetails() {
    const fields = [
        {
            title: 'Date',
            value: 'date',
        },
        {
            title: "Test Name",
            value: 'testName',
        },
        {
            title: 'Doctor Fees',
            value: 'doctorFee',
            custom:true,
            className: 'text-right'
        },
        {
            title: 'Reference',
            value: 'reference',
        },
        {
            title: '',
            value: '',
        }
    ]

    const tableData = [
        {
            date: "10-10-10",
            testName: "Abc Def",
            doctorFee: "100",
            reference: "122121"
        },
        {
            date: "10-10-10",
            testName: "Abc Def",
            doctorFee: "100",
            reference: "122121"
        },
        {
            date: "10-10-10",
            testName: "Abc Def",
            doctorFee: "100",
            reference: "122121"
        }
    ]
    const field = [
        {
            name: "select_do",
            label: "Select Doctor",
            type: "select",
            options: ["hjh", "sdsd"]
        }
    ]
    return (
        <div>
            <CustomCard header="Doctors Report Fees">
                <DaterangeSelector />

                <Row>
                    <Col md="6">
                        <CustomForm fields={field} />
                    </Col>
                    <Col md="6">
                        <CustomButton color="success" style={{ float: 'right', marginTop: 30 }}>
                            Print
                        </CustomButton>
                    </Col>
                </Row>
                <h6>Doctor's name: <span>Dr. Usman Ali</span></h6>
                <CustomTable fields={fields} data={tableData} size="sm" />
            </CustomCard>
        </div>
    )
}

export default DoctorsDetails
