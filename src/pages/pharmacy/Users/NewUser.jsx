import React, { useCallback, useEffect } from "react";
import { FormGroup } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, CustomForm, TextInput } from "../../../components/UI";
import { getPharmStore } from "../../../redux/action/pharmacy";
import { routes } from "../../../components/Navbars/NavItems";

function NewUserForm({
  handleChange = (f) => f,
  handleCheckboxChange = (f) => f,
  username,
  handleTypeaheadChange = (f) => f,
  handleSubmit = (f) => f,
  phone,
  password,
  role,
  accessTo,
  submit,
  disabled = null,
  form = {},
  user = {},
}) {
  const dispatch = useDispatch();
  const _getPharmStore = useCallback(
    () => dispatch(getPharmStore()),
    [dispatch]
  );

  const { pharmStore } = useSelector((state) => state.pharmacy);
  useEffect(() => {
    _getPharmStore();
  }, [_getPharmStore]);
  const fields = [
    {
      className: "form-control",
      custom: true,
      component: (item) => (
        <TextInput
          type="text"
          name="username"
          label="User name"
          placeholder="username"
          value={form.username}
          onChange={handleChange}
          required
          loading={form.loading}
          message={form.message}
          good={form.userCheck}
          disabled={disabled === "false" ? true : false}
        />
      ),
    },
    {
      className: "form-control",
      type: "text",
      name: "phone",
      value: phone,
      label: "Phone number",
      required:true
    },
    {
      className: "form-control",
      type: "password",
      name: "password",
      value: password,
      label: "Password",
      disabled: disabled === "false" ? true : false,
    },
    {
      type: "select",
      name: "role",
      value: role,
      label: "Role",
      options: ["Pharmacy Owner", "Receptionist", "Sales Agent"],
    },
    // {
    //   type: "select",
    //   label: "Default Store",
    //   options: pharmStore.map((s) => s.store_name),
    //   value: form.store,
    //   name: "store",
    //   defaultValue: user.store,
    // },
    {
      type: "select",
      label: "Assign store",
      options: pharmStore.map((s) => s.store_name),
      value: form.branch_name,
      name: "branch_name",
      defaultValue: user.branch_name,
    },
  ];
  return (
    <>
      <CustomForm
        fields={fields}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
      <FormGroup>
        <label className="mb-2">Access (User's Privilege)</label>
        <div className="row">
          {routes
            .map((item) => item.label)
            .map((item, i) => (
              <div className="col-md-2" key={i}>
                <Checkbox
                  label={item}
                  name="accessTo"
                  onChange={handleCheckboxChange}
                  value={accessTo}
                  checked={accessTo && accessTo.includes(item)}
                />
              </div>
            ))}
        </div>
      </FormGroup>
      {submit}
    </>
  );
}

export default NewUserForm;
