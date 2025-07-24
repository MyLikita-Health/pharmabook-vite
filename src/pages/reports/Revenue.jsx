import React from 'react'
import { CustomTable } from '../../components/UI'


export default function Revenue() {
    const fields = [
        { title: 'Date', value: 'date' },
        { title: 'Description', value: 'description' },
        { title: 'Client', value: 'client' },
        { title: 'Amount(₦)', value: 'amount' }
    ]

    const tableData = [
        {
            date: "10-10-10",
            description: "Bank",
            client: "New Client",
            amount: "242,400"
        },
        {
            date: "10-10-10",
            description: "Bank",
            client: "New Client",
            amount: "242,400"
        },
        {
            date: "10-10-10",
            description: "Bank",
            client: "New Client",
            amount: "242,400"
        }
    ]
    return (
        <CustomTable fields={fields} data={tableData} />
    )
}