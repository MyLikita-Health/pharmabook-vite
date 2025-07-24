import React from 'react'
import { CustomTable } from '../../components/UI'
import { Row, Col } from 'reactstrap'

export default function SummaryOfSalesAndExpenses() {
    const fields1 = [
        { title: 'Description', value: 'description' },
        { title: 'Amount(₦)', value: 'amount' }
    ]

    const tableData1 = [
        {
            description: "HON. BABA CHAICHAI",
            amount: "200,00"
        },
        {
            description: "HON. BABA CHAICHAI",
            amount: "200,00"
        },
        {
            description: "HON. BABA CHAICHAI",
            amount: "200,00"
        }
    ]

    const fields2 = [
        { title: 'Description', value: 'description' },
        { title: 'Amount(₦)', value: 'amount' }
    ]

    const tableData2 = [
        {
            description: "HON. BABA CHAICHAI",
            amount: "200,00"
        },
        {
            description: "HON. BABA CHAICHAI",
            amount: "200,00"
        },
        {
            description: "HON. BABA CHAICHAI",
            amount: "200,00"
        }
    ]
    return (
        <>
            <Row>
                <Col md="6">
                    <CustomTable fields={fields1} data={tableData1} />
                </Col>
                <Col md="6">
                    <CustomTable fields={fields2} data={tableData2} />
                </Col>
            </Row>
        </>
    )
}