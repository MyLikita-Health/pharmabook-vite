import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Card, CardHeader, Col, Input, Row } from 'reactstrap'
import { CustomButton, CustomTable, SelectInput } from '../../components/UI'
import CustomCard from '../../components/UI/CustomCard'
import { _postApi } from './../../redux/action/api'
import { endpoint, getPharmStore, getSalesDrugs, searchDrugSale } from './../../redux/action/pharmacy'
import { useNavigate } from "react-router-dom"
import store from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { formatNumber } from "../../components/UI/helpers";
import _customNotification from '../../components/UI/_customNotification'
import { useToasts } from 'react-toast-notifications'

export default function TransferForm() {
    const facilityId = store.getState().auth.user.facilityId;
    const navigate = useNavigate()
    const pharmStore = useSelector((state) => state.pharmacy.pharmStore);
    const saleItems = useSelector((state) => state.pharmacy.saleItems);
    const [filterText, setFilterText] = useState("");
    const { addToast } = useToasts();
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [arr, setArr] = useState([])
    const qttyRef = useRef();
    const [selectedItem, setSelectedItem] = useState([])
    const onFormChange = (key, value) => setForm((p) => ({ ...p, [key]: value }));
    console.log(selectedItem)
    const fields = [
        {
            title: "S/N",
            custom: true,
            component: (i, index) => index + 1
        },
        {
            title: "Item",
            value: "item_name"
        },
        {
            title: "Qty",
            value: "qty"
        },
        {
            title: "Transfer From",
            value: "storeFrom"
        },
        {
            title: "Transfer To",
            value: "storeTo"
        },

    ]
    const [test, setTest] = useState(false)
    const [values, setValues] = useState({
        cost_qty: "",
        price: "",
        Amount: ""
    })
    const [form, setForm] = useState({
        storeFrom: "",
        storeTo: "",
        item_name: "",
        qty: "",
        from: 0,
        to: 100,
    })

    const handleChange = ({ target: { value, name } }) => {
        setForm((p) => ({ ...p, [name]: value }))
        if (name === "item_name") {
            let selected = saleItems.find((a) => a.items === value);
            if (selected) {
                setValues({
                    ...values,
                    item_name: value,
                    cost_qty: selected.item_name,
                    price: selected.cost_price,
                });
                console.log(selected)
            }
            // console.log("testData", selected);
        }
    }

    const selectItem = (item) => {
        setForm((p) => ({ ...p, selectedItem: item }));
        // qttyRef.current.select();
    };


    const handlAdd = () => {
        let errors = []
        Object.keys(form).forEach((item) => {
            if (form[item] === '') {
                errors.push(item + ' cannot be empty!')
            }
        })

        if (errors.length) {
            // _customNotification(addToast,"Complete The Form");
            _customNotification(addToast,errors[0])
        } else {
            setTest(true)
            setArr((p) => [...p, form])
            setData((prev) => [
                ...prev,
                {
                    item_name: form.item_name,
                    qty: form.qty,
                    storeFrom: form.storeFrom,
                    storeTo: form.storeTo
                },
            ]);
            handleReset();
        }
    };

    const handleReset = () => {
        setForm((p) => ({
            ...p,
            storeFrom: "",
            storeTo: "",
            item_name: "",
            qty: ""
        }))
    }

    const _getPharmStore = useCallback(() => {
        dispatch(getSalesDrugs(form.storeFrom, form.from, form.to));
        dispatch(getPharmStore());
    }, [dispatch, form.from, form.storeFrom, form.to]);


    const options = pharmStore.map((item) => item.store_name);
    useEffect(() => {
        if (filterText.length > 3) {
            dispatch(searchDrugSale(form.storeFrom, 0, 100, filterText));
        } else if (filterText.length === 0) {
            _getPharmStore();
        }
    }, [
        _getPharmStore,
        dispatch,
        filterText,
        filterText.length,
        form.storeFrom,
    ]);;

    const handleSubmit = () => {
        _postApi(
            `/pharmacy/v1/good-transfer?facilityId=${facilityId}`,
            { data: arr },
            (res) => {
                if (res.status) {
                    _customNotification(addToast,"Successfully Submit");
                    setArr([]);
                    setData([])
                    setTest(false)
                }
            },
            (err) => {
                _customNotification(addToast,"error occured");
                console.log(err);
            }
        );
    };

    const [results, setResults] = useState([])
    return (
        <div className=''>
            <CustomCard header="Transfer Form">
                {JSON.stringify(saleItems)}
                <Row className='mb-3'>
                    <Col md={6}>
                        <SelectInput
                            label="Transfer from"
                            _default="Select Store"
                            type="select"
                            value={form.storeFrom}
                            name="storeFrom"
                            options={options}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={6}>
                        <SelectInput
                            label="Transfer To"
                            _default="Select Store"
                            type="select"
                            value={form.storeTo}
                            name="storeTo"
                            options={options}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={6}>
                        <label>Select Item</label>
                        <Input type='select' name="item_name" value={form.item_name}
                            onChange={(selected) => {
                                onFormChange("item_name", selected.item_name);
                                setSelectedItem(selected);
                                // _customNotification(addToast,JSON.stringify(selected));
                                console.log("selected item", selected)
                                setForm((p) => ({
                                    ...p,
                                    id: selected.facilityId,
                                    selling_price: parseInt(selected.selling_price),
                                    cost: selected.cost,
                                    balance: 0,
                                    expiry_date: selected.expiry_date,
                                    store: selected.store,
                                    item_code: selected.item_code,
                                    // ...selected,
                                }));
                            }}
                        >
                            <option>--select--</option>
                            {saleItems.map((item) =>
                                <>
                                    <option >{item.drug_name}</option>
                                </>
                            )}
                        </Input>
                    </Col>
                    <Col md={6}>
                        <label>Quantity</label>
                        <Input type="text" name="qty" vlaue={form.qty} onChange={handleChange} />
                    </Col>
                </Row>
                <CardHeader
                    className="pt-2 mt-3"
                    style={{
                        borderLeft: `3px solid blue`,
                        borderRight: `3px solid red`,
                    }}
                >
                    <Row>
                        <Col>
                            <label htmlFor="qtty" className="ml-3">
                                Quantity Available:
                            </label>
                            <label htmlFor="">{selectedItem.balance}</label>
                        </Col>
                        <Col>
                            <label htmlFor="price" className="ml-1">
                                Cost Price:
                            </label>
                            <label htmlFor="">
                                {formatNumber(parseFloat(selectedItem.selling_price))}
                            </label>
                        </Col>
                        <Col>
                            <label htmlFor="drugName" className="ml-1">
                                Amount:{" "}
                            </label>
                            <label htmlFor="">
                                {formatNumber(
                                    parseFloat(selectedItem.balance) *
                                    parseFloat(selectedItem.selling_price)
                                )}
                            </label>
                        </Col>
                    </Row>
                </CardHeader>
                <center>
                    <CustomButton className="mt-4 mb-3" onClick={handlAdd}>Add</CustomButton>
                </center>
                {test === false ? "" : (<>
                    <CustomTable fields={fields} data={data} />
                    <center>
                        <CustomButton className="mt-4 mb-3" onClick={handleSubmit}>Submit</CustomButton>
                    </center></>)}

            </CustomCard>

        </div>
    )
}
