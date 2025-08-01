import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from 'reactstrap'
import CustomTypeahead from '../../../components/UI/CustomTypeahead'
import { getPurchaseItem, getSalesDrugs } from '../../../redux/action/pharmacy'
// import CustomTypeahead from '../../../components/CustomTypeahead'

function SearchItemInput(props) {
  const dispatch = useDispatch()
  const itemList = useSelector((state) => state.pharmacy.purchaseItems)
//   const final = itemList.filter((i) => i.quantity > 0)||[]

  const getList = useCallback(() => {
    dispatch(getSalesDrugs('all', 0, 200));
    dispatch(getPurchaseItem(null))
  }, [dispatch])

  useEffect(() => {
    getList()
  }, [getList])

  return (
    <>
      <CustomTypeahead
        {...props}
        _ref={props._ref}
        allowNew={props.allowNew}
        placeholder="Search items by name"
        labelkey={props.labelkey}
        labelKey="drug_name"
        options={itemList||[]}
        onInputChange={(v) => {
          if (v.length) {
            console.log(v, 'KDDDDDDDK')
            props.onInputChange(v)
          }
        }}
        onChange={(v) => {
          if (v.length) {
            props.onChange(v[0])
            console.log(v[0], 'KDDDDDDDK')
          }
        }}
      />
    </>
  )
}

export default SearchItemInput
