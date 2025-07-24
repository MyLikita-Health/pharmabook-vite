import React from 'react'
import { CustomTable } from '../../components/UI'


export default function StatementOfFinancialPosition() {
    const fields = [
        { title: 'Description', value: 'description' }
    ]

    const tableData = [
        {
            description: "ASSETS"
        }
    ]
    return (
        <CustomTable fields={fields} data={tableData} />
    )
}