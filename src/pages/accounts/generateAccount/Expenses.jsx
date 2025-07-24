import React from 'react'
import { CustomTable } from '../../../components/UI'

function Expenses() {
    const data = [
        {
            title: "Date",
            value: "date"
        },
        {
            title: "Description",
            value: "description"
        },
        {
            title: "Collected By",
            value: "collected_by"
        },
        {
            title: "Amount (₦)",
            value: "amount"
        },
    ]
    return (
        <div>
             <CustomTable fields={data} className="mt-3" size="sm"/>
        </div>
    )
}

export default Expenses
