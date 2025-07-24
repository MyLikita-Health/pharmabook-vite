import React from 'react'
import { CustomTable } from '../../components/UI'


export default function PatientIncome() {
    const fields = [
        { title: 'S/N', value: 'sn' },
        { title: 'Date', value: 'date' },
        { title: 'Patient Name', value: 'patientName' },
        { title: 'Amount(₦)', value: 'amount' }
    ]

    const tableData = [
        {
            sn: "1",
            date: "10-10-20",
            patientName: "Patient Name",
            amount: "200,00"
        },
        {
            sn: "2",
            date: "10-10-20",
            patientName: "Patient Name",
            amount: "200,00"
        },
        {
            sn: "3",
            date: "10-10-20",
            patientName: "Patient Name",
            amount: "200,00"
        },
    ]
    return (
        <CustomTable fields={fields} data={tableData} />
    )
}