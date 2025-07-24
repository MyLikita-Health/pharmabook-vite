import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import CustomCard from '../../components/UI/CustomCard'
import DaterangeSelector from '../../components/UI/DaterangeSelector'
import { CustomButton, CustomForm, CustomTable } from '../../components/UI'
import DailyTotal from './DailyTotal'
import Expenses from './Expenses'
import PatientIncome from './PatientIncome'
import SummaryOfSalesAndExpenses from './SummaryOfSalesAndExpenses'
import Revenue from './Revenue'
import TrialBalance from './TrialBalance'
import StatementOfFinancialPosition from './StatementOfFinancialPosition'
import OperationNoteTable from '../theater/OperationNoteTable'
export default function GenerateAccountReport() {
    const [form, setForm] = useState({})

    const selectOptions = [
        {
            name: "select_do",
            label: "Select Report Type",
            value: form.select_do,
            type: "select",
            options: [
                "Daily Total",
                "Patient Income",
                'Summary of Sales and Expenses',
                'Revenue',
                'Expenses',
                'Statement of Financial Position',
                'Trial Balance']
        }
    ]

    const handleChange = ({ target: { name, value } }) => {
        setForm(p => ({ ...p, [name]: value }))
    }

    return (
        <>
            <CustomCard header="Trial Balance">
                <DaterangeSelector />
                <Row>
                    <Col md="6">
                        <CustomForm fields={selectOptions} handleChange={handleChange} />
                    </Col>
                    <Col md="6">
                        <CustomButton color="primary" style={{ float: 'right', marginTop: 30 }}>
                            Export/Download
                        </CustomButton>
                    </Col>
                </Row>

                {
                    form.select_do === "Daily Total" ? <DailyTotal /> :
                        form.select_do === "Expenses" ? <Expenses /> :
                            form.select_do === "Patient Income" ? <PatientIncome /> :
                                form.select_do === "Summary of Sales and Expenses" ? <SummaryOfSalesAndExpenses /> :
                                    form.select_do === "Revenue" ? <Revenue /> :
                                        form.select_do === "Trial Balance" ? <TrialBalance /> :
                                            form.select_do === "Statement of Financial Position" ? <StatementOfFinancialPosition /> :
                                                <h3>Nothing to show</h3>}
            </CustomCard>

            <OperationNoteTable/>
        </>
    )
}

