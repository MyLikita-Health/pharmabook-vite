import React from 'react'
import { CustomTable } from '../../components/UI'


export default function ExpensesList() {
    const fields = [
        { title: 'Date', value: 'date' },
        { title: 'Description', value: 'description' },
        { title: 'Collected By', value: 'collectedBy' },
        { title: 'Amount', value: 'amount' }
    ]

    const tableData = [
        {
            date: "10-10-10",
            description: "Bank",
            collectedBy: "242,400",
            amount: "200,00"
        },
        {
            date: "10-10-10",
            description: "Bank",
            collectedBy: "242,400",
            amount: "200,00"
        },
        {
            date: "10-10-10",
            description: "Bank",
            collectedBy: "242,400",
            amount: "200,00"
        }
    ]
    return (
        <CustomTable fields={fields} data={tableData} />
    )
}