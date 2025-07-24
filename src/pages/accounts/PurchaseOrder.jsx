import React from 'react'
import CustomTable from '../../components/UI/CustomTable'
import CustomCard from '../../components/UI/CustomCard'
import { SearchBar } from '../../components/UI'
import CustomAlert from '../../components/UI/CustomAlert'

function PurchaseOrder() {
  const fields = [
    { title: 'Date', value: 'date' },
    { title: 'PO No.', value: 'po_no' },
    { title: 'Client', value: 'client' },
    { title: 'Processed By', value: 'processed_by' },
    { title: 'Total', value: 'total' },
    { title: 'Action', value: 'Action   ' },
  ]
  return (
    <div>
      <CustomCard header="Purchase Order" back>
        <SearchBar />
        <CustomTable fields={fields} className="mb-2 mt-5" />
        <CustomAlert
          color="primary"
          text="Nothing To Display at this Time,Please check back Later"
          className="text-center"
        />
      </CustomCard>
    </div>
  )
}

export default PurchaseOrder
