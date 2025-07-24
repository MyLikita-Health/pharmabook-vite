import React, { useState } from 'react'
import { CustomButton, RadioGroup } from '../../../components/UI'
import CustomCard from '../../../components/UI/CustomCard'
import Asset from './Asset'
import AssrentTable from './AssrentTable'
import Rent from './Rent'
// import Asset from './Asset'

export default function AssRent() {
  const [input, setInput] = useState({
    regType: 'asset'
  })
  const [asset, setAsset] = useState({
    startDate: "",
    endDate: "",
    full: "",
    percentage: "",
    cost: "",
    rate: "",
    accHead: ""

  })

  const [rent, setRent] = useState({
    startDate: "",
    endDate: "",
    full: "",
    cost: "",
  })
  const handleAsset = ({ target: { name, value } }) => {
    setAsset((p) => ({ ...p, [name]: value }))
  }
  const handleRent = ({ target: { name, value } }) => {
    setRent((p) => ({ ...p, [name]: value }))
  }
  const handleRegTypeChange = (n, v) => {
    setInput((p) => ({ ...p, regType: v }))
  }
  const handleSubmit = () => {
    console.log(rent, asset);
  }
  return (
    <div>
      <CustomCard  header="Add Asset" >
        <RadioGroup
          label="Select Registration Type:"
          name="regType"
          value={input.regType}
          options={[
            { label: 'Asset', name: 'asset' },
            { label: 'Rent', name: 'rent' },
          ]}
          onChange={handleRegTypeChange}
        />{JSON.stringify(input.regType)}
        {input.regType === 'asset' ? <Asset asset={asset} handleAsset={handleAsset} /> : <Rent rent={rent} handleRent={handleRent} />}
        <center>  <CustomButton  onClick={handleSubmit} >Save Asset Schedule</CustomButton>  </center> 
        <br /> 
        <AssrentTable />
            </CustomCard>
          
    </div>
  )
}
