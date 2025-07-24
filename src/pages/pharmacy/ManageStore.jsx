import React, { useEffect, useState } from "react";
import { CustomButton, CustomForm, CustomTable } from "../../components/UI";
import CustomCard from "../../components/UI/CustomCard";
import {
  addNewPharmStore,
  getPharmStore,
  getPharmUsers,
} from "../../redux/action/pharmacy";
import { v4 as uuidV4 } from "uuid";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "../../components/UI/Loading";
import _customNotification from "../../components/UI/_customNotification";
import { useToasts } from "react-toast-notifications";
import CustomTypeahead from "../../components/UI/CustomTypeahead";
import Scrollbar from "../../components/UI/Scrollbar";
import { Card, CardBody } from "reactstrap";

export default function ManageStore() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const initialState = {
    store_name: "",
    phone: "",
    address: "",
    location: "",
    storeType: "Sales",
    manage_by: "",
    store_code: uuidV4(),
    status: "insert",
  };
  const [form, setForm] = useState(initialState);
  const pharmStore = useSelector((state) => state.pharmacy.pharmStore);
  const _loading = useSelector((state) => state.pharmacy.loading);
  const pharmUsers = useSelector((state) => state.pharmacy.pharmUsers);
  const { addToast } = useToasts();
  const fields = [
    {
      label: "Store Name",
      name: "store_name",
      required: true,
      value: form.store_name,
    },

    {
      label: "Phone Number (optional)",
      name: "phone",
      value: form.phone,
    },

    {
      label: "Store Location",
      name: "location",
      value: form.location,
    },
    {
      label: "Address",
      type: "text",
      required: true,
      name: "address",
      value: form.address,
    },
    {
      label: "Store Type",
      type: "select",
      required: true,
      name: "storeType",
      options: ["Sales", "Store"],
      value: form.storeType,
    },
    {
      label: "Managed by",
      type: "custom",
      name: "manage_by",
      value: form.manage_by,
      component: () => (
        <CustomTypeahead
          label="Managed by"
          labelKey="username"
          options={pharmUsers}
          clearButton
          onChange={(s) => {
            if (s.length) {
              console.log(s);
              setForm((p) => ({
                ...p,
                manage_by: s[0].username,
              }));
            }
          }}
        />
      ),
    },
  ];
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setForm(initialState);
  };

  const handleSubmit = () => {
    if (
      form.store_name === "" ||
      form.address === "" ||
      form.manage_by === ""
    ) {
      _customNotification(addToast, "Please complete the form");
    } else {
      setLoading(true);
      addNewPharmStore(
        form,
        (res) => {
          if (res) {
            setLoading(false);
            _customNotification(addToast, "Successfully Saved", "success");
            handleReset();
            _getPharmStore();
          }
        },
        (err) => {
          _customNotification(addToast, "Errored Occurred", "error");
          setLoading(false);
          console.log(err);
        }
      );
    }
  };
  const _getPharmStore = useCallback(() => {
    dispatch(getPharmStore());
    dispatch(getPharmUsers());
  }, [dispatch]);
  useEffect(() => {
    _getPharmStore();
  }, [_getPharmStore]);

  const handleEdit = (store) => {
    setForm((p) => ({ ...p, ...store, status: "update" }));
  };
  const tblfields = [
    {
      title: "S/N",
      custom: true,
      component: (item, idx) => idx + 1,
      className: "text-center",
    },
    { title: "Store", value: "store_name" },
    { title: "Location", value: "location" },
    { title: "Phone Number", value: "phone" },
    { title: "Store Type", value: "storeType" },
    {
      title: "Action",
      custom: true,
      component: (item) => (
        <CustomButton
          size="sm"
          outline
          onClick={() => {
            handleEdit(item);
          }}
        >
          Edit
        </CustomButton>
      ),
      className: "text-center",
    },
  ];
  return (
    <div>
      <CustomForm fields={fields} handleChange={handleChange} />
      <center className="my-2">
        <CustomButton
          className="col-md-3"
          onClick={handleSubmit}
          loading={loading}
        >
          {form.status === "update" ? "Update" : "Submit"}
        </CustomButton>
      </center>
      {/* <div style={{ height: "34vh" }}> */}
        {_loading && <Loading size="sm" />}
        <Scrollbar>
          <CustomTable fields={tblfields} data={pharmStore} />
        </Scrollbar>
      {/* </div> */}
    </div>
  );
}
