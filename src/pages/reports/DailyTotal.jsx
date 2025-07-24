import React from 'react'
import { CustomTable } from '../../components/UI'
import Naira from 'react-naira'


export default function DailyTotal() {
    const fields = [
        { title: 'Date', value: 'date' },
        { title: 'Description', value: 'description' },
        { title: 'Paid(₦)', value: 'paid' }
    ]

    const tableData = [
        {
            date: "10-10-10",
            description: "Bank",
            paid: "242,400"
        },
        {
            date: "10-10-10",
            description: "Bank",
            paid: "242,400"
        },
        {
            date: "10-10-10",
            description: "Bank",
            paid: "242,400"
        }
    ]
    return (
        <CustomTable fields={fields} data={tableData} />
    )
}